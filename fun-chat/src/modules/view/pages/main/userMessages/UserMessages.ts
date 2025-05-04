import { ViewModel } from "../../../ViewModel";
import { AppController } from "../../../../app/AppController";

// types
import {
  userAllMessagesType,
  userMessageType,
} from "../../../../app/types/types";

// assets
// import { messageMenuLogo } from "../../../assets/images";

// css
import "./userMessages.scss";

export class UserMessages extends ViewModel {
  controller: AppController;
  mainNode: HTMLElement;
  headerNameElement: HTMLElement;
  headerStatusElement: HTMLElement;
  chatContainer: HTMLElement;
  sendInput: HTMLInputElement;
  sendButton: HTMLElement;
  contextMenu: HTMLElement;
  contextMenuEdit: HTMLElement;
  contextMenuDelete: HTMLElement;

  user: { name: string; status: boolean };
  allMessages: userAllMessagesType;

  constructor(
    appController: AppController,
    node: HTMLElement,
    user: { name: string; status: boolean }
  ) {
    super();
    this.controller = appController;
    this.mainNode = node;

    this.user = user;
    this.create();
    this.addEvents();
  }

  create() {
    // CLEAN OLD VIEW
    this.mainNode.replaceChildren();

    // USER MESSAGES VIEW

    // user messages - header
    let parentNode = this.createElement("div", this.mainNode, {
      className: ["chat-header"],
    });
    this.headerNameElement = this.createElement("div", parentNode, {
      className: ["chat-header-user-name"],
      text: this.user.name,
    });
    this.headerStatusElement = this.createElement("div", parentNode, {
      className: ["chat-header-user-status"],
      text: this.user.status,
    });

    // user messages - history
    this.chatContainer = this.createElement("div", this.mainNode, {
      className: ["chat-history"],
    });

    // user messages - send
    parentNode = this.createElement("div", this.mainNode, {
      className: ["chat-input"],
    });
    this.sendInput = this.createElement("input", parentNode, {
      type: "input",
      className: ["input__user-messages"],
    }) as HTMLInputElement;
    this.sendButton = this.createElement("button", parentNode, {
      type: "button",
      className: ["button__user-messages-send"],
      text: "Send",
      disabled: "",
      event: [
        "click",
        () => {
          this.sendMessage();
        },
      ],
    });

    // context menu
    this.contextMenu = this.createElement("div", this.chatContainer, {
      className: ["context-menu-container"],
    });
    parentNode = this.createElement("ul", this.contextMenu, {
      className: ["context-menu-list"],
    });
    this.contextMenuEdit = this.createElement("li", parentNode, {
      className: ["context-menu-action"],
      text: "EDIT",
    });
    this.contextMenuDelete = this.createElement("li", parentNode, {
      className: ["context-menu-action"],
      text: "DELETE",
    });

    // user status
    this.showUserStatus();

    // MOUNT
    this.mount();
  }

  getUserName() {
    return this.user.name;
  }

  showUserStatus() {
    if (this.headerStatusElement) {
      this.headerStatusElement.textContent = this.user.status
        ? "online"
        : "offline";

      this.headerStatusElement.style = this.user.status
        ? "color: green"
        : "color: grey";
    }
  }

  showMessages(messages: userMessageType[]) {
    for (const message of messages) {
      const messageFrom = message.to === this.user.name ? "me" : "user";
      const datetime = new Date(message.datetime);
      const time = datetime.getHours() + ":" + datetime.getMinutes();

      let parentNode = this.createElement("div", this.chatContainer, {
        className: [
          "user-message-container",
          `user-message-container-${messageFrom}`,
        ],
      });
      const messageBulb = this.createElement("div", parentNode, {
        className: ["user-message-bulb", `user-messages-${messageFrom}`],
      });
      this.createElement("div", messageBulb, {
        className: ["user-message-text"],
        text: message.text,
      });

      parentNode = this.createElement("div", messageBulb, {
        className: ["user-message-status"],
      });
      this.createElement("div", parentNode, {
        className: ["user-message-time"],
        text: time,
      });
      const messageMenu = this.createElement("div", parentNode, {
        className: ["user-message-menu"],
        text: "...",
        event: [
          "click",
          (event: MouseEvent) => {
            event.stopPropagation();
            this.showContextMenu(messageMenu, message.id, message.text);
          },
        ],
      });
    }
    this.mount();

    // SCROLL TO BOTTOM
    this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
  }

  showContextMenu(
    menuElement: HTMLElement,
    mesageId: string,
    messageText: string
  ) {
    const rect = menuElement.getBoundingClientRect();
    this.contextMenu.style.top = rect.bottom + window.scrollY + "px";
    this.contextMenu.style.left = rect.left + window.scrollX + "px";
    this.contextMenu.style.display = "block";

    // event on EDIT
    this.contextMenuEdit.addEventListener("click", () => {
      this.sendInput.value = messageText;
      this.sendInput.setAttribute("editId", mesageId);
      this.contextMenu.style.display = "none";
    });
    // event on DELETE
    this.contextMenuDelete.addEventListener("click", () => {
      this.controller.deleteMessage(mesageId);
      this.contextMenu.style.display = "none";
    });
  }

  // SEND OR EDIT MESSAGE
  sendMessage() {
    const editId = this.sendInput.getAttribute("editId");

    if (editId) {
      this.controller.editMessage(editId, this.sendInput.value);
      this.sendInput.removeAttribute("editId");
      this.sendInput.value = "";
    } else {
      this.controller.sendMessage(this.user.name, this.sendInput.value);
      this.sendInput.value = "";
    }
    this.sendButton.setAttribute("disabled", "");
  }

  addEvents() {
    // CLOSE CHAT CONTEXT MENU
    document.addEventListener("click", (event: MouseEvent) => {
      const target = event.target as Node;
      if (!this.contextMenu.contains(target)) {
        this.contextMenu.style.display = "none";
      }
    });

    // SEND BY ENTER
    document.addEventListener("keydown", (event) => {
      const inputValue = this.sendInput.value.trim();
      if (event.key === "Enter" && inputValue.length > 0) {
        this.sendMessage();
      }
    });

    this.sendInput.addEventListener("input", () => {
      const inputValue = this.sendInput.value.trim();
      if (inputValue.length > 0) {
        this.sendButton.removeAttribute("disabled");
      } else {
        this.sendButton.setAttribute("disabled", "");
      }
    });
  }

  // end
}
