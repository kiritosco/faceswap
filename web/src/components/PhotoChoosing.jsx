import React from 'react';
import {photoChooseType, reducerActions} from "../common/consts";
import Webcam from "react-webcam";
import Button from "react-bootstrap/Button";
import {PhotoCtx} from "../common/state";
import {ActionCard} from "./Buttons";
import {SplitColLayout} from "./Layout";
import {isMobile} from "react-device-detect";

export const PhotoChooser = ({title}) => {
    const ValidChooser = ({photoType}) => {
        const titleToShow = <h3 style={{paddingBottom: 20}}>{title}</h3>;
        let itemToShow = null;

        switch(photoType) {
            case photoChooseType.none:
                itemToShow = <PhotoTypeChooser/>;
                break;
            case photoChooseType.webcam:
                itemToShow = <WebcamCapturer/>;
                break;
            case photoChooseType.upload:
                itemToShow = <PhotoUploader/>;
                break;
            default:
                throw new Error(`invalid photo choose type ${photoType}`)
        }

        return (
            <>
                {titleToShow}
                {itemToShow}
            </>
        )
    };

    return (
        <PhotoCtx.Consumer>
            {({state}) => <ValidChooser photoType={state.type}/>}
        </PhotoCtx.Consumer>
    )
};

const PhotoTypeChooser = () => {
    const setPhotoType = (dispatch, photoType) => {
        dispatch({
            type: reducerActions.changePhotoType,
            [reducerActions.newPhotoType]: photoType
        })
    };

    return (
        <PhotoCtx.Consumer>
            {({dispatch}) => (
                <SplitColLayout items={[
                    <ActionCard action={setPhotoType.bind(this, dispatch, photoChooseType.upload)} title={'Upload photo'}/>,
                    !isMobile ? <ActionCard action={setPhotoType.bind(this, dispatch, photoChooseType.webcam)} title={'Take photo'}/> : null
                ]} />
            )}
        </PhotoCtx.Consumer>
    );
};

const WebcamCapturer = () => {
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
        <PhotoCtx.Consumer>
            {({dispatch, state}) => (
                <>
                    {state && state.content ? <img alt='Uploaded' src={state.content} /> :
                        <>
                            <Webcam audio={false} ref={setWebcamRef} screenshotFormat="image/jpeg" />
                            <Button bsStyle={'primary'} onClick={takePhoto.bind(this, dispatch)}>Take photo</Button>
                        </>
                    }
                </>
            )}
        </PhotoCtx.Consumer>
    )
};

const PhotoUploader = () => {
    const webcamRef = React.createRef();

    const savePhoto = (dispatch) => {
        const fr = new FileReader();
        fr.readAsDataURL(webcamRef.current.files[0]);

        fr.onload = () => {
            dispatch({
                type: reducerActions.changePhoto,
                [reducerActions.newPhoto]: fr.result
            })
        };
    };

    return (
        <PhotoCtx.Consumer>
            {({dispatch, state}) => (
                <>
                    {state && state.content ? <img alt='Uploaded' src={state.content} /> :
                        <>
                            <input type="file" accept="image/*" ref={webcamRef} />
                            <Button bsStyle={'primary'} onClick={savePhoto.bind(this, dispatch)}>Choose photo</Button>
                        </>
                    }
                </>
            )}
        </PhotoCtx.Consumer>
    )
};