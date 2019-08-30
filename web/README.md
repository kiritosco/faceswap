# faceswap website frontend 

## What is it?
- This is a frontend interface to the API - its role is to pass photos to the API and display the result

## Prerequisites
You'll need to have the following software installed:
- NodeJS
- Yarn

## How to run it
1) Ensure you are in the `web/` directory
2) Run `yarn` to get the dependencies (you only need to run this once)
3) Set the environment variable `REACT_APP_API_URL` to be the fully qualified address of the API
    - For macOS and Linux, the command is `export REACT_APP_API_URL=<ADDRESS INCLUDING http:// AND :PORT>`
4) Run `yarn start`