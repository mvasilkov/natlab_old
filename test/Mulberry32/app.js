/* This file is part of natlab.
 * https://github.com/mvasilkov/natlab
 * MIT+Ethics License | Copyright (c) 2022 Mark Vasilkov
 * See https://github.com/mvasilkov/natlab/blob/master/LICENSE
 */
'use strict'

import { createRequire } from 'module'

import { Mulberry32 } from '../../node_modules/natlib/prng/Mulberry32.js'

const require = createRequire(import.meta.url)
const nativeMulberry32 = require('./build/Release/nativeMulberry32.node')

const initialState = 0

const r = new Mulberry32(initialState)

nativeMulberry32.setState(initialState)

for (let n = 0; n < 2 ** 32; ++n) {
    const a = r.randomUint32()
    const b = nativeMulberry32.getUint32()

    if (a !== b) {
        console.log(`!!! n=${n} a=${a} b=${b}`)
        break
    }

    if (n % 10_000_000 === 0) console.log(n)
}
