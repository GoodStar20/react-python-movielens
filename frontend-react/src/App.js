import React from "react";
import { Route, withRouter, Switch } from "react-router-dom";

import Movies from "./pages/Movies";
import MovieInfo from "./pages/MovieInfo";

import "./index.scss";

const App = () => {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/" component={Movies} />
        <Route exact path="/info/:id" component={MovieInfo} />
      </Switch>
    </div>
  );
};

export default withRouter(App);
