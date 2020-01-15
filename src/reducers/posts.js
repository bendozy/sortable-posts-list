import {
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  MOVE_POST,
  UP,
} from '../constants';

export const initialState = {
  posts: [],
  order: [],
  error: null,
  isLoading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload.posts,
        order: action.payload.order,
        isLoading: false,
      };
    case FETCH_POSTS_ERROR:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    case MOVE_POST: {
      const { direction, post: { index } } = action.payload;
      const nextIndex = direction === UP ? index - 1 : index + 1;
      const uposts = [...state.posts];
      // const post = state.posts[index];
      // const posts = state.posts.filter((p, i) => index !== i);
      // posts.splice(nextIndex, 0, post);

      const temp = uposts[index];
      uposts[index] = uposts[nextIndex];
      uposts[nextIndex] = temp;

      console.log(uposts);

      return {
        ...state,
        posts: [...uposts],
      };
    }
    default:
      return state;
  }
};
