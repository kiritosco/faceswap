import React from 'react';
import Alert from "react-bootstrap/Alert";

export const VersionReleaseAlert = ({version}) => {
    return (
        <Alert variant={'primary'}>
            v{version} released! 🎉
        </Alert>
    )
};