import { ViewModel } from "../../../ViewModel";
import { AppController } from "../../../../app/AppController";

// css
import "./noConnection.scss";

export class NoConnectionView extends ViewModel {
  controller: AppController;
  mainNode: HTMLElement;

  constructor(appController: AppController, node: HTMLElement) {
    super();
    this.controller = appController;
    this.mainNode = node;
  }

  create() {
    // CLEAN OLD VIEW
    // this.mainNode.replaceChildren();

    // ABOUT
    const mainContainer = this.createElement("div", document.body, {
      className: "no-connection-container",
    });
    this.createElement("h1", mainContainer, {
      className: "text__no-connection-header",
      text: "NO CONNECTION",
    });

    // BLUR
    this.mainNode.classList.add("view-blur");

    // MOUNT
    this.mount();
  }
}
