import { AppDispatch } from "redux/store";
import { FETCH_DETAILS } from "./movieDetailsTypes";
import apiInstance from "service/api";

export const fetchDetails = (id: string, type: string) => {
  return async function fetchDetailsThunk(dispatch: AppDispatch) {
    // Loading
    dispatch({
      type: FETCH_DETAILS,
      payload: { loading: true, error: false, notFound: false },
    });

    // Fetch data
    const res = apiInstance.getDetails({ id }, type);
    res
      .then((response) => {
        if (Object.keys(response.data).length) {
          // HTTP 200
          dispatch({
            type: FETCH_DETAILS,
            payload: {
              data: response.data,
              error: false,
            },
          });
        }
      })
      .catch((error) => {
        switch (error?.response?.status) {
          case 404:
            dispatch({
              type: FETCH_DETAILS,
              payload: {
                data: [],
                notFound: true,
              },
            });
            break;
          default:
            dispatch({
              type: FETCH_DETAILS,
              payload: {
                error: true,
              },
            });
        }
      })
      .finally(() => {
        dispatch({
          type: FETCH_DETAILS,
          payload: {
            loading: false,
          },
        });
      });
  };
};
