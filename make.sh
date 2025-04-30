#!/bin/sh

case $1 in

run-dev)
  set -a
  source .dev.env
  npm run docs:dev --host local.challengecoin.us
  ;;

install)
  npm install globals typescript
  npm install globals @eslint/js @eslint/eslintrc -D
  npm install --force # --frozen-lockfile
  mkdir -p dist/
  ;;

lint)
  npm run audit:check
  npm run lint $2
  ;;

tests)
  npm run unit
  ;;

build)
  BRANCH_NAME=`git rev-parse --abbrev-ref HEAD`
  npm run docs:build --mode $BRANCH_NAME
  cp -rf docs/public/* .vitepress/dist/
  ;;

build-master)
  set -a
  . .master.env
  BRANCH_NAME=`git rev-parse --abbrev-ref HEAD`
  npm run docs:build --mode $BRANCH_NAME
  cp -rf docs/public/* .vitepress/dist/
  ;;

deploy-master)
  BRANCH_NAME=`git rev-parse --abbrev-ref HEAD`
  SHORT_SHA=`git rev-parse --short HEAD`
  echo $BRANCH_NAME, $SHORT_SHA
  set -a
  source .master.env
  SHORT_SHA=$SHORT_SHA BRANCH_NAME=$BRANCH_NAME npm run docs:build --mode production
  cp -rf docs/public/* .vitepress/dist/
  # npm run add --global wrangler
  wrangler pages deploy .vitepress/dist/ --project-name="challengecoin-us" --commit-dirty true --branch main --commit-hash $SHORT_SHA --commit-message $SHORT_SHA
  ;;

help)
  cat make.sh | grep "^[a-z-]*)"
  ;;

*)
  echo "unknown $1, try help"
  ;;

esac
