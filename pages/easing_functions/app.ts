/** This file is part of natlab.
 * https://github.com/mvasilkov/natlab
 * @license MIT+Ethics | Copyright (c) 2022, 2023 Mark Vasilkov
 * See https://github.com/mvasilkov/natlab/blob/master/LICENSE
 */
'use strict'

import { CanvasHandle } from '../node_modules/natlib/canvas/CanvasHandle.js'
import { textCapsule } from '../node_modules/natlib/canvas/text.js'
import type { EasingFunction } from '../node_modules/natlib/interpolation'
import * as int from '../node_modules/natlib/interpolation.js'
import { getPropertyValue } from '../shared/shared.js'

const enum Settings {
    padding = 5,
    resolution = 128,
    // Colors: https://lospec.com/palette-list/twilioquest-76
    backgroundColor = '#f9e6cf',
    lineColor = '#7b8382',
    titleColor = '#7b8382',
    functionColor = '#f22f46',
}

const identity: EasingFunction = (x: number) => x

interface IEasingFunction {
    title: string,
    fn: EasingFunction,
}

const easingFunctions: IEasingFunction[] = [
    { title: 'identity', fn: identity },
    { title: 'smoothstep', fn: int.smoothstep },
    { title: 'smootherstep', fn: int.smootherstep },
    { title: 'easeInQuad', fn: int.easeInQuad },
    { title: 'easeOutQuad', fn: int.easeOutQuad },
    { title: 'easeInOutQuad', fn: int.easeInOutQuad },
    { title: 'easeInCubic', fn: int.easeInCubic },
    { title: 'easeOutCubic', fn: int.easeOutCubic },
    { title: 'easeInOutCubic', fn: int.easeInOutCubic },
    { title: 'easeInSine', fn: int.easeInSine },
    { title: 'easeOutSine', fn: int.easeOutSine },
    { title: 'easeInOutSine', fn: int.easeInOutSine },
]

const height = getPropertyValue('--canvas-height')
const width = getPropertyValue('--canvas-width')
const titleLeft = 0.5 * width
const titleTop = 0.5 * (height + width)
const size = width - Settings.padding - Settings.padding
const fontWeight = devicePixelRatio < 2 ? 400 : 300

function paintEasingFunction({ title, fn }: IEasingFunction) {
    const ch = new CanvasHandle(null, width, height, 2, con => {
        con.fillStyle = Settings.backgroundColor
        con.fillRect(0, 0, width, height)

        con.textAlign = 'center'
        con.textBaseline = 'middle'
        const path = textCapsule(con, titleLeft, titleTop, fontWeight + ' 16', title, 8, 12)

        con.strokeStyle = Settings.titleColor
        con.stroke(path)

        con.fillStyle = Settings.titleColor
        con.fillText(title, titleLeft, titleTop)

        con.translate(0, width)
        con.scale(1, -1)
        con.translate(Settings.padding + 0.5, Settings.padding + 0.5)

        con.beginPath()
        con.moveTo(0, 0)
        con.lineTo(0, size)
        con.moveTo(0, 0)
        con.lineTo(size, 0)

        con.strokeStyle = Settings.lineColor
        con.stroke()

        con.beginPath()
        con.moveTo(6, 6)
        con.lineTo(size, size)

        con.setLineDash([9, 9])
        con.stroke()
        con.setLineDash([])

        con.beginPath()
        con.moveTo(0, 0)

        for (let n = 0; n < Settings.resolution; ++n) {
            const t = n / Settings.resolution
            con.lineTo(t * size, fn(t) * size)
        }

        con.lineTo(size, size)

        con.lineWidth = 2
        con.strokeStyle = Settings.functionColor
        con.stroke()
    })

    document.getElementById('content')!.appendChild(ch.canvas)
}

easingFunctions.forEach(paintEasingFunction)
