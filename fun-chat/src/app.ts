import { AppController } from "./modules/app/AppController";
import { Router } from "./modules/app/Router";
// CSS
import "./modules/view/pages/main.scss";
import "./modules/view/pages/login/login.scss";

const registeredRoutes = [
  {
    uri: "/",
    view: "main",
    auth: true,
  },
  {
    uri: "/login",
    view: "login",
    auth: false,
  },
  {
    uri: "/about",
    view: "about",
    auth: false,
  },
];

const router = new Router(registeredRoutes);

const app = new AppController(router);
app.start();
