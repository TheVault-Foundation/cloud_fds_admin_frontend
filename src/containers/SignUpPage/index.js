import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import i18n from "i18next";
import { compose } from "recompose";
import { Formik } from "formik";

import RegisterPage from "../../components/RegisterPage";

const siteKey =
  process.env.RECAPTCHA_SITE_KEY || "6LePkrgUAAAAAEaSfflZjl-UoDKATwlzaPaLIbug";

class SignUpPageContainer extends Component {
  state = {};

  componentDidMount() {
    document.body.classList.add("bg-default");
    this.props.history.push("/signup");
  }

  componentWillUnmount() {
    document.body.classList.remove("bg-default");
  }

  handleCaptchaResponseChange = response => {
    console.log("ReCAPTCHA", response);
  };

  render() {
    const { t } = this.props;

    return (
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validateOnChange={false}
        validateOnBlur={false}
        validateOnSubmit
        validate={values => {
          let errors = {};
          if (!values.name) {
            errors.name = "Required";
          }

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
          <RegisterPage
            formik={formik}
            t={t}
            gCapchatSiteKey={siteKey}
            handleCaptchaResponseChange={this.handleCaptchaResponseChange}
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
  withNamespaces("signup", { wait: true }),
  withRouter,
  connect(
    mapStateToProps,
    {}
  )
)(SignUpPageContainer);
