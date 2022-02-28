import React, { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { useQuery } from "hooks";
import { useInfiniteScroll } from "react-infinite-scroll-hook";

import { fetchSeachPage, fetchSearch } from "redux/search/searchActions";
import SearchResultsContainer from "./components/SearchResultsContainer";
import Loading from "components/Loading";
import Heading from "components/Heading";

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const query = useQuery().get("q") || "";

  const { data, loading, error, totalPages, page, loadingMore, notFound } =
    useSelector((state: RootState) => state.search);

  const handleLoadMore = () => {
    dispatch(fetchSeachPage(query));
  };

  const infiniteRef = useInfiniteScroll<HTMLDivElement>({
    loading: loadingMore,
    hasNextPage: page < totalPages,
    onLoadMore: handleLoadMore,
  });

  const fetchData = useCallback(() => {
    dispatch(fetchSearch(query));
  }, [dispatch, query]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (error) {
    history.push("/error");
    return <></>;
  }

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  return (
    <main>
      <div className="page-wrap search-page">
        <div className="container" ref={infiniteRef}>
          <h1 className="h2 pb-2 pb-md-3">
            {notFound ? (
              <Heading text={`Pas de résultat de recherche pour "${query}"`} />
            ) : (
              <Heading text={`Votre résultat de recherche pour "${query}"`} />
            )}
          </h1>
          <SearchResultsContainer data={data} />
        </div>
      </div>
    </main>
  );
};

export default Search;
