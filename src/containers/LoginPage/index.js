import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import { compose } from "recompose";
import { Formik } from "formik";

import LoginPage from "../../components/LoginPage";

const siteKey =
  process.env.RECAPTCHA_SITE_KEY || "6LePkrgUAAAAAEaSfflZjl-UoDKATwlzaPaLIbug";

class LoginPageContainer extends Component {
  state = {};

  componentDidMount() {
    document.body.classList.add("bg-default");
  }

  componentWillUnmount() {
    document.body.classList.remove("bg-default");
  }

  goToSignUpPage = () => {
    this.props.history.push("/signup");
  };

  handleCaptchaResponseChange = response => {
    console.log("ReCAPTCHA", response);
  };

  signIn = () => {
    console.log("Login-Form", this.emailRef.text);
  };

  onClickSignIn = () => {};

  onClickForgotPassword = () => {};

  onClickCreateNewAccount = () => {
    this.props.history.push("/signup");
  };

  handleSubmit = (values, ...rest) => {};

  render() {
    const { t } = this.props;

    return (
      <Formik
        initialValues={{ email: "", password: "" }}
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

          if (!values.password) {
            errors.password = "Required";
          }

          console.log(errors);
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 1000);
        }}
      >
        {formik => (
          <LoginPage
            formik={formik}
            t={t}
            gCapchatSiteKey={siteKey}
            handleCaptchaResponseChange={this.handleCaptchaResponseChange}
            onClickForgotPassword={this.onClickForgotPassword}
            onClickCreateNewAccount={this.onClickCreateNewAccount}
          />
        )}
      </Formik>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: false
  };
};

export default compose(
  withNamespaces("login", { wait: true }),
  withRouter,
  connect(
    mapStateToProps,
    {}
  )
)(LoginPageContainer);
