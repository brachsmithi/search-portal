import React from 'react';

export default class SearchResult extends React.Component {
  render() {
    return (
      <div key={this.props.title.id} className="result-row">
        <span>{this.props.title.name}</span>
        <span>{this.props.year}</span>
        <span>{this.props.director}</span>
      </div>
    );
  }
}