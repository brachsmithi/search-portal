import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchResultSection from './SearchResultSection';

Enzyme.configure({ adapter: new Adapter() });

it('displays initial state', () => {
  const props = {
    searchResults: []
  };
  const wrapper = mount(<SearchResultSection {...props} />);
  expect(wrapper.text()).toMatch("Search results will appear here");
});

it('displays multiple results', () => {
  const props = {
    searchResults: [
      {
        title: {
          name: "Clue",
          id: "232"
        },
        year: "1985",
        director: "Jonathan Lynn"
      },
      {
        title: {
          name: "Without a Clue",
          id: "43"
        },
        year: "1988",
        director: "Thom Eberhardt"
      }
    ]
  };
  const wrapper = mount(<SearchResultSection {...props} />);
  const els = wrapper.children("div").children();
  expect(els).toHaveLength(2);
  expect(els.at(0).text()).toMatch("Clue1985Jonathan Lynn");
  expect(els.at(1).text()).toMatch("Without a Clue1988Thom Eberhardt");
});