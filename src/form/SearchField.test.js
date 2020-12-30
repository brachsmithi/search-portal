import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchField from './SearchField';
import Form from './Form.js';

Enzyme.configure({ adapter: new Adapter() });

it('renders text input', () => {
  const wrapper = mount(<SearchField />);
  const input = wrapper.find('input');
  expect(input).toHaveLength(1);
  expect(input.prop('type')).toEqual('text');
  expect(input.prop('name')).toEqual('search_term');
  expect(input.prop('id')).toEqual('search_term');
});