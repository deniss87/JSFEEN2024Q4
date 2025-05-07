import { ViewModel } from "../../../ViewModel";
import { AppController } from "../../../../app/AppController";

// images
import { rsschoolLogo, githubLogo } from "../../../assets/images";

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
      html: `<a href="https://rs.school/courses/javascript" target="_blank">${rsschoolLogo}</a>`,
    });

    this.createElement("div", this.mainNode, {
      className: "footer__author",
      html: "&copy; Deniss Patancevs (2025)",
    });

    this.createElement("div", this.mainNode, {
      className: "footer__year",
      html: `<a href="https://github.com/deepcd87" target="_blank">${githubLogo}</a>`,
    });

    // MOUNT
    this.mount();
  }
}
