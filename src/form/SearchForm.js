import React from 'react';
import FormContext from './FormContext';

export default class SearchForm extends React.Component {
  state = { data: {} };
  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit();
  }
  render() {
    return (
      <FormContext.Provider value={null}>
        <form method="post" onSubmit={this.onSubmit}>
          {this.props.children}
        </form>
      </FormContext.Provider>
    );
  }
}