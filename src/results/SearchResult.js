import React, { useState } from 'react';

export default class SearchResult extends React.Component {

  render() {
    return (
      <>
        <TitleResult {...this.props.title} />
        <div className="result-year">({this.props.year})</div>
        <DirectorResult {...this.props.director} />
      </>
    );
  }
}

export class TitleResult extends React.Component {
  state = { show: false };

  render() {
    const onClick = () => this.setState(prev => ({ show: !prev.show}))
    return (
      <div className="result-name">
        {this.props.name}
        {this.props.alternateTitles &&
          <div className="alternate-title-toggle" onClick={onClick}>
            {this.state.show ? "less" : "more"}
          </div>
        }
        {this.state.show &&
            <div className="alternate-titles">
              {this.props.alternateTitles.map((title, i) => [
                i > 0 && ", ",
                title 
              ])}
            </div>
        }
      </div>
    )
  }
}

export class DirectorResult extends React.Component {
  state = { show: false };
  
  render() {
    const onClick = () => this.setState(prev => ({ show: !prev.show}))
    return (
      <div className="result-director">
        {this.props.name}
        {this.props.aliases &&
          <div className="director-alias-toggle" onClick={onClick}>
            {this.state.show ? "less" : "more"}
          </div>
        }
        {this.state.show &&
            <div className="director-aliases">
              {this.props.aliases.map((alias, i) => [
                i > 0 && ", ",
                alias 
              ])}
            </div>
        }
      </div>
    )
  }
}