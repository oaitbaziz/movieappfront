import React from "react";
import config from "config";
import noCover from "assets/img/no_cover.jpg";
import { useHistory } from "react-router-dom";

interface Props {
  id: number;
  name?: string;
  title?: string;
  poster_path?: string | null;
  media_type: string;
}

const SearchResultsItem: React.FC<Props> = ({
  id,
  poster_path,
  name,
  title,
  media_type,
}) => {
  const history = useHistory();
  const src = poster_path ? `${config.cdnPosters}${poster_path}` : noCover;

  const handleRedirect = () => {
    history.push(`/details/${media_type}/${id}`);
  };

  return (
    <div className="movie-card" key={id} onClick={handleRedirect}>
      <div className="movie-card__thumb">
        <img src={src} alt={name || title} className="card-img" />
      </div>
      <div className="movie-card__content pt-1">
        <div className="movie-card__title">{name || title}</div>
      </div>
    </div>
  );
};

export default SearchResultsItem;
