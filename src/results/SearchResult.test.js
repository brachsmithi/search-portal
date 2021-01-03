import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchResult from './SearchResult';

Enzyme.configure({ adapter: new Adapter() });

it('displays given result', () => {
  const params = { title: "The Lost World" };
  const wrapper = mount(<SearchResult {...params} />);
  const els = wrapper.children("div").children("span");
  expect(els).toHaveLength(1);
  expect(els.text()).toMatch("The Lost World");
});