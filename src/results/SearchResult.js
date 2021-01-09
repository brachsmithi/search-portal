import React from 'react';

export default class SearchResult extends React.Component {

  render() {
    return (
      <>
        <ExpandableResult 
          isPrimary={true}
          mainResult={this.props.title.name}
          secondaryResults={this.props.title.alternateTitles}
         />
        <div className="result-year">({this.props.year})</div>
        <ExpandableResult
          mainResult={this.props.director.name}
          secondaryResults={this.props.additionalDirectors?.map((director) => director.name)}
         />
      </>
    );
  }
}

class ExpandableResult extends React.Component {
  state = { expand: false };
  render() {
    const className = this.props.isPrimary ? "result-primary" : "result-standard";
    const onClick = () => this.setState(prev => ({ expand: !prev.expand}));
    return (
      <div>
        <span className={className}>{this.props.mainResult}</span>
        {this.props.secondaryResults &&
          <div className="expansion-toggle" onClick={onClick}>
            {this.state.expand ? "less" : "more"}
          </div>
        }
        {this.state.expand &&
          <div className="secondary-results">
            {this.props.secondaryResults.map((result, i) => [
              i > 0 && ", ",
              result
            ])}
          </div>
        }
      </div>
    );
  }
}