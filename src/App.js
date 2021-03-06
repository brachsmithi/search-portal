import './App.css';
import SearchForm from './form/SearchForm';
import SearchField from './form/SearchField';
import SearchButton from './form/SearchButton';
import SearchResultSection from './results/SearchResultSection';

function App() {
  const searchFormHandler = () => {alert('button clicked')}
  return (
    <div className="App">
      <h1>Program Search Portal</h1>
      <SearchForm onSubmit={searchFormHandler}>
        <SearchField />
        <SearchButton />
      </SearchForm>
      <SearchResultSection />
    </div>
  );
}

export default App;
