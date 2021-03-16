import './App.css';
import configData from "./config.json";
import SearchForm from './form/SearchForm';
import SearchField from './form/SearchField';
import SearchButton from './form/SearchButton';
import SearchResultSection from './results/SearchResultSection';
import { useState } from 'react';
import SearchService from './services/SearchService';
require('dotenv').config();

function App() {
  const [searchResults, setSearchResults] = useState({})
  const searchService = new SearchService();
  const searchFormHandler = (data) => {
    searchService.findProgram(data.search_term)
      .then(result => {
        setSearchResults(result);
      })
      .catch(err => console.log(err));
  }
  return (
    <div className="App">
      <h1>Program Search Portal</h1>  
      <SearchForm onSubmit={searchFormHandler}>
        <SearchField />
        <SearchButton />
      </SearchForm>
      <SearchResultSection searchResults={searchResults} />
      <div className="footer">
        {configData.VERSION}
      </div>
    </div>
  );
}

export default App;
