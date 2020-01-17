import React from 'react';
import toJson from 'enzyme-to-json';
import FlipMove from 'react-flip-move';
import { ActionList, mapStateToProps } from '../../components/ActionList';
import Action from '../../components/Action';

const timeTravel = jest.fn();

describe('<ActionList />', () => {
  let wrapper;

  it('should render a loading component', () => {
    const actions = [];

    wrapper = shallow(
      <ActionList actions={actions} timeTravel={timeTravel} />,
    );

    expect(wrapper.find('.ActionList')).toHaveLength(1);
    expect(wrapper.find('.ActionList-loading')).toHaveLength(1);
    expect(wrapper.find('.ActionList-loading').childAt(0).text()).toBe('No actions commited');
    expect(wrapper.find('.ActionList-title')).toHaveLength(1);
    expect(wrapper.find(FlipMove)).toHaveLength(1);
    expect(wrapper.find(Action)).toHaveLength(0);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render a component with action list items', () => {
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
      <ActionList actions={actions} timeTravel={timeTravel} />,
    );

    expect(wrapper.find('.ActionList')).toHaveLength(1);
    expect(wrapper.find('.ActionList-loading')).toHaveLength(0);
    expect(wrapper.find('.ActionList-title')).toHaveLength(1);
    expect(wrapper.find(FlipMove)).toHaveLength(1);
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
});
