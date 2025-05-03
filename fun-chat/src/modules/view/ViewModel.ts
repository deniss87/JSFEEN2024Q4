export class ViewModel {
  htmlElements: [HTMLElement, HTMLElement][];

  constructor() {
    this.htmlElements = [];
  }

  createElement(
    elementName: string,
    parentNode: HTMLElement,
    parameters: object
  ) {
    const element: HTMLElement = document.createElement(elementName);

    for (const [key, value] of Object.entries(parameters)) {
      if (key === "className" && Array.isArray(value)) {
        for (const value_ of value) {
          element.classList.add(String(value_));
        }
      } else if (key === "className" && typeof value === "string") {
        element.classList.add(String(value));
      } else if (key === "text") element.textContent = String(value);
      else if (key === "html") element.innerHTML = String(value);
      else if (key === "color") {
        element.setAttribute("style", "fill: " + String(value));
      } else if (key === "event" && Array.isArray(value)) {
        element.addEventListener(value[0], value[1]);
      } else {
        element.setAttribute(String(key), String(value));
      }
    }

    this.htmlElements.push([element, parentNode]);
    return element;
  }

  mount() {
    for (const element of this.htmlElements) {
      element[1].append(element[0]);
    }
    this.htmlElements = [];
  }

  // end
}
