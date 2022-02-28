import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { fetchSearch } from "redux/search/searchActions";
import { RESET_SEARCH } from "redux/search/searchTypes";
import { RootState } from "redux/store";

interface ItemShape {
  name: string;
  title: string;
  media_type: string;
  id: number;
  vote_average: number;
}

const Searchbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [value, setValue] = useState("");
  const { data } = useSelector((state: RootState) => state.search);

  // Show only pertinant results
  const bestResults = data.slice(0, 6);

  // Searchbar input ref
  const inputRef = useRef<HTMLInputElement>(null);

  // Autofocus input
  useEffect(() => {
    inputRef.current?.focus();

    // Clear search results
    if (data.length && !value.length) {
      dispatch({ type: RESET_SEARCH });
    }
  });

  // Request
  const fetchData = () => {
    dispatch(fetchSearch(value));
  };

  // From handlers
  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setValue(e.target.value);

    // Fetch results
    if (e.target.value.length >= 2) {
      fetchData();
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    history.push({
      pathname: "/search",
      search: `q=${value}`,
    });
  };

  return (
    <form className="search-box search-form d-flex" onSubmit={handleSubmit}>
      <div className="input-group mb-3">
        <div
          className={`autocomplete ${
            bestResults?.length ? "autocomplete--is-visible" : ""
          }`}
        >
          <input
            ref={inputRef}
            className="search form-control"
            type="search"
            placeholder="Rechercher un film, une série, une émission télévisée..."
            aria-label="search"
            onChange={handleChange}
            value={value}
            required
          />
          {data?.length ? (
            <div className="autocomplete__list">
              {bestResults?.map((item: ItemShape) => (
                <Link
                  to={`/details/${item.media_type}/${item.id}`}
                  key={item.id}
                >
                  <div className="autocomplete__item">
                    <p className="fw-bold d-inline">
                      {item.name || item.title}
                    </p>{" "}
                    -{" "}
                    {item.media_type === "movie" ? (
                      <span className="badge bg-dark">Film</span>
                    ) : (
                      <span className="badge bg-danger">Série</span>
                    )}
                    {/* , {`${item.vote_average * 10}%`} */}
                  </div>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
        <button className="btn btn-primary" type="submit">
          Rechercher
        </button>
      </div>
    </form>
  );
};

export default Searchbar;
