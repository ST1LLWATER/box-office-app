import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import { apiGet } from '../misc/config';

function Home() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);

  const onInputChange = e => {
    setInput(e.target.value);
  };

  const onSearch = () => {
    apiGet(`/search/shows?q=${input}`).then(data => setResults(data));
    setInput('');
  };

  function onKeyDown(e) {
    if (e.keyCode === 13) {
      onSearch();
      setInput('');
    }
  }

  function renderResults() {
    if (results && results.length === 0) {
      return <div>No Results</div>;
    }

    if (results && results.length > 0) {
      return (
        <div>
          {results.map(item => {
            return <div key={item.show.id}>{item.show.name}</div>;
          })}
        </div>
      );
    }

    return null;
  }

  return (
    <>
      <MainPageLayout>
        <input
          type="text"
          onChange={onInputChange}
          onKeyDown={onKeyDown}
          value={input}
        />
        <button type="button" onClick={onSearch}>
          Search
        </button>
        {renderResults()}
      </MainPageLayout>
    </>
  );
}

export default Home;
