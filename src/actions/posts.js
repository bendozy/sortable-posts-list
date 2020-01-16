import axios from 'axios';
import {
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  MOVE_POST,
} from '../constants';

export const fetchPostsSuccess = (posts) => ({
  type: FETCH_POSTS_SUCCESS,
  posts: posts.map((post) => ({ ...post })),
});

export const fetchPostsError = (error) => ({
  type: FETCH_POSTS_ERROR,
  error,
});

export const fetchPosts = () => (dispatch) => axios.get('https://jsonplaceholder.typicode.com/posts')
  .then((response) => dispatch(fetchPostsSuccess(response.data.slice(0, 5))))
  .catch((error) => dispatch(fetchPostsError(error)));


export const movePost = (payload) => ({
  type: MOVE_POST,
  payload,
});
