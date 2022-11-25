#!/bin/bash
set -eo pipefail

# Clean
git clean -fqx **/app.*

# Build
node_modules/.bin/tsc || true

for app in */
do
    app="${app%/}"
    [ ! -f "$app/app.js" ] && continue
    echo
    echo "Bundle $app"

    # Bundle
    node_modules/.bin/rollup -f iife -o "$app/app.bun.js" "$app/app.js"

    # Optimize
    node_modules/.bin/terser -cmo "$app/app.opt.js" "$app/app.bun.js"
    size_opt=$(stat -f %z "$app/app.opt.js")

    # Package
    zip -j9 "$app/app.zip" "$app/app.opt.js"
    size_zip=$(stat -f %z "$app/app.zip")
    # brew install advancecomp
    advzip -z4 "$app/app.zip"
    size_advzip=$(stat -f %z "$app/app.zip")

    # Report
    echo "$app/app.opt.js $size_opt"
    echo "$app/app.zip (OS zip) $size_zip"
    echo "$app/app.zip (advzip) $size_advzip"
done
