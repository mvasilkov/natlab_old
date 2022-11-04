/* This file is part of natlab.
 * https://github.com/mvasilkov/natlab
 * MIT+Ethics License | Copyright (c) 2022 Mark Vasilkov
 * See https://github.com/mvasilkov/natlab/blob/master/LICENSE
 */
'use strict'

import { CanvasHandle } from '../node_modules/natlib/canvas/CanvasHandle.js'
import { Input, Keyboard } from '../node_modules/natlib/controls/Keyboard.js'
import { dda, DdaIntersection } from '../node_modules/natlib/dda.js'
import { startMainloop } from '../node_modules/natlib/scheduling/mainloop.js'
import { Vec2 } from '../node_modules/natlib/Vec2.js'

const enum Settings {
    height = 10,
    width = 10,
    tileSize = 32,
    speed = 0.05,
    // Colors: https://lospec.com/palette-list/twilioquest-76
    startColor = '#b3e363',
    endColor = '#d59ff4',
    lineColor = '#fb3b64',
    intersectionColor = '#fb3b64',
}

const tiles = Array.from({ length: <number>Settings.height },
    () => Array.from({ length: <number>Settings.width }, () => false))

const startPoint = new Vec2(0.5, 0.5)
const endPoint = new Vec2(Settings.width - 0.5, Settings.height - 0.5)
const direction = new Vec2

function updateTiles(): DdaIntersection {
    for (let y = 0; y < Settings.height; ++y) {
        for (let x = 0; x < Settings.width; ++x) {
            tiles[y]![x] = false
        }
    }

    direction.copy(endPoint).subtract(startPoint).normalize()

    // DDA
    // @ts-expect-error Not all code paths return a value.
    return dda(startPoint, direction, function (x, y) {
        if (x < 0 || x >= Settings.width || y < 0 || y >= Settings.height) {
            return true // Out of bounds, stop
        }
        tiles[y]![x] = true
        if (x === Math.floor(endPoint.x) && y === Math.floor(endPoint.y)) {
            return true // Got to the end, stop
        }
    })
}

let intersection = updateTiles()

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

    // Update tiles
    intersection = updateTiles()
}

function paint() {
    const { con } = canvas

    con.clearRect(0, 0, canvas.width, canvas.height)

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
    con.fillStyle = Settings.lineColor

    const step = Math.sqrt(0.125)
    for (let n = intersection.hitDistance! % step; n < distance; n += step) {
        const x = startPoint.x + n * Math.cos(angle)
        const y = startPoint.y + n * Math.sin(angle)
        con.fillRect(x * Settings.tileSize - 1, y * Settings.tileSize - 1, 2, 2)
    }

    // Start point
    con.fillStyle = Settings.startColor
    con.fillRect(startPoint.x * Settings.tileSize - 4, startPoint.y * Settings.tileSize - 4, 8, 8)

    // End point
    con.fillStyle = Settings.endColor
    con.fillRect(endPoint.x * Settings.tileSize - 4, endPoint.y * Settings.tileSize - 4, 8, 8)

    // Tile intersection
    con.beginPath()
    con.arc(intersection.x * Settings.tileSize, intersection.y * Settings.tileSize, 4, 0, 2 * Math.PI)
    if (intersection.hitVertical) {
        con.fillStyle = Settings.intersectionColor
        con.fill()
    }
    else {
        con.strokeStyle = Settings.intersectionColor
        con.stroke()
    }
}

startMainloop(update, paint)
