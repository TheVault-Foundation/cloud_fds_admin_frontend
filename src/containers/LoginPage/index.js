import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
import i18n from 'i18next';
import { compose } from 'recompose';

class LoginPage extends Component {
  state = {
    
  };

  componentDidMount() {
    this.props.history.push('/login');
  }

  render() {
    return (
      null
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: false,
  };
};

export default compose(
  withNamespaces('login', { wait: true }),
  withRouter,
  connect(
    mapStateToProps,
    {
    }
  )
)(LoginPage);
