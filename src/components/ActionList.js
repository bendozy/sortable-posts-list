import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlipMove from 'react-flip-move';
import Action from './Action';
import timeTravelAction from '../actions/actions';

export const ActionList = ({ actions, timeTravel }) => (
  <div className="ActionList">
    <div className="bg-white rounded shadow-md overflow-hidden">
      <div className="ActionList-title font-semibold bg-white p-4 text-gray-800 text-xl">List of actions commited</div>
      <div className="ActionList-items bg-gray-300 p-6 border border-gray-300 overflow-hidden shadow-md">
        <FlipMove
          duration={300}
        >
          {actions.map((action, index) => (
            <Action
              key={action.key}
              action={action}
              index={index}
              timeTravel={timeTravel}
            />
          )).reduce((acc, val) => [val].concat(acc), [])}
          {actions.length === 0 && (
            <div className="ActionList-loading bg-white p-4 rounded shadow-md text-gray-500">
              <span>No actions commited</span>
            </div>
          )}
        </FlipMove>
      </div>
    </div>
  </div>
);

ActionList.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
  timeTravel: PropTypes.func.isRequired,
};

export const mapStateToProps = ({ actions: { actions } }) => ({ actions });

export const mapDispatchToProps = {
  timeTravel: timeTravelAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionList);
