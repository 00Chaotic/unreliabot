#!/bin/sh

# Setup script for docker image 
if [ ${NODE_ENV} = "DEV" ]; then 
    npm install --from-lock-file --prefx=../
else
    npm ci --omit=dev --prefx=../
fi
