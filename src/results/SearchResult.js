import React from 'react';

export default class SearchResult extends React.Component {

  render() {
    var additionalTexts = {show: "show aliases", hide: "hide aliases"};
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
          mainResultAdditional={this.props.director.aliases}
          mainResultAdditionalTexts={additionalTexts}
          secondaryResults={this.props.additionalDirectors?.map((director) => director.name)}
         />
      </>
    );
  }
}

class ExpandableResult extends React.Component {
  state = { expandSecondaryResults: false, expandAdditionalMain: false };
  render() {
    const className = this.props.isPrimary ? "result-primary" : "result-standard";
    const onSecondaryResultsClick = () => this.setState(prev => ({ expandSecondaryResults: !prev.expandSecondaryResults}));
    const onAdditionalMainClick = () => this.setState(prev => ({ expandAdditionalMain: !prev.expandAdditionalMain}));
    return (
      <div>
        <span className={className}>{this.props.mainResult}</span>
        {this.props.mainResultAdditional &&
          <span className="expansion-toggle" onClick={onAdditionalMainClick}>
            ({this.state.expandAdditionalMain ? this.props.mainResultAdditionalTexts.hide : this.props.mainResultAdditionalTexts.show})
            </span>
        }
        {this.state.expandAdditionalMain &&
          <span>
            {
              this.props.mainResultAdditional.map((additional, i) => [
                i > 0 && ", ",
                additional
              ])}
          </span>
        }
        {this.props.secondaryResults &&
          <div className="expansion-toggle" onClick={onSecondaryResultsClick}>
            {this.state.expandSecondaryResults ? "less" : "more"}
          </div>
        }
        {this.state.expandSecondaryResults &&
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