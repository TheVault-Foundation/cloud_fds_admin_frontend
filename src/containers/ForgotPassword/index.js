import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import { compose } from "recompose";
import { Formik } from "formik";
import { pathOr, path } from "ramda";
import API from "../../network/API"

import ForgotPassword from "../../components/ForgotPassword";

class ForgotPasswordContainer extends Component {
  state = {
    status: "",
    message: ""
  };

  componentDidMount() {
    document.body.classList.add("bg-default");
  }

  componentWillMount() {
    this.setState({
      status: pathOr("", ["location", "state", "status"], this.props),
      message: pathOr("", ["location", "state", "message"], this.props)
    });
    this.props.history.replace({
      pathname: "/forgot-password",
      state: {}
    });
  }

  componentWillUnmount() {
    document.body.classList.remove("bg-default");
  }

  onReturnLoginClick = () => {
    this.props.history.push("/login");
  }

  handleSubmit = (values, ...rest) => {};

  render() {
    const { t } = this.props;
    const { status, message } = this.state;

    return (
      <Formik
        initialValues={{ email: "" }}
        validateOnChange={false}
        validateOnBlur={false}
        validateOnSubmit
        validate={values => {
          let errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          console.log(errors);
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          this.setState({ message: "" });

          API.forgotPassword(values, response => {
            setSubmitting(false);

            switch (response.status) {
              case 200:
                this.setState({
                  status: "success",
                  message: t("submit-success-message")
                });
                break;
              case 400:
                this.setState({
                  status: "danger",
                  message: "Invalid email"
                });
                break;
              default:
                break;
            }
          });
        }}
      >
        {formik => (
          <ForgotPassword
            formik={formik}
            t={t}
            status={status}
            message={message}
            onReturnLoginClick={this.onReturnLoginClick}
          />
        )}
      </Formik>
    );
  }
}

const mapStateToProps = state => {
  return {
  };
};

export default compose(
  withNamespaces("forgot-password", { wait: true }),
  withRouter,
  connect(
    mapStateToProps,
    {
      
    }
  )
)(ForgotPasswordContainer);
