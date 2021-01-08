import React from 'react';
import { fireEvent, render, screen } from "@testing-library/react";
import SearchResult from './SearchResult';

it('displays given result', () => {
  const params = { 
    title: {
      name: "The Lost World",
      id: "53"
    },
    year: "1925",
    director: {
      name: "Harry O. Hoyt"
    }
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
    director: {
      name: "Jesùs Franco"
    }
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

it('displays director aliases', async () => {
  const params = {
    title: {
      name: "Ator, the Fighting Eagle",
      id: "98",
    },
    year: "1982",
    director: {
      name: "Joe D'Amato",
      aliases: [
        "David Hills",
        "Michael Di Caprio",
        "Raf de Palma",
        "Alexandre Borsky"
      ]
    }
  }
  render(<SearchResult {...params} />);
  expect(screen.getByText("Ator, the Fighting Eagle")).toBeInTheDocument();
  expect(screen.getByText("(1982)")).toBeInTheDocument;
  expect(screen.getByText("Joe D'Amato")).toBeInTheDocument();

  fireEvent.click(screen.getByText("more"));
  expect(screen.getByText("David Hills, Michael Di Caprio, Raf de Palma, Alexandre Borsky")).toBeInTheDocument();

  fireEvent.click(screen.getByText("less"));
  expect(screen.queryByText("David Hills, Michael Di Caprio, Raf de Palma, Alexandre Borsky")).not.toBeInTheDocument();
});