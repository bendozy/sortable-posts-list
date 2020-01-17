import React from 'react';
import PropTypes from 'prop-types';
import { UP, DOWN } from '../constants';

// React Flip need the child component to not be stateless
/* eslint-disable react/prefer-stateless-function */
export default class Post extends React.Component {
  render() {
    const {
      post: { title },
      index,
      post,
      lastIndex,
      movePost: movePostAction,
    } = this.props;

    return (
      <div className="Post bg-white shadow rounded mb-6 flex justify-between">
        <div className="Post-title py-6 px-2 text-md">{title}</div>
        <div className="Post-buttons flex flex-col pr-2 justify-center">
          {index !== 0 && (
            <button
              type="button"
              className="Post-button moveUp"
              onClick={() => movePostAction({ direction: UP, post, index })}
            >
              <i className="text-2xl fa fa-angle-up" />
            </button>
          )}
          {index !== lastIndex && (
            <button
              type="button"
              className="Post-button moveDown"
              onClick={() => movePostAction({ direction: DOWN, post, index })}
            >
              <i className="text-2xl fa fa-angle-down" />
            </button>
          )}
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  lastIndex: PropTypes.number.isRequired,
  movePost: PropTypes.func.isRequired,
};
