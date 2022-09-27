/* This file is part of natlib-lab.
 * https://github.com/mvasilkov/natlib-lab
 * MIT+Ethics License | Copyright (c) 2022 Mark Vasilkov
 * See https://github.com/mvasilkov/natlib-lab/blob/master/LICENSE
 */
'use strict'

import { smootherstep, smoothstep } from '../node_modules/natlib/interpolation.js'

const identity = (x: number) => x

type EasingFunction = {
    title: string,
    fn: (x: number) => number,
}

const easingFunctions: EasingFunction[] = [
    { title: 'lerp', fn: identity },
    { title: 'smoothstep', fn: smoothstep },
    { title: 'smootherstep', fn: smootherstep },
]

function getPropertyValue(property: string): number {
    return +getComputedStyle(document.documentElement)
        .getPropertyValue(property)
        .replace(/px$/, '')
}
