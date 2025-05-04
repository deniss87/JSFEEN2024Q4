import { Model } from "./types/model";
import { AppController } from "./AppController";
import { socketGeneralType } from "../app/types/types";
import { View } from "../view/View";

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
        resolve("Connnection is opened");
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
        globalThis.history.pushState(
          "/",
          "Fun Chat",
          "/deepcd87-JSFEEN2024Q4/fun-chat/"
        );
        this.controller.getView();
        break;
      }
      case "USER_LOGOUT": {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("password");
        globalThis.history.pushState(
          "/login",
          "Fun Chat",
          "/deepcd87-JSFEEN2024Q4/fun-chat/login/"
        );
        this.controller.getView();
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
        const data = [response.payload.message];
        this.view.create("user-all-messages", data);
        break;
      }
      case "MSG_FROM_USER": {
        this.view.create("user-all-messages", response.payload.messages);
        break;
      }
      case "MSG_EDIT": {
        const user = this.view.mainView.userChat.user.name;
        if (user) this.controller.getAllMessages(user);
        break;
      }
      case "MSG_DELETE": {
        const user = this.view.mainView.userChat.user.name;
        if (user) this.controller.getAllMessages(user);
        break;
      }
      case "ERROR": {
        console.log(response.payload.error);

        if (response.payload.error === "the user was not authorized") {
          sessionStorage.removeItem("user");
          globalThis.history.pushState(
            "/login",
            "Fun Chat",
            "/deepcd87-JSFEEN2024Q4/fun-chat/login/"
          );
          this.controller.getView();
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

  // end
}
