import React from 'react';

export default class SearchResult extends React.Component {

  render() {
    var additionalNameTexts = {show: "show aliases", hide: "hide aliases"};
    var additionalDirectorTexts = {show: "more directors", hide: "fewer directors"};
    var secondaryResultTexts = {show: "more", hide: "less"};
    return (
      <>
        <ExpandableResult 
          isPrimary={true}
          mainResult={this.props.title.name}
          secondaryResults={this.props.title.alternateTitles}
          secondaryResultTexts={secondaryResultTexts}
         />
        <div className="result-year">({this.props.year})</div>
        <ExpandableResult
          mainResult={this.props.director.name}
          mainResultAdditional={this.props.director.aliases}
          mainResultAdditionalTexts={additionalNameTexts}
          secondaryResults={this.props.additionalDirectors?.map((director) => director.name)}
          secondaryResultTexts={additionalDirectorTexts}
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
    const delimitedJoin = (arr) => arr.map((entry, i) => [
      i > 0 && ", ",
      entry
    ]);
    return (
      <div>
        <span className={className}>{this.props.mainResult}</span>
        {this.props.mainResultAdditional &&
          <span className="expansion-toggle" onClick={onAdditionalMainClick}>
            &nbsp;({this.state.expandAdditionalMain ? this.props.mainResultAdditionalTexts.hide : this.props.mainResultAdditionalTexts.show})
          </span>
        }
        {this.state.expandAdditionalMain &&
          <div className="additional-main">
            {delimitedJoin(this.props.mainResultAdditional)}
          </div>
        }
        {this.props.secondaryResults &&
          <div className="expansion-toggle" onClick={onSecondaryResultsClick}>
            {this.state.expandSecondaryResults ? this.props.secondaryResultTexts.hide : this.props.secondaryResultTexts.show}
          </div>
        }
        {this.state.expandSecondaryResults &&
          <div className="secondary-results">
            {delimitedJoin(this.props.secondaryResults)}
          </div>
        }
      </div>
    );
  }
}