import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { movePost } from '../actions/posts';
import { UP, DOWN } from '../constants';

export const Post = ({
  post: { title, index },
  post,
  lastIndex,
  movePost: movePostAction,
}) => (
  <div className="bg-white shadow rounded mb-6 flex justify-between">
    <div className="py-6 px-2">
      <div className="text-md">{title}</div>
    </div>
    <div className="flex flex-col pr-2 justify-center">
      {index !== 0 && (
        <button
          type="button"
          onClick={() => movePostAction(UP, post)}
        >
          <i className="text-2xl fa fa-angle-up" />
        </button>
      )}
      {index !== lastIndex && (
        <button
          type="button"
          onClick={() => movePostAction(DOWN, post)}
        >
          <i className="text-2xl fa fa-angle-down" />
        </button>
      )}
    </div>
  </div>
);

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
  }).isRequired,
  lastIndex: PropTypes.number.isRequired,
  movePost: PropTypes.func.isRequired,
};
const mapDispatchToProps = {
  movePost,
};

export default connect(null, mapDispatchToProps)(Post);
