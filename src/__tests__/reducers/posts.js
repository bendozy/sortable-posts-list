import reducer, { initialState } from '../../reducers/posts';
import {
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  MOVE_POST,
  UP,
  REMOVE_LAST_ACTION,
  DOWN,
} from '../../constants';

describe('Posts reducer', () => {
  it('should return the initial state', () => {
    const result = reducer(undefined, {});

    expect(result).toEqual(initialState);
    expect(result).toMatchSnapshot();
  });

  it('should call a fetch post success action', () => {
    const post = {
      title: 'hello',
    };
    const action = {
      type: FETCH_POSTS_SUCCESS,
      posts: [post],
    };

    const result = reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      posts: [post],
      isLoading: false,
    });
    expect(result).toMatchSnapshot();
  });

  it('should call a fetch post error action', () => {
    const error = {
      msg: 'api error',
    };
    const action = {
      type: FETCH_POSTS_ERROR,
      error,
    };

    const result = reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      error,
      isLoading: false,
    });
    expect(result).toMatchSnapshot();
  });

  it('should call a move post up action', () => {
    const payload = {
      direction: UP,
      index: 1,
    };
    const action = {
      type: MOVE_POST,
      payload,
    };

    const firstPost = {
      title: 'hello',
    };

    const secondPost = {
      title: 'bendozy',
    };

    const currentState = {
      ...initialState,
      isLoading: false,
      posts: [firstPost, secondPost],
    };

    const result = reducer(currentState, action);

    expect(result).toEqual({
      ...currentState,
      posts: [secondPost, firstPost],
      from: 1,
      to: 0,
    });
    expect(result).toMatchSnapshot();
  });

  it('should call a move post down action', () => {
    const payload = {
      direction: DOWN,
      index: 0,
    };
    const action = {
      type: MOVE_POST,
      payload,
    };

    const firstPost = {
      title: 'hello',
    };

    const secondPost = {
      title: 'bendozy',
    };

    const currentState = {
      ...initialState,
      isLoading: false,
      posts: [firstPost, secondPost, secondPost],
    };

    const result = reducer(currentState, action);

    expect(result).toEqual({
      ...currentState,
      posts: [secondPost, firstPost, secondPost],
      from: 0,
      to: 1,
    });
    expect(result).toMatchSnapshot();
  });

  it('should call a move post down action', () => {
    const lastAction = {
      from: 0,
      to: 1,
    };
    const action = {
      type: REMOVE_LAST_ACTION,
      lastAction,
    };

    const firstPost = {
      title: 'hello',
    };

    const secondPost = {
      title: 'bendozy',
    };

    const currentState = {
      ...initialState,
      isLoading: false,
      posts: [firstPost, secondPost, secondPost],
    };

    const result = reducer(currentState, action);

    expect(result).toEqual({
      ...currentState,
      posts: [secondPost, firstPost, secondPost],

    });
    expect(result).toMatchSnapshot();
  });
});
