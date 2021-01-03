import React from 'react';
import FormContext from './FormContext';

export default class SearchForm extends React.Component {
  state = { data: {}, isSubmitting: false };

  onSubmit = async e => {
    e.preventDefault();
    this.setState({ isSubmitting: true });
    await this.props.onSubmit(this.state.data);
    this.setState({ isSubmitting: false });
  }

  getInputValue = (name, defaultValue = "") => {
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
      <FormContext.Provider 
          value={{ 
            getInputValue: this.getInputValue, 
            inputChange: this.inputChange, 
            isSubmitting: this.state.isSubmitting }}>
        <form method="post" onSubmit={this.onSubmit}>
          {this.props.children}
        </form>
      </FormContext.Provider>
    );
  }
}