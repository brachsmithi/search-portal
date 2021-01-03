import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchResultSection from './SearchResultSection';

Enzyme.configure({ adapter: new Adapter() });

it('displays initial state', () => {
  const wrapper = mount(<SearchResultSection />);
  expect(wrapper.text()).toMatch("Search results will appear here");
});