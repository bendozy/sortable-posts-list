import React from 'react';
import { act } from 'react-dom/test-utils';
import toJson from 'enzyme-to-json';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import { ActionList, mapStateToProps } from '../../components/ActionList';
import Action from '../../components/Action';

jest.useFakeTimers();
jest.mock('../../components/Action', () => () => 'Action');
jest.mock('react-redux', () => ({
  connect: () => (wrappedComponent) => wrappedComponent,
}));

describe('<ActionList />', () => {
  let wrapper;

  it('should render a loading component', () => {
    const actions = [];

    wrapper = shallow(
      <ActionList actions={actions} />,
    );

    expect(wrapper.find('.ActionList')).toHaveLength(1);
    expect(wrapper.find('.ActionList-loading')).toHaveLength(1);
    expect(wrapper.find('.ActionList-loading').childAt(0).text()).toBe('No actions commited');
    expect(wrapper.find('.ActionList-title')).toHaveLength(1);
    expect(wrapper.find(CSSTransition)).toHaveLength(0);
    expect(wrapper.find(TransitionGroup)).toHaveLength(0);
    expect(wrapper.find(Action)).toHaveLength(0);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render a loading component', () => {
    const actions = [
      {
        title: 'test1',
        from: 0,
        to: 1,
        key: 0,
      },
      {
        title: 'test2',
        from: 1,
        to: 2,
        key: 1,
      },
    ];

    wrapper = shallow(
      <ActionList actions={actions} />,
    );

    expect(wrapper.find('.ActionList')).toHaveLength(1);
    expect(wrapper.find('.ActionList-loading')).toHaveLength(0);
    expect(wrapper.find('.ActionList-title')).toHaveLength(1);
    expect(wrapper.find(CSSTransition)).toHaveLength(2);
    expect(wrapper.find(TransitionGroup)).toHaveLength(1);
    expect(wrapper.find(Action)).toHaveLength(2);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should return correct props from mapStateToProps', () => {
    const actions = [
      {
        title: 'test1',
        from: 0,
        to: 1,
        key: 0,
      },
      {
        title: 'test2',
        from: 1,
        to: 2,
        key: 1,
      },
    ];

    const initialState = {
      actions: { actions },
    };

    const result = mapStateToProps(initialState);

    expect(result).toEqual({ actions });
    expect(toJson(result)).toMatchSnapshot();
  });

  it('should empty action lists items', () => {
    const actions = [
      {
        title: 'test1',
        from: 0,
        to: 1,
        key: 0,
      },
      {
        title: 'test2',
        from: 1,
        to: 2,
        key: 1,
      },
    ];

    wrapper = mount(
      <ActionList actions={actions} />,
    );


    expect(wrapper.find(Action)).toHaveLength(2);

    act(() => {
      wrapper.setProps({ actions: [] });
      jest.runAllTimers();
    });

    expect(wrapper.find(Action)).toHaveLength(0);
  });

  it('should add to empty action lists items', () => {
    const actions = [
      {
        title: 'test1',
        from: 0,
        to: 1,
        key: 0,
      },
      {
        title: 'test2',
        from: 1,
        to: 2,
        key: 1,
      },
    ];

    wrapper = mount(
      <ActionList actions={[]} />,
    );


    expect(wrapper.find(Action)).toHaveLength(0);

    act(() => {
      wrapper.setProps({ actions });
    });

    expect(wrapper.find(Action)).toHaveLength(2);
  });
});
