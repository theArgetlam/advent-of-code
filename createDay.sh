#!/bin/bash

if [ "$#" != 2 ]; then
    echo "We need year and day separated by a blank space as arguments"
else
    year=$1
    day=$2

    # creating folders before copying templates
    if [ ! -d "${year}/${day}" ]; then
        mkdir -p "${year}/${day}"
    fi

    cp dayTemplate/* "${year}/${day}"
fi
