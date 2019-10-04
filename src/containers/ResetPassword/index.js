import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import { compose } from "recompose";
import { Formik } from "formik";
import { pathOr, path } from "ramda";
import qs from "query-string";

import ResetPassword from "../../components/ResetPassword";
import API from "../../network/API";

class ResetPasswordContainer extends Component {
  state = {
    status: "",
    message: "",
    token: null
  };

  componentDidMount() {
    document.body.classList.add("bg-default");

    const query = qs.parse(this.props.location.search);
    if (query.token) {
      this.setState({token: query.token})
    }
  }

  componentWillMount() {
    this.setState({
      status: pathOr("", ["location", "state", "status"], this.props),
      message: pathOr("", ["location", "state", "message"], this.props)
    });
    this.props.history.replace({
      pathname: "/reset-password",
      state: {}
    });
  }

  componentWillUnmount() {
    document.body.classList.remove("bg-default");
  }

  handleSubmit = (values, ...rest) => {};

  render() {
    const { t } = this.props;
    const { status, message } = this.state;

    return (
      <Formik
        initialValues={{ password: "", confirm_password: "" }}
        validateOnChange={false}
        validateOnBlur={false}
        validateOnSubmit
        validate={values => {
          let errors = {};

          if (!values.password) {
            errors.password = "Required";
          }

          if (!values.confirm_password) {
            errors.confirm_password = "Required";
          }

          if (values.password !== values.confirm_password) {
            errors.confirm_password = t("password-not-match-message");
          }

          console.log(errors);
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          this.setState({ message: "" });

          API.resetPassword(this.state.token, values)
            .then(response => {
              setSubmitting(false);

              switch (response.status) {
                case 200:
                  this.props.history.push({
                    pathname: "/login",
                    state: {
                      status: "success",
                      message: path(["data", "message"], response) || "Reset password is successfully"
                    }
                  });
                  break;
                case 400:
                  this.setState({
                    status: "danger",
                    message: path(["data", "message"], response) 
                  });
                  break;
                default:
                  break;
              }
            })
            .catch(e => {
              setSubmitting(false);
              console.log(e);
            });
        }}
      >
        {formik => (
          <ResetPassword
            formik={formik}
            t={t}
            status={status}
            message={message}
          />
        )}
      </Formik>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default compose(
  withNamespaces("reset-password", { wait: true }),
  withRouter,
  connect(
    mapStateToProps,
    {}
  )
)(ResetPasswordContainer);
