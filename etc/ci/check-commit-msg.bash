#!/bin/bash

if [[ ${BRANCH_NAME} = "" ]]; then
    BRANCH_NAME=$(git branch --show-current)
fi

COMMIT_MSG=$(git show -s --format='%s')
COMMIT_FULL_MSG=$(git show -s --format='%b')

BRANCH_REGEX="((ci|doc|feat|fix|refactor|lint|test)/[-a-zA-Z]+/[0-9]+)|(dev|stage|master)"

if [[ $(echo "$BRANCH_NAME" | grep -Eo "dev|stage|master") != "" ]]; then
    exit 0
fi

if [[ $(echo "$BRANCH_NAME" | grep -Eo "${BRANCH_REGEX}") = "" ]]; then
    echo "ERORR: Invalid branch name!!!"
    exit 1
fi

IFS='/'
read -a TASK <<< "$BRANCH_NAME"
TASK_ID=${TASK[2]}

COMMIT_LINK_REGEX="webdevelop-pro/invest.webdevelop.pro(#|/issues/)${TASK_ID}"

if [[ $(echo "$COMMIT_MSG" | grep -Eo "${COMMIT_LINK_REGEX}") = "" ]]; then
    echo "ERORR: Link to the ticket not found in commit message!!!"
    exit 1
fi

