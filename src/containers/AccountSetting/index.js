import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import { compose } from "recompose";
import { Formik } from "formik";
import { pathOr, path } from "ramda";
import { updateUser } from "../../redux/actions";

import AccountSetting from "../../components/AccountSetting";

class AccountSettingContainer extends Component {
  state = {
    status: "",
    message: ""
  };

  componentDidMount() {
    this.setState({
      status: "",
      message: ""
    });
  }

  componentWillMount() {}

  componentWillUnmount() {}

  handleSubmit = (values, ...rest) => {};

  render() {
    const { t, user = {} } = this.props;
    const { status, message } = this.state;

    return (
      <Formik
        initialValues={{
          company: user.company || "",
          email: user.email || "",
          contactNumber: user.contactNumber || "",
          address: user.address || ""
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validateOnSubmit
        validate={values => {
          let errors = {};
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "Invalid email address";
          }

          console.log(errors);
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          this.setState({ message: "" });

          this.props.updateUser({userId: user.id, body: values}, response => {
            setSubmitting(false);

            switch (response.status) {
              case 200:
                this.setState({
                  status: "success",
                  message: "Saved successfully"
                });
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
          <AccountSetting
            user={user}
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
    user: path(["auth", "data"], state)
  };
};

export default compose(
  withNamespaces("account-setting", { wait: true }),
  withRouter,
  connect(
    mapStateToProps,
    {
      updateUser
    }
  )
)(AccountSettingContainer);
