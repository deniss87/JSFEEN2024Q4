import { ViewModel } from "../../ViewModel";
import { AppController } from "../../../app/AppController";
// classes
import { HeaderView } from "./header/HeaderView";
import { UserList } from "./userList/UserList";
import { UserMessages } from "./userMessages/UserMessages";
import { FooterView } from "./footer/FooterView";

// types
import { userMessageType } from "../../../app/types/types";
// css
import "./mainView.scss";

// CSS
import "./header/header.scss";
import "./footer/footer.scss";

export class MainView extends ViewModel {
  controller: AppController;
  mainNode: HTMLElement;
  mainContainer: HTMLElement;
  chatContainer: HTMLElement;

  userList: UserList;
  userChat: UserMessages;
  activeChat: string;

  constructor(appController: AppController, node: HTMLElement) {
    super();
    this.controller = appController;
    this.mainNode = node;
  }

  create() {
    // RELOGIN USER
    this.reloginUser();

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

    // USER MESSAGES
    this.chatContainer = this.createElement("div", this.mainContainer, {
      className: ["container__chat"],
    });
    this.createNoUserSelected();

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

  createNoUserSelected() {
    // select user
    const parentNode = this.createElement("div", this.chatContainer, {
      className: "select-user-container",
    });
    this.createElement("h2", parentNode, {
      className: ["text__select-user", "text__info-italic"],
      text: "select user for chat",
    });
  }

  createChat(user: { name: string; status: boolean }) {
    this.userChat = new UserMessages(this.controller, this.chatContainer, user);
    this.activeChat = user.name;
  }

  updateUserStatus(status: boolean) {
    if (this.userChat) {
      this.userChat.user.status = status;
      this.userChat.showUserStatus();
    }
  }

  showAllMessages(data: userMessageType[]) {
    if (this.userChat) {
      this.userChat.showMessages(data);
    } else {
      console.log(`open chat to see new message`);
    }
  }

  reloginUser() {
    const sessionUser = sessionStorage.getItem("user");
    if (sessionUser) this.controller.reloginUser();
  }
}
