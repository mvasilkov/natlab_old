/** This file is part of natlab.
 * https://github.com/mvasilkov/natlab
 * @license MIT+Ethics | Copyright (c) 2022, 2023 Mark Vasilkov
 * See https://github.com/mvasilkov/natlab/blob/master/LICENSE
 */
'use strict'

import { jest } from '@jest/globals'
import { debounce } from '../../node_modules/natlib/scheduling/debounce.js'

jest.useFakeTimers()

describe('debounce', () => {
  const wait = 100
  let fn
  let debouncedFn

  beforeEach(() => {
    fn = jest.fn()
    debouncedFn = debounce(fn, wait)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call the provided function after the wait time has passed', () => {
    debouncedFn()
    debouncedFn()
    debouncedFn()

    expect(fn).toHaveBeenCalledTimes(0)

    jest.advanceTimersByTime(wait - 1)
    expect(fn).toHaveBeenCalledTimes(0)

    jest.advanceTimersByTime(1)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should call the provided function only once if multiple calls are made within the wait time', () => {
    debouncedFn()
    debouncedFn()
    debouncedFn()

    jest.advanceTimersByTime(wait)
    expect(fn).toHaveBeenCalledTimes(1)

    jest.advanceTimersByTime(wait)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should call the provided function only once if multiple calls are made within the wait time (2)', () => {
    debouncedFn()
    jest.advanceTimersByTime(wait - 1)
    debouncedFn()
    jest.advanceTimersByTime(wait - 1)
    debouncedFn()

    jest.advanceTimersByTime(wait)
    expect(fn).toHaveBeenCalledTimes(1)

    jest.advanceTimersByTime(wait)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should call the provided function with the initial arguments if multiple calls are made within the wait time', () => {
    debouncedFn('first call')
    debouncedFn('second call')
    debouncedFn('third call')

    jest.advanceTimersByTime(wait)
    expect(fn).toHaveBeenCalledWith('first call')
  })
})
