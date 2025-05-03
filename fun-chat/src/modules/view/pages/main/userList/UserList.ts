import { ViewModel } from "../../../ViewModel";
import { AppController } from "../../../../app/AppController";
import { activeUsersListType } from "../../../../app/types/types";
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
    for (const activeUser of data) {
      this.createElement("li", this.activeUserList, {
        className: ["user-name", "user-name-active"],
        name: activeUser.login,
        text: activeUser.login,
        event: [
          "click",
          () => {
            alert(`User name: ${activeUser.login}`);
          },
        ],
      });
    }

    // MOUNT ELEMENTS
    this.mount();
  }

  createInactiveUsers(data: activeUsersListType[]) {
    // CLEAN OLD VIEW
    this.inactiveUserList.replaceChildren();

    // CREATE ACTIVE USERS
    for (const activeUser of data) {
      console.log(activeUser.login);
      this.createElement("li", this.inactiveUserList, {
        className: ["user-name", "user-name-inactive"],
        name: activeUser.login,
        text: activeUser.login,
        event: [
          "click",
          () => {
            alert(`User name: ${activeUser.login}`);
          },
        ],
      });
    }

    // MOUNT
    this.mount();
  }

  userListSearch(value: string) {
    const userList: NodeListOf<HTMLElement> =
      document.querySelectorAll(".user-name");

    const searchValue = value.trim().toLowerCase();

    userList.forEach((item) => {
      const name = item.textContent.trim().toLowerCase();

      name.startsWith(searchValue)
        ? (item.style.display = "")
        : (item.style.display = "none");

      // if (name.startsWith(searchValue)) {
      //   item.style.display = "";
      // } else {
      //   item.style.display = "none";
      // }
    });
  }

  // end
}
