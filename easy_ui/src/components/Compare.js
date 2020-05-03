import React from 'react';
import './Compare.css';
import SearchForCompare from './SearchForCompare';
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