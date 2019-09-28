import Tables from "./views/pages/tables/Tables.jsx";
import Transaction from "./containers/Transaction";

const routes = [
  {
    path: "/api-management",
    name: "API Management",
    icon: "fa fa-table text-red",
    component: Tables,
    layout: "/admin"
  },
  {
    path: "/transaction",
    name: "User Transaction",
    icon: "fa fa-user text-red",
    component: Transaction,
    layout: "/admin"
  },
  
];

export default routes;
