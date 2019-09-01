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
        return <p>An error occurred {submissionState.err}</p>
    }

    if(submissionState.result) {
        return (
            <>
                <SectionHolder>
                    <h2>Your swap is complete, and you&apos;ve never looked more beautiful!</h2>
                </SectionHolder>
                <SectionHolder>
                    <img alt={'result'} src={submissionState.result} />
                </SectionHolder>
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
