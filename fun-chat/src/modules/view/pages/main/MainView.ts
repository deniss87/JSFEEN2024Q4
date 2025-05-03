import { ViewModel } from "../../ViewModel";
import { AppController } from "../../../app/AppController";
import { HeaderView } from "./header/HeaderView";
import { UserList } from "./userList/UserList";
import { FooterView } from "./footer/FooterView";

// CSS
import "./header/header.scss";
import "./footer/footer.scss";

export class MainView extends ViewModel {
  controller: AppController;
  mainNode: HTMLElement;
  mainContainer: HTMLElement;
  userList: UserList;

  constructor(appController: AppController, node: HTMLElement) {
    super();
    this.controller = appController;
    this.mainNode = node;
  }

  create(data?: []) {
    console.log(data);
    // CLEAN OLD VIEW
    this.mainNode.replaceChildren();

    // HEADER
    const headerContainer = this.createElement("header", this.mainNode, {
      className: "header",
    });
    new HeaderView(this.controller, headerContainer);

    // MAIN SECTION
    this.mainContainer = this.createElement("main", this.mainNode, {
      className: "main",
    });

    // USER LIST
    this.userList = new UserList(this.controller, this.mainContainer);

    // FOOTER
    const footerContainer = this.createElement("footer", this.mainNode, {
      className: "footer",
    });
    new FooterView(this.controller, footerContainer);

    // MOUNT
    this.mount();

    // GET USERS DATA
    this.getData();
  }

  getData() {
    this.controller.getActiveUsers();
    this.controller.getInactiveUsers();
  }
}
