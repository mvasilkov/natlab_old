/** This file is part of natlab.
 * https://github.com/mvasilkov/natlab
 * @license MIT+Ethics | Copyright (c) 2022, 2023 Mark Vasilkov
 * See https://github.com/mvasilkov/natlab/blob/master/LICENSE
 */
'use strict'

import { jest } from '@jest/globals'
import { slidingWindow } from '../../node_modules/natlib/itertools.js'

test('Sliding window generator function', () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const size = 3
  const expected = [
    [1, 2, 3],
    [2, 3, 4],
    [3, 4, 5],
    [4, 5, 6],
    [5, 6, 7],
    [6, 7, 8],
    [7, 8, 9],
  ]

  const actual = [...slidingWindow(array, size)]
  expect(actual).toEqual(expected)
})

test('Sliding window generator function with larger window size', () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const size = 5
  const expected = [
    [1, 2, 3, 4, 5],
    [2, 3, 4, 5, 6],
    [3, 4, 5, 6, 7],
    [4, 5, 6, 7, 8],
    [5, 6, 7, 8, 9],
  ]

  const actual = [...slidingWindow(array, size)]
  expect(actual).toEqual(expected)
})

test('Sliding window generator function with window size equal to array length', () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const size = array.length
  const expected = [[1, 2, 3, 4, 5, 6, 7, 8, 9]]

  const actual = [...slidingWindow(array, size)]
  expect(actual).toEqual(expected)
})

test('Sliding window generator function with window size greater than array length', () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const size = array.length + 1
  const expected = []

  const actual = [...slidingWindow(array, size)]
  expect(actual).toEqual(expected)
})
