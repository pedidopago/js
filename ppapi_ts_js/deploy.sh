#!/bin/bash

# Exit the script as soon as something fails.
set -e

npm run lint
npm run format
npm run build
npm publish --access=public