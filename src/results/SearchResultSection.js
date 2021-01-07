import React from 'react';
import SearchResult from './SearchResult';

export class SearchResultSection extends React.Component {
  render() {
    let content;
    if (this.props.searchResults?.length > 0) {
      content = this.props.searchResults.map((result) => <SearchResult key={result.title.id} {...result} />);
    } else if (this.props.searchTerm) {
      const message = `No results found for ${this.props.searchTerm}`;
      content = <p>{message}</p>;
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

export default SearchResultSection