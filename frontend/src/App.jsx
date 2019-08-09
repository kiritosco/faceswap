import React from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import {Base} from "./components/Layout";
import {Home} from "./pages/home/Home";
import {Swap} from "./pages/swap/Swap";

function Routing() {
    return (
        <>
            <BrowserRouter>
                <Base>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/swap" component={Swap} />
                </Base>
            </BrowserRouter>
        </>
    )
}

export default Routing;
