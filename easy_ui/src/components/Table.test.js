import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Table from './Table';

Enzyme.configure({adapter : new Adapter()})

describe('Button', () => {

    const props = {
    list : [ 
    {
    Poster: "https://m.media-amazon.com/images/M/MV5BZmUwNGU2ZmItMmRiNC00MjhlLTg5YWUtODMyNzkxODYzMmZlXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg",
    Title: "Batman Begins",
    Type: "movie",
    Year: "2005",
    imdbID: "tt0372784" }],
    sortKey : 'TITLE',
    isSortReverse : false
    
}
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Table { ...props }/>, div);
        ReactDOM.unmountComponentAtNode(div)
    });

    test('has a valid snapshot', () => {
        const component = renderer.create(
            <Table { ...props }/>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Table has 1 element', () => {
        const element = shallow(
            <Table { ...props }/>
        )
        expect(element.find('.table-row').length).toBe(1);
    })
});