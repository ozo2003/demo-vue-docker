#!/usr/bin/env bash

cd docker || exit

PLATFORM=$(uname -m)

case $PLATFORM in
    x86_64)
        ARCH=amd64
        ;;
    arm64 | aarch64)
        ARCH=arm64
        ;;
    *)
        exit
        ;;
esac

export ARCH

docker compose -f docker-compose.yml -p demo_dev down

cd ..
