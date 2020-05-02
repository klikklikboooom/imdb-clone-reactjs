import React from 'react';
import './SideNav.css';
import { NavLink } from 'react-router-dom';

const SideNav = ({list}) => {
    return (
        <div>
            <div className = "sidenav">
                {list.map((item) => 
                    <NavLink to = {item.path}><img src= {item.icon} height="20" width="20"alt= 'No icon'/>{item.value}</NavLink>
                )}  
            </div>
        </div>
    );
}

export default SideNav

