import React from "react";
import {homeContent} from "./content";
import {SectionHolder} from "../../components/Layout";
import FadeIn from "react-fade-in";

export const HomePage = () => {
    const content = homeContent.map(item => {
        return (
            <FadeIn>
                <SectionHolder>
                    {item}
                </SectionHolder>
            </FadeIn>
        )
    });

    return (
        <>
            {/*<VersionReleaseAlert version={'1.0'} />*/}
            {content}
        </>
    )
};