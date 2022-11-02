/* This file is part of natlab.
 * https://github.com/mvasilkov/natlab
 * MIT+Ethics License | Copyright (c) 2022 Mark Vasilkov
 * See https://github.com/mvasilkov/natlab/blob/master/LICENSE
 */
'use strict'

import { CanvasHandle } from '../node_modules/natlib/canvas/CanvasHandle.js'
import { Input, Keyboard } from '../node_modules/natlib/controls/Keyboard.js'
import { dda } from '../node_modules/natlib/dda.js'
import { startMainloop } from '../node_modules/natlib/scheduling/mainloop.js'
import { Vec2 } from '../node_modules/natlib/Vec2.js'

const enum Settings {
    height = 10,
    width = 10,
    tileSize = 32,
    speed = 0.05,
}

const tiles = Array.from({ length: Settings.height },
    () => Array.from({ length: Settings.width }, () => false))

const startPoint = new Vec2(0.5, 0.5)
const endPoint = new Vec2(Settings.width - 0.5, Settings.height - 0.5)
const direction = new Vec2

const canvas = new CanvasHandle(document.querySelector('#canvas'),
    Settings.width * Settings.tileSize, Settings.height * Settings.tileSize)

const keyboard = new Keyboard
keyboard.addEventListeners(document)

function update() {
    // Start point
    if (keyboard.state[Input.LEFT_A]) {
        startPoint.x -= Settings.speed
    }
    if (keyboard.state[Input.UP_W]) {
        startPoint.y -= Settings.speed
    }
    if (keyboard.state[Input.RIGHT_D]) {
        startPoint.x += Settings.speed
    }
    if (keyboard.state[Input.DOWN_S]) {
        startPoint.y += Settings.speed
    }

    // End point
    if (keyboard.state[Input.LEFT]) {
        endPoint.x -= Settings.speed
    }
    if (keyboard.state[Input.UP]) {
        endPoint.y -= Settings.speed
    }
    if (keyboard.state[Input.RIGHT]) {
        endPoint.x += Settings.speed
    }
    if (keyboard.state[Input.DOWN]) {
        endPoint.y += Settings.speed
    }
}

function paint() {
    const { con } = canvas

    con.clearRect(0, 0, canvas.width, canvas.height)

    for (let y = 0; y < Settings.height; ++y) {
        for (let x = 0; x < Settings.width; ++x) {
            tiles[y]![x] = false
        }
    }

    direction.copy(endPoint).subtract(startPoint)

    // DDA
    // @ts-expect-error Not all code paths return a value.
    const result = dda(startPoint, direction, function (x, y) {
        if (x < 0 || x >= Settings.width || y < 0 || y >= Settings.height) {
            return true // Out of bounds, stop
        }
        tiles[y]![x] = true
        if (x === Math.floor(endPoint.x) && y === Math.floor(endPoint.y)) {
            return true // Got to the end, stop
        }
    })

    // Tiles
    for (let y = 0; y < Settings.height; ++y) {
        for (let x = 0; x < Settings.width; ++x) {
            con.fillStyle = tiles[y]![x] ? '#fff' : '#000'
            con.fillRect(x * Settings.tileSize, y * Settings.tileSize, Settings.tileSize, Settings.tileSize)
        }
    }

    const angle = Math.atan2(direction.y, direction.x)
    const distance = Math.sqrt(startPoint.distanceSquared(endPoint))

    // Dotted line
    // Colors: https://lospec.com/palette-list/commodore-ted-plus-4-c16
    con.fillStyle = '#fca0bf'

    for (let n = 0; n < distance; n += Math.sqrt(0.125)) {
        const x = startPoint.x + n * Math.cos(angle)
        const y = startPoint.y + n * Math.sin(angle)
        con.fillRect(x * Settings.tileSize - 1, y * Settings.tileSize - 1, 2, 2)
    }

    // Start point
    con.fillStyle = '#82cfff'
    con.fillRect(startPoint.x * Settings.tileSize - 4, startPoint.y * Settings.tileSize - 4, 8, 8)

    // End point
    con.fillStyle = '#fcaf72'
    con.fillRect(endPoint.x * Settings.tileSize - 4, endPoint.y * Settings.tileSize - 4, 8, 8)

    // Tile intersection
    con.beginPath()
    con.arc(result.x * Settings.tileSize, result.y * Settings.tileSize, 4, 0, 2 * Math.PI)
    if (result.hitVertical) {
        con.fillStyle = '#fc91ff'
        con.fill()
    }
    else {
        con.strokeStyle = '#fc91ff'
        con.stroke()
    }
}

startMainloop(update, paint)
