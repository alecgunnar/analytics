#!/usr/bin/env bash

set -e

pushd backend
./gradlew build
popd

pushd frontend
yarn install
yarn test:unit
popd

git push

