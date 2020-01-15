import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import { compose } from "recompose";
import { Formik } from "formik";
import { pathOr, path } from "ramda";
import { login } from "../../redux/actions";

import WithdrawRequest from "../../components/WithdrawRequest";

class WithdrawRequestContainer extends Component {

  render() {
    const { t, user } = this.props;

    return (
      <WithdrawRequest user={user}> 
      </WithdrawRequest>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: path(["auth", "data"], state)
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
)(WithdrawRequestContainer);
