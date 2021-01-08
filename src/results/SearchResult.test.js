import React from 'react';
import { getByText, queryByText, fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import SearchResult from './SearchResult';

it('displays given result', () => {
  const params = { 
    title: {
      name: "The Lost World",
      id: "53"
    },
    year: "1925",
    director: "Harry O. Hoyt"
  };
  render(<SearchResult {...params} />);
  expect(screen.getByText("The Lost World")).toBeInTheDocument();
  expect(screen.getByText("(1925)")).toBeInTheDocument();
  expect(screen.getByText("Harry O. Hoyt")).toBeInTheDocument();
});

it('displays alternate titles', async () => {
  const params = {
    title: {
      name: "99 Women",
      id: "242",
      alternateTitles: [
        "Women's Penitentiary XII",
        "Island of Despair",
        "Isle of Lost Women",
        "Prostitutes in Prison",
        "The Hot Death"
      ]
    },
    year: "1969",
    director: "Jesùs Franco"
  }
  render(<SearchResult {...params} />);
  expect(screen.getByText("99 Women")).toBeInTheDocument();
  expect(screen.getByText("(1969)")).toBeInTheDocument;
  expect(screen.getByText("Jesùs Franco")).toBeInTheDocument();

  fireEvent.click(screen.getByText("more"));
  expect(screen.getByText("Women's Penitentiary XII, Island of Despair, Isle of Lost Women, Prostitutes in Prison, The Hot Death")).toBeInTheDocument();

  fireEvent.click(screen.getByText("less"));
  expect(screen.queryByText("Women's Penitentiary XII, Island of Despair, Isle of Lost Women, Prostitutes in Prison, The Hot Death")).not.toBeInTheDocument();
});