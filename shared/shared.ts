/* This file is part of natlab.
 * https://github.com/mvasilkov/natlab
 * MIT+Ethics License | Copyright (c) 2022 Mark Vasilkov
 * See https://github.com/mvasilkov/natlab/blob/master/LICENSE
 */
'use strict'

export function getPropertyValue(property: string): number {
    return +getComputedStyle(document.documentElement)
        .getPropertyValue(property)
        .replace(/px$/, '')
}
