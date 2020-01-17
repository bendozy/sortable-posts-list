import React from 'react';
import { act } from 'react-dom/test-utils';
import toJson from 'enzyme-to-json';
import { PostList, mapStateToProps } from '../../components/PostList';
import Post from '../../components/Post';

const fetchPosts = jest.fn();

jest.mock('../../components/Post', () => () => 'Post');
jest.mock('react-redux', () => ({
  connect: () => (wrappedComponent) => wrappedComponent,
}));

describe('<PostList />', () => {
  it('should render a <PostList /> component', () => {
    const posts = {
      posts: [],
      isLoading: true,
    };
    const wrapper = shallow(<PostList fetchPosts={fetchPosts} posts={posts} />);

    expect(wrapper.find(Post)).toHaveLength(0);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should update a <PostList /> component', () => {
    const posts = {
      posts: [],
      isLoading: true,
    };
    const wrapper = mount(<PostList fetchPosts={fetchPosts} posts={posts} />);

    expect(wrapper.find(Post)).toHaveLength(0);

    act(() => {
      wrapper.setProps({
        posts: {
          posts: [
            { id: 'test1' },
            { id: 'test2' },
          ],
          isLoading: false,
        },
      });
    });
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
