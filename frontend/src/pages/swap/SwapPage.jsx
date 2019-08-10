import React from "react";
import Button from "react-bootstrap/Button";
import {
    basePhotosState,
    basePhotoTypeState,
    PhotoStateDispatchCtx,
    photoStateReducer,
    PhotoTypeDispatchCtx,
    photoTypeReducer
} from "../../common/state";
import {PhotoChooser} from "../../components/PhotoChoosing";

export const SwapPage = () => {
    const [photoOneState, photoOneStateDispatch] = React.useReducer(photoStateReducer, basePhotosState);
    const [photoTwoState, photoTwoStateDispatch] = React.useReducer(photoStateReducer, basePhotosState);
    const [photoOneType, photoOneTypeDispatch] = React.useReducer(photoTypeReducer, basePhotoTypeState);
    const [photoTwoType, photoTwoTypeDispatch] = React.useReducer(photoTypeReducer, basePhotoTypeState);

    return (
        //make this iterative instead of copy paste
        <>
            <PhotoStateDispatchCtx.Provider value={{photoStateDispatch: photoOneStateDispatch, photoState: photoOneState}}>
                <PhotoTypeDispatchCtx.Provider value={{photoTypeDispatch: photoOneTypeDispatch, photoType: photoOneType}}>
                        <PhotoChooser title={'Choose the first photo'}/>
                </PhotoTypeDispatchCtx.Provider>
            </PhotoStateDispatchCtx.Provider>
            <PhotoStateDispatchCtx.Provider value={{photoStateDispatch: photoTwoStateDispatch, photoState: photoTwoState}}>
                <PhotoTypeDispatchCtx.Provider value={{photoTypeDispatch: photoTwoTypeDispatch, photoType: photoTwoType}}>
                        <PhotoChooser title={'Choose the second photo'}/>
                </PhotoTypeDispatchCtx.Provider>
            </PhotoStateDispatchCtx.Provider>
            <PhotoStateDispatchCtx.Provider value={{photoOneState, photoTwoState}}>
                {/*validation two photos supplied - will need consumer */}
                <Button bsStyle={'primary'}>Go</Button>
            </PhotoStateDispatchCtx.Provider>
        </>
    )
};
