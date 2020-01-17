import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';
import { connect } from 'react-redux';
import Post from './Post';
import { fetchPosts, movePost } from '../actions/posts';

import spinner from '../assets/Spinner.svg';

import '../styles/PostList.css';

export const PostList = ({
  posts: {
    isLoading,
    posts,
  },
  fetchPosts: fetchPostsAction,
  movePost: movePostAction,
}) => {
  useEffect(() => {
    fetchPostsAction();
  }, [fetchPostsAction]);


  const postCards = posts.map((post, index) => (
    <Post
      key={post.id}
      post={post}
      index={index}
      lastIndex={posts.length - 1}
      movePost={movePostAction}
    />
  ));

  return (
    <div className="PostList">
      <h1 className="PostList-title mb-6 font-bold text-3xl text-white">Sortable Post List</h1>
      {isLoading && <img src={spinner} className="PostList-spinner" alt="loading-logo" />}
      {!isLoading && (
        <div className="PostList-items">
          <FlipMove duration={300}>
            {postCards}
          </FlipMove>
        </div>
      )}
    </div>
  );
};

PostList.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    posts: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  movePost: PropTypes.func.isRequired,
};

export const mapStateToProps = ({ posts }) => ({ posts });

export const mapDispatchToProps = {
  fetchPosts,
  movePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
