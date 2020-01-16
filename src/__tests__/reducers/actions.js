import reducer, { initialState } from '../../reducers/actions';
import {
  REMOVE_LAST_ACTION,
  MOVE_POST,
  DOWN,
  UP,
} from '../../constants';

describe('Actions reducer', () => {
  it('should return the initial state', () => {
    const result = reducer(undefined, {});

    expect(result).toEqual(initialState);
    expect(result).toMatchSnapshot();
  });

  it('should remove the last action', () => {
    const action = {
      type: REMOVE_LAST_ACTION,
    };
    const currentState = {
      actions: [{
        title: 'hello',
        from: 2,
        to: 1,
        key: 15,
      }],
      nextKey: 1,
    };

    const result = reducer(currentState, action);

    expect(result).toEqual({
      actions: [],
      nextKey: 0,
    });
    expect(result).toMatchSnapshot();
  });

  it('should add a moved down post action', () => {
    const action = {
      type: MOVE_POST,
      payload: {
        direction: DOWN,
        index: 0,
        post: {
          title: 'hello',
        },
      },
    };
    const expectedAction = {
      title: 'hello',
      from: 0,
      to: 1,
      key: 0,
    };

    const result = reducer(initialState, action);

    expect(result).toEqual({
      actions: [expectedAction],
      nextKey: 1,
    });
    expect(result).toMatchSnapshot();
  });

  it('should add a moved up post action', () => {
    const action = {
      type: MOVE_POST,
      payload: {
        direction: UP,
        index: 1,
        post: {
          title: 'hello',
        },
      },
    };
    const expectedAction = {
      title: 'hello',
      from: 1,
      to: 0,
      key: 0,
    };

    const result = reducer(initialState, action);

    expect(result).toEqual({
      actions: [expectedAction],
      nextKey: 1,
    });
    expect(result).toMatchSnapshot();
  });
});
