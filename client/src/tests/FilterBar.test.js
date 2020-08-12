import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import FilterBar from '../FilterBar.jsx';

describe('FilterBar', () => {
  it('should render correctly', () => {
    const component = shallow(<FilterBar/>);
    expect(component).toMatchSnapshot();
  })
})