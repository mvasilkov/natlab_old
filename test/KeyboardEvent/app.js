/* This file is part of natlab.
 * https://github.com/mvasilkov/natlab
 * MIT+Ethics License | Copyright (c) 2022 Mark Vasilkov
 * See https://github.com/mvasilkov/natlab/blob/master/LICENSE
 */
'use strict'

import { keyboardEventCodes } from './keyboardEventCodes.js'

function hash(code) {
    return (code[0] ?? '') + (code[3] ?? '') + (code[5] ?? '')
}

const table = Object.create(null)

keyboardEventCodes.forEach(code => {
    const ch = hash(code)
    if (table[ch] === undefined) {
        table[ch] = [code]
    }
    else table[ch].push(code)
})

console.log('Collisions:')

for (const ch in table) {
    const codes = table[ch]
    if (codes.length > 1) {
        console.log(codes)
    }
}
