import {
  REMOVE_LAST_ACTION,
} from '../constants';

export const removeLastAction = (lastAction) => ({
  type: REMOVE_LAST_ACTION,
  lastAction,
});

export default (index) => (dispatch, getState) => {
  const { actions: { actions } } = getState();

  if (actions.length === 1) {
    dispatch(removeLastAction(actions[0]));
  } else {
    let counter = actions.length - index;

    const progress = setInterval(() => {
      dispatch(removeLastAction(actions[counter - 1]));
      counter -= 1;

      if (counter === 0) {
        clearInterval(progress);
      }
    }, 1000);
  }
};
