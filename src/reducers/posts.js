import {
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
} from '../constants';

export const initialState = {
  posts: [],
  errors: null,
  isLoading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.posts,
        isLoading: false,
      };
    case FETCH_POSTS_ERROR:
      return {
        ...state,
        errors: action.errors,
        isLoading: false,
      };
    default:
      return state;
  }
};
