import {
  MOVE_POST,
} from '../constants';

export default (direction, post) => ({
  type: MOVE_POST,
  payload: { direction, post },
});
