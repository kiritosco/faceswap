import React from 'react';
import {photoChooseType, reducerActions} from "../common/consts";
import Webcam from "react-webcam";
import Button from "react-bootstrap/Button";
import {PhotoStateDispatchCtx, PhotoTypeDispatchCtx} from "../common/state";
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

    const takePhoto = (dispatch) => {
        dispatch({
            type: reducerActions.changePhoto,
            [reducerActions.newPhoto]: webcamRef.getScreenshot()
        })
    };

    return (
        <>
            {title}
            <PhotoStateDispatchCtx.Consumer>
                {({photoStateDispatch, photoState}) => (
                    <>
                        {photoState ? <img src={photoState} /> :
                            <>
                                <Webcam ref={setWebcamRef} screenshotFormat="image/jpeg" />
                                <Button bsStyle={'primary'} onClick={takePhoto.bind(this, photoStateDispatch)}>Take photo</Button>
                            </>
                        }
                    </>
                )}
            </PhotoStateDispatchCtx.Consumer>
        </>
    )
};

const PhotoUploader = ({title}) => {
    let webcamRef = React.createRef();
    const photoUploadButton = <input type="file" accept="image/*" ref={webcamRef} onChange={getPhoto}/>;

    return [
        title,
        photoUploadButton
    ]
};