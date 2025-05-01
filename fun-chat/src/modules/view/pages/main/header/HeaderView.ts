import { ViewModel } from "../../../ViewModel";
import { AppController } from "../../../../app/AppController";


export class HeaderView extends ViewModel {
  controller: AppController;
  mainNode: HTMLElement;

  constructor(appController: AppController, node: HTMLElement) {
    super();
    this.controller = appController;
    this.mainNode = node;

    this.create();
  }

  create() {
    // CLEAN OLD VIEW
    this.mainNode.replaceChildren();
    
    // GET USER NAME FROM SESSION
    const userName = sessionStorage.getItem('user');
    
    // HEADER 

    // user name
    let parentNode = this.createElement('div', this.mainNode, {
      className: 'header__user-name',
    });
    this.createElement('h3', parentNode, {
      className: 'text__header-user-name',
      text: `User: ${userName}`
    });

    // title
    parentNode = this.createElement('div', this.mainNode, {
      className: 'header__title',
    });
    this.createElement('h3', parentNode, {
      className: 'text__header-title',
      text: 'Fun chat'
    });

    // logout
    parentNode = this.createElement('div', this.mainNode, {
      className: 'header__logout',
    });
    this.createElement('button', parentNode, {
      className: 'button__logout',
      text: 'Logout',
      event: ['click', () => {
        this.controller.userLogout();
      }]
    });

    // MOUNT 
    this.mount();
  }
}