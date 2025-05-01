import { AppController } from "./modules/app/AppController";
// CSS
import "./modules/view/pages/main.scss";
import "./modules/view/pages/header/header.scss";
import "./modules/view/pages/garage/garage.scss";
import "./modules/view/pages/_modal/modal.scss";
import "./modules/view/pages/winners/winners.scss";

const app = new AppController();
app.start();
