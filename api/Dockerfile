#############################
#        BUILD OPENCV       #
#############################
FROM alpine:3.10 AS opencv-builder

RUN apk add --update --no-cache ca-certificates git \
    build-base musl-dev alpine-sdk cmake clang clang-dev \
    make gcc g++ libc-dev linux-headers wget

RUN mkdir /tmp/opencv
WORKDIR /tmp/opencv
RUN wget -O opencv.zip https://github.com/opencv/opencv/archive/3.4.1.zip
RUN unzip opencv.zip
RUN wget -O opencv_contrib.zip https://github.com/opencv/opencv_contrib/archive/3.4.1.zip
RUN unzip opencv_contrib.zip
RUN mkdir /tmp/opencv/opencv-3.4.1/build

WORKDIR /tmp/opencv/opencv-3.4.1/build
RUN cmake -D CMAKE_BUILD_TYPE=RELEASE -D CMAKE_INSTALL_PREFIX=/usr/local \
    -D OPENCV_EXTRA_MODULES_PATH=/tmp/opencv/opencv_contrib-3.4.1/modules -D BUILD_DOCS=OFF BUILD_EXAMPLES=OFF \
    -D BUILD_TESTS=OFF -D BUILD_PERF_TESTS=OFF -D BUILD_opencv_java=OFF -D BUILD_opencv_python=OFF \
    -D BUILD_opencv_python2=OFF -D BUILD_opencv_python3=OFF ..
RUN make -j4
RUN make install

RUN rm -rf /tmp/opencv

#############################
#     BUILD MICROSERVICE    #
#############################
FROM node:12.9-alpine AS ms-builder

ARG OPENCV4NODEJS_DISABLE_AUTOBUILD=1

## Copy files
COPY server .
COPY package.json .

## Install microservice dependencies and build code
RUN yarn --silent
RUN yarn build --silent

#############################
# BUILD RUNTIME ENVIRONMENT #
#############################
FROM node:12.9-alpine

# Copy OpenCV files
COPY --from=opencv-builder /usr/local/lib /usr/local/lib
COPY --from=opencv-builder /usr/local/lib64 /usr/local/lib64
COPY --from=opencv-builder /usr/local/lib64/pkgconfig /usr/local/lib64/pkgconfig
COPY --from=opencv-builder /usr/local/include/opencv /usr/local/include/opencv
COPY --from=opencv-builder /usr/local/include/opencv2 /usr/local/include/opencv2

# Set OpenCV environment variables
ENV PKG_CONFIG_PATH /usr/local/lib64/pkgconfig
ENV LD_LIBRARY_PATH /usr/local/lib64
ENV CGO_CPPFLAGS -I/usr/local/include
ENV CGO_CXXFLAGS "--std=c++1z"
ENV CGO_LDFLAGS "-L/usr/local/lib -lopencv_core -lopencv_face -lopencv_videoio -lopencv_imgproc -lopencv_highgui -lopencv_imgcodecs -lopencv_objdetect -lopencv_features2d -lopencv_video -lopencv_dnn -lopencv_xfeatures2d -lopencv_plot -lopencv_tracking"


## Copy microservice files
COPY --from=ms-builder dist .
COPY --from=ms-builder node_modules .

EXPOSE 3000

CMD [ "yarn", "start" ]