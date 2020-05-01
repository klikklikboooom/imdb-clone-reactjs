import imdbAPIKey from './config/keys';

export const DEFAULT_QUERY = '';
export const PATH_BASE = 'http://omdbapi.com/'
export const API_KEY = `apikey=${imdbAPIKey}`
export const PARAM_PAGE = 'page='
export const PARAM_SEARCH = 's='
export const SIDEBAR_LIST = [{'value':'Search', 'icon':require('./assets/search_icon.png'), path : '/search'},
                            {'value':'Compare', 'icon':require('./assets/compare_icon.png'), path : '/compare'}, 
                            {'value':'About',  'icon':require('./assets/about_icon.png'), path :'/about'}];