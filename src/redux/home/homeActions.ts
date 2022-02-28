import { AppDispatch } from "redux/store";
import { FETCH_TRENDING } from "./homeTypes";
import apiInstance from "service/api";
import { filterMoviesAndSeries } from "utils";

export const fetchTrending = () => {
  return async function fetchTrendingThunk(dispatch: AppDispatch) {
    // Loading
    dispatch({
      type: FETCH_TRENDING,
      payload: { loading: true, error: false },
    });

    // Fetch data
    const res = apiInstance.getWeeklyTrending();

    res
      .then((response) => {
        if (response.data.results.length) {
          // HTTP 200
          // Filter only movies & series
          const data = response.data.results.filter(filterMoviesAndSeries);
          dispatch({
            type: FETCH_TRENDING,
            payload: {
              data,
              error: false,
            },
          });
        }
      })
      .catch(() => {
        // HTTP ERROR CODES & 500
        dispatch({
          type: FETCH_TRENDING,
          payload: {
            error: true,
          },
        });
      })
      .finally(() => {
        dispatch({
          type: FETCH_TRENDING,
          payload: {
            loading: false,
          },
        });
      });
  };
};
