/** This file is part of natlab.
 * https://github.com/mvasilkov/natlab
 * @license MIT+Ethics | Copyright (c) 2022, 2023 Mark Vasilkov
 * See https://github.com/mvasilkov/natlab/blob/master/LICENSE
 */
'use strict'

import { ExtendedBool, ShortBool } from '../../node_modules/natlib/prelude.js'
import type { IState } from '../../node_modules/natlib/state'

export const enum Phase {
    INITIAL = 1, FLAPPING, DROPPING, FAILING, FAILED
}

interface State extends IState {
    spacePressed: ExtendedBool,
}

export const state: State = {
    phase: Phase.INITIAL,
    phaseTtl: 0,
    oldTtl: 0,
    spacePressed: ShortBool.FALSE,
}
