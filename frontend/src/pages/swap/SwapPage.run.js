import React from "react";
import Button from "react-bootstrap/Button";
import {
    PhotoCtx,
    baseState,
    photoReducer
} from "../../common/state";
import {PhotoChooser} from "../../components/PhotoChoosing";
import {SectionHolder} from "../../components/Layout";

export const submitRequest = (photoOneContent, photoTwoContent, setSubmittedState) => {
    setSubmittedState({
        submitted: true
    });
};