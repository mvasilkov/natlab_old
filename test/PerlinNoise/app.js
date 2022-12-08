/* This file is part of natlab.
 * https://github.com/mvasilkov/natlab
 * MIT+Ethics License | Copyright (c) 2022 Mark Vasilkov
 * See https://github.com/mvasilkov/natlab/blob/master/LICENSE
 */
'use strict'

import { spawn } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { PerlinNoise } from 'natlib/noise/PerlinNoise.js'
import p from './permutation.json' assert { type: 'json' }

const modulePath = fileURLToPath(import.meta.url)
const __dirname = dirname(modulePath)

function pythonPerlin(x, y, z) {
    const p = spawn('python', [join(__dirname, 'rosettacode.py'), x, y, z])
    return new Promise((resolve, reject) => {
        p.stdout.on('data', data => {
            resolve(parseFloat(data.toString('utf8')))
        })
        p.stderr.on('data', data => {
            reject(data.toString('utf8'))
        })
    })
}

const perlin = new PerlinNoise(p.concat(p))

async function run() {
}

run()
