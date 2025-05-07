import { Model } from "./types/model";
import { AppController } from "./AppController";
import { socketGeneralType } from "../app/types/types";
import { View } from "../view/View";

// types
import { userMessageType } from "../app/types/types";

export class AppModel implements Model {
  controller: AppController;
  view: View;

  private server: string;
  private socket: WebSocket;
  private requestId: string;

  constructor(appController: AppController, view: View) {
    this.server = "ws://127.0.0.1:4000";
    this.controller = appController;
    this.view = view;
  }

  async createConnection(): Promise<string> {
    const connPromise: string = await new Promise((resolve) => {
      // create new connection
      this.socket = new WebSocket(this.server);

      // Listen for messages
      this.socket.addEventListener("message", (event) => {
        this.socketResponse(event.data);
      });

      this.socket.addEventListener("open", () => {
        this.view.root.classList.remove("view-blur");
        const noConnection = document.querySelector(".no-connection-container");
        if (noConnection) noConnection.remove();
        if (this.controller.userName && this.controller.userPassword) {
          this.controller.reloginUser();
        }
        resolve("Connnection is opened");
      });
      this.socket.addEventListener("error", (error) => {
        console.log(`Websocket error: ${error}`);
      });
      this.socket.addEventListener("close", () => {
        console.log(`no connection to server`);
        this.view.create("no-connection");
        this.reconnect();
      });
    });

    return connPromise;
  }

  sendData(data: socketGeneralType): void {
    this.socket.send(JSON.stringify(data));
  }

  socketResponse(message: string) {
    const response = JSON.parse(message);

    switch (response.type) {
      case "USER_LOGIN": {
        this.controller.redirect("/");
        break;
      }
      case "USER_LOGOUT": {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("password");
        this.controller.redirect("/login");

        break;
      }
      case "USER_EXTERNAL_LOGIN": {
        this.controller.getActiveUsers();
        this.controller.getInactiveUsers();
        this.view.create("user-status", [], true);
        break;
      }
      case "USER_EXTERNAL_LOGOUT": {
        this.controller.getActiveUsers();
        this.controller.getInactiveUsers();
        this.view.create("user-status", [], false);
        break;
      }
      case "USER_ACTIVE": {
        this.view.create("user-list-active", response.payload.users);
        break;
      }
      case "USER_INACTIVE": {
        this.view.create("user-list-inactive", response.payload.users);
        break;
      }
      case "MSG_SEND": {
        const data: userMessageType[] = [response.payload.message];
        const messageTo = data[0].to;
        const messageFrom = data[0].from;

        const activeChat = this.view.mainView.activeChat;
        if (activeChat === messageTo || activeChat === messageFrom) {
          this.view.create("user-all-messages", data);
        }
        break;
      }
      case "MSG_FROM_USER": {
        this.view.create("user-all-messages", response.payload.messages);
        break;
      }
      case "MSG_READ": {
        const activeChat = this.view.mainView.activeChat;
        if (activeChat) {
          this.view.mainView.userChat.updateMessageStatus(
            response.payload.message
          );
        }
        break;
      }
      case "MSG_EDIT": {
        const activeChat = this.view.mainView.activeChat;
        if (activeChat) {
          this.view.mainView.userChat.updateMessage(response.payload.message);
        }
        break;
      }
      case "MSG_DELETE": {
        const activeChat = this.view.mainView.activeChat;
        if (activeChat)
          this.view.mainView.userChat.deleteMessage(
            response.payload.message.id
          );
        break;
      }
      case "ERROR": {
        if (response.payload.error === "the user was not authorized") {
          sessionStorage.removeItem("user");
          this.controller.redirect("/login");
        } else {
          const pwdMessageElement =
            document.querySelector("#login-pwd-message");
          if (pwdMessageElement) {
            pwdMessageElement.textContent = response.payload.error;
          }
        }

        break;
      }
      default: {
        console.log(response);
      }
    }
  }

  reconnect() {
    const interval = setInterval(() => {
      const testConnection = new WebSocket(this.server);

      testConnection.addEventListener("open", () => {
        console.log("connection restored");
        clearInterval(interval);
        this.createConnection();
        testConnection.close();
      });
    }, 3000);
  }

  // end
}
