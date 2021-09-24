import React, { useState } from 'react';
import ActorGrid from '../components/actor/ActorGrid';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';

function Home() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');

  const isShowsSearch = searchOption === 'shows';

  const onInputChange = e => {
    setInput(e.target.value);
  };

  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then(data => setResults(data));
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
      return results[0].show ? (
        <ShowGrid data={results} />
      ) : (
        <ActorGrid data={results} />
      );
    }

    return null;
  }
  console.log(searchOption);

  function onRadioChange(e) {
    setSearchOption(e.target.value);
  }

  return (
    <>
      <MainPageLayout>
        <input
          type="text"
          placeholder="Search For Something"
          onChange={onInputChange}
          onKeyDown={onKeyDown}
          value={input}
        />

        <div>
          <label htmlFor="shows-search">
            Series
            <input
              id="shows-search"
              type="radio"
              name="series_search"
              value="shows"
              onChange={onRadioChange}
              checked={isShowsSearch}
            />
          </label>

          <label htmlFor="actors-search">
            Actors
            <input
              id="actors-search"
              type="radio"
              name="actors_search"
              value="people"
              onChange={onRadioChange}
              checked={!isShowsSearch}
            />
          </label>
        </div>
        <button type="button" onClick={onSearch}>
          Search
        </button>
        {renderResults()}
      </MainPageLayout>
    </>
  );
}

export default Home;
