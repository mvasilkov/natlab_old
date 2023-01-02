/** This file is part of natlab.
 * https://github.com/mvasilkov/natlab
 * @license MIT+Ethics | Copyright (c) 2022, 2023 Mark Vasilkov
 * See https://github.com/mvasilkov/natlab/blob/master/LICENSE
 */
'use strict'

import { CanvasHandle } from '../node_modules/natlib/canvas/CanvasHandle.js'
import type { uint32_t } from '../node_modules/natlib/prelude.js'
import { Mulberry32 } from '../node_modules/natlib/prng/Mulberry32.js'
import { shuffle } from '../node_modules/natlib/prng/prng.js'
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
const shuffleCanvas = new CanvasHandle(document.querySelector('#shuffle'), width, height)

function noiseAndDist(prngId: PrngId, seed: uint32_t,
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

    // More points for distribution
    for (let n = 0; n < noiseCanvas.height * noiseCanvas.width; ++n) {
        bytes.next()
    }

    distCanvas.con.clearRect(0, 0, distCanvas.width, distCanvas.height)

    distCanvas.con.fillStyle = '#fff'

    for (let x = 0; x < distCanvas.width; ++x) {
        distCanvas.con.fillRect(x, distCanvas.height - d[x], 1, d[x])
    }
}

function fisherYates(prngId: PrngId, seed: uint32_t,
    shuffleCanvas: CanvasHandle) {

    const indices: { [p: string]: number } = Object.create(null)

    function p(arr: number[], cur: number[]) {
        if (arr.length === 0) {
            indices['' + cur] = Object.keys(indices).length
            return
        }
        arr.forEach((value, index) => {
            const before = arr.slice(0, index)
            const after = arr.slice(index + 1)
            p(before.concat(after), cur.concat([value]))
        })
    }

    function range(n: number): number[] {
        return Array.from(Array(n).keys())
    }

    p(range(5), [])

    const pcount = Object.keys(indices).length
    const results = Array<number>(pcount).fill(0)
    const r = new prngClassMap[prngId](seed)
    const width = (shuffleCanvas.width / pcount) >>> 0
    const padding = (shuffleCanvas.width % pcount) >>> 1

    for (let n = 0; n < 0.5 * shuffleCanvas.height * pcount; ++n) {
        ++results[indices['' + shuffle(r, range(5))]!]
    }

    shuffleCanvas.con.clearRect(0, 0, shuffleCanvas.width, shuffleCanvas.height)

    // Padding
    shuffleCanvas.con.fillStyle = '#808080'

    shuffleCanvas.con.fillRect(0, 0, padding - 1, shuffleCanvas.height)
    shuffleCanvas.con.fillRect(shuffleCanvas.width, 0, -padding, shuffleCanvas.height)

    shuffleCanvas.con.fillStyle = '#fff'

    for (let n = 0; n < pcount; ++n) {
        shuffleCanvas.con.fillRect(n * width + padding,
            shuffleCanvas.height - results[n]!, width - 1, results[n]!)
    }
}

const seedInput: HTMLInputElement = document.querySelector('#seed')!
const startButton: HTMLButtonElement = document.querySelector('#start')!

startButton.addEventListener('click', function () {
    const prng = document.querySelector<HTMLInputElement>('input[name="prng"]:checked')!.value
    const seed = +seedInput.value

    noiseAndDist(<PrngId>prng, seed, noiseCanvas, distCanvas)
    // Instead of `setImmediate()`
    requestAnimationFrame(function () {
        fisherYates(<PrngId>prng, seed, shuffleCanvas)
    })
})
