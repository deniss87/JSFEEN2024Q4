import { ViewModel } from "../../../ViewModel";
import { AppController } from "../../../../app/AppController";

// css
// import "./noConnection.scss";

export class RouteNotFoundView extends ViewModel {
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
    const mainContainer = this.createElement("div", this.mainNode, {
      className: "no-connection",
    });
    this.createElement("h1", mainContainer, {
      className: "text__no-connection-header",
      text: "NO CONNECTION",
    });

    // MOUNT
    this.mount();
  }
}
