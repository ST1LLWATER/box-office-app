import React, { useState, useCallback } from 'react';
import ActorGrid from '../components/actor/ActorGrid';
import CustomRadio from '../components/CustomRadio';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';
import {
  SearchInput,
  RadioInputsWrapper,
  SearchButtonWrapper,
} from './Home.styled';

function Home() {
  const [input, setInput] = useLastQuery();
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

  const onRadioChange = useCallback(e => {
    setSearchOption(e.target.value);
  }, []);

  return (
    <>
      <MainPageLayout>
        <SearchInput
          type="text"
          placeholder="Search For Something"
          onChange={onInputChange}
          // eslint-disable-next-line
          onKeyDown={onKeyDown}
          value={input}
        />

        <RadioInputsWrapper>
          <div>
            <CustomRadio
              label="Shows"
              id="shows-search"
              value="shows"
              onChange={onRadioChange}
              checked={isShowsSearch}
            />
          </div>
          <div>
            <CustomRadio
              label="Actors"
              id="actors-search"
              value="people"
              onChange={onRadioChange}
              checked={!isShowsSearch}
            />
          </div>
        </RadioInputsWrapper>
        <SearchButtonWrapper>
          <button type="button" onClick={onSearch}>
            Search
          </button>
        </SearchButtonWrapper>
        {renderResults()}
      </MainPageLayout>
    </>
  );
}

export default Home;
