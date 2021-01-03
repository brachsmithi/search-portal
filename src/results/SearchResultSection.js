import React from 'react';
import SearchResult from './SearchResult';

export default class SearchResultSection extends React.Component {
  render() {
    let content;
    if (this.props.searchResults.length > 0) {
      content = this.props.searchResults.map((result) => <SearchResult key={result.title.id} {...result} />);
    } else {
      content = <p>Search results will appear here</p>;
    }
    return (
      <div className="search-result-section">
        { content }
      </div>
    );
  }
}