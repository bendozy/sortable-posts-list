import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import { movePost, fetchPosts } from '../../actions/posts';
import {
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  MOVE_POST,
} from '../../constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('axios');

describe('Posts action tests', () => {
  it('fetches post api data and dispatches first 5', () => {
    const response = {
      data: Array.from({ length: 50 }, (v, i) => ({ id: i })),
    };

    const store = mockStore({
      posts: {
        posts: [],
      },
    });

    axios.get.mockResolvedValue(response);

    return store.dispatch(fetchPosts()).then(() => {
      expect(store.getActions())
        .toContainEqual({ type: FETCH_POSTS_SUCCESS, posts: response.data.slice(0, 5) });
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('dispatces error action if there is an issue with the api call', () => {
    const error = {
      data: 'api error fetching data',
    };

    const store = mockStore({
      posts: {
        error: null,
      },
    });

    axios.get.mockRejectedValue(error);

    return store.dispatch(fetchPosts()).then(() => {
      expect(store.getActions())
        .toContainEqual({ type: FETCH_POSTS_ERROR, error });
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('dispatches movePost action', () => {
    const payload = {
      from: 1,
      to: 2,
    };
    const expectedAction = {
      type: MOVE_POST,
      payload,
    };

    expect(movePost(payload)).toEqual(expectedAction);
  });
});
