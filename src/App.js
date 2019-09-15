import React, { Component } from "react";
import { compose } from "recompose";
import { withNamespaces } from "react-i18next";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import asyncComponent from "./hoc/asyncComponent";
import { path } from "ramda";

import logo from "./logo.svg";
import "./App.css";

// const AsyncServerRepair = asyncComponent(() => {
//   return import("./containers/ServerRepair/Loadable");
// });

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route exact path="/" component={null} />
        <Redirect to="/" />
      </Switch>
    );

    return (
      <div>
        {routes}
        {/* <LoadingSpinner /> */}
        {/* <ErrorPopup /> */}
        {/* <AsyncServerRepair /> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // loggedIn: state.auth.loggedIn,
    // isRepair: state.serverStatus.isRepair
    loggedIn: false,
    isRepair: false
  };
};

export default compose(
  withNamespaces("common", { wait: true }),
  withRouter,
  connect(
    mapStateToProps,
    {}
  )
)(App);
