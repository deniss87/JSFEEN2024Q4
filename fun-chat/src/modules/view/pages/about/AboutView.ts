import { ViewModel } from "../../ViewModel";
import { AppController } from "../../../app/AppController";

// css
import "./about.scss";

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
    const aboutContainer = this.createElement("main", this.mainNode, {
      className: "main-about",
    });
    // header
    let parentNode = this.createElement("div", aboutContainer, {
      className: "about-header",
    });
    this.createElement("h1", parentNode, {
      className: ["text__about-header", "text__header-fun"],
      text: "What is Fun Chat?",
    });

    // main
    const html = `
    <h3>Fan Chat is a simple messaging app created as part of the RS School course.</h3>
    <p>You can log in by entering any name and password, if they meet the authorization requirements.</p>
    <p>In the future, use the same data to access your messages.</p>
    <p>Communicate easily with your friends and family and of course...</p>
    <h2 class="text__header-fun">HAVE FUN</h2>
    `;
    parentNode = this.createElement("div", aboutContainer, {
      className: ["about-main", "text__standart"],
      html: html,
    });

    // GO BACK BUTTON
    parentNode = this.createElement("div", aboutContainer, {
      className: "about-button",
    });
    this.createElement("button", parentNode, {
      className: ["button__about-back", "button"],
      text: "BACK",
      event: [
        "click",
        () => {
          this.controller.redirect("/");
        },
      ],
    });

    // MOUNT
    this.mount();
  }
}
