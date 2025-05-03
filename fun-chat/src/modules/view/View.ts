import { ViewModel } from "./ViewModel";
import { AppController } from "../app/AppController";
import { LoginView } from "./pages/login/loginView";
import { MainView } from "./pages/main/MainView";
import { AboutView } from "./pages/about/AboutView";

export class View extends ViewModel {
  controller: AppController;

  root: HTMLElement | null;
  loginView: LoginView;
  mainView: MainView;
  aboutView: AboutView;

  constructor(appController: AppController) {
    super();
    this.controller = appController;

    // MAIN VIEW
    this.root = this.createElement("div", document.body, {
      id: "root",
    });

    // LOGIN VIEW
    this.loginView = new LoginView(this.controller, this.root);
    this.mainView = new MainView(this.controller, this.root);
    this.aboutView = new AboutView(this.controller, this.root);

    // MOUNT MAIN VIEW
    this.mount();
  }

  create(view: string, data?: []) {
    if (view === "login") return this.loginView.create();
    if (view === "main") return this.mainView.create(data);
    if (view === "about") return this.aboutView.create();
    if (view === "user-list-active")
      return this.mainView.userList.createActiveUsers(data);
    if (view === "user-list-inactive")
      return this.mainView.userList.createInactiveUsers(data);
  }

  // end
}
