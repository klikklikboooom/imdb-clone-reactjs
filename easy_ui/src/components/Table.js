import React from 'react';
import Button from './Button';
import PropTypes from 'prop-types';
import {sortBy} from 'lodash';
import classNames from 'classnames';

const Sort = ({sortKey, onSort, children, activeSortKey}) => {
    
    const sortClass = classNames('button-inline', 
            {'button-active': sortKey === activeSortKey})
    if(sortKey) {
        return (
            <Button 
            onClick={() => onSort(sortKey)}
            className= {sortClass}> 
                {children} 
            </Button>
        );
    } else {
        return (
            <Button 
            className= {sortClass}> 
                {children} 
            </Button>
        )
    }
}

const SORTS = {
    NONE : list => list,
    TITLE : list => sortBy(list, 'Title'),
    YEAR : list => sortBy(list, 'Year'),
    TYPE : list => sortBy(list, 'Type')
}

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortKey : 'NONE',
            isSortReverse : false
        };
    }

    onSort = (sortKey) => {
        const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse
        this.setState({sortKey, isSortReverse})
    }

    render() {
        const {
            list,
            onDismiss
        } = this.props;
        
        const {
            sortKey,
            isSortReverse
        } = this.state

        const imageColumnWidth = {width : '20%'};
        const nameColumnWidth = { width: '30%'};
        const yearColumnWidth = { width: '20%'};
        const typeColumnWidth = { width: '20%'};
        const buttonColumnWidth = { width: '10%'};

        const sortedList = SORTS[sortKey](list);
        const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList

        if(!list || list.Error) {
            return <p>Please enter a valid title</p> 
        } else {
            return (
                <div className = "table">
                    <div className = "table-header">
                        <span style = {{ width : '20%'}}>
                        <Sort 
                            sortKey = {''}
                            onSort = {this.onSort}>
                                Poster
                            </Sort>
                        </span>
                        <span style = {{ width : '30%'}}>
                            <Sort 
                            sortKey = {'TITLE'}
                            onSort = {this.onSort}
                            activeSortKey = {sortKey}>
                                Title
                            </Sort>
                        </span>
                        <span style = {{ width : '20%'}}>
                            <Sort 
                            sortKey = {'YEAR'}
                            onSort = {this.onSort}
                            activeSortKey = {sortKey}>
                                Year
                            </Sort>
                        </span>
                        <span style = {{ width : '20%'}}>
                            <Sort 
                            sortKey = {'TYPE'}
                            onSort = {this.onSort}
                            activeSortKey = {sortKey}>
                                Type
                            </Sort>
                        </span>
                        <span style = {{ width : '10%'}}>
                            <Sort 
                                sortKey = {''}
                                onSort = {this.onSort}>
                                    Archive
                            </Sort>
                        </span>
                    </div>    
                        {reverseSortedList.map(item =>    
                            <div key ={item.imdbID} className="table-row">
                                <span style = {imageColumnWidth}><img src={item.Poster} height="100"></img></span>
                                <span style = {nameColumnWidth}><a href={"https://www.imdb.com/title/" + item.imdbID} target="_blank" rel="noopener noreferrer">{item.Title}</a></span>
                                <span style = {yearColumnWidth}>{item.Year}</span>
                                <span style = {typeColumnWidth}>{item.Type}</span>
                                <span style = {buttonColumnWidth}> 
                                    <Button className = "button-inline"
                                        onClick={()=> onDismiss(item.imdbID)}
                                    >
                                    <img src={require("../assets/icons8-trash-100.png")} height="42" width="42"/>
                                    </Button>
                                </span>
                            </div>                                    
                        )}
                </div>
            )}
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