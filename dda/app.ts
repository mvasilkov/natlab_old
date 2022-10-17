/* This file is part of natlab.
 * https://github.com/mvasilkov/natlab
 * MIT+Ethics License | Copyright (c) 2022 Mark Vasilkov
 * See https://github.com/mvasilkov/natlab/blob/master/LICENSE
 */
'use strict'

import { CanvasHandle } from '../node_modules/natlib/canvas/CanvasHandle.js'
import { startMainloop } from '../node_modules/natlib/scheduling/mainloop.js'

const enum Settings {
    height = 10,
    width = 10,
    tileSize = 32,
}

const tiles = Array.from({ length: Settings.height },
    () => Array.from({ length: Settings.width }, () => false))

const canvas = new CanvasHandle(document.querySelector('#canvas'),
    Settings.width * Settings.tileSize, Settings.height * Settings.tileSize)

function update() {
}

function paint() {
    const { con } = canvas

    con.clearRect(0, 0, canvas.width, canvas.height)
}

startMainloop(update, paint)
