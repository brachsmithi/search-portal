import React from 'react';

export default class SearchResult extends React.Component {
  render() {
    return (
      <div className="result-row">
        <span>{this.props.title}</span>
        <span>{this.props.year}</span>
        <span>{this.props.director}</span>
      </div>
    );
  }
}