import { ViewModel } from "../../ViewModel";
import { AppController } from "../../../app/AppController";
import { LOGIN_NAME_MIN, LOGIN_NAME_MAX, LOGIN_PWD_MIN, LOGIN_PWD_MAX} from "../../../app/utils/loginValidation"

export class LoginView extends ViewModel {
  controller: AppController;
  mainNode: HTMLElement;
  loginNameInput: HTMLInputElement;
  loginPwdInput: HTMLInputElement;


  constructor(appController: AppController, node: HTMLElement) {
    super();
    this.controller = appController;
    this.mainNode = node;
  }

  redirect() {
    if (sessionStorage.getItem("auth")) {
      window.location.href = "/";
    }
  }

  create() {
    // Redirect if alredy login
    // this.redirect();

    // CLEAN OLD VIEW
    this.mainNode.replaceChildren();

    // MAIN SECTION
    const mainContainer = this.createElement('section', this.mainNode, {
      id: 'main',
      className: 'section__main-login'
    });
    // LOGIN BOX CONTAINER 
    const loginContainer = this.createElement('div', mainContainer, {
      className: 'container__login-box'
    });

    // LOGIN FORM
    const formElement = this.createElement('form', loginContainer, {
      className: 'form__login'
    });

    // login name
    const loginNameContainer = this.createElement('div', formElement, {
      className: 'container__login-input'
    });

    let parentContainer = this.createElement('div', loginNameContainer, {
      id: 'login-name-input',
      className: 'login-input'
    });

    this.createElement('label', parentContainer, {
      for: 'login-name-input',
      text: 'Name:',
    });

    this.loginNameInput = this.createElement('input', parentContainer, {
      id: 'login-name',
      className: ['input__login-name', 'input__login'],
      name: 'userName',
      autofocus: '',
      minlength: LOGIN_NAME_MIN.toString(),
      maxlength: LOGIN_NAME_MAX.toString(),
    }) as HTMLInputElement;

    parentContainer = this.createElement('div', loginNameContainer, {
      className: 'container__login-message'
    });
    this.createElement('p', parentContainer, {
      id: 'login-name-message',
      className: 'text__login-message'
    })

    // login password
    const loginPwdContainer = this.createElement('div', formElement, {
      className: 'container__login-passowrd'
    })
    parentContainer = this.createElement('div', loginPwdContainer, {
      id: 'login-pwd-input',
      className: 'login-input'
    });
    this.createElement('label', parentContainer, {
      for: 'login-password',
      text: 'Password:'
    });
    this.loginPwdInput = this.createElement('input', parentContainer, {
      type: 'password',
      id: 'login-password',
      className: ['input__login-password', 'input__login'],
      name: 'userPwd',
      minlength: LOGIN_PWD_MIN.toString(),
      maxlength: LOGIN_PWD_MAX.toString(),
    }) as HTMLInputElement;

    parentContainer = this.createElement('div', loginPwdContainer, {
      className: 'container__login-message'
    });
    this.createElement('p', parentContainer, {
      id: 'login-pwd-message',
      className: 'text__login-message'
    })
    
    // submit button
    parentContainer = this.createElement('div', formElement, {
      className: 'container__login-button'
    });
    this.createElement('button', parentContainer, {
      type: 'button',
      text: 'Login',
      id: 'login-submit-btn',
      className: 'button__login-submit',
      disabled: '',
      event: ['click', () => {
        this.controller.loginAuth(this.loginNameInput.value, this.loginPwdInput.value);
      }]
    });

    // ADD EVENTS
    this.addEvents();

    // MOUNT 
    this.mount();
  }

  addEvents() {

    // INPUT VALIDATION
    this.loginNameInput.addEventListener('input', () => {
      this.controller.loginValidation(this.loginNameInput, this.loginNameInput.value);
    });
    this.loginPwdInput.addEventListener('input', () => {
      this.controller.loginValidation(this.loginPwdInput, this.loginPwdInput.value);
    });

    // USE ENTER KEY TO LOGIN
    document.addEventListener('keydown', (event) => {

      if (event.key === 'Enter' && this.loginPwdInput.value !== '') {
        this.controller.loginAuth(this.loginNameInput.value, this.loginPwdInput.value);
      }
    })
  }
}