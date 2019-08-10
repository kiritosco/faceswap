import React from 'react';
import {photoChooseType, reducerActions} from "./consts";

export const PhotoTypeDispatchCtx = React.createContext(null);
export const PhotoStateDispatchCtx = React.createContext(null);

export const basePhotosState = null;
export const basePhotoTypeState = photoChooseType.none;

export const photoStateReducer = (state, action) => {
    switch (action.type) {
        case reducerActions.changePhoto:
            return action[reducerActions.newPhoto];
        default:
            return state;
    }
};

export const photoTypeReducer = (state, action) => {
    if (action.type === reducerActions.changePhotoType) {
        return action[reducerActions.newPhotoType]
    } else {
        return state;
    }
};