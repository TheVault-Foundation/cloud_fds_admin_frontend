import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import i18n from "i18next";
import { path } from "ramda";

class HomePage extends Component {
  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push("/admin");
    } else {
      this.props.history.push("/login");
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: path(["auth", "data", "access_token"], state)
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(HomePage)
);
