import React, { useState } from 'react';

export default class SearchResult extends React.Component {

  state = { showAlternateTitles: false, showDirectorAliases: false };

  render() {
    const onAlternateTitleClick = () => this.setState(prev => ({ showAlternateTitles: !prev.showAlternateTitles}))
    const onDirectorAliasClick = () => this.setState(prev => ({ showDirectorAliases: !prev.showDirectorAliases}))
    return (
      <>
        <div className="result-name">
          {this.props.title.name}
          {this.props.title.alternateTitles &&
            <div className="alternate-title-toggle" onClick={onAlternateTitleClick}>
              {this.state.showAlternateTitles ? "less" : "more"}
            </div>
          }
          {this.state.showAlternateTitles &&
              <div className="alternate-titles">
                {this.props.title.alternateTitles.map((title, i) => [
                  i > 0 && ", ",
                  title 
                ])}
              </div>
          }
        </div>
        <div className="result-year">({this.props.year})</div>
        <div className="result-director">
          {this.props.director.name}
          {this.props.director.aliases &&
            <div className="director-alias-toggle" onClick={onDirectorAliasClick}>
              {this.state.showDirectorAliases ? "less" : "more"}
            </div>
          }
          {this.state.showDirectorAliases &&
              <div className="director-aliases">
                {this.props.director.aliases.map((alias, i) => [
                  i > 0 && ", ",
                  alias 
                ])}
              </div>
          }
        </div>
      </>
    );
  }
}