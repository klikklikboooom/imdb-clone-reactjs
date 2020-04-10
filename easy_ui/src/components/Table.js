import React from 'react';
import Button from './Button';
import PropTypes from 'prop-types';

const Table = ({list, onDismiss}) => {
    const imageColumnWidth = {width : '20%'};
    const nameColumnWidth = { width: '20%'};
    const yearColumnWidth = { width: '30%'};
    const typeColumnWidth = { width: '20%'};
    const buttonColumnWidth = { width: '10%'};
     if(!list || list.Error) {
        return <p>Please enter a valid title</p> 
    } else {
        return (
            <div className = "table">
                {list.map(item =>    
                    <div key ={item.imdbID} className="table-row">
                        <span style = {imageColumnWidth}><img src={item.Poster} height="100"></img></span>
                        <span style = {nameColumnWidth}><a href={"https://www.imdb.com/title/" + item.imdbID} target="_blank" rel="noopener noreferrer">{item.Title}</a></span>
                        <span style = {yearColumnWidth}>{item.Year}</span>
                        <span style = {typeColumnWidth}>{item.Type}</span>
                        <span style = {buttonColumnWidth}> 
                            <Button className = "button-inline"
                                onClick={()=> onDismiss(item.imdbID)}
                            >
                            Dismiss
                            </Button>
                        </span>
                    </div>                                    
                )}
            </div>
        )
    }       
}

Table.propTypes = {
    list : PropTypes.arrayOf(
        PropTypes.shape({
            imdbID : PropTypes.string.isRequired,
            Poster : PropTypes.string.isRequired,
            Title : PropTypes.string.isRequired,
            Year : PropTypes.string.isRequired,
            Type : PropTypes.string.isRequired
        })
    ),
    onDismiss : PropTypes.func.isRequired
}



export default Table;