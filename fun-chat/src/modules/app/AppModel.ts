import { Socket } from "webpack-dev-server";
import { Model } from "./types/model";
import { AppController } from "./AppController";
import { socketMsgType } from "../app/types/types";


export class AppModel implements Model {
  
  private controller: AppController;
  
  private server: string;
  private socket: WebSocket;
  private requestId: string;
  socketMsg: {};

  constructor(appController: AppController) {
    this.server = 'ws://127.0.0.1:4000';
    this.controller = appController;
  }

  async createConnection() {

    const connPromise = await new Promise((resolve, reject) => {

      // create new connection
      this.socket = new WebSocket(this.server);

      // Listen for messages
      this.socket.addEventListener("message", (event) => {
        this.socketResponse(event.data);
      });

      this.socket.onopen = (event) => {
        resolve('Connnection is opened');
      }

    });

    return connPromise;
  
  }

  async sendData(data: any) {

    return this.socket.send(JSON.stringify(data));

  }

  socketResponse(msg: string) {
    const res = JSON.parse(msg); 

    if (res.type === 'USER_LOGIN') {
      const userName = res.payload.user.login;
      
      sessionStorage.setItem('user', userName);
      window.location.href = "/";
    
    }
    else if (res.type === 'ERROR') {
      console.log(res.payload.error);
      const pwdMsgElement = document.getElementById('login-pwd-message');
      pwdMsgElement.innerText = res.payload.error;
    }
      
  }

  // Authentication
  userAuthentication() {

  }

// end
}