import {
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  MOVE_POST,
  UP,
  REMOVE_LAST_ACTION,
} from '../constants';

export const initialState = {
  posts: [],
  from: 0,
  to: 0,
  error: null,
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
        error: action.error,
        isLoading: false,
      };
    case MOVE_POST: {
      const { direction, index: from } = action.payload;
      const to = direction === UP ? from - 1 : from + 1;
      const { posts } = state;

      return {
        ...state,
        from,
        to,
        posts: posts.map((post, index) => {
          if (index === from) return posts[to];
          if (index === to) return posts[from];
          return post;
        }),
      };
    }
    case REMOVE_LAST_ACTION: {
      const { posts } = state;
      const { from, to } = action.lastAction;

      return {
        ...state,
        posts: posts.map((post, index) => {
          if (index === from) return posts[to];
          if (index === to) return posts[from];
          return post;
        }),
      };
    }
    default:
      return state;
  }
};
