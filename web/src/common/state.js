import React from 'react';
import {photoChooseType, reducerActions} from "./consts";

export const PhotoCtx = React.createContext(null);

export const baseState = {
    content: null,
    type: photoChooseType.none
};

export const photoReducer = (state, action) => {
    switch (action.type) {
        case reducerActions.changePhoto:
            return {
                ...state,
                content: action[reducerActions.newPhoto]
            };
        case reducerActions.changePhotoType:
            return {
                ...state,
                type: action[reducerActions.newPhotoType]
            };
        default:
            return state;
    }
};