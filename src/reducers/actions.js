import {
  MOVE_POST,
  UP,
  REMOVE_LAST_ACTION,
} from '../constants';

export const initialState = {
  actions: [],
  nextKey: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MOVE_POST: {
      const { direction, post: { title }, index } = action.payload;
      const nextIndex = direction === UP ? index - 1 : index + 1;

      return {
        ...state,
        actions: [
          ...state.actions,
          {
            title,
            from: index,
            to: nextIndex,
            key: state.nextKey,
          },

        ],
        nextKey: state.nextKey + 1,
      };
    }
    case REMOVE_LAST_ACTION:
      return {
        ...state,
        nextKey: state.nextKey - 1,
        actions: state.actions.slice(0, -1),
      };
    default:
      return state;
  }
};
