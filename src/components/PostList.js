import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import { connect } from 'react-redux';
import Post from './Post';
import { fetchPosts } from '../actions/posts';

import spinner from '../assets/Spinner.svg';

import '../styles/PostList.css';

export const PostList = ({
  posts: {
    isLoading,
    posts,
  },
  fetchPosts: fetchPostsAction,
}) => {
  useEffect(() => {
    fetchPostsAction();
  }, [fetchPostsAction]);


  const postCards = posts.map((post, index) => (
    <CSSTransition
      key={post.id}
      timeout={2000}
      classNames="item"
    >
      <Post
        post={post}
        index={index}
        lastIndex={posts.length - 1}
      />
    </CSSTransition>
  ));

  return (
    <div className="PostList">
      <h1 className="mb-6 font-bold text-3xl text-white">Sortable Post List</h1>
      {isLoading && <img src={spinner} className="PostList-spinner" alt="loading-logo" />}
      {!isLoading && (
        <div className="PostList-cards">
          <TransitionGroup className="todo-lists">
            {postCards}
          </TransitionGroup>
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
};

export const mapStateToProps = ({ posts }) => ({ posts });

const mapDispatchToProps = {
  fetchPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
