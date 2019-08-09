import React, {useState} from 'react';
import {photoChooseType} from "../common/consts";
import {SplitColLayout} from "./Layout";
import {ActionCard} from "./Buttons";

export const PhotoChooser = ({title}) => {
    const [photoType, setPhotoType] = useState(photoChooseType.none);
    const splitItemsToShow = [
        <ActionCard title={'Take photo'}/>,
        <ActionCard title={'Upload photo'}/>,
    ];

    return (
        <div>
            <h3>{title}</h3>
            <SplitColLayout items={splitItemsToShow}/>
        </div>
    )
};