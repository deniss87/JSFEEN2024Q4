import { Controller } from "./types/controller";
import { AppModel } from "./AppModel";
import { Router } from "./Router";
import { View } from "../view/View";
import { routerType, socketActiveUsers } from "./types/types";
import {
  loginNameValidation,
  loginPwdValidation,
} from "./utils/loginValidation";

// CONST
import { PATH } from "../app/constants/appConst";

export class AppController implements Controller {
  model: AppModel;
  view: View;
  router: Router;
  nameValidation: boolean;
  pwdValidation: boolean;
  sessionId: string;
  userName: string;
  userPassword: string;

  constructor(router: Router) {
    this.getSession();
    this.view = new View(this);
    this.model = new AppModel(this, this.view);
    this.router = router;
  }

  getSession() {
    const sessionId = sessionStorage.getItem("funID");
    if (sessionId === undefined || sessionId === null) {
      this.sessionId = this.setSession(24);
    } else {
      this.sessionId = sessionId;
      this.userName = sessionStorage.getItem("user");
      this.userPassword = sessionStorage.getItem("password");
    }
  }

  setSession(length: number): string {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    const sessionId = Array.from(array, (dec) =>
      dec.toString(16).padStart(2, "0")
    ).join("");
    sessionStorage.setItem("funID", sessionId);
    return sessionId;
  }

  // REDIRECT
  redirect(uri: string) {
    globalThis.history.pushState(uri, "Fun Chat", PATH + uri);
    this.getView();
  }

  // USER LOGIN VALIDATION
  loginValidation(element: HTMLInputElement, value: string) {
    const nameMessage = document.querySelector("#login-name-message");
    const pwdMessage = document.querySelector("#login-pwd-message");
    const submitButton = document.querySelector("#login-submit-btn");

    if (element.name === "userName") {
      const nameValidation = loginNameValidation(value);

      if (nameValidation === true) {
        element.classList.remove("input__incorrect");
        element.classList.add("input__correct");

        nameMessage.textContent = "";
        this.nameValidation = true;
      } else {
        element.classList.remove("input__correct");
        element.classList.add("input__incorrect");

        nameMessage.textContent = nameValidation.toString();
        this.nameValidation = false;
      }
    }
    if (element.name === "userPwd") {
      const pwdValidation = loginPwdValidation(value);

      if (pwdValidation === true) {
        element.classList.remove("input__incorrect");
        element.classList.add("input__correct");

        pwdMessage.textContent = "";
        this.pwdValidation = true;
      } else {
        element.classList.remove("input__correct");
        element.classList.add("input__incorrect");

        pwdMessage.textContent = pwdValidation.toString();
        this.pwdValidation = false;
      }
    }

    if (this.nameValidation && this.pwdValidation) {
      submitButton.removeAttribute("disabled");
    } else {
      submitButton.setAttribute("disabled", "");
    }
  }
  // USER LOGIN AUTHENTICATION
  async loginAuth(name: string, password: string) {
    const nameValidation = loginNameValidation(name);
    const pwdValidation = loginPwdValidation(password);

    if (nameValidation === true && pwdValidation === true) {
      const data = {
        id: this.sessionId,
        type: "USER_LOGIN",
        payload: {
          user: {
            login: name,
            password: password,
          },
        },
      };

      sessionStorage.setItem("user", name);
      sessionStorage.setItem("password", password);
      this.userName = name;
      this.userPassword = password;

      this.model.sendData(data);
    } else {
      console.log("LOGIN AUTHENTICATION ERROR");
    }
  }

  reloginUser() {
    const data = {
      id: this.sessionId,
      type: "USER_LOGIN",
      payload: {
        user: {
          login: this.userName,
          password: this.userPassword,
        },
      },
    };
    this.model.sendData(data);
  }

  // USER LOGOUT
  userLogout() {
    const data = {
      id: this.sessionId,
      type: "USER_LOGOUT",
      payload: {
        user: {
          login: this.userName,
          password: this.userPassword,
        },
      },
    };
    this.model.sendData(data);
  }

  // VIEW AUTHENTICATION
  getViewAuth(route: routerType) {
    if (route.auth === false) return true;
    const authSession = sessionStorage.getItem("user");
    return route.auth === true && authSession ? true : false;
  }

  // GETTING ALL AUTHENTICATED USERS
  getActiveUsers() {
    const data: socketActiveUsers = {
      id: this.sessionId,
      type: "USER_ACTIVE",
      payload: {},
    };
    this.model.sendData(data);
  }

  // GETTING ALL UNAUTHORIZED USERS
  getInactiveUsers() {
    const data: socketActiveUsers = {
      id: this.sessionId,
      type: "USER_INACTIVE",
      payload: {},
    };
    this.model.sendData(data);
  }

  getChat(userName: string, status: boolean) {
    const user = {
      name: userName,
      status: status,
    };
    this.view.mainView.createChat(user);
    this.getAllMessages(userName);
  }

  // SEND MESSAGE TO USER
  sendMessage(userName: string, message: string) {
    const data = {
      id: this.sessionId,
      type: "MSG_SEND",
      payload: {
        message: {
          to: userName,
          text: message,
        },
      },
    };
    this.model.sendData(data);
  }

  // EDIT MESSAGE
  editMessage(messageId: string, message: string) {
    const data = {
      id: this.sessionId,
      type: "MSG_EDIT",
      payload: {
        message: {
          id: messageId,
          text: message,
        },
      },
    };
    this.model.sendData(data);
  }

  // EDIT MESSAGE
  deleteMessage(messageId: string) {
    const data = {
      id: this.sessionId,
      type: "MSG_DELETE",
      payload: {
        message: {
          id: messageId,
        },
      },
    };
    this.model.sendData(data);
  }

  // GET ALL MESSAGES
  getAllMessages(userName: string) {
    const data = {
      id: this.sessionId,
      type: "MSG_FROM_USER",
      payload: {
        user: {
          login: userName,
        },
      },
    };
    this.model.sendData(data);
  }
  // SET MESSAGE READ STATUS
  setReadStatus(messageId: string) {
    const data = {
      id: this.sessionId,
      type: "MSG_READ",
      payload: {
        message: {
          id: messageId,
        },
      },
    };
    this.model.sendData(data);
  }

  // GET ALL UNREAD MESSAGES
  getUnreadMessages(userName: string) {
    const data = {
      id: this.sessionId,
      type: "MSG_FROM_USER",
      payload: {
        user: {
          login: userName,
        },
      },
    };
    this.model.sendData(data);
  }

  // GET VIEW
  getView() {
    const route: routerType = this.router.resolve();

    if (route) {
      if (this.getViewAuth(route)) {
        this.view.create(route.view);
      } else {
        this.redirect("/login");
      }
    } else {
      throw new Error("Not found");
    }
  }

  public async start() {
    console.log("App is running...");

    await this.model.createConnection();

    this.getView();
  }
}
