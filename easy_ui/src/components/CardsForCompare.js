import React from 'react';
import PropTypes from 'prop-types';

const CardsForCompare = ({list}) => {
    return(
        <div className = "card_list">
            {list.map(item => 
                <div key={item.imdbID} className="card_list_item">
                    <div>
                    <img src={item.Poster} height="100"  width = "60" alt = "No Poster Available"></img>
                    </div>
                    <div className="card_list_title"> 
                        <a href={"https://www.imdb.com/title/" + item.imdbID} target="_blank" rel="noopener noreferrer">{item.Title}</a>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CardsForCompare