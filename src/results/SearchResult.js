import React from 'react';

export default class SearchResult extends React.Component {

  render() {
    var additionalNameTexts = {show: "show aliases", hide: "hide aliases"};
    var additionalDirectorTexts = {show: "more directors", hide: "fewer directors"};
    var secondaryResultTexts = {show: "more titles", hide: "fewer titles"};
    return (
      <>
        <ExpandableResult 
          isPrimary={true}
          mainResult={this.props.title[0]}
          secondaryResults={this.props.title.slice(1,this.props.title.length)}
          secondaryResultTexts={secondaryResultTexts}
         />
        <div className="result-year">({this.props.year})</div>
        <ExpandableResult
          mainResult={this.props.director[0]?.name}
          mainResultAdditional={this.props.director[0]?.alias}
          mainResultAdditionalTexts={additionalNameTexts}
          secondaryResults={this.props.director.slice(1, this.props.director.length)?.map((director) => director.name)}
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
        {this.props.mainResultAdditional?.length > 0 &&
          <span className="expansion-toggle" onClick={onAdditionalMainClick}>
            &nbsp;({this.state.expandAdditionalMain ? this.props.mainResultAdditionalTexts.hide : this.props.mainResultAdditionalTexts.show})
          </span>
        }
        {this.state.expandAdditionalMain &&
          <div className="additional-main">
            {delimitedJoin(this.props.mainResultAdditional)}
          </div>
        }
        {(this.props.secondaryResults?.length > 0) &&
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