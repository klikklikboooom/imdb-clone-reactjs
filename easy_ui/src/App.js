import React from 'react';

const list = [
    {
        id:1,
        firstName:'Nikhil', 
        lastName: 'Anantharaman', 
        designation: 'SE', 
        age: 23
    }, 
    {   
        id:2,
        firstName: 'Simran',
        lastName: 'Chhabra',
        designation: 'SE',
        age: 23
    },
    {   
        id:3,
        firstName:'Shrinidhi',
        lastName: 'Kulkarni',
        designation: 'SE',
        age:24
    },
    {   
        id:4,
        firstName: 'Adithya',
        lastName: 'NR',
        designation: 'Associate',
        age:21
    }
];

const isSearched = (searchTerm) => (item) => item.lastName.toLowerCase().includes(searchTerm.toLowerCase()) || item.firstName.toLowerCase().includes(searchTerm.toLowerCase())

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
    return (
        <div>
            {list.filter(isSearched(pattern)).map(item =>    
                <div key ={item.id}>
                    <span><a href={item.firstName} > {item.lastName}></a></span>
                    <span>{item.designation}</span>
                    <span>{item.age}</span>
                    <span> 
                        <Button
                            onClick={()=> onDismiss(item.id)}
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
            list,
            searchTerm : ''
        }
    }
    
    onDismiss = (id) => {
        console.log('THIS',this);
        const updatedList = this.state.list.filter(item => item.id !== id)
        this.setState({list: updatedList})    
    }

    onSearchChange = (event) => {
        console.log(this.state)
        this.setState({searchTerm: event.target.value})
    }

    render() {
        const { searchTerm, list } = this.state;
        return(
            <div>
                <Search
                value={searchTerm}
                onChange= {this.onSearchChange}
                    >Search
                </Search>
                <Table
                list={list}
                pattern={searchTerm}
                onDismiss={this.onDismiss}
                />
            </div>
        )
    }
}

export default App