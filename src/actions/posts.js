import axios from 'axios';
import {
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  MOVE_POST,
} from '../constants';

export const fetchPostsSuccess = (posts) => ({
  type: FETCH_POSTS_SUCCESS,
  payload: {
    posts: posts.map((post, index) => ({ ...post, index })),
    index: Array.from({ length: posts.length }, (v, i) => i),
  },
});

export const fetchPostsError = (error) => ({
  type: FETCH_POSTS_ERROR,
  error,
});

export const fetchPosts = () => (dispatch) => axios.get('https://jsonplaceholder.typicode.com/posts')
  .then((response) => dispatch(fetchPostsSuccess(response.data.splice(0, 5))))
  .catch((error) => dispatch(fetchPostsError(error)));


export const movePost = (direction, post) => ({
  type: MOVE_POST,
  payload: { direction, post },
});
