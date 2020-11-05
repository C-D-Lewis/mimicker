#!/usr/bin/env bash

set -eu

FUNCTION_NAME=$1
REGION=us-east-1

rm -rf build

mkdir -p build
zip -r9 build/bundle.zip quotes.txt index.js node_modules

aws lambda update-function-code --function-name $FUNCTION_NAME --zip-file fileb://build/bundle.zip  --region $REGION

rm -rf build
