import Home from "../Client/src/components/home.jsx";
import { Link } from 'react-router-dom';
import { Children } from 'react';
import { screen, fireEvent } from '@testing-library/react';
import shallowRenderer from 'react-test-renderer/shallow';
var ShallowRenderer = require('react-test-renderer/shallow');

describe('Home Test', () => {

    it("renders without crashing", () => {
        const renderer = new ShallowRenderer();
        renderer.render(<Home />);
        const result = renderer.getRenderOutput();
       
        var link = result.props.children[2]

        // Check that outer component is a div
        expect(result.type).toBe('div');

        // Check that child components are present
        expect(result.props.children).toContainEqual(
        <h1 className="title">ED OP Online</h1>
        )
        expect(result.props.children).toContainEqual(
            <p className="description">
                Connecting students with education-based opportunities like scholarships or student-employment positions.
            </p>
        )
        expect(JSON.stringify(result.props.children[2])).toEqual(
            JSON.stringify(<Link to="/login"><button className="button-login">Sign In</button></Link>)
        )
        expect(result.props.children).toContainEqual(
            <footer>
                <p className="footer">© Copyright 2023 CSCE490 Nami Group</p>
            </footer>
        )
      });

    it("redirects upon signup button click", () => {
        const onClick = jest.fn();
        const renderer = new ShallowRenderer();
        renderer.render(<Home />);
        const result = renderer.getRenderOutput();

        const button = Children.only(result.props.children[2].props.children);
        expect(button).toEqual(<button className="button-login">Sign In</button>);

        button.props.onClick( { preventDefault: () => {} } );

        result = renderer.getRenderOutput();
        button = Children.only(result.props.children[2].props.children);

        expect (button).toEqual('Clicked')

        console.log(button)
    })
});