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

    //

    // MOUNT
    this.mount();
  }
}
