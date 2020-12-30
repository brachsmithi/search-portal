import React from 'react';
import FormContext from './FormContext';

export default class SearchForm extends React.Component {
  state = { data: {} };

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.data);
  }

  getInputValue = (name, defaultValue = '') => {
    return this.state.data[name] || defaultValue;
  }

  inputChange = name => e => {
    const targetValue = e.target.value;
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [name]: targetValue
      }
    }));
  }

  render() {
    return (
      <FormContext.Provider value={{ getInputValue: this.getInputValue, inputChange: this.inputChange }}>
        <form method="post" onSubmit={this.onSubmit}>
          {this.props.children}
        </form>
      </FormContext.Provider>
    );
  }
}