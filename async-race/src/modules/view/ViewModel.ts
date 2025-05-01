import { AppController } from "../app/AppController";

export class ViewModel {
  htmlElements: [HTMLElement, HTMLElement][];

  constructor() {
    this.htmlElements = [];
  }

  createElement(elementName: string, parentNode: HTMLElement, params: {}) {
    const element: HTMLElement = document.createElement(elementName);

    for (const [key, value] of Object.entries(params)) {
      if (key === "className" && Array.isArray(value)) {
        value.forEach((val) => {
          element.classList.add(String(val));
        });
      } else if (key === "className" && typeof value === "string") {
        element.classList.add(String(value));
      } else if (key === "text") element.innerText = String(value);
      else if (key === "html") element.innerHTML = String(value);
      else if (key === "color")
        element.setAttribute("style", "fill: " + String(value));
      else if (key === "event" && Array.isArray(value)) {
        element.addEventListener(value[0], value[1]);
      } else {
        element.setAttribute(String(key), String(value));
      }
    }

    this.htmlElements.push([element, parentNode]);
    return element;
  }

  mount() {
    this.htmlElements.forEach((element: HTMLElement[]) => {
      element[1].appendChild(element[0]);
    });

    this.htmlElements = [];
  }

  // end
}
