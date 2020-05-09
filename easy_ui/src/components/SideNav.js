import React from 'react';
import './SideNav.css';
import { NavLink } from 'react-router-dom';

class SideNav extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            isOpen : false
        }
    }

    handleSideNav = () => {
        this.setState({isOpen: !this.state.isOpen})
    }


    render() {
        const { list } = this.props;
        if(this.state.isOpen) {
            return (
                <div>
                    <div className = "sidenav_open">
                        <a onClick={this.handleSideNav}><img src = {require('../assets/menu.jpg')} height="20" width="20" alt= "No icon"/> Menu</a>
                        {list.map((item) => 
                            <NavLink to = {item.path}><img src= {item.icon} height="20" width="20"alt= 'No icon'/>{item.value}</NavLink>
                        )}  
                    </div>
                </div>
            );
        } else {
            return(
                <div>
                    <div className = "sidenav_close">
                        <a onClick= {this.handleSideNav}><img src = {require('../assets/menu.jpg')} height="30" width="30" alt= "No icon"/></a>
                        {list.map((item) => 
                            <NavLink to = {item.path}><img src= {item.icon} height="20" width="20"alt= 'No icon'/></NavLink>
                        )}
                    </div>
                </div>
            )
        }
        
    }
}

export default SideNav

