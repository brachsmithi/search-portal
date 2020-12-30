import React from 'react';
import FormContext, { SEARCH_TERM } from './FormContext';

export default class TextInput extends React.Component {
  static contextType = FormContext;
  render() {
    return (
      <div className="input-row">
        <input
          type="text"
          name="search_term"
          id="search_term"
          onChange={this.context.inputChange(SEARCH_TERM)}
          value={this.context.getInputValue(SEARCH_TERM)}
        />
      </div>
    );
  }
}