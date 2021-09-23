import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router';
import { apiGet } from '../misc/config';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS': {
      return { isLoading: false, error: null, show: action.show };
    }

    case 'FETCH_FAILED': {
      return { ...state, isLoading: false, error: action.error };
    }
    default:
      return state;
  }
};

const initialState = {
  show: null,
  isLoading: true,
  error: null,
};

function Show() {
  const { id } = useParams();

  const [{ show, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    let isMounted = true;

    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        setTimeout(() => {
          if (isMounted) {
            dispatch({ type: 'FETCH_SUCCESS', show: results });
          }
        }, 2000);
      })
      .catch(err => {
        if (isMounted) {
          dispatch({ type: 'FETCH_SUCCESS', error: err.message });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return <div>Date Is Loading</div>;
  }

  if (error) {
    return <div>Error Occured: {error}</div>;
  }

  return (
    <>
      <h1>This Is Show Page</h1>
    </>
  );
}

export default Show;
