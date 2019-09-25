import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import { compose } from "recompose";
import { Formik } from "formik";
import { pathOr, path } from "ramda";
import { login } from "../../redux/actions";

import ApiManagement from "../../components/ApiManagement";

class ApiManagementContainer extends Component {

  render() {
    const { t } = this.props;

    return (
      <ApiManagement>
      </ApiManagement>
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
)(ApiManagementContainer);
