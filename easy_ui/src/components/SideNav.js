import React from 'react';
import './SideNav.css';

const SideNav = ({list}) => {
    return (
    <div className = "sidenav">
        {list.map((item) => 
            <a href = "#">{item}</a>
        )}  
    </div>
    );
}

export default SideNav

