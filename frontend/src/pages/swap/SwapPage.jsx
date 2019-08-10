import React from "react";
import Button from "react-bootstrap/Button";
import {
    basePhotosState,
    basePhotoTypeState,
    photoStateReducer,
    PhotoTypeDispatchCtx,
    PhotoStateDispatchCtx,
    photoTypeReducer
} from "../../common/state";
import {PhotoChooser} from "../../components/PhotoChoosing";

export const SwapPage = () => {
    const [photoState, photoStateDispatch] = React.useReducer(photoStateReducer, basePhotosState);
    const [photoOneType, photoOneTypeDispatch] = React.useReducer(photoTypeReducer, basePhotoTypeState);
    const [photoTwoType, photoTwoTypeDispatch] = React.useReducer(photoTypeReducer, basePhotoTypeState);

    return (
        <PhotoStateDispatchCtx.Provider value={{photoStateDispatch, photoState}}>
            <PhotoTypeDispatchCtx.Provider value={{photoTypeDispatch: photoOneTypeDispatch, photoType: photoOneType}}>
                    <PhotoChooser title={'Choose the first photo'}/>
            </PhotoTypeDispatchCtx.Provider>
            <PhotoTypeDispatchCtx.Provider value={{photoTypeDispatch: photoTwoTypeDispatch, photoType: photoTwoType}}>
                    <PhotoChooser title={'Choose the second photo'}/>
            </PhotoTypeDispatchCtx.Provider>
            {/*validation two photos supplied*/}
            <Button bsStyle={'primary'}>Go</Button>
        </PhotoStateDispatchCtx.Provider>
    )
};
