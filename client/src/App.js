import React, { Suspense } from "react";
import ROUTES, { RenderRoutes } from "./router";
import Header from "./components/Header";
import { isLoggedIn } from "./auth";
import "./stylesheets/main.scss";
function App(props) {
  const isLogged = isLoggedIn();
  return (
    <Suspense fallback={"Loading......"}>
      <Header isLoggedIn={isLogged} />
      <RenderRoutes routes={ROUTES} />
    </Suspense>
  );
}

export default App;
