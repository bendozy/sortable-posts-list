import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Post from './Post';
import { fetchPosts } from '../actions/posts';

import spinner from '../assets/Spinner.svg';

import '../styles/PostList.css';

export const PostList = (props) => {
  const { posts: { isLoading, posts } } = props;
  

  useEffect(() => {
    props.fetchPosts();
  }, []);

  const postCards = posts.map((post) => (
    <Post key={post.id} post={post} lastIndex={posts.length - 1} />
  ));

  return (
    <div className="PostList">
      <h1 className="mb-6 font-bold text-3xl text-white">Sortable Post List</h1>
      {isLoading && <img src={spinner} className="PostList-spinner" alt="loading-logo" />}
      {!isLoading && postCards}
    </div>
  );
};

PostList.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    posts: PropTypes.arrayOf(PropTypes.object),
    order: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
};

export const mapStateToProps = ({ posts }) => ({ posts });

const mapDispatchToProps = {
  fetchPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
