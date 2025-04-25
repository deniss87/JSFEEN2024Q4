import { AppController } from "../../../app/AppController";
import { ViewModel } from "../../ViewModel";
import { paginationViewType } from "../../../app/types/types";

export class HeaderView extends ViewModel {

  controller: AppController;
  root: HTMLElement;
  currentView: string;
  garageLink: HTMLElement;
  winnersLink: HTMLElement;

  constructor ( controller: AppController, root: HTMLElement) {
    super();
    this.controller = controller;
    this.root = root;
    this.create();
  }

  create() {

    // NAVIGATION
    const navContainer = this.createElement('nav', this.root, {
      className: 'nav__container',
    });
    // NAVIGATION - garage 
    this.garageLink = this.createElement('div', navContainer, {
      className: ['nav__link', 'nav__link-active'],
      event: ['click', () => {
        this.currentView = 'garage';
        this.setActiveNav();
        this.controller.viewRouter('garage');
      }]
    });
    this.createElement('h3', this.garageLink, {
      text: 'GARAGE',
      className: 'nav__text',
    });
    // NAVIGATION - winners
    this.winnersLink  = this.createElement('div', navContainer, {
      className: 'nav__link',
      event: ['click', () => {
        this.currentView = 'winners';
        this.setActiveNav();
        this.controller.viewRouter('winners');
      }]
    });
    this.createElement('h3', this.winnersLink, {
      text: 'WINNERS',
      className: 'nav__text',
    }); 

    // mount this elements
    this.mount();
  }

  setActiveNav () {
    if (this.currentView === 'garage') {
      this.garageLink.classList.add('nav__link-active');
      this.winnersLink.classList.remove('nav__link-active');
    } else {
      this.winnersLink.classList.add('nav__link-active');
      this.garageLink.classList.remove('nav__link-active');
    }
  }
// end
}