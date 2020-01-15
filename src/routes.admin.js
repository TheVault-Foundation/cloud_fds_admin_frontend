import Tables from "./views/pages/tables/Tables.jsx";
import Transaction from "./containers/Transaction";
import ApiManagement from "./containers/ApiManagement";
import AddressManagement from "./containers/AddressManagement";
import WithdrawRequest from "./containers/WithdrawRequest";
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
    path: "/address",
    name: "Address Management",
    icon: "fa fa-cog text-red",
    component: AddressManagement,
    layout: "/admin"
  },
  {
    path: "/withdraw_request",
    name: "Withdraw Request",
    icon: "fa fa-cog text-red",
    component: WithdrawRequest,
    layout: "/admin"
  },
  {
    path: "/transaction",
    name: "User Transaction",
    icon: "fa fa-bars text-red",
    component: Transaction,
    layout: "/admin"
  },
  {
    path: "/users",
    name: "User Management",
    icon: "fa fa-user text-red",
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
