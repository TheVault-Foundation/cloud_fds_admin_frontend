import Tables from "./views/pages/tables/Tables.jsx";

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
    component: Tables,
    layout: "/admin"
  },
  
];

export default routes;
