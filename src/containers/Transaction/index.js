import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import { compose } from "recompose";
import { path } from "ramda";

import API from "../../network/API";
import Transaction from "../../components/Transaction";

class TransactionContainer extends Component {
  state = { transactions: [] };

  componentDidMount() {}

  render() {
    const { t, userId } = this.props;

    return <Transaction userId={userId}></Transaction>;
  }
}

const mapStateToProps = state => {
  return {
    userId: path(["auth", "data", "id"], state)
  };
};

export default compose(
  withNamespaces("transaction", { wait: true }),
  withRouter,
  connect(
    mapStateToProps,
    {}
  )
)(TransactionContainer);
