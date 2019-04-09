#!/usr/bin/env bash

set -e

pushd backend
./gradlew clean build
popd

pushd frontend
yarn install
yarn test:unit
popd

./gradlew e2e

git push

