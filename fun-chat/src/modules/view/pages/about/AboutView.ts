import { ViewModel } from "../../ViewModel";
import { AppController } from "../../../app/AppController";

export class AboutView extends ViewModel {
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
    
    // ABOUT
    const aboutContainer = this.createElement('main', this.mainNode, {
      className: 'main',
    });
    this.createElement('h1', aboutContainer, {
      className: 'text',
      text: 'About'
    });


    // MOUNT 
    this.mount();
  }
}