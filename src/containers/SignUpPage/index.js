import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import i18n from "i18next";
import { compose } from "recompose";
import { Formik } from "formik";
import { register } from "../../redux/actions";

import RegisterPage from "../../components/RegisterPage";

class SignUpPageContainer extends Component {
  state = {};

  componentDidMount() {
    document.body.classList.add("bg-default");
    this.props.history.push("/signup");
  }

  componentWillUnmount() {
    document.body.classList.remove("bg-default");
  }



  render() {
    const { t } = this.props;
    const { status, message } = this.state;

    return (
      <Formik
        initialValues={{ name: "", email: "", password: "", company: "", address: "", toc: false }}
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

          if (!values.toc) {
            errors.toc = "Required";
          }

          console.log(errors);
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          this.setState({message: ""})

          this.props.register(values, response => {
            setSubmitting(false);

            switch (response.status) {
              case 201:
                this.props.history.push({
                  pathname: "/login",
                  state: {
                    status: "success",
                    message: "A message with a confirmation link has been sent to your email address. Please follow the link to activate your account."
                  }
                });
                break;
              case 400:
                this.setState({
                  status: "danger",
                  message: "Username is already existed"
                });
                break;
              default:
                break;
            }
          });
        }}
      >
        {formik => (
          <RegisterPage
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
  return {
    loggedIn: false
  };
};

export default compose(
  withNamespaces("signup", { wait: true }),
  withRouter,
  connect(
    mapStateToProps,
    {
      register
    }
  )
)(SignUpPageContainer);
