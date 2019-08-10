import React, {useContext} from 'react';
import {photoChooseType, reducerActions} from "../common/consts";
import Webcam from "react-webcam";
import Button from "react-bootstrap/Button";
import {PhotoTypeDispatchCtx} from "../common/state";
import {ActionCard} from "./Buttons";
import {SplitColLayout} from "./Layout";
import {isMobile} from "react-device-detect";

export const PhotoChooser = ({title}) => {
    const ValidChooser = ({photoType}) => {
        switch(photoType) {
            case photoChooseType.none:
                return <PhotoTypeChooser title={titleBlock}/>;
            case photoChooseType.webcam:
                return <WebcamCapturer title={titleBlock}/>;
            case photoChooseType.upload:
                return <PhotoUploader title={titleBlock}/>;
            default:
                throw `invalid photo choose type ${photoType}`
        }
    };

    const titleBlock = <h3 style={{paddingBottom: 20}}>{title}</h3>;

    return (
        <PhotoTypeDispatchCtx.Consumer>
            {({photoType}) => <ValidChooser photoType={photoType}/>}
        </PhotoTypeDispatchCtx.Consumer>
    )
};

const PhotoTypeChooser = ({title}) => {
    const setPhotoType = (dispatch, photoType) => {
        dispatch({
            type: reducerActions.changePhotoType,
            [reducerActions.newPhotoType]: photoType
        })
    };

    return (
        <>
            {title}
            <PhotoTypeDispatchCtx.Consumer>
                {({photoTypeDispatch}) => (
                    <SplitColLayout items={[
                        <ActionCard action={setPhotoType.bind(this, photoTypeDispatch, photoChooseType.upload)} title={'Upload photo'}/>,
                        !isMobile ? <ActionCard action={setPhotoType.bind(this, photoTypeDispatch, photoChooseType.webcam)} title={'Take photo'}/> : null
                    ]} />
                )}
            </PhotoTypeDispatchCtx.Consumer>
        </>
    );
};

const WebcamCapturer = ({title}) => {
    let webcamRef = null;

    const setWebcamRef = (webcam) => {
        webcamRef = webcam;
    };

    const takePicture = () => {
        console.log(webcamRef.getScreenshot())
    };

    const webcamCapture  = <Webcam ref={setWebcamRef} screenshotFormat="image/jpeg" />;
    const captureButton = <Button bsStyle={'primary'} onClick={takePicture}>Take photo</Button>;
    const captureContainer = <div>{[webcamCapture, captureButton]}</div>;

    return [
        title,
        captureContainer
    ];
};

const PhotoUploader = ({title}) => {
    const photoUploadButton = <input type="file" accept="image/*" />;

    return [
        title,
        photoUploadButton
    ]
};