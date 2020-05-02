import imdbAPIKey from './config/keys';
import ClipLoader from "react-spinners/ClipLoader";
import React from 'react';

export const DEFAULT_QUERY = '';
export const PATH_BASE = 'http://omdbapi.com/'
export const API_KEY = `apikey=${imdbAPIKey}`
export const PARAM_PAGE = 'page='
export const PARAM_SEARCH = 's='
export const SIDEBAR_LIST = [{'value':'Search', 'icon':require('./assets/search_icon.png'), path : '/search'},
                            {'value':'Compare', 'icon':require('./assets/compare_icon.png'), path : '/compare'}, 
                            {'value':'About',  'icon':require('./assets/about_icon.png'), path :'/about'}];


const Loading = () => {
    return (
        <div className="sweet-loading">
            <ClipLoader/>
        </div>
    );
}

export const withLoading = (Component) => ({isLoading, ...rest}) => {
    return (
        isLoading? 
        <Loading />
        :<Component {...rest}/>
    )
}

export const updateSearchMovies = (listOfContent, page) => (prevState) => {
    const {searchKey, results} = prevState;
    const oldListOfContent = results && results[searchKey] ? results[searchKey].Search : [];
    const updatedListOfContent = [ ...oldListOfContent, ...listOfContent];
    const finalRes = {results : { ...results, [searchKey] : {Search: updatedListOfContent, page} }, error: null, isLoading : false};
    return finalRes
}