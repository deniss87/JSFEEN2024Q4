import { ViewModel } from "../../ViewModel";
import { AppController } from "../../../app/AppController";
import { HeaderView } from "./header/HeaderView";
import { FooterView } from "./footer/FooterView";

// CSS
import './header/header.scss';
import './footer/footer.scss';

export class MainView extends ViewModel {
  controller: AppController;
  mainNode: HTMLElement;

  constructor(appController: AppController, node: HTMLElement) {
    super();
    this.controller = appController;
    this.mainNode = node;
  }

  create() {
    // CLEAN OLD VIEW
    this.mainNode.replaceChildren();
    
    // HEADER
    const headerContainer = this.createElement('header', this.mainNode, {
      className: 'header',
    });
    new HeaderView(this.controller, headerContainer);

    // MAIN SECTION
    const mainContainer = this.createElement('main', this.mainNode, {
      className: 'main'
    });

    this.createElement('h1', mainContainer, {
      text: 'Main page'
    })


    // FOOTER
    const footerContainer = this.createElement('footer', this.mainNode, {
      className: 'footer',
    });
    new FooterView(this.controller, footerContainer);

    // MOUNT 
    this.mount();
  }
}