import './SearchResultSection.css';
import React from 'react';
import SearchResult from './SearchResult';

export class SearchResultSection extends React.Component {
  render() {
    let content;
    if (this.props.searchResults?.length > 0) {
      const results = this.props.searchResults.map((result, i) => <SearchResult key={i} {...result} />);
      content = <div className="result-container">{results}</div>
    } else if (this.props.searchTerm) {
      const term = <span className="search-term">{this.props.searchTerm}</span>;
      const message = "No results found for";
      content = <div className="no-results">{message} {term}</div>;
    } else {
      content = <div className="initial-results">Search results will appear here</div>;
    }
    return (
      <div className="search-result-section">
        { content }
      </div>
    );
  }
}

export default SearchResultSection