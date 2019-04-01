#!/usr/bin/env bash

set -e

pushd backend
./gradlew build
popd

pushd frontend
yarn install
yarn test:unit
yarn test:e2e
popd

git push

