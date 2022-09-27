import React from "react";
import { Route, withRouter, Switch } from "react-router-dom";

import Movies from "./pages/Movies";

import "./index.scss";

const App = () => {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/" component={Movies} />
      </Switch>
    </div>
  );
};

export default withRouter(App);
