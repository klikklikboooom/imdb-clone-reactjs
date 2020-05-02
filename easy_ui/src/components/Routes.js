import React from 'react';
import {BrowserRouter as Router, Route, } from 'react-router-dom';
import App from './App';
import Compare from './Compare';
import About from './About';
import SideNav from './SideNav'; 
import { SIDEBAR_LIST } from '../constants';

const createRoutes = () => 
    <Router>
        <SideNav list = {SIDEBAR_LIST}/>
        <Route exact path="/" component={App}/>
        <Route exact path="/search" component={App}/>
        <Route exact path="/compare" component={Compare}/>
        <Route exact path="/about" component={About}/>
    </Router>


export default createRoutes;