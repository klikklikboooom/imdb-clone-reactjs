import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from './Button';

Enzyme.configure({adapter : new Adapter()})

describe('Button', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Button>I am a Button</Button>, div);
        ReactDOM.unmountComponentAtNode(div)
    });

    test('has a valid snapshot', () => {
        const component = renderer.create(
            <Button>I am a Button</Button>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Button exists', () => {
        const element = shallow(
            <Button>I am a Button</Button>
        )

        element.exists('button');
        expect(element.text()).toBe('I am a Button');
    })
});