import React from 'react';
import './App.css'
import imdbAPIKey from './keys';

const DEFAULT_QUERY = '';

const PATH_BASE = 'http://omdbapi.com/'
const API_KEY = `apikey=${imdbAPIKey.imdbAPIKey}`
const PARAM_PAGE = 'page='
const PARAM_SEARCH = 's='
var url = `${PATH_BASE}?${API_KEY}&s=${DEFAULT_QUERY}`;

const Button = ({onClick, className = '', children}) => {
    return(
        <button
        onClick = {onClick}
        className={className}>
            {children}
        </button>
    )
}

const Search =({value, onChange, onSubmit,children }) => {
    return (
        <form onSubmit = {onSubmit}>
            <input 
                type = "text" 
                value = {value}
                onChange = {onChange}
                />
                <button type = "submit">
                    {children}
                </button>
        </form>
    )    
}

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

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results : null,
            searchKey : '',
            searchTerm : DEFAULT_QUERY,
            error : null
        }
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
        const finalRes = {results : { ...results, [searchKey] : {Search: updatedListOfContent, page} }};
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
            this.setState({ error : 'Please enter a movie'})
        } else {
            url = `${PATH_BASE}?${API_KEY}&${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`
            fetch(url)
            .then(response => response.json())
            .then(result => {
                let editedResult = {...result, page : page };
                this.setSearchMoviesorTVShows(editedResult);
            })
            .catch(error => this.setState({ error }));
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

    componentDidCatch(err,info) {
        console.log('err', err);
        console.log('info', info);
    }

    render() {
        const { 
            searchTerm, 
            results,
            searchKey, 
            error 
        } = this.state;
        if(error && error === 'Please enter a movie') {
            return(
                <div>
                    <Search
                    value={searchTerm}
                    onChange= {this.onSearchChange}
                    onSubmit = {this.onSearchSubmit}
                        >Search
                    </Search>
                    <p>Something went wrong</p>
                </div>
                )
            
        }
        const page = (results && results[searchKey] && results[searchKey].page) || 0;
        const list = (results && results[searchKey] && results[searchKey].Search) || [];
        return (
            <div className = "page">
                <div className = "interactions">
                    <Search
                    value={searchTerm}
                    onChange= {this.onSearchChange}
                    onSubmit = {this.onSearchSubmit}
                        >Search
                    </Search>
                    <Table
                        list={list}
                        onDismiss={this.onDismiss}
                    />
                    
                     <div className="interactions">
                        <Button onClick={() => this.searchMoviesOrTVShows(searchKey, page+1 )}>
                            More
                        </Button>
                    </div>  
                </div>
            </div>
        )
    }
}

export default App