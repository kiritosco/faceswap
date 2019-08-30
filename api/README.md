# faceswap API

## What is it?
- This is the API which powers the frontend - its role is to perform the face swaps

## Prerequisites
You'll need to have the following software installed:
- NodeJS
- Yarn

The API has a dependency on opencv4nodejs, which itself has a dependency on OpenCV being installed. 
Please ensure your system meets the requirements and dependencies of OpenCV.

## How to run it
1) Ensure you are in the `api/` directory
2) Run `yarn` to get the dependencies (you only need to run this once)
3) Set the environment variable `FRONTEND_URL` to be the fully qualified address of the frontend. 
This is needed for CORS purposes.
    - For macOS and Linux, the command is `export FRONTEND_URL=<ADDRESS INCLUDING http:// AND :PORT>`
4) Run `yarn run dev`