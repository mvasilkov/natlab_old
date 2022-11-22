/* This file is part of natlab.
 * https://github.com/mvasilkov/natlab
 * MIT+Ethics License | Copyright (c) 2022 Mark Vasilkov
 * See https://github.com/mvasilkov/natlab/blob/master/LICENSE
 */
'use strict'

import { CanvasHandle } from '../node_modules/natlib/canvas/CanvasHandle.js'
import { Keyboard } from '../node_modules/natlib/controls/Keyboard.js'
import { startMainloop } from '../node_modules/natlib/scheduling/mainloop.js'
import { Scene } from '../node_modules/natlib/verlet/Scene.js'
import { getPropertyValue } from '../shared/shared.js'

const enum Settings {
    backgroundColor = '#000',
}

const height = getPropertyValue('--canvas-height')
const width = getPropertyValue('--canvas-width')

const scene = new Scene(width, height)

const canvas = new CanvasHandle(document.querySelector('#canvas'), width, height)

const keyboard = new Keyboard
keyboard.addEventListeners(document)

function update() {
}

function paint(t: number) {
    const { con } = canvas

    con.fillStyle = Settings.backgroundColor
    con.fillRect(0, 0, width, height)
}

startMainloop(update, paint)
