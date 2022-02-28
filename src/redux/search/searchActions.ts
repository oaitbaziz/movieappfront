import { AppDispatch } from "redux/store";
import { filterMoviesAndSeries } from "utils";
import { FETCH_SEARCH } from "./searchTypes";
import apiInstance from "service/api";

// Action generator
export const fetchSearch = (query: string) => {
  return function fetchSearchThunk(dispatch: AppDispatch) {
    // Loading
    dispatch({
      type: FETCH_SEARCH,
      payload: { loading: true, error: false, notFound: false },
    });
    // Get search results
    const res = apiInstance.getSearchResults({ query });
    res
      .then((response) => {
        if (response.data.results.length) {
          // HTTP 200
          // Filter only movies & series
          const data = response.data.results.filter(filterMoviesAndSeries);
          dispatch({
            type: FETCH_SEARCH,
            payload: {
              data,
              page: response.data.page,
              totalPages: response.data.total_pages,
              error: false,
              notFound: false,
            },
          });
        } else {
          // Fix that 404 looking like a 200...
          dispatch({
            type: FETCH_SEARCH,
            payload: {
              data: [],
              notFound: true,
            },
          });
        }
      })
      .catch((error) => {
        // HTTP ERROR CODES & 500
        switch (error?.response?.status) {
          case 404:
          case 422:
            dispatch({
              type: FETCH_SEARCH,
              payload: {
                data: [],
                notFound: true,
              },
            });
            break;
          default:
            dispatch({
              type: FETCH_SEARCH,
              payload: {
                error: true,
              },
            });
        }
      })
      .finally(() => {
        dispatch({
          type: FETCH_SEARCH,
          payload: {
            loading: false,
          },
        });
      });
  };
};

// Handles loading pages on scroll
export const fetchSeachPage = (query: string) => {
  return function fetchSearchPageThunk(
    dispatch: AppDispatch,
    getState: () => { search: any }
  ) {
    // Loading
    dispatch({
      type: FETCH_SEARCH,
      payload: { loadingMore: true, error: false, notFound: false },
    });
    const state = getState();
    const { search } = state;

    // Get search results of n page
    const res = apiInstance.getSearchResults({ query, page: search.page + 1 });
    res
      .then((response) => {
        if (response.data.results.length) {
          // HTTP 200
          // Filter only movies & series
          const data = response.data.results.filter(filterMoviesAndSeries);
          dispatch({
            type: FETCH_SEARCH,
            payload: {
              data: [...search.data, ...data],
              page: response.data.page,
              totalPages: response.data.total_pages,
              error: false,
              notFound: false,
            },
          });
        }
      })
      .catch(() => {
        // // HTTP ERROR CODES & 500
        dispatch({
          type: FETCH_SEARCH,
          payload: {
            error: true,
          },
        });
      })
      .finally(() => {
        dispatch({
          type: FETCH_SEARCH,
          payload: {
            loadingMore: false,
          },
        });
      });
  };
};
