import {
  MOVE_POST,
  UP,
} from '../constants';

export default (state = [], action) => {
  switch (action.type) {
    case MOVE_POST: {
      const { direction, post: { index, title, id } } = action.payload;
      const nextIndex = direction === UP ? index - 1 : index + 1;

      return [
        ...state,
        {
          title,
          postId: id,
          from: index,
          to: nextIndex,
          key: `${id}-${index}-${nextIndex}`,
        },
      ];
    }
    default:
      return state;
  }
};
