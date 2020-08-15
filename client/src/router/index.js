import React, { lazy } from "react";
import { isLoggedIn } from "../auth";
import { Route, Switch, Redirect } from "react-router-dom";

const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const Events = lazy(() => import("../pages/Events"));
const Bookings = lazy(() => import("../pages/Bookings"));
const Home = lazy(() => import("../pages/Home"));

const ROUTES = [
  {
    path: "/",
    key: "ROOT",
    exact: true,
    component: () => {
      if (isLoggedIn()) return <Redirect to="/app" />;
      return <Login />;
    },
  },
  {
    path: "/signup",
    key: "ROOT",
    exact: true,
    component: () => {
      if (isLoggedIn()) return <Redirect to="/app" />;
      return <Signup />;
    },
  },
  {
    path: "/login",
    key: "ROOT",
    exact: true,
    component: () => {
      if (isLoggedIn()) return <Redirect to="/app" />;
      return <Login />;
    },
  },
  {
    path: "/app",
    key: "APP",
    component: (props) => {
      if (!isLoggedIn()) {
        return <Redirect to={"/"} />;
      }
      return <RenderRoutes {...props} />;
    },
    routes: [
      {
        path: "/app",
        key: "APP_ROOT",
        exact: true,
        component: () => <Home />,
      },
      {
        path: "/app/bookings",
        key: "BOOKING_PAGE",
        exact: true,
        component: () => <Bookings />,
      },
      {
        path: "/app/events",
        key: "EVENTS_PAGE",
        exact: true,
        component: () => <Events />,
      },
    ],
  },
];

export default ROUTES;

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
}

export function RenderRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, i) => {
        return <RouteWithSubRoutes key={route.key} {...route} />;
      })}
      <Route component={() => <h1>Not Found!</h1>} />
    </Switch>
  );
}
