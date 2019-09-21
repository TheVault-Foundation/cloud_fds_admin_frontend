import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DashBoard from "../../components/DashBoard";
import { path } from "ramda";

class DashBoardContainer extends Component {
  componentDidMount() {
      if (!this.props.isAuthenticated) {
          this.props.history.push("/");
      }
  }

  render() {
    return <DashBoard {...this.props} />;
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
  )(DashBoardContainer)
);
