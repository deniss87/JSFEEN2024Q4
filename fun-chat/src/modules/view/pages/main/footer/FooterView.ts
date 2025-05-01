import { ViewModel } from "../../../ViewModel";
import { AppController } from "../../../../app/AppController";


export class FooterView extends ViewModel {
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
    
    // HEADER
    this.createElement('h1', this.mainNode, {
      text: 'Footer'
    })

    // MOUNT 
    this.mount();
  }
}