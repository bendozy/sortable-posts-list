import React from 'react';
import toJson from 'enzyme-to-json';
import Post from '../../components/Post';

const movePost = jest.fn();

describe('<Post />', () => {
  it('should render a <Action /> component', () => {
    const post = {
      title: 'test',
    };
    const wrapper = shallow(
      <Post
        movePost={movePost}
        post={post}
        index={1}
        lastIndex={4}
      />,
    );

    wrapper.find('.Post-button').first().simulate('click');
    wrapper.find('.Post-button').at(1).simulate('click');

    expect(wrapper.find('.Post')).toHaveLength(1);
    expect(wrapper.find('.Post-button')).toHaveLength(2);
    expect(wrapper.find('.Post-title').text()).toBe(post.title);
    expect(movePost.mock.calls.length).toBe(2);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render a only DOWN button at first index', () => {
    const post = {
      title: 'test',
    };
    const wrapper = shallow(
      <Post
        movePost={movePost}
        post={post}
        index={0}
        lastIndex={4}
      />,
    );

    expect(wrapper.find('.moveDown')).toHaveLength(1);
    expect(wrapper.find('.moveUp')).toHaveLength(0);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render a only UP button at last index', () => {
    const post = {
      title: 'test',
    };
    const wrapper = shallow(
      <Post
        movePost={movePost}
        post={post}
        index={4}
        lastIndex={4}
      />,
    );

    expect(wrapper.find('.moveDown')).toHaveLength(0);
    expect(wrapper.find('.moveUp')).toHaveLength(1);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
