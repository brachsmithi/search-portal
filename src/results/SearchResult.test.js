import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchResult from './SearchResult';

Enzyme.configure({ adapter: new Adapter() });

it('displays given result', () => {
  const params = { 
    title: {
      name: "The Lost World",
      id: "53"
    },
    year: "1925",
    director: "Harry O. Hoyt"
  };
  const wrapper = mount(<SearchResult {...params} />);
  console.log(wrapper.children("div").html())
  const els = wrapper.children("div").children("span");
  expect(els).toHaveLength(3);
  expect(els.at(0).text()).toMatch("The Lost World");
  expect(els.at(1).text()).toMatch("1925");
  expect(els.at(2).text()).toMatch("Harry O. Hoyt");
});