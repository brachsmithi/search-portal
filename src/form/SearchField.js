import React from 'react';
import FormContext from './FormContext';

export default class TextInput extends React.Component {
  static contextType = FormContext;
  render() {
    return (
      <div className="input-row">
        <input
          type="text"
          name="search_term"
          id="search_term"
        />
      </div>
    );
  }
}