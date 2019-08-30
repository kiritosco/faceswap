import React from 'react'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {links, navSections} from "../common/consts"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons/faGithub";
import {Link} from "react-router-dom";

export const Header = () => {
    const Links = () => {
        return navSections.map((section, idx) => {
            return <Link key={`link-${idx}`} className='nav-link' to={section.link}>{section.name}</Link>
        });
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand>faceswap</Navbar.Brand>
            <Nav className="mr-auto">
                <Links/>
            </Nav>
            <Nav>
                <Nav.Link href={links.github} target={'_blank'}><FontAwesomeIcon icon={faGithub}/></Nav.Link>
            </Nav>
        </Navbar>
    )
};