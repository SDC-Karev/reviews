import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from '../Header.jsx';

describe('Header', () => {
  it('should render correctly', () => {
    const component = shallow(<Header/>);
    expect(component).toMatchSnapshot();
  })
})