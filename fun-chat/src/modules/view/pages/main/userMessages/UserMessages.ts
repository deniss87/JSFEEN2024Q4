import { ViewModel } from "../../../ViewModel";
import { AppController } from "../../../../app/AppController";

// types
import {
  userAllMessagesType,
  userMessageType,
  userEditMessageType,
  userReadMessageType,
} from "../../../../app/types/types";

// assets
import { messageMenuLogo, messageStatusCheck } from "../../../assets/images";

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
  messageEditId: string;
  messageDeleteId: string;
  messageSeparator: boolean;

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
    this.messageSeparator = false;
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
      autofocus: "",
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
    this.contextMenu = this.createElement("div", this.mainNode, {
      className: ["context-menu-container"],
    });
    parentNode = this.createElement("ul", this.contextMenu, {
      className: ["context-menu-list"],
    });
    this.contextMenuEdit = this.createElement("li", parentNode, {
      className: ["context-menu-action", "context-menu-action-edit"],
      text: "EDIT",
    });
    this.contextMenuDelete = this.createElement("li", parentNode, {
      className: ["context-menu-action", "context-menu-action-delete"],
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

  showSelectUser() {
    const parentNode = this.createElement("div", this.chatContainer, {
      className: "select-user-container",
    });
    this.createElement("h2", parentNode, {
      className: "text__select-user",
      text: "Select user",
    });
  }

  showMessages(messages: userMessageType[]) {
    // CLEAN OLD VIEW
    // this.chatContainer.replaceChildren();

    // CREATE CHAT HISTORY
    for (const message of messages) {
      const messageFrom = message.to === this.user.name ? "me" : "user";
      const datetime = new Date(message.datetime);
      const time = new Intl.DateTimeFormat("en", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(datetime);

      let deliveredStatus = "";
      let readStatus = "";
      let editedStatus = "";
      if (message.status.isDelivered) deliveredStatus = "delivered";
      if (message.status.isReaded) readStatus = "readed";
      if (message.status.isEdited) editedStatus = "edited";
      // console.log(message.status);

      // message separator
      // if (!message.status.isReaded && !this.messageSeparator) {
      //   const separatorContainer = this.createElement(
      //     "div",
      //     this.chatContainer,
      //     {
      //       className: "message-separator-container",
      //     }
      //   );
      //   this.createElement("div", separatorContainer, {
      //     className: "message-separator-text",
      //     text: "NEW MESSAGES",
      //   });
      //   this.messageSeparator = true;
      // }

      let parentNode = this.createElement("div", this.chatContainer, {
        id: `message-container-${message.id}`,
        className: [
          "user-message-container",
          `user-message-container-${messageFrom}`,
        ],
      });
      const messageBulb = this.createElement("div", parentNode, {
        className: ["user-message-bulb", `user-messages-${messageFrom}`],
      });
      this.createElement("div", messageBulb, {
        id: `user-message-${message.id}`,
        className: ["user-message-text"],
        text: message.text,
      });

      const messageStatusContainer = this.createElement("div", messageBulb, {
        className: ["user-message-info-container"],
      });
      this.createElement("div", messageStatusContainer, {
        className: ["user-message-time"],
        text: time,
      });
      this.createElement("div", messageStatusContainer, {
        id: `message-status-edited-${message.id}`,
        className: ["user-message-edited"],
        text: editedStatus,
      });
      parentNode = this.createElement("div", messageStatusContainer, {
        className: "user-message-status-container",
      });
      this.createElement("div", parentNode, {
        className: ["user-message-status-delivered"],
        title: deliveredStatus,
        html: messageStatusCheck(
          "delivered",
          message.id,
          message.status.isDelivered
        ),
      });
      this.createElement("div", parentNode, {
        className: ["user-message-status-read"],
        title: readStatus,
        html: messageStatusCheck("read", message.id, message.status.isReaded),
      });

      if (message.from !== this.user.name) {
        const messageMenu = this.createElement("div", messageStatusContainer, {
          className: ["user-message-menu"],
          html: messageMenuLogo,
          event: [
            "click",
            (event: MouseEvent) => {
              event.stopPropagation();
              this.showContextMenu(messageMenu, message.id);
            },
          ],
        });
      }

      // CHANGE MESSAGE READ STATUS
      if (!readStatus) this.controller.setReadStatus(message.id);
    }

    // MOUNT
    this.mount();

    // SCROLL TO BOTTOM
    this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
  }

  showContextMenu(menuElement: HTMLElement, mesageId: string) {
    const rect = menuElement.getBoundingClientRect();
    this.contextMenu.style.top = rect.bottom + window.scrollY + "px";
    this.contextMenu.style.left = rect.left + window.scrollX + "px";
    this.contextMenu.style.display = "block";

    // event on EDIT
    this.contextMenuEdit.addEventListener("click", () => {
      const messageText = document.querySelector(`#user-message-${mesageId}`);
      if (messageText) {
        this.sendInput.value = messageText.textContent;
        this.sendInput.focus();
      }
      this.messageEditId = mesageId;
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

      const message = document.querySelector(
        `#user-message-${this.messageEditId}`
      );
      message.textContent = this.sendInput.value;

      this.sendInput.removeAttribute("editId");
      this.sendInput.value = "";
    } else {
      this.controller.sendMessage(this.user.name, this.sendInput.value);
      this.sendInput.value = "";
      this.messageSeparator = true;
    }
    this.sendButton.setAttribute("disabled", "");
  }

  deleteMessage(messageId: string) {
    const message = document.querySelector(`#message-container-${messageId}`);
    if (message) message.remove();
  }

  updateMessage(message: userEditMessageType) {
    const messageElement: HTMLElement = document.querySelector(
      `#user-message-${message.id}`
    );
    const statusElement: HTMLElement = document.querySelector(
      `#message-status-edited-${message.id}`
    );
    if (messageElement) {
      messageElement.textContent = message.text;
    }
    if (statusElement) {
      statusElement.textContent = "edited";
    }
  }

  updateMessageStatus(message: userReadMessageType) {
    if (message.status.isReaded) {
      const messageStatus = document.querySelector(
        `#message-status-read-${message.id}`
      );
      if (messageStatus) {
        messageStatus.classList.add("message-status-read");
        messageStatus.parentElement.setAttribute("title", "readed");
      }
    }
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
