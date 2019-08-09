import React from 'react';

import {Link} from "react-router-dom";
import Button from "react-bootstrap/es/Button";
import Card from "react-bootstrap/Card";

export const LinkButton = ({style, link, text}) => {
    return (
        <Link to={link}>
            <Button bsStyle={style}>
                {text}
            </Button>
        </Link>
    )
};

export const ActionCard = ({title, text, action}) => {
    return (
        <Card style={{width: '18rem'}} onClick={action}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {text}
                </Card.Text>
            </Card.Body>
        </Card>
    )
};