/* This file is part of natlab.
 * https://github.com/mvasilkov/natlab
 * MIT+Ethics License | Copyright (c) 2022 Mark Vasilkov
 * See https://github.com/mvasilkov/natlab/blob/master/LICENSE
 */
'use strict'

import { PerlinNoise } from 'natlib/noise/PerlinNoise.js'
import p from './permutation.json' assert { type: 'json' }

const perlin = new PerlinNoise(p.concat(p))
