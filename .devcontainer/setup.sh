#!/usr/bin/env bash

set -euxo pipefail

corepack enable
asdf reshim
pnpm install --frozen-lockfile
pnpm nx run-many -t build
gu install native-image
pnpm run build:native
