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
      title: ["Devil"],
      year: "2010",
      director: [
        {
          name: "John Erick Dowdle"
        }
      ]
    },
    {
      title: [
        "Terror Train" // aka Devil's Railcar
      ],
      year: "1980",
      director: [
        {
          name: "Roger Spottiswoode"
        }
      ]
    },
    {
      title: [
        "The Devils"
      ],
      year: "1971",
      director: [
        {
          name: "Ken Russell"
        }
      ]
    }
  ],
  searchTerm: "devil"
}

export const AlternateTitles = Template.bind({});
AlternateTitles.args = {
  searchResults: [
    {
      title: [
        "The Awful Dr. Orlof",
        "The Demon Doctor",
        "Cries in the Night",
        "Screams in the Night",
        "The Diabolical Dr. Satan"
      ],
      year: "1962",
      director: [
        {
          name: "Jesùs Franco"
        }
      ]
    },
  ],
  searchTerm: "demon"
}

export const MultipleDirectors = Template.bind({});
MultipleDirectors.args = {
  searchResults: [
    {
      title: ["Casino Royale"],
      year: "1967",
      director: [
        {
          name: "Val Guest",
        },
        {
          name: "Ken Hughes"
        },
        {
          name: "John Huston"
        },
        {
          name: "Joseph McGrath"
        },
        {
          name: "Robert Parrish"
        },
        {
          name: "Richard Talmadge"
        }
      ]
    }
  ]
}

export const DirectorAliases = Template.bind({});
DirectorAliases.args = {
  searchResults: [
    {
      title: ["Mari-Cookie and the Killer Tarantula"],
      year: "1998",
      director: [
        {
          name: "Jesus Franco",
          alias: [
            "Jess Franco",
            "Clifford Brown Jr.",
            "James Lee Johnson",
            "Lennie Hayden",
            "Betty Carter",
            "Lulu Laverne"
          ]
        }
      ]
    }
  ]
}