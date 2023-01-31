/** This file is part of natlab.
 * https://github.com/mvasilkov/natlab
 * @license MIT+Ethics | Copyright (c) 2022, 2023 Mark Vasilkov
 * See https://github.com/mvasilkov/natlab/blob/master/LICENSE
 */
'use strict'

import { jest } from '@jest/globals'
import { permutations, slidingWindow } from '../../node_modules/natlib/itertools.js'

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

test('Permutations generator function (array of length 0)', () => {
  const array = []
  const expected = [[]]

  const actual = [...permutations(array)]
  expect(actual).toEqual(expected)
})

test('Permutations generator function (array of length 1)', () => {
  const array = [1]
  const expected = [[1]]

  const actual = [...permutations(array)]
  expect(actual).toEqual(expected)
})

test('Permutations generator function (array of length 2)', () => {
  const array = [1, 2]
  const expected = [[1, 2], [2, 1]]

  const actual = [...permutations(array)]
  expect(actual).toEqual(expected)
})

test('Permutations generator function (array of length 3)', () => {
  const array = [1, 2, 3]
  const expected = [
    [1, 2, 3],
    [1, 3, 2],
    [2, 1, 3],
    [2, 3, 1],
    [3, 1, 2],
    [3, 2, 1],
  ]

  const actual = [...permutations(array)]
  expect(actual).toEqual(expected)
})

test('Permutations generator function (array of length 4)', () => {
  const array = [1, 2, 3, 4]
  const expected = [
    [1, 2, 3, 4],
    [1, 2, 4, 3],
    [1, 3, 2, 4],
    [1, 3, 4, 2],
    [1, 4, 2, 3],
    [1, 4, 3, 2],
    [2, 1, 3, 4],
    [2, 1, 4, 3],
    [2, 3, 1, 4],
    [2, 3, 4, 1],
    [2, 4, 1, 3],
    [2, 4, 3, 1],
    [3, 1, 2, 4],
    [3, 1, 4, 2],
    [3, 2, 1, 4],
    [3, 2, 4, 1],
    [3, 4, 1, 2],
    [3, 4, 2, 1],
    [4, 1, 2, 3],
    [4, 1, 3, 2],
    [4, 2, 1, 3],
    [4, 2, 3, 1],
    [4, 3, 1, 2],
    [4, 3, 2, 1],
  ]

  const actual = [...permutations(array)]
  expect(actual).toEqual(expected)
})
