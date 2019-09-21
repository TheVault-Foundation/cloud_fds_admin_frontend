import React, { Component } from "react";
import { compose } from "recompose";
import { withNamespaces } from "react-i18next";
import { BrowserRouter, Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import asyncComponent from "./hoc/asyncComponent";
import { path } from "ramda";

import logo from "./logo.svg";
import "./App.css";
// plugins styles from node_modules
import "react-notification-alert/dist/animate.css";
// plugins styles downloaded
import "assets/vendor/fullcalendar/dist/fullcalendar.min.css";
import "assets/vendor/sweetalert2/dist/sweetalert2.min.css";
import "assets/vendor/select2/dist/css/select2.min.css";
import "assets/vendor/quill/dist/quill.core.css";
import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
// core styles
import "assets/scss/argon-dashboard-pro-react.scss";

// const AsyncServerRepair = asyncComponent(() => {
//   return import("./containers/ServerRepair/Loadable");
// });

const HomePage = asyncComponent(() => {
  return import("./containers/HomePage/Loadable");
});

const LoginPage = asyncComponent(() => {
  return import("./containers/LoginPage/Loadable");
});

const SignUpPage = asyncComponent(() => {
  return import("./containers/SignUpPage/Loadable");
});

const DashBoard = asyncComponent(() => {
  return import("./containers/DashBoard/Loadable");
});

class App extends Component {

  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/admin" render={props => <DashBoard {...props} />} />
        <Redirect to="/" />
      </Switch>
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
