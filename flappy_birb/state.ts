/** This file is part of natlab.
 * https://github.com/mvasilkov/natlab
 * @license MIT+Ethics | Copyright (c) 2022, 2023 Mark Vasilkov
 * See https://github.com/mvasilkov/natlab/blob/master/LICENSE
 */
'use strict'

export const enum Phase {
    INITIAL, FLAPPING, DROPPING, FAILING, FAILED
}

interface State {
    phase: Phase,
    /** Phase progress */
    progress: number,
    oldProgress: number,
    spacePressed: boolean | undefined,
}

export const state: State = {
    phase: Phase.INITIAL,
    progress: 0,
    oldProgress: 0,
    spacePressed: false,
}

export function enterPhase(phase: Phase, initialProgress = 0) {
    state.phase = phase
    state.progress = state.oldProgress = initialProgress
}
