import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import SearchForm from './SearchForm';
import SearchField from './SearchField';

describe('SearchForm', () => {

  it("gets the form state from onSubmit function", () => {
    const wrapper = document.createElement("div");
    const onSubmitFn = jest.fn(data => data);
    ReactDOM.render(
      <SearchForm onSubmit={onSubmitFn}>
        <SearchField />;
      </SearchForm>,
      wrapper
    );
    const input = wrapper.querySelector("input");
    const form = wrapper.querySelector("form");
    TestUtils.Simulate.change(input, { target: { value: "forbidden planet" } });
    TestUtils.Simulate.submit(form);
    expect(onSubmitFn).toHaveBeenCalledTimes(1);
    expect(onSubmitFn.mock.results[0].value).toEqual({ "search_term": "forbidden planet" });
  });

})