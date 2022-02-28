export const filterMoviesAndSeries = ({ media_type = "" }) =>
  media_type === "movie" || media_type === "tv";
