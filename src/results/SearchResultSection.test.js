import React from 'react';
import { render, screen } from "@testing-library/react";
import SearchResultSection from './SearchResultSection';

it('displays initial state', () => {
  const props = {
    searchTerm: null,
    searchResults: []
  };
  render(<SearchResultSection {...props} />);
  expect(screen.getByText("Search results will appear here")).toBeInTheDocument();
});

it('displays message for empty results', () => {
  const props = {
    searchTerm: 'london after midnight',
    searchResults: []
  };
  render(<SearchResultSection {...props} />);
  expect(screen.getByText("No results found for")).toBeInTheDocument();
  expect(screen.getByText("london after midnight")).toBeInTheDocument();
});

it('displays multiple results', () => {
  const props = {
    searchTerm: "clue",
    searchResults: [
      {
        title: ["Clue"],
        year: "1985",
        director: [
          {
            name: "Jonathan Lynn"
          }
        ]
      },
      {
        title: ["Without a Clue"],
        year: "1988",
        director: [
          {
            name: "Thom Eberhardt"
          }
        ]
      }
    ]
  };
  render(<SearchResultSection {...props} />);
  expect(screen.getByText("Clue")).toBeInTheDocument();
  expect(screen.getByText("(1985)")).toBeInTheDocument();
  expect(screen.getByText("Jonathan Lynn")).toBeInTheDocument();
  expect(screen.getByText("Without a Clue")).toBeInTheDocument();
  expect(screen.getByText("(1988)")).toBeInTheDocument();
  expect(screen.getByText("Thom Eberhardt")).toBeInTheDocument();
});