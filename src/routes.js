import Tables from "./views/pages/tables/Tables.jsx";
import ApiManagement from "./containers/ApiManagement";

const routes = [
  {
    path: "/api-management",
    name: "API Management",
    icon: "fa fa-table text-red",
    component: ApiManagement,
    layout: "/admin"
  },
  {
    path: "/transaction",
    name: "User Transaction",
    icon: "fa fa-user text-red",
    component: Tables,
    layout: "/admin"
  },
  
];

export default routes;
