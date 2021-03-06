import React from 'react';
import {LinkButton} from "../../components/Buttons";
import {getNavSection} from "../../common/helpers";
import {navSectionIds} from "../../common/consts";

const SwapLinkButton = () => {
    return <LinkButton bsStyle={'primary'} link={getNavSection(navSectionIds.swap).link} text={getNavSection(navSectionIds.swap).name} />
};

export const homeContent = [
    (
        <h2 style={{display: 'flex', justifyContent: 'center'}}>
            Welcome to faceswap <span role="img" aria-label="wave">👋</span>
        </h2>
    ),
    (
        <>
            <p>Use faceswap to create face swaps from either photos from your webcam, or uploaded photos</p>
            <SwapLinkButton />
        </>
    )
];