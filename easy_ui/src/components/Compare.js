import React from 'react';
import './Compare.css';
import Search from './Search';
import ClipLoader from "react-spinners/ClipLoader";

const Loading = () => {
    return (
        <div className="sweet-loading">
          <ClipLoader/>
        </div>
    );
}

const withLoading = (Component) => ({isLoading, ...rest}) => {
    return (
        isLoading? 
        <Loading />
        :<Component {...rest}/>
    )
}

class Compare extends React.Component {
    render () {
        return (
            <div className = "interactions">
                <div className = "leftitem">
                    <Search>Search</Search>
                </div>
                <div className = 'divider'></div>
                <div className = 'rightitem'>
                    <Search>Search</Search>
                </div>
            </div>
        );
    }
}

export default Compare