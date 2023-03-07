/** This file is part of natlab.
 * https://github.com/mvasilkov/natlab
 * @license MIT+Ethics | Copyright (c) 2022, 2023 Mark Vasilkov
 * See https://github.com/mvasilkov/natlab/blob/master/LICENSE
 */
'use strict'

import { CanvasHandle } from '../node_modules/natlib/canvas/CanvasHandle.js'
import { Input, Keyboard } from '../node_modules/natlib/controls/Keyboard.js'
import { startMainloop } from '../node_modules/natlib/scheduling/mainloop.js'
import { enterPhase, updatePhase } from '../node_modules/natlib/state.js'
import { Polygon } from '../node_modules/natlib/verlet/objects/Polygon.js'
import { SatScene } from '../node_modules/natlib/verlet/SatScene.js'
import { WithPaintMethod } from '../node_modules/natlib/verlet/WithPaintMethod.js'
import { getPropertyValue } from '../shared/shared.js'
import { Phase, state } from './state.js'

const enum Settings {
    backgroundColor = '#000',
}

const height = getPropertyValue('--canvas-height')
const width = getPropertyValue('--canvas-width')

const canvas = new CanvasHandle(document.querySelector('#canvas'), width, height)

const keyboard = new Keyboard
keyboard.addEventListeners(document)

const PaintPolygon = WithPaintMethod(Polygon)

const scene = new SatScene(width, height, 12)

const player = new PaintPolygon(scene, 16, 0.5 * width, 0.5 * height, 48)

function update() {
    updatePhase(state, [, , Phase.DROPPING])

    let flap = keyboard.state[Input.SPACE] && !state.spacePressed
    state.spacePressed = keyboard.state[Input.SPACE]

    switch (state.phase) {
        // @ts-expect-error Fallthrough case in switch
        case Phase.INITIAL:
            if (flap) {
                enterPhase(state, Phase.FLAPPING)
            }
            else break

        case Phase.FLAPPING:
            break

        case Phase.DROPPING:
            break

        case Phase.FAILING:
            break

        case Phase.FAILED:
    }

    scene.update()
}

function render(t: number) {
    const { con } = canvas

    con.fillStyle = Settings.backgroundColor
    con.fillRect(0, 0, width, height)

    player.paint(con, t)
}

startMainloop(update, render)
