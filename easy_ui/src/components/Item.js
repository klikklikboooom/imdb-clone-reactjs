import React from 'react';
import Button from './Button';
import ItemDetails from './ItemDetails';

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            infoAvailable : false
        }
    }

    expandOrShrinkCard = () => {
        this.setState({infoAvailable : !this.state.infoAvailable})
    }

    render () {
        const { item,
                widths,
                onDismiss } = this.props;
        const { infoAvailable } = this.state;
        return (
            <div>
                <div key ={item.imdbID} className="table-row-less" onClick = {this.expandOrShrinkCard}>
                    <span style = {widths.imageColumnWidth}><img src={item.Poster} height="100" alt = "No Poster Available"></img></span>
                    <span style = {widths.nameColumnWidth}><a href={"https://www.imdb.com/title/" + item.imdbID} target="_blank" rel="noopener noreferrer">{item.Title}</a></span>
                    <span style = {widths.yearColumnWidth}>{item.Year}</span>
                    <span style = {widths.typeColumnWidth}>{item.Type}</span>
                    <span style = {widths.buttonColumnWidth}> 
                        <Button className = "button-inline"
                            onClick={()=> onDismiss(item.imdbID)}>
                            <img src={require("../assets/icons8-trash-100.png")} height="42" width="42" alt = 'Dismiss'/>
                        </Button>
                    </span>
                </div>  
                <div>
                        <ItemDetails display = {infoAvailable} title = {item.Title} />
                </div>
            </div>
            
        );
    }     
}

export default Item