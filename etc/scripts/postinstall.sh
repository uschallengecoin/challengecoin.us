#!/usr/bin/env bash

if [ ! -d ".git" ]
then
    echo "It's not a git repo, please run git init"
    exit 1
fi

mkdir -p .git/hooks

 echo "update submodules"
git submodule update --init

 echo "set up pre-commit hook and make.sh file"
cp etc/hooks/* .git/hooks/
chmod +x .git/hooks/*
