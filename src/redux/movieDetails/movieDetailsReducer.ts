import { FETCH_DETAILS } from "./movieDetailsTypes";

const initialState = {
  data: {},
  loading: false,
  error: false,
  notFound: false,
};

const movieDetailsReducer = (
  state = initialState,
  action: { type: string; payload: object }
) => {
  switch (action.type) {
    case FETCH_DETAILS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default movieDetailsReducer;
