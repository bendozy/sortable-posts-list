import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import timeTravel, { removeLastAction } from '../../actions/actions';
import { REMOVE_LAST_ACTION } from '../../constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.useFakeTimers();

describe('Action creators tests', () => {
  it('should create an action to dispatch last item in the actions reducer', () => {
    const lastAction = {
      title: 'hello',
      from: 1,
    };
    const expectedAction = {
      type: REMOVE_LAST_ACTION,
      lastAction,
    };

    expect(removeLastAction(lastAction)).toEqual(expectedAction);
    expect(removeLastAction(lastAction)).toMatchSnapshot();
  });

  it('dispatches only one action if there is only an action Item in the actions reducer', () => {
    const lastAction = {
      title: 'hello',
      from: 1,
    };
    const expectedAction = {
      type: REMOVE_LAST_ACTION,
      lastAction,
    };

    const store = mockStore({
      actions: {
        actions: [lastAction],
      },
    });

    store.dispatch(timeTravel(0));

    expect(store.getActions()).toContainEqual(expectedAction);
    expect(store.getActions()).toMatchSnapshot();
  });

  it('dispatches only all actions in the actions reducer if index 0 is selected', () => {
    const actions = Array.from({ length: 5 }, (v, i) => ({ index: i }));
    const type = REMOVE_LAST_ACTION;

    const store = mockStore({
      actions: { actions },
    });

    store.dispatch(timeTravel(0));
    jest.runAllTimers();

    expect(store.getActions()).toHaveLength(actions.length);
    expect(store.getActions(store.getActions().length - 1))
      .toContainEqual({ type, lastAction: actions[0] });
    expect(store.getActions(0))
      .toContainEqual({ type, lastAction: actions[actions.length - 1] });
    expect(store.getActions()).toMatchSnapshot();
  });
});
