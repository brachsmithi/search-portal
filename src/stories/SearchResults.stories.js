import React from 'react';

import { SearchResultSection } from '../results/SearchResultSection';
import '../results/SearchResultSection.css';

export default {
  title: 'SearchResults',
  component: SearchResultSection
};

const Template = (args) => <SearchResultSection {...args} />;

export const NoSearch = Template.bind({});
NoSearch.args = {
  searchResults: [],
  searchTerm: null
};

export const NoResults = Template.bind({});
NoResults.args = {
  searchResults: [],
  searchTerm: "voyage"
}

export const MultipleResults = Template.bind({});
MultipleResults.args = {
  searchResults: [
    {
      title: {
        id: "1",
        name: "Devil"
      },
      year: "2010",
      director: "John Erick Dowdle"
    },
    {
      title: {
        id: "2",
        name: "Terror Train" // aka Devil's Railcar
      },
      year: "1980",
      director: "Roger Spottiswoode"
    },
    {
      title: {
        id: "3",
        name: "The Devils"
      },
      year: "1971",
      director: "Ken Russell"
    }
  ],
  searchTerm: "devil"
}

export const AlternateTitles = Template.bind({});
AlternateTitles.args = {
  searchResults: [
    {
      title: {
        id: "1",
        name: "The Awful Dr. Orlof",
        alternateTitles: [
          "The Demon Doctor",
          "Cries in the Night",
          "Screams in the Night",
          "The Diabolical Dr. Satan"
        ]
      },
      year: "1962",
      director: "Jesùs Franco"
    },
  ],
  searchTerm: "demon"
}