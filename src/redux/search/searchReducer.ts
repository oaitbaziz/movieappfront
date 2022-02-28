import { FETCH_SEARCH, RESET_SEARCH } from "./searchTypes";

const initialState = {
  data: [],
  loading: false,
  error: false,
  notFound: false,
  loadingMore: false,
  totalPages: 0,
  page: 1,
};

const searchReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case FETCH_SEARCH:
      return {
        ...state,
        ...action.payload,
      };
    case RESET_SEARCH:
      return initialState;
    default:
      return state;
  }
};

export default searchReducer;
