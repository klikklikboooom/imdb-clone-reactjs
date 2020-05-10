import React from 'react';
import axios from 'axios';
import Button from './Button';
import { PATH_BASE,
        API_KEY } from '../constants';

class ItemDetails extends React.Component {

    constructor(props) {
        super(props);
        const { title, display  } =  this.props;
        this.state = {
            itemData : null,
            error : null
        }
    }

    itemAPICall = (title) => {
        const url = `${PATH_BASE}?${API_KEY}&t=${title}`;
        axios.get(url)
        .then((response) => {
            this.setState({itemData : response.data})
        })
        .catch((error) => {
            this.setState({error})
        })
    }

    componentDidMount () {
        const { title }  = this.props;  
        this.itemAPICall(title);
    }
    
    render () {
        const { itemData, error } = this.state;
        const { display } = this.props;
        if(!display) {
            return null
        } else if(error) {
            return <p>Oops. Something went wrong</p>
        } else {
            return(
                <div>
                    <hr></hr>
                    <div className = "info-container">
                        <div>
                            <p>Released : { itemData.Released }</p>
                            <p>Runtime : { itemData.Runtime }</p>
                            <p>Genre : {itemData.Genre}</p>
                            <p>Languages : {itemData.Language}</p>
                            <p>Rating : {itemData.Rated}</p>
                        </div>
                        <div>
                            <p>Director : {itemData.Director}</p>
                            <p>Writers : {itemData.Writer}</p>
                            <p>Actors : {itemData.Actors}</p>
                        </div>
                        <div>
                            <div>
                                <img src = {require('../assets/rotten_tomatoes_8290.jpg')} height="36" width="36"/><p>{itemData.Ratings&& itemData.Ratings[1] && itemData.Ratings[1].Value || 'NA'}</p>
                            </div>
                            <div>
                                <img src = {require('../assets/metacritic.png')} height="36" width="36"/><p>{itemData.Ratings&& itemData.Ratings[2] && itemData.Ratings[2].Value || 'NA'}</p>
                            </div>
                            <div>
                                <img src = {require('../assets/imdb_icon.png')} height="36" width="36"/><p>{itemData.Ratings&& itemData.Ratings[0] && itemData.Ratings[0].Value || 'NA'}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p>Plot : {itemData.Plot}</p>
                    </div>
                    <Button>Compare</Button>
                </div>
            )
        }
    }
}

export default ItemDetails