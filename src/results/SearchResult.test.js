import React from 'react';
import { fireEvent, render, screen } from "@testing-library/react";
import SearchResult from './SearchResult';

it('displays given result', () => {
  const params = { 
    title: ["The Lost World"],
    year: "1925",
    director: [
      {
        name: "Harry O. Hoyt"
      }
    ]
  };
  render(<SearchResult {...params} />);
  expect(screen.getByText("The Lost World")).toBeInTheDocument();
  expect(screen.getByText("(1925)")).toBeInTheDocument();
  expect(screen.getByText("Harry O. Hoyt")).toBeInTheDocument();
});

it('displays alternate titles', async () => {
  const params = {
    title: [
      "99 Women",
      "Women's Penitentiary XII",
      "Island of Despair",
      "Isle of Lost Women",
      "Prostitutes in Prison",
      "The Hot Death"
    ],
    year: "1969",
    director: [
      {
        name: "Jesùs Franco"
      }
    ]
  }
  render(<SearchResult {...params} />);
  expect(screen.getByText("99 Women")).toBeInTheDocument();
  expect(screen.getByText("(1969)")).toBeInTheDocument;
  expect(screen.getByText("Jesùs Franco")).toBeInTheDocument();

  fireEvent.click(screen.getByText("more titles"));
  expect(screen.getByText("Women's Penitentiary XII, Island of Despair, Isle of Lost Women, Prostitutes in Prison, The Hot Death")).toBeInTheDocument();

  fireEvent.click(screen.getByText("fewer titles"));
  expect(screen.queryByText("Women's Penitentiary XII, Island of Despair, Isle of Lost Women, Prostitutes in Prison, The Hot Death")).not.toBeInTheDocument();
});

it('displays additional directors', async () => {
  const params = {
    title: ["Ator, the Fighting Eagle"],
    year: "1982",
    director: [
      {
        name: "Joe D'Amato",
      },
      {
        name: "David Hills"
      },
      {
        name: "Michael Di Caprio"
      },
      {
        name: "Raf de Palma"
      },
      {
        name: "Alexandre Borsky"
      }
    ]
  }
  render(<SearchResult {...params} />);
  expect(screen.getByText("Ator, the Fighting Eagle")).toBeInTheDocument();
  expect(screen.getByText("(1982)")).toBeInTheDocument;
  expect(screen.getByText("Joe D'Amato")).toBeInTheDocument();

  fireEvent.click(screen.getByText("more directors"));
  expect(screen.getByText("David Hills, Michael Di Caprio, Raf de Palma, Alexandre Borsky")).toBeInTheDocument();

  fireEvent.click(screen.getByText("fewer directors"));
  expect(screen.queryByText("David Hills, Michael Di Caprio, Raf de Palma, Alexandre Borsky")).not.toBeInTheDocument();
});

it('displays alternate director names', async () => {
  const params = {
    title: ["The Whip and the Body"],
    year: "1963",
    director: [
      {
        name: "Mario Bava",
        alias: [
          "John M. Old",
          "John Old",
          "John Hold",
          "Mickey Lion"
        ]
      }
    ]
  }
  render(<SearchResult {...params} />);
  expect(screen.getByText("The Whip and the Body")).toBeInTheDocument();
  expect(screen.getByText("(1963)")).toBeInTheDocument;
  expect(screen.getByText("Mario Bava")).toBeInTheDocument();

  fireEvent.click(screen.getByText("(show aliases)"));
  expect(screen.getByText("John M. Old, John Old, John Hold, Mickey Lion")).toBeInTheDocument();

  fireEvent.click(screen.getByText("(hide aliases)"));
  expect(screen.queryByText("John M. Old, John Old, John Hold, Mickey Lion")).not.toBeInTheDocument();
});