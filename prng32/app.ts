/* This file is part of natlab.
 * https://github.com/mvasilkov/natlab
 * MIT+Ethics License | Copyright (c) 2022 Mark Vasilkov
 * See https://github.com/mvasilkov/natlab/blob/master/LICENSE
 */
'use strict'

import { CanvasHandle } from '../node_modules/natlib/canvas/CanvasHandle.js'
import type { uint32_t } from '../node_modules/natlib/prelude.js'
import { Mulberry32 } from '../node_modules/natlib/prng/Mulberry32.js'
import { SplitMix32 } from '../node_modules/natlib/prng/SplitMix32.js'

const prngClassMap = {
    Mulberry32,
    SplitMix32,
}

type PrngId = keyof typeof prngClassMap

function getPropertyValue(property: string): number {
    return +getComputedStyle(document.documentElement)
        .getPropertyValue(property)
        .replace(/px$/, '')
}

const height = getPropertyValue('--canvas-height')
const width = getPropertyValue('--canvas-width')

const noiseCanvas = new CanvasHandle(document.querySelector('#noise'), width, height)
const distCanvas = new CanvasHandle(document.querySelector('#dist'), width, height)

export function noiseAndDist(prngId: PrngId, seed: uint32_t,
    noiseCanvas: CanvasHandle, distCanvas: CanvasHandle) {

    const r = new prngClassMap[prngId](seed)
    const d = Array(distCanvas.width).fill(0)

    function* getBytes() {
        while (true) {
            const n = r.randomUint32()

            ++d[n % distCanvas.width]

            yield n & 255
            yield (n >>> 8) & 255
            yield (n >>> 16) & 255
            yield (n >>> 24) & 255
        }
    }

    const bytes = getBytes()

    noiseCanvas.con.clearRect(0, 0, noiseCanvas.width, noiseCanvas.height)

    for (let y = 0; y < noiseCanvas.height; ++y) {
        for (let x = 0; x < noiseCanvas.width; ++x) {
            const b = bytes.next().value

            noiseCanvas.con.fillStyle = `rgb(${b},${b},${b})`
            noiseCanvas.con.fillRect(x, y, 1, 1)
        }
    }
}
