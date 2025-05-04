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

  constructor(appController: AppController, node: HTMLElement) {
    super();
    this.controller = appController;
    this.mainNode = node;
  }

  create(data?: [] | object) {
    console.log(data);
    // CLEAN OLD VIEW
    this.mainNode.replaceChildren();

    // HEADER
    const headerContainer = this.createElement("header", this.mainNode, {
      className: "header",
    });
    new HeaderView(this.controller, headerContainer);

    // MAIN SECTION
    const mainSection = this.createElement("main", this.mainNode, {
      className: "main",
    });
    this.mainContainer = this.createElement("div", mainSection, {
      className: "container__main",
    });

    // USER LIST
    this.userList = new UserList(this.controller, this.mainContainer);

    // USER MESSAGES
    this.chatContainer = this.createElement("div", this.mainContainer, {
      className: ["container__chat"],
    });

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

  createChat(user: { name: string; status: boolean }) {
    this.userChat = new UserMessages(this.controller, this.chatContainer, user);
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

  // showNewMessage(data: userMessageType) {
  //   if (this.userChat) {
  //     this.userChat.showNewMessage(data);
  //   } else {
  //     console.log(`open chat to see new message`);
  //   }
  // }
}
