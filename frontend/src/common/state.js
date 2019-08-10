import React, {createContext} from 'react';
import {contextKeys, photoChooseType, reducerActions} from "./consts";

export const PhotoTypeDispatchCtx = React.createContext(null);
export const PhotoStateDispatchCtx = React.createContext(null);

export const basePhotosState = {
    [contextKeys.photoOne]: null,
    [contextKeys.photoTwo]: null
};

export const basePhotoTypeState = photoChooseType.none;

export const photoStateReducer = (state, action) => {
    switch (action.type) {
        case reducerActions.changePhotoOne:
            return {
                ...state,
                [contextKeys.photoOne]: action[reducerActions.newPhotoOne]
            };
        case reducerActions.changePhotoTwo:
            return {
                ...state,
                [contextKeys.photoTwo]: action[reducerActions.newPhotoTwo]
            };
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