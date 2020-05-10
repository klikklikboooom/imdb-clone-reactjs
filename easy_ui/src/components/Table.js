import React from 'react';
import Button from './Button';
import PropTypes from 'prop-types';
import Item from './Item';
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

        let widths = {
            imageColumnWidth : {width : '20%'},
            nameColumnWidth : { width: '30%'},
            yearColumnWidth : { width: '20%'},
            typeColumnWidth : { width: '20%'},
            buttonColumnWidth : { width: '10%'},

        }
        
        const sortedList = SORTS[sortKey](list);
        const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList

        return (
            <div className = "table">
                <div className = "table-header">
                    <span style = {widths.imageColumnWidth}>
                    <Sort 
                        sortKey = {''}
                        onSort = {this.onSort}>
                            Poster
                        </Sort>
                    </span>
                    <span style = {widths.nameColumnWidth}>
                        <Sort 
                        sortKey = {'TITLE'}
                        onSort = {this.onSort}
                        activeSortKey = {sortKey}>
                            Title
                        </Sort>
                    </span>
                    <span style = {widths.yearColumnWidth}>
                        <Sort 
                        sortKey = {'YEAR'}
                        onSort = {this.onSort}
                        activeSortKey = {sortKey}>
                            Year
                        </Sort>
                    </span>
                    <span style = {widths.typeColumnWidth}>
                        <Sort 
                        sortKey = {'TYPE'}
                        onSort = {this.onSort}
                        activeSortKey = {sortKey}>
                            Type
                        </Sort>
                    </span>
                    <span style = {widths.buttonColumnWidth}>
                        <Sort 
                            sortKey = {''}
                            onSort = {this.onSort}>
                                Archive
                        </Sort>
                    </span>
                </div>    
                    {reverseSortedList.map(item =>    
                        <Item 
                            item = {item} 
                            widths = {widths}
                            onDismiss = {onDismiss}
                        />                                  
                    )}
            </div>
        );
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