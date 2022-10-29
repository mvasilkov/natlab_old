/* This file is part of natlab.
 * https://github.com/mvasilkov/natlab
 * MIT+Ethics License | Copyright (c) 2022 Mark Vasilkov
 * See https://github.com/mvasilkov/natlab/blob/master/LICENSE
 */
'use strict'

import { CanvasHandle } from '../node_modules/natlib/canvas/CanvasHandle.js'
import { startMainloop } from '../node_modules/natlib/scheduling/mainloop.js'
import { Vec2 } from '../node_modules/natlib/Vec2.js'

const enum Settings {
    height = 10,
    width = 10,
    tileSize = 32,
}

const tiles = Array.from({ length: Settings.height },
    () => Array.from({ length: Settings.width }, () => false))

const startPoint = new Vec2(0.5, 0.5)
const endPoint = new Vec2(Settings.width - 0.5, Settings.height - 0.5)

const canvas = new CanvasHandle(document.querySelector('#canvas'),
    Settings.width * Settings.tileSize, Settings.height * Settings.tileSize)

function update() {
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

    // Start point
    con.fillStyle = '#fb3b64'
    con.fillRect(startPoint.x * Settings.tileSize - 5, startPoint.y * Settings.tileSize - 5, 10, 10)

    // End point
    con.fillStyle = '#b3e363'
    con.fillRect(endPoint.x * Settings.tileSize - 5, endPoint.y * Settings.tileSize - 5, 10, 10)
}

startMainloop(update, paint)
