/* This file is part of natlab.
 * https://github.com/mvasilkov/natlab
 * MIT+Ethics License | Copyright (c) 2022 Mark Vasilkov
 * See https://github.com/mvasilkov/natlab/blob/master/LICENSE
 */
'use strict'

import { CanvasHandle } from '../node_modules/natlib/canvas/CanvasHandle.js'
import { startMainloop } from '../node_modules/natlib/scheduling/mainloop.js'
import { Scene } from '../node_modules/natlib/verlet/Scene.js'

const enum Settings {
    height = 540,
    width = 960,
}

const canvas = new CanvasHandle(document.querySelector('#canvas'),
    Settings.width, Settings.height)

const scene = new Scene(Settings.width, Settings.height)

function update() {
}

function paint(t: number) {
}

startMainloop(update, paint)
