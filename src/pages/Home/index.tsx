import React, { useCallback, useEffect } from "react";
import Slider from "./components/Slider";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrending } from "redux/home/homeActions";
import { RootState } from "redux/store";
import Loading from "components/Loading";
import { useHistory } from "react-router-dom";
import Searchbar from "./components/Searchbar";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { loading, error, data } = useSelector(
    (state: RootState) => state.home
  );

  const fetchData = useCallback(() => {
    dispatch(fetchTrending());
  }, [dispatch]);

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
      <div className="page-wrap home-page">
        <div className="wlc-card">
          <h2 className="wlc-card__title">
            Retrouvez un choix illimité de films et séries !
          </h2>
          <Searchbar />
        </div>
        <Slider data={data} />
      </div>
    </main>
  );
};

export default Home;
