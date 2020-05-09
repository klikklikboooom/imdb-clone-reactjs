import React from 'react';
import axios from 'axios';
import { PATH_BASE,
        API_KEY } from '../constants';

class ItemInfo extends React.Component {

    constructor(props) {
        super(props); 
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
        itemAPICall(title);
    }
    
    render () {
        <div>
            
        </div>
    }
}

const itemAPICall = (title)  => {
    const [list, setData] = React.useState(null);
    const [error, setError] = React.useState(null);
    React.useEffect(() => {
        axios
        .get(url)
        .then(function (response) {
            setData(response.data.ResultList);
        })
        .catch(function (error) {
            setError(error);
        })
    }, []);
    return { list, error };
};