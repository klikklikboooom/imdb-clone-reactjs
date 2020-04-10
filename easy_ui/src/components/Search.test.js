import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Search from './Search';

Enzyme.configure({adapter : new Adapter()})

describe('Button', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Search>Search</Search>, div);
        ReactDOM.unmountComponentAtNode(div)
    });

    test('has a valid snapshot', () => {
        const component = renderer.create(
            <Search>Search</Search>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Search Bar with button exists', () => {
        const element = shallow(
            <Search>Search</Search>
        )
        expect(element.exists('input')).toBe(true);
        expect(element.exists('button')).toBe(true);
        expect(element.text()).toBe('Search');
    })
});