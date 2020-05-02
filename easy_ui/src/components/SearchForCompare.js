import React from 'react';
import Search from './Search';
import { DEFAULT_QUERY} from '../constants';

class SearchForCompare extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results : null,
            searchKey : '',error : null,
            isLoading :false,
            searchTerm : DEFAULT_QUERY
        }
    }

    needsToSearch = (searchTerm) => {        
        if(this.state.results)  return !this.state.results[searchTerm];
        else return true
    }

    setSearchMoviesorTVShows = (result) => {
        const listOfContent = result.Search;
        const {page}  =  result;
        this.setState(updateSearchMovies(listOfContent, page));
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
            this.setState({ error : 'Please enter a movie or TV Show'});
        } else {
            this.setState({isLoading : true})
            url = `${PATH_BASE}?${API_KEY}&${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`
            axios.get(url)
            .then(result => {
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
}