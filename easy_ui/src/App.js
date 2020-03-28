import React from 'react';
import './App.css'
import imdbAPIKey from './keys';

const DEFAULT_QUERY = 'Batman';

const PATH_BASE = 'http://omdbapi.com/'
const API_KEY = `apikey=${imdbAPIKey.imdbAPIKey}`

var url = `${PATH_BASE}?${API_KEY}&s=${DEFAULT_QUERY}`;

const isSearched = (searchTerm) => (item) =>  item.Title.toLowerCase().includes(searchTerm.toLowerCase());

const Button = ({onClick, className = '', children}) => {
    return(
        <button
        onClick = {onClick}
        className={className}>
            {children}
        </button>
    )
}

const Search =({value, onChange, children}) => {
    return (
        <form>
            {children} <input 
                type = "text" 
                value = {value}
                onChange = {onChange}/>
        </form>
    )    
}

const Table = ({list, pattern, onDismiss}) => {
    const imageColumnWidth = {width : '20%'};
    const nameColumnWidth = { width: '20%'};
    const yearColumnWidth = { width: '30%'};
    const typeColumnWidth = { width: '20%'};
    const buttonColumnWidth = { width: '10%'};
    if(!list) return null
    return (
        <div className = "table">
            {list.filter(isSearched(pattern)).map(item =>    
                <div key ={item.imdbID} className="table-row">
                    <span style = {imageColumnWidth}><img src={item.Poster} height="100"></img></span>
                    <span style = {nameColumnWidth}><a href={item.firstName}>{item.Title}</a></span>
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

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result : null,
            searchTerm : DEFAULT_QUERY
        }
    }

    setSearchMovies = (result) => {
        this.setState({result : result.result});
    }

    onDismiss = (id) => {
        const isNotId = item => item.imdbID !== id;
        const updatedSearch = this.state.result.Search.filter(isNotId);
        this.setState({
            result : { ...this.state.result,Search: updatedSearch },
        })
        //this.setState({result: Object.assign({},this.state.result,{Search: updatedList})});    
    }

    onSearchChange = (event) => {
        this.setState({searchTerm: event.target.value})
    }

    componentDidMount() {
        const {searchTerm} = this.state;
        url = `${PATH_BASE}?${API_KEY}&s=${searchTerm}`
        fetch(url)
        .then(response => response.json())
        .then(result => this.setSearchMovies({result}))
        .catch(error => error);
    }

    componentDidCatch(err,info) {
        console.log('err', err);
        console.log('info', info);
    }

    render() {
        console.log('state',this.state)
        const { searchTerm, result } = this.state;
        if( !result ) {
            return (
                <div className = "page">
                    <div className = "interactions">
                        <Search
                        value={searchTerm}
                        onChange= {this.onSearchChange}
                            >Search
                        </Search>
                    </div>
                </div>
                    
            )
        } else {
            return(
                <div className = "page">
                    <div className = "interactions">
                        <Search
                        value={searchTerm}
                        onChange= {this.onSearchChange}
                            >Search
                        </Search>
                        <Table
                        {...console.log('here', result)}
                        list={result.Search}
                        pattern={searchTerm}
                        onDismiss={this.onDismiss}
                        />
                    </div>
                </div>
            )
        }
    }
}

export default App