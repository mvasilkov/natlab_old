/* This file is part of natlab.
 * https://github.com/mvasilkov/natlab
 * MIT+Ethics License | Copyright (c) 2022 Mark Vasilkov
 * See https://github.com/mvasilkov/natlab/blob/master/LICENSE
 */
'use strict'

import { CanvasHandle } from '../node_modules/natlib/canvas/CanvasHandle.js'
import { Keyboard } from '../node_modules/natlib/controls/Keyboard.js'
import { startMainloop } from '../node_modules/natlib/scheduling/mainloop.js'
import { Polygon } from '../node_modules/natlib/verlet/objects/Polygon.js'
import { SatScene } from '../node_modules/natlib/verlet/SatScene.js'
import { WithPaintMethod } from '../node_modules/natlib/verlet/WithPaintMethod.js'
import { getPropertyValue } from '../shared/shared.js'

const height = getPropertyValue('--canvas-height')
const width = getPropertyValue('--canvas-width')

const canvas = new CanvasHandle(document.querySelector('#canvas'), width, height)

const keyboard = new Keyboard
keyboard.addEventListeners(document)

const PaintPolygon = WithPaintMethod(Polygon)

const scene = new SatScene(width, height, 12)

const player = new PaintPolygon(scene, 16, 0.5 * width, 0.5 * height, 48)

function update() {
    scene.update()
}

function render(t: number) {
    const { con } = canvas

    player.paint(con, t)
}

startMainloop(update, render)
