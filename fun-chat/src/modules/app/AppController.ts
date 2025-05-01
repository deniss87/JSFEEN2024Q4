import { Controller } from "./types/controller";
import { AppModel } from "./AppModel";
import { Router } from "./Router";
import { View } from "../view/View";
import { routerType } from "./types/types";
import { loginNameValidation, loginPwdValidation } from "./utils/loginValidation";


export class AppController implements Controller {
  model: AppModel;
  view: View;
  router: Router;
  nameValidation: boolean;
  pwdValidation: boolean;

  constructor(router: Router) {
    this.model = new AppModel(this);
    this.view = new View(this);
    this.router = router;
  }

  // USER LOGIN VALIDATION
  loginValidation(element: HTMLInputElement, value: string) {
    const nameMsg = document.getElementById('login-name-message');
    const pwdMsg = document.getElementById('login-pwd-message');
    const submitBtn = document.getElementById('login-submit-btn');


    if (element.name === 'userName') {
      const nameValidation = loginNameValidation(value);

      if (nameValidation !== true) {
        element.classList.remove('input__correct');
        element.classList.add('input__incorrect');

        nameMsg.innerText = nameValidation.toString();
        this.nameValidation = false;
        
      } else {
        element.classList.remove('input__incorrect');
        element.classList.add('input__correct');

        nameMsg.innerText = '';
        this.nameValidation = true;
      } 

    }
    if (element.name === 'userPwd') {
      const pwdValidation = loginPwdValidation(value);
      
      if (pwdValidation !== true) {
        element.classList.remove('input__correct');
        element.classList.add('input__incorrect');

        pwdMsg.innerText = pwdValidation.toString();
        this.pwdValidation = false;

      } else {
        element.classList.remove('input__incorrect');
        element.classList.add('input__correct');

        pwdMsg.innerText = '';
        this.pwdValidation = true;
      } 
    }

    if (this.nameValidation && this.pwdValidation) {
      submitBtn.removeAttribute('disabled');
    } else {
      submitBtn.setAttribute('disabled', '');
    }
      

  }
  // USER LOGIN AUTHENTICATION
  async loginAuth(name: string, password: string) {
    const nameValidation = loginNameValidation(name);
    const pwdValidation = loginPwdValidation(password);

    if (nameValidation === true && pwdValidation === true) {
     
      const data = {
        id: '1',
        type: "USER_LOGIN",
        payload: {
          user: {
            login: name,
            password: password,
          },
        },
      };

      await this.model.sendData(data);
    } else {
      console.log(nameValidation, pwdValidation);
    }
    
  }

  // USER LOGOUT
  userLogout() {
    sessionStorage.removeItem('user');
    this.getView();
  }

  // VIEW AUTHENTICATION
  getViewAuth(route: routerType) {
    
    if (route.auth === false) return true;

    const authSession = sessionStorage.getItem("user");

    if (route.auth === true && authSession) {
      return true;
    } else {
      return false;
    }
  }
  
  // GET VIEW
  getView() {
    const route: routerType = this.router.resolve();

    if (route) {

      if (this.getViewAuth(route)) {
        return this.view.create(route.view);
      } 
      else {
        return window.location.href = "login"
      }

    } else {
      throw new Error('Not found');
    }

  }


  public async start() {
    console.log('App is running...');

    const conn = await this.model.createConnection();
    this.getView();
    
    
  }
}