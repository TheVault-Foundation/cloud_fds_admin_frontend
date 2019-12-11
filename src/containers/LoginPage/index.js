import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import { compose } from "recompose";
import { Formik } from "formik";
import { pathOr, path } from "ramda";
import qs from "query-string";

import { login } from "../../redux/actions";

import LoginPage from "../../components/LoginPage";

class LoginPageContainer extends Component {
  state = {
    status: "",
    message: ""
  };

  componentDidMount() {
    document.body.classList.add("bg-default");

    const query = qs.parse(this.props.location.search);
    if (query.verify) {
      if (query.verify === true) {
        this.setState({
          status: "success",
          message: "Your account has been activated successfully"
        });
      } else {
        this.setState({
          status: "danger",
          message: "Oops! Something went wrong. Please contact to admin"
        });
      }
    }
  }

  componentWillMount() {
    this.setState({
      status: pathOr("", ["location", "state", "status"], this.props),
      message: pathOr("", ["location", "state", "message"], this.props)
    });
    this.props.history.replace({
      pathname: "/login",
      state: {}
    });
  }

  componentWillUnmount() {
    document.body.classList.remove("bg-default");
  }

  goToSignUpPage = () => {
    this.props.history.push("/signup");
  };

  signIn = () => {
    console.log("Login-Form", this.emailRef.text);
  };

  onClickSignIn = () => {};

  onClickForgotPassword = () => {
    this.props.history.push("/forgot-password");
  };

  onClickCreateNewAccount = () => {
    this.props.history.push("/signup");
  };

  handleSubmit = (values, ...rest) => {};

  render() {
    const { t } = this.props;
    const { status, message } = this.state;

    return (
      <Formik
        initialValues={{ username: "", password: "" }}
        validateOnChange={false}
        validateOnBlur={false}
        validateOnSubmit
        validate={values => {
          let errors = {};
          if (!values.username) {
            errors.username = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.username)
          ) {
            // errors.email = "Invalid email address";
          }

          if (!values.password) {
            errors.password = "Required";
          }

          console.log(errors);
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          this.setState({ message: "" });

          this.props.login(values, response => {
            setSubmitting(false);

            switch (response.status) {
              case 200:
                this.setState({
                  status: "success",
                  message: "Login successfully"
                });
                setTimeout(() => {
                  this.props.history.push("/admin/apis");
                }, 1000);
                break;
              case 400:
                const message =
                  path(["data", "error", "message"], response) ||
                  "Invalid username or password";
                this.setState({
                  status: "danger",
                  message: message
                });
                break;
              default:
                break;
            }
          });
        }}
      >
        {formik => (
          <LoginPage
            formik={formik}
            t={t}
            onClickForgotPassword={this.onClickForgotPassword}
            onClickCreateNewAccount={this.onClickCreateNewAccount}
            status={status}
            message={message}
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
    {
      login
    }
  )
)(LoginPageContainer);
