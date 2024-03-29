/** This file is part of natlab.
 * https://github.com/mvasilkov/natlab
 * @license MIT+Ethics | Copyright (c) 2022, 2023 Mark Vasilkov
 * See https://github.com/mvasilkov/natlab/blob/master/LICENSE
 */
'use strict'

import { CanvasHandle } from '../../node_modules/natlib/canvas/CanvasHandle.js'
import { Input, Keyboard } from '../../node_modules/natlib/controls/Keyboard.js'
import { Pointer } from '../../node_modules/natlib/controls/Pointer.js'
import { startMainloop } from '../../node_modules/natlib/scheduling/mainloop.js'
import { Polygon } from '../../node_modules/natlib/verlet/objects/Polygon.js'
import { SatScene } from '../../node_modules/natlib/verlet/SatScene.js'
import { WithPaintMethod } from '../../node_modules/natlib/verlet/WithPaintMethod.js'
import { WithPointerControls } from '../../node_modules/natlib/verlet/WithPointerControls.js'
import { getPropertyValue } from '../shared/shared.js'

const enum Settings {
    backgroundColor = '#000',
    gravity = 0,
    gravity2 = 0.9,
    viscosity = 0.99,
    stiffness = 0.2,
    mass = 1,
    groundFriction = 0.9,
}

const height = getPropertyValue('--canvas-height')
const width = getPropertyValue('--canvas-width')

const canvas = new CanvasHandle(document.querySelector('#canvas'), width, height)

const pointer = new Pointer(canvas.canvas)
pointer.addEventListeners(document)

const keyboard = new Keyboard
keyboard.addEventListeners(document)

const PaintPolygon = WithPaintMethod(Polygon)
const PointerScene = WithPointerControls(SatScene, pointer, 4)

const scene = new PointerScene(width, height, 16)

const objects = Array.from({ length: 4 }, (_, n) => {
    const N = 0.5 * (n ** 2 + n + 6)
    const x = 0.2 * width * (n + 1)
    const y = 0.5 * height
    const rotate = Math.PI * (1 / N + 1)
    return new PaintPolygon(scene, N, x, y, 48, rotate, Settings.gravity, Settings.viscosity,
        Settings.stiffness, Settings.mass, Settings.groundFriction)
})

let spacePressed = keyboard.state[Input.SPACE]

function update() {
    if (keyboard.state[Input.SPACE] && !spacePressed) {
        const gravity = scene.vertices[0]!.gravity === Settings.gravity ?
            Settings.gravity2 : Settings.gravity
        scene.vertices.forEach(v => v.gravity = gravity)
    }
    spacePressed = keyboard.state[Input.SPACE]

    scene.update()
}

function paint(t: number) {
    const { con } = canvas

    con.fillStyle = Settings.backgroundColor
    con.fillRect(0, 0, width, height)

    objects.forEach(obj => obj.paint(con, t))
}

startMainloop(update, paint)
