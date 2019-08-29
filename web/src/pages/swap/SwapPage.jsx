import React from "react";
import Button from "react-bootstrap/Button";
import {
    PhotoCtx,
    baseState,
    photoReducer
} from "../../common/state";
import {PhotoChooser} from "../../components/PhotoChoosing";
import {SectionHolder} from "../../components/Layout";
import {submitRequest} from "./SwapPage.run";
import {PongSpinner} from "react-spinners-kit";

export const SwapPage = () => {
    const [submissionState, setSubmittedState] = React.useState({
        submitted: false,
        result: null,
        err: null
    });
    const [photoOneState, photoOneDispatch] = React.useReducer(photoReducer, baseState);
    const [photoTwoState, photoTwoDispatch] = React.useReducer(photoReducer, baseState);

    if(submissionState.err) {
        return <p>error. something like couldn't detect faces in x face. failed to connect etc... same gif format as at work</p>
    }

    if(submissionState.result) {
        return (
            <>
                <p>show the image here, and a punny message here (maybe have an array of them and it chooses a random number)</p>
                <p>show a load of share cards</p>
            </>
        )
    }

    if(submissionState.submitted) {
        return (
            <div className={'spinner'}>
                <h3>Swapping your faces</h3>
                <PongSpinner size={100}/>
            </div>
        )
    }

    // need what to show on result

    if(!submissionState.submitted) {
        return (
            <>
                <SectionHolder>
                    <PhotoCtx.Provider value={{dispatch: photoOneDispatch, state: photoOneState}}>
                        <PhotoChooser title={'Choose the first photo'}/>
                    </PhotoCtx.Provider>
                </SectionHolder>
                <SectionHolder>
                    <PhotoCtx.Provider value={{dispatch: photoTwoDispatch, state: photoTwoState}}>
                        <PhotoChooser title={'Choose the second photo'}/>
                    </PhotoCtx.Provider>
                </SectionHolder>
                <PhotoCtx.Provider value={{photoOneState, photoTwoState}}>
                    <PhotoCtx.Consumer>
                        {({photoOneState, photoTwoState}) =>
                            <Button bsStyle={'primary'} disabled={!photoOneState.content || !photoTwoState.content}
                                    onClick={submitRequest.bind(this, photoOneState.content, photoTwoState.content, setSubmittedState)}>Go</Button>
                        }
                    </PhotoCtx.Consumer>
                </PhotoCtx.Provider>
            </>
        )
    }
};
