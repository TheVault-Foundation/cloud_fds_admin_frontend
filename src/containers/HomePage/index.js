import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import i18n from "i18next";

class HomePage extends Component {
  componentDidMount() {
    this.props.history.push("/login");
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: false
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(HomePage)
);
