import React from 'react';
import toJson from 'enzyme-to-json';
import FlipMove from 'react-flip-move';
import { PostList, mapStateToProps } from '../../components/PostList';
import Post from '../../components/Post';

const fetchPosts = jest.fn();
const movePost = jest.fn();

jest.mock('../../components/Post', () => () => 'Post');
jest.mock('react-flip-move', () => () => 'FlipMove');

describe('<PostList />', () => {
  it('should render a <PostList /> component', () => {
    const posts = {
      posts: [],
      isLoading: true,
    };
    const wrapper = shallow(
      <PostList
        fetchPosts={fetchPosts}
        posts={posts}
        movePost={movePost}
      />,
    );

    expect(wrapper.find(Post)).toHaveLength(0);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should update a <PostList /> component', () => {
    const posts = {
      posts: [],
      isLoading: true,
    };
    const wrapper = mount(
      <PostList
        fetchPosts={fetchPosts}
        movePost={movePost}
        posts={posts}
      />,
    );

    wrapper.setProps({
      posts: {
        posts: [
          { title: 'test1', id: 1 },
          { title: 'test2', id: 2 },
        ],
        isLoading: false,
      },
      movePost,
    });

    expect(wrapper.find(FlipMove)).toHaveLength(1);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should return correct props from mapStateToProps', () => {
    const posts = [
      { id: 'test1' },
      { id: 'test2' },
    ];

    const initialState = {
      posts: {
        posts,
        isLoading: true,
      },
    };

    const result = mapStateToProps(initialState);

    expect(result).toEqual(initialState);
    expect(toJson(result)).toMatchSnapshot();
  });
});
