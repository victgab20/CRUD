import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'

import Routes from "./Routes";
import {BrowserRouter} from 'react-router-dom'
import Nav from "../components/template/Nav";
import Logo from "../components/template/Logo";
import Footer from "../components/template/Footer";

export default props =>
   <BrowserRouter>
     <div className="app">
        <Logo></Logo>
        <Nav></Nav>
        <Routes></Routes>
        <Footer></Footer>
    </div>
   </BrowserRouter>
