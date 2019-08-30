import React from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import {Base} from "./components/Layout";
import {HomePage} from "./pages/home/HomePage";
import {SwapPage} from "./pages/swap/SwapPage";

function Routing() {
    return (
        <>
            <BrowserRouter basename={'/'}>
                <Base>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/swap" component={SwapPage} />
                </Base>
            </BrowserRouter>
        </>
    )
}

export default Routing;
