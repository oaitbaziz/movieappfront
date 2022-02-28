import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import homeReducer from "./home/homeReducer";
import searchReducer from "./search/searchReducer";
import movieDetailsReducer from "./movieDetails/movieDetailsReducer";

const rootReducer = combineReducers({
  home: homeReducer,
  search: searchReducer,
  details: movieDetailsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
