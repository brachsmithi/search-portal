import React from 'react'
import { screen, render, fireEvent, act } from '@testing-library/react'
import App from './App';
import configData from "./config.json"

describe('App', () => {
  const originalSource = configData.DATA_SOURCE;

  beforeEach(() => {
    const mockResponse = {
      "program": [
        {
          "title": [
            "It! The Terror From Beyond Space"
          ],
          "year": "1958",
          "director": [
            {
              "name": "Edward L. Cahn"
            }
          ],
          "search_field": "It The Terror From Beyond Space"
        }
      ]
    };
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse)
    })
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    configData.DATA_SOURCE = "LOCAL";
  });
  
  afterEach(() => {
    document.body.removeChild(container);
    container = null;
    configData.DATA_SOURCE = originalSource;
  });

  test('renders screen', () => {
    render(<App />);
    const header = screen.getByText(/Program Search Portal/i);
    expect(header).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Title Search')).toBeInTheDocument();
    expect(screen.getByText('Search results will appear here')).toBeInTheDocument();
    expect(screen.getByText(configData.VERSION)).toBeInTheDocument();
  });

  test('displays search results', async () => {
    const utils = render(<App />)
    const input = utils.container.querySelector('input');
    const button = utils.container.querySelector('button');

    fireEvent.change(input, { target: { value: 'space' } });
    await act( async () => {
      fireEvent.click(button);
      await new Promise(resolve => setTimeout(resolve));
    });

    expect(utils.container.textContent.indexOf('It! The Terror From Beyond Space')).toBeGreaterThanOrEqual(0);
    expect(utils.container.textContent.indexOf('(1958)')).toBeGreaterThanOrEqual(0);
    expect(utils.container.textContent.indexOf('Edward L. Cahn')).toBeGreaterThanOrEqual(0);
  })
  
})