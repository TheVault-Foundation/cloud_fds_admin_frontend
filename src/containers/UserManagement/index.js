import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import { compose } from "recompose";

import UserManagement from "../../components/UserManagement";

class UserManagementContainer extends Component {

  render() {
    const { t } = this.props;

    return (
      <UserManagement>
      </UserManagement>
    );
  }
}

const mapStateToProps = state => {
  return {

  };
};

export default compose(
  withNamespaces("core", { wait: true }),
  withRouter,
  connect(
    mapStateToProps,
    {
      
    }
  )
)(UserManagementContainer);
