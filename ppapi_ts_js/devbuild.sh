#!/bin/bash

set -e

npm run lint
npm run format
npm run build

XPATH=""

if [[ $# -gt 0 ]]; then
    XPATH=$1
fi

if [[ -e 'export_path.txt' ]]; then
    XPATH=$(cat export_path.txt)
fi

if [[ -z $XPATH ]]; then
    echo "path not set"
    exit 1
fi

mkdir -p $XPATH/@pedidopago/api
cp package.json $XPATH/\@pedidopago/api/package.json
cp -vr lib $XPATH/\@pedidopago/api

echo "$XPATH/@pedidopago/api/package.json"
echo "$XPATH/@pedidopago/api/lib"
echo "success"