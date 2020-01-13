import { combineReducers } from 'redux';
import posts from './posts';
import actions from './actions';

export default combineReducers({ posts, actions });
