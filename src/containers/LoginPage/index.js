import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import { compose } from "recompose";
import { Formik } from "formik";
import { pathOr, path } from "ramda";
import { login } from "../../redux/actions";

import LoginPage from "../../components/LoginPage";

class LoginPageContainer extends Component {
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

  onClickForgotPassword = () => {};

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
                  this.props.history.push("/admin");
                }, 2000);
                break;
              case 400:
                this.setState({
                  status: "danger",
                  message: "Invalid username or password"
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
