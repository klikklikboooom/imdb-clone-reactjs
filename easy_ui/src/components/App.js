import React from 'react';
import './App.css'
import axios from 'axios';
import Button from './Button';
import Search from './Search';
import Table from './Table'
import ClipLoader from "react-spinners/ClipLoader";
import {sortBy} from 'lodash';

import {
    DEFAULT_QUERY,
    PATH_BASE,
    API_KEY,
    PARAM_PAGE,
    PARAM_SEARCH
} from '../constants'

const SORTS = {
    NONE : list => list,
    TITLE : list => sortBy(list, 'Title'),
    YEAR : list => sortBy(list, 'Year'),
    TYPE : list => sortBy(list, 'Type')
}


var url = `${PATH_BASE}?${API_KEY}&s=${DEFAULT_QUERY}`;

const Loading = () => {
    return (
        <div className="sweet-loading">
          <ClipLoader/>
        </div>
    );
}

const withLoading = (Component) => ({isLoading, ...rest}) => {
    console.log('I am loading');
    return (
        isLoading? 
        <Loading />
        :<Component {...rest}/>
    )
}

const ButtonWithLoading = withLoading(Button);



class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results : null,
            searchKey : '',
            searchTerm : DEFAULT_QUERY,
            error : null,
            isLoading :false,
            sortKey : 'NONE'
        }
    }

    onSort = (sortKey) => {
        this.setState({sortKey})
    }

    needsToSearch = (searchTerm) => {        
        if(this.state.results)  return !this.state.results[searchTerm];
        else return true
    }

    setSearchMoviesorTVShows = (result) => {
        
        const listOfContent = result.Search;
        const {page}  =  result;
        const {searchKey, results} = this.state;
        const oldListOfContent = results && results[searchKey] ? results[searchKey].Search : [];
        const updatedListOfContent = [ ...oldListOfContent, ...listOfContent];
        const finalRes = {results : { ...results, [searchKey] : {Search: updatedListOfContent, page} }, error: null, isLoading : false};
        this.setState(finalRes);
    }

    onDismiss = (id) => {
        const { searchKey, results} = this.state;
        const {Search, page } = results[searchKey];
        const isNotId = item => item.imdbID !== id;
        const updatedSearch = Search.filter(isNotId);
        this.setState({
            results : { ...results,[searchKey] : {Search : updatedSearch, page} },
        })  
    }

    onSearchSubmit = (event) => {
        event.preventDefault();
        const { searchTerm } = this.state;

        this.setState({searchKey : searchTerm});
        if(this.needsToSearch(searchTerm)) {
            this.searchMoviesOrTVShows(searchTerm);
        }
    }

    searchMoviesOrTVShows = (searchTerm, page = 1) => {
        if(searchTerm.length === 0) {
            this.setState({ error : 'Please enter a movie or TV Show'})
        } else {
            this.setState({isLoading : true})
            url = `${PATH_BASE}?${API_KEY}&${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`
            axios.get(url)
            .then(result => {
                console.log('RES', result)
                let editedResult = {...result.data, page : page };
                this.setSearchMoviesorTVShows(editedResult);
            })
            .catch(error => { console.log('error', error); this.setState({ error })});
        }  
    }

    onSearchChange = (event) => {
        this.setState({searchTerm: event.target.value})
    }

    componentDidMount() {
        const {searchTerm} = this.state;
        this.setState({searchKey : searchTerm});
        this.searchMoviesOrTVShows(searchTerm);
    }

    render() {
        const { 
            searchTerm, 
            results,
            searchKey, 
            error,
            isLoading,
            sortKey 
        } = this.state;
        if(error && error === 'Please enter a movie or TV Show') {
            return(
                <div className = "page">
                    <div className = "interactions">
                    <Search
                        value={searchTerm}
                        onChange= {this.onSearchChange}
                        onSubmit = {this.onSearchSubmit}
                            >Search
                    </Search>
                        <p>{error}</p>
                    </div>
                </div>
            )
        } else if (error) {
            return (
                <div className = "page">
                    <div className = "interactions">
                        <Search
                        value={searchTerm}
                        onChange= {this.onSearchChange}
                        onSubmit = {this.onSearchSubmit}>
                            Search
                        </Search>
                        <p>{error}</p>
                    </div>
                </div>
            )
        } else {
            const page = (results && results[searchKey] && results[searchKey].page) || 0;
            const list = (results && results[searchKey] && results[searchKey].Search) || [];
            return (
                <div className = "page">
                    <div className = "interactions">
                        <Search
                        value={searchTerm}
                        onChange= {this.onSearchChange}
                        onSubmit = {this.onSearchSubmit}>
                            Search
                        </Search>
                        <Table
                            list={list}
                            onSort = {this.onSort}
                            sortKey = {sortKey}
                            onDismiss={this.onDismiss}
                        />
                        <div className="interactions">
                                <ButtonWithLoading
                                isLoading = {isLoading} 
                                onClick={() => this.searchMoviesOrTVShows(searchKey, page+1 )}>
                                    More
                                </ButtonWithLoading> 
                        </div>   
                    </div>
                </div>
            )   
        }
    }
}

export default App