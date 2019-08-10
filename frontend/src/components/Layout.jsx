import {Header} from "./Navigation";
import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const Base = (props) => {
    return (
        <div className={'base'}>
            <Header />
            <div style={{padding: 30}}>
                {props.children}
            </div>
        </div>
    )
};

export const SectionHolder = (props) => {
    return (
        <div style={{margin: 30}}>
            {props.children}
            <hr />
        </div>
    )
};

export const SplitColLayout = (props) => {
    const mdSize = Math.floor(12 / props.items.length);
    const columns = props.items.map(item => {
        return (
            <Col md={mdSize} style={{borderRight: props.showBorder ? '1px solid black' : null}}>
                {item}
            </Col>
        )
    });

    return (
        <Row>
            {columns}
        </Row>
    )
};