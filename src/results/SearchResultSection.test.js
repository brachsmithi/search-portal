import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchResultSection from './SearchResultSection';

Enzyme.configure({ adapter: new Adapter() });

it('displays initial state', () => {
  const props = {
    searchTerm: null,
    searchResults: []
  };
  const wrapper = mount(<SearchResultSection {...props} />);
  expect(wrapper.text()).toMatch("Search results will appear here");
});

it('displays message for empty results', () => {
  const props = {
    searchTerm: 'london after midnight',
    searchResults: []
  };
  const wrapper = mount(<SearchResultSection {...props} />);
  expect(wrapper.text()).toMatch("No results found for london after midnight");
});

it('displays multiple results', () => {
  const props = {
    searchTerm: "clue",
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
  const els = wrapper.children();
  expect(els.text()).toMatch("Clue(1985)Jonathan LynnWithout a Clue(1988)Thom Eberhardt");
});