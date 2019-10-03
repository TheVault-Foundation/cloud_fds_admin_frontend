import Tables from "./views/pages/tables/Tables.jsx";
import Transaction from "./containers/Transaction";
import ApiManagement from "./containers/ApiManagement";
import UserManagement from "./containers/UserManagement";
import AccountSetting from "./containers/AccountSetting";

const routes = [
  {
    path: "/apis",
    name: "API Management",
    icon: "fa fa-table text-red",
    component: ApiManagement,
    layout: "/admin"
  },
  {
    path: "/transaction",
    name: "User Transaction",
    icon: "fa fa-user text-red",
    component: Transaction,
    layout: "/admin"
  },
  {
    path: "/users",
    name: "User Management",
    icon: "fa fa-table text-red",
    component: UserManagement,
    layout: "/admin"
  },
  {
    path: "/settings",
    name: "Account Settings",
    icon: "fa fa-cog text-red",
    component: AccountSetting,
    layout: "/admin"
  },
];

export default routes;
