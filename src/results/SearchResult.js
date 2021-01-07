import React from 'react';

export default class SearchResult extends React.Component {
  render() {
    return (
      <>
        <span className="result-name">{this.props.title.name}</span>
        <span className="result-year">({this.props.year})</span>
        <span className="result-director">{this.props.director}</span>
      </>
    );
  }
}