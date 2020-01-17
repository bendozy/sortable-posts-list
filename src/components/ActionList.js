import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import Action from './Action';

export const ActionList = ({ actions }) => {
  const prevActionsRef = useRef([]);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    if (actions.length === 0 && prevActionsRef.current.length > actions.length) {
      setTimeout(() => {
        setShowLoading(true);
      }, 500);
    } else if (prevActionsRef.current.length === 0 && actions.length > 0) {
      setShowLoading(false);
    }

    prevActionsRef.current = actions;
  }, [actions]);

  return (
    <div className="ActionList">
      <div className="bg-white rounded shadow-md overflow-hidden">
        <div className="ActionList-title font-semibold bg-white p-4 text-gray-800 text-xl">List of actions commited</div>
        {actions.length > 0 && (
          <div className="ActionList-items bg-gray-300 p-6 border border-gray-300 overflow-hidden shadow-md">
            <TransitionGroup className="action-list">
              {actions.map((action, index) => (
                <CSSTransition
                  key={action.key}
                  timeout={500}
                  classNames="item"
                >
                  <Action
                    action={action}
                    index={index}
                  />
                </CSSTransition>
              )).reverse()}
            </TransitionGroup>
          </div>
        )}
        {actions.length === 0 && showLoading && (
          <div className="ActionList-loading bg-white p-4 rounded shadow-md text-gray-500">
            <span>No actions commited</span>
          </div>
        )}
      </div>
    </div>
  );
};

ActionList.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export const mapStateToProps = ({ actions: { actions } }) => ({ actions });

export default connect(mapStateToProps)(ActionList);
