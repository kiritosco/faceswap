# faceswap API

## What is it?
- This is the API which powers the frontend - its role is to perform the face swaps

## Prerequisites
You'll need to have the following software installed:
- NodeJS
- Yarn

You'll also need to have a Redis cluster available (on `localhost` through Docker or through other means)

The API has a dependency on opencv4nodejs, which itself has a dependency on OpenCV being installed. 
Please ensure your system meets the requirements and dependencies of OpenCV.

## How to run it
1) Ensure you are in the `api/` directory
2) Run `yarn` to get the dependencies (you only need to run this once)
3) Set the following environment variables
    -  `FRONTEND_URL` -> the fully qualified address of the frontend e.g. `http://localhost:3001`
        - This is needed for CORS purposes.
    -   `REDIS_HOST` -> the hostname where the Redis instance is running e.g. `localhost`
    -   `REDIS_PORT` -> the port the Redis instance is running on e.g. `6379`
    -   `REDIS_PASSWORD` -> the password needed to authenticate with the Redis instance (if applicable)
4) Run `yarn run dev`