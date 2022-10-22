/* This file is part of natlab.
 * https://github.com/mvasilkov/natlab
 * MIT+Ethics License | Copyright (c) 2022 Mark Vasilkov
 * See https://github.com/mvasilkov/natlab/blob/master/LICENSE
 */
'use strict'

import { Mulberry32 } from '../node_modules/natlib/prng/Mulberry32.js'
import { SplitMix32 } from '../node_modules/natlib/prng/SplitMix32.js'

const prngClassMap = {
    Mulberry32,
    SplitMix32,
}

type PrngId = keyof typeof prngClassMap
