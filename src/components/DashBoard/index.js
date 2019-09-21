import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import AdminNavbar from "../Navbars/AdminNavbar.jsx";
import AdminFooter from "../Footers/AdminFooter.jsx";
import Sidebar from "../Sidebar/Sidebar.jsx";

import routes from "../../routes.js";

class DashBoard extends Component {

    state = {
      sidenavOpen: true
    }

    componentDidMount() {
      // this.props.history.push("/login");
    }

    componentDidUpdate(e) {
      if (e.history.pathname !== e.location.pathname) {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.mainContent.scrollTop = 0;
      }
    }
    getRoutes = routes => {
      return routes.map((prop, key) => {
        if (prop.collapse) {
          return this.getRoutes(prop.views);
        }
        if (prop.layout === "/admin") {
          return (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
          );
        } else {
          return null;
        }
      });
    };

    getBrandText = () => {
      return "The Vault";
    };

    // toggles collapse between mini sidenav and normal
    toggleSidenav = e => {
      if (document.body.classList.contains("g-sidenav-pinned")) {
        document.body.classList.remove("g-sidenav-pinned");
        document.body.classList.add("g-sidenav-hidden");
      } else {
        document.body.classList.add("g-sidenav-pinned");
        document.body.classList.remove("g-sidenav-hidden");
      }
      this.setState({
        sidenavOpen: !this.state.sidenavOpen
      });
    };

    render() {
      return (
        <>
        
      </>
      );
    }
  }
  
  const mapStateToProps = state => {
    return {
      
    };
  };
  
  export default DashBoard