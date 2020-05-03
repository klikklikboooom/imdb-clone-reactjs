import React from 'react';
import './Compare.css';
import SearchForCompare from './SearchForCompare';

class Compare extends React.Component {
    render () {
        return (
            <div className = "interactions">
                <div className = "leftitem">
                    <SearchForCompare />
                </div>
                <div className = 'divider'></div>
                <div className = 'rightitem'>
                    <SearchForCompare />
                </div>
            </div>
        );
    }
}

export default Compare