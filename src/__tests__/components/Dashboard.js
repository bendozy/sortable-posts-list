import React from 'react';
import toJson from 'enzyme-to-json';
import Dashboard from '../../components/Dashboard';
import PostList from '../../components/PostList';
import ActionList from '../../components/ActionList';

describe('<App />', () => {
  it('should render a <App /> component', () => {
    const wrapper = shallow(<Dashboard />);

    expect(wrapper.find(PostList)).toHaveLength(1);
    expect(wrapper.find(ActionList)).toHaveLength(1);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
