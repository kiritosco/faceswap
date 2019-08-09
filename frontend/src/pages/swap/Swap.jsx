import React from "react";
import {SplitColLayout} from "../../components/Layout";
import {choosePhotoItems} from "./content";

export const Swap = () => {
    return (
        <>
            <div>
                <SplitColLayout items={choosePhotoItems}/>
            </div>
        </>
    )
};
