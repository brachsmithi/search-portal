import React from 'react';
import Enzyme, { mount } from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import SearchButton from './SearchButton';
import SearchForm from './SearchForm';

Enzyme.configure({ adapter: new Adapter() });

it('renders submit button with custom text', () => {
  const wrapper = mount(<SearchButton />);
  const button = wrapper.find('button');
  expect(button).toHaveLength(1);
  expect(button.prop('type')).toEqual('submit');
  expect(button.text()).toEqual('Search');
});

it('disables the submit button during submission and enables it when done', async () => {
  const onSubmitFn = jest.fn(async () => { await new Promise(resolve => resolve()); });
  const wrapper = document.createElement('div');
  ReactDOM.render(
    <SearchForm onSubmit={onSubmitFn}>
      <SearchButton>Click here</SearchButton>
    </SearchForm>,
    wrapper
  );
  const button = wrapper.querySelector('button');
  const form = wrapper.querySelector('form');
  TestUtils.Simulate.submit(form);
  expect(button.disabled).toBeTruthy();
  await onSubmitFn.mock.results[0].value;
  expect(button.disabled).toBeFalsy();
});