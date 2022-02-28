import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "redux/store";

import Navbar from "components/Navbar";
import Home from "pages/Home";
import Search from "pages/Search";
import Notfound from "pages/Notfound";
import Error from "pages/Error";
import MovieDetails from "pages/MovieDetails";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/search" component={Search} />
          <Route
            exact
            path="/details/:mediaType/:id"
            component={MovieDetails}
          />
          <Route exact path="/error" component={Error} />
          <Route component={Notfound} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
