import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchForm from './SearchForm';

Enzyme.configure({ adapter: new Adapter() });

it('calls onSubmit prop function when form is submitted', () => {
  const onSubmitFn = jest.fn();
  const wrapper = mount(<SearchForm onSubmit={onSubmitFn}/>);
  const form = wrapper.find('form');
  form.simulate('submit');
  expect(onSubmitFn).toHaveBeenCalledTimes(1);
});