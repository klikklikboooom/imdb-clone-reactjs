import React from 'react';
import {BrowserRouter as Router, Route, } from 'react-router-dom';
import App from './App';
import Compare from './CompareItems';
import About from './About'; 

const createRoutes = () => 
    <Router>
        <Route exact path="/" component={App}/>
        <Route exact path="/search" component={App}/>
        <Route exact path="/compare" component={Compare}/>
        <Route exact path="/about" component={About}/>
    </Router>


export default createRoutes;