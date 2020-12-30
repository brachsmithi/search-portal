import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchButton from './SearchButton';

Enzyme.configure({ adapter: new Adapter() });

it('renders submit button with custom text', () => {
  const wrapper = mount(<SearchButton />);
  const button = wrapper.find('button');
  expect(button).toHaveLength(1);
  expect(button.prop('type')).toEqual('submit');
  expect(button.text()).toEqual('Search');
});