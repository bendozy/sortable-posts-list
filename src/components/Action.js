import React from 'react';
import PropTypes from 'prop-types';

// React Flip need the child component to not be stateless

/* eslint-disable react/prefer-stateless-function */
export default class Action extends React.Component {
  render() {
    const {
      action: { title, from, to },
      timeTravel: timeTravelAction,
      index,
    } = this.props;

    return (
      <div className="Action bg-white rounded p-3 shadow border flex flex-wrap">
        <div className="Action-message sm:my-3 my-1 sm:text-base text-sm w-3/4 text-gray-700">
          {`Moved ${title} from index ${from} to index ${to}`}
        </div>
        <button
          onClick={() => timeTravelAction(index)}
          type="button"
          className="Action-button h-12 m-1 bg-green-200 rounded text-sm shadow sm:text-base w-1/5 text-gray-700"
        >
          Time Travel
        </button>
      </div>
    );
  }
}

Action.propTypes = {
  action: PropTypes.shape({
    title: PropTypes.string.isRequired,
    from: PropTypes.number.isRequired,
    to: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  timeTravel: PropTypes.func.isRequired,
};
