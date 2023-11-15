#!/usr/bin/env bash
set -eEuo pipefail

#
#
#

FILES="$(node -e "process.stdout.write(require('node:fs').readdirSync('./', { recursive: true }).filter((e) => {return e.endsWith('.test.ts') && !e.startsWith('node_modules');}).sort().join(' '));")"

set -x
node --require ts-node/register --test ${FILES}
