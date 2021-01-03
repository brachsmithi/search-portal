import React from 'react';

export default class SearchResult extends React.Component {
  render() {
    return (
      <div className="result-row">
        <span>{this.props.title}</span>
      </div>
    );
  }
}