import { ViewModel } from "../../../ViewModel";
import { AppController } from "../../../../app/AppController";

// types
import {
  activeUsersListType,
  // userAllMessagesType,
  userMessageType,
} from "../../../../app/types/types";

// css
import "./userList.scss";

export class UserList extends ViewModel {
  controller: AppController;
  mainNode: HTMLElement;
  user: string;
  userListContainer: HTMLElement;
  activeUserList: HTMLElement;
  inactiveUserList: HTMLElement;

  constructor(appController: AppController, node: HTMLElement) {
    super();
    this.controller = appController;
    this.mainNode = node;
    this.user = sessionStorage.getItem("user");

    this.create();
  }

  create() {
    // CLEAN OLD VIEW
    this.mainNode.replaceChildren();

    // USER LIST VIEW

    const mainContainer = this.createElement("div", this.mainNode, {
      className: ["container__user-list"],
    });
    const parentNode = this.createElement("div", mainContainer, {
      className: ["user-list-search"],
    });
    const searchInput: HTMLInputElement = this.createElement(
      "input",
      parentNode,
      {
        type: "search",
        className: ["input__user-list-search"],
        event: [
          "input",
          () => {
            this.userListSearch(searchInput.value);
          },
        ],
      }
    ) as HTMLInputElement;
    this.userListContainer = this.createElement("div", mainContainer, {
      className: ["user-list-names"],
    });
    this.activeUserList = this.createElement("ul", this.userListContainer, {
      className: ["ul__user-list-names"],
    });
    this.inactiveUserList = this.createElement("ul", this.userListContainer, {
      className: ["ul__user-list-names"],
    });

    // MOUNT ELEMENTS
    this.mount();
  }

  createActiveUsers(data: activeUsersListType[]) {
    // CLEAN OLD VIEW
    this.activeUserList.replaceChildren();

    // CREATE ACTIVE USERS
    for (const activeUser of data as activeUsersListType[]) {
      if (activeUser.login !== this.user) {
        const parentNode = this.createElement("li", this.activeUserList, {
          className: ["li__user-list", "li__user-list-active"],
          name: activeUser.login,
          text: activeUser.login,
          event: [
            "click",
            () => {
              this.controller.getChat(activeUser.login, activeUser.isLogined);
            },
          ],
        });
        this.createElement("span", parentNode, {
          className: "li__user-list-messages",
        });
      }
    }

    // MOUNT ELEMENTS
    this.mount();

    // GET ALL UNREAD MESSAGES
    // for (const user of data as activeUsersListType[]) {
    //   if (user.login !== this.user) {
    //     this.controller.getUnreadMessages(user.login);
    //   }
    // }
  }

  createInactiveUsers(data: activeUsersListType[]) {
    // CLEAN OLD VIEW
    this.inactiveUserList.replaceChildren();

    // CREATE INACTIVE USERS
    for (const activeUser of data as activeUsersListType[]) {
      const parentNode = this.createElement("li", this.inactiveUserList, {
        className: ["li__user-list", "li__user-list-inactive"],
        name: activeUser.login,
        text: activeUser.login,
        event: [
          "click",
          () => {
            this.controller.getChat(activeUser.login, activeUser.isLogined);
          },
        ],
      });
      this.createElement("span", parentNode, {
        className: "li__user-list-messages",
      });
    }

    // MOUNT
    this.mount();
  }

  userListSearch(value: string) {
    const userList: NodeListOf<HTMLElement> =
      document.querySelectorAll(".li__user-list");

    const searchValue = value.trim().toLowerCase();

    // for (const item of userList) {
    //   const name = item.textContent.trim().toLowerCase();
    //   item.style.display = name.startsWith(searchValue) ? "" : "none";
    // }

    // eslint-disable-next-line unicorn/no-array-for-each
    userList.forEach((item) => {
      const name = item.textContent.trim().toLowerCase();
      item.style.display = name.startsWith(searchValue) ? "" : "none";
    });
  }

  showUnreadMessages(data: userMessageType[]) {
    const unreadMessages = new Map();

    for (const message of data) {
      if (!message.status.isReaded) {
        let count = unreadMessages.get(message.from);
        if (Number.isNaN(count)) count = 1;
        unreadMessages.set(message.from, count + 1);
      }
    }

    console.log(unreadMessages);
    // for (const unread of unreadMessages) {
    //   console.log(unread);
    // }
  }

  // end
}
