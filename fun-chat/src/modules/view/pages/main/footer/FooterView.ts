import { ViewModel } from "../../../ViewModel";
import { AppController } from "../../../../app/AppController";

// css
import "./footer.scss";

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

    // FOOTER

    this.createElement("div", this.mainNode, {
      className: "footer__school",
      html: "RSSchool",
    });

    this.createElement("div", this.mainNode, {
      className: "footer__author",
      html: "&copy; Deniss Patancevs",
    });

    this.createElement("div", this.mainNode, {
      className: "footer__year",
      html: "2025",
    });

    // MOUNT
    this.mount();
  }
}
