import { ViewModel } from "./ViewModel";
import { AppController } from "../app/AppController";
import { LoginView } from "./pages/login/loginView";
import { MainView } from "./pages/main/MainView";
import { AboutView } from "./pages/about/AboutView";
import { NoConnectionView } from "./pages/errors/NoConnectionView/NoConnection";

// types
import { activeUsersListType, userMessageType } from "../app/types/types";

export class View extends ViewModel {
  controller: AppController;

  root: HTMLElement | null;
  loginView: LoginView;
  mainView: MainView;
  aboutView: AboutView;
  NoConnectionView: NoConnectionView;

  constructor(appController: AppController) {
    super();
    this.controller = appController;

    // MAIN VIEW
    this.root = this.createElement("div", document.body, {
      id: "root",
    });

    // LOGIN VIEW
    this.loginView = new LoginView(this.controller, this.root);
    // MAIN VIEW
    this.mainView = new MainView(this.controller, this.root);
    // ABOUT VIEW
    this.aboutView = new AboutView(this.controller, this.root);
    // NO CONNECTION VIEW
    this.NoConnectionView = new NoConnectionView(this.controller, this.root);
    // MOUNT MAIN VIEW
    this.mount();
  }

  create(view: string, data?: [] | object, status?: boolean) {
    switch (view) {
      case "login": {
        this.loginView.create();
        break;
      }
      case "main": {
        this.mainView.create();
        break;
      }
      case "about": {
        this.aboutView.create();
        break;
      }
      case "user-list-active": {
        this.mainView.userList.createActiveUsers(data as activeUsersListType[]);
        break;
      }
      case "user-list-inactive": {
        this.mainView.userList.createInactiveUsers(
          data as activeUsersListType[]
        );
        break;
      }
      case "user-status": {
        this.mainView.updateUserStatus(status);
        break;
      }
      case "user-list-messages": {
        this.mainView.userList.showUnreadMessages(data as userMessageType[]);
        break;
      }
      case "user-all-messages": {
        this.mainView.showAllMessages(data as userMessageType[]);
        break;
      }
      case "no-connection": {
        this.NoConnectionView.create();
        break;
      }
    }
  }

  // end
}
