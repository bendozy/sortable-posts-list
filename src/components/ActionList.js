import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Action from './Action';

export const ActionList = ({ actions }) => (
  <div className="ActionList">
    <div className="bg-white rounded shadow-md overflow-hidden">
      <div className="font-semibold bg-white p-4 text-gray-800 text-xl">List of actions commited</div>
      <div className="bg-gray-300 p-6 border border-gray-300 overflow-hidden shadow-md">
        {actions.map((action, index) => <Action key={action.key} action={action} index={index} />)}
        {actions.length === 0 && (
          <div className="bg-white p-4 rounded shadow-md flex items-center text-gray-500">
            <span>No actions commited</span>
          </div>
        )}
      </div>
    </div>
  </div>
);

ActionList.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export const mapStateToProps = ({ actions }) => ({ actions });

export default connect(mapStateToProps)(ActionList);
