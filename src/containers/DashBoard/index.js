import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DashBoard from '../../components/DashBoard'

class DashBoardContainer extends Component {
    componentDidMount() {
    }
  
    render() {
      return (
        <DashBoard />)
    }
  }
  
  const mapStateToProps = state => {
    return {
    };
  };
  
  export default withRouter(
    connect(
      mapStateToProps,
      {}
    )(DashBoardContainer)
  );
  