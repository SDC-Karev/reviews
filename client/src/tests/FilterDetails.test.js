import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FilterDetails from '../FilterDetails.jsx';

describe('FilterDetails', () => {
  it('should render correctly', () => {
    const component = shallow(<FilterDetails/>);
    expect(component).toMatchSnapshot();
  })
})