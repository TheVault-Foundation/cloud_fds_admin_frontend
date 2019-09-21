import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DashBoard from "components/DashBoard";
import { path } from "ramda";
import { logout } from "redux/actions";

class DashBoardContainer extends Component {
  componentDidMount() {
      if (!this.props.isAuthenticated) {
          this.props.history.push("/");
      }
  }

  onLogoutClick = () => {
    this.props.logout();
    this.props.history.push("/");
  }

  render() {
    return <DashBoard {...this.props} onLogoutClick={this.onLogoutClick} />;
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
    {
        logout
    }
  )(DashBoardContainer)
);
