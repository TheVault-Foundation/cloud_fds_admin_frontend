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
  };

  onSettingItemClick = () => {
    this.props.history.push("/admin/settings");
  }

  render() {
    const { user } = this.props;
    return (
      <DashBoard
        {...this.props}
        onLogoutClick={this.onLogoutClick}
        user={user}
        onSettingItemClick={this.onSettingItemClick}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: path(["auth", "data", "access_token"], state),
    user: path(["auth", "data"], state)
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
