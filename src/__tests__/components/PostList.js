import React from 'react';
import toJson from 'enzyme-to-json';
import PostList from '../../components/PostList';
import Post from '../../components/Post';

describe('<App />', () => {
  xit('should render a <App /> component', () => {
    const wrapper = shallow(<PostList />);

    expect(wrapper.find(Post)).toHaveLength(1);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
