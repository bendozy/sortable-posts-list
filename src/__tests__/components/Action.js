import React from 'react';
import toJson from 'enzyme-to-json';
import Action from '../../components/Action';

describe('<Action />', () => {
  let wrapper;
  const timeTravel = jest.fn();

  beforeEach(() => {
    const action = {
      title: 'test',
      from: 0,
      to: 1,
    };
    wrapper = shallow(
      <Action timeTravel={timeTravel} action={action} index={0} />,
    );

    wrapper.find('.Action-button').simulate('click');
  });

  it('should render a <Action /> component', () => {
    expect(wrapper.find('.Action')).toHaveLength(1);
    expect(wrapper.find('.Action-message')).toHaveLength(1);
    expect(wrapper.find('.Action-message').text()).toBe('Moved test from index 0 to index 1');
    expect(wrapper.find('.Action-button').text()).toBe('Time Travel');
    expect(timeTravel.mock.calls.length).toBe(1);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
