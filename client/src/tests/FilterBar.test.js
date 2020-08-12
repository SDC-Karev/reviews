import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FilterBar from '../FilterBar.jsx';

describe('FilterBar', () => {
  it('should render correctly', () => {
    const component = shallow(<FilterBar/>);
    expect(component).toMatchSnapshot();
  })
})

// const component = mount(<ConditionIndicator condition={5}/>);
//   const componentRendered = component.render().toString();