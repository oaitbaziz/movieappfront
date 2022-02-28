import axios from "axios";
import config from "config";

const { baseURL } = config;
const language = navigator.language;

const apiInstance = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  const params = {
    // api_key: apiKey,
    language,
  };

  const api = axios.create({
    baseURL,
    headers,
    params,
  });

  // Home
  const getWeeklyTrending = () => {
    return api.get("/trending/all/week");
  };

  // Search
  const getSearchResults = (params: object) => {
    return api.get("/search/multi", { params });
  };

  // Details
  interface DetailsParams {
    id: string;
  }

  const getDetails = (params: DetailsParams, type: string) => {
    const uri = type === "movie" ? "/movie" : "/tv";

    return api.get(`${uri}/${params.id}`, {
      params: { append_to_response: "videos" },
    });
  };

  return {
    getWeeklyTrending,
    getSearchResults,
    getDetails,
  };
};

const init = apiInstance();

export default init;
