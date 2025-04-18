import { AppController } from "../app/AppController";

export class View  {

  controller: AppController;
  htmlElements: any;
  root: HTMLElement;
  headerContainer: HTMLElement; 
  mainContainer: HTMLElement;
  raceCars: number[];

  constructor() {
    this.controller = new AppController();
    this.htmlElements = [];
    this.root = document.getElementById('root');
    this.headerContainer = document.getElementById('header-container');
    this.mainContainer = document.getElementById('main-container')
    this.raceCars = [];
  }

  createElement(
    elementName: string, 
    parentNode: HTMLElement, 
    params: {}) {

    const element = document.createElement(elementName);
    for (const [key, value] of Object.entries(params)) {

      switch(key) {
        case 'text':
                element.innerText = String(value);
                break;
        case 'html': 
                element.innerHTML = String(value);
                break;
        case 'className':
                element.classList.add(String(value));
                break;
        case 'color':
                element.setAttribute("style", 'fill: ' + String(value));
                break;
        case 'event':
                break;
        default:
                element.setAttribute(String(key), String(value));
      }

      if (key === 'event' && Array.isArray(value)) {
        element.addEventListener(value[0], value[1]);
      }

    }

    this.htmlElements.push([element, parentNode]);
    return element; 
  }

  cleanView(node: any) {
    // node.remove();
    node.replaceChildren();
  }

  mount(){
    this.htmlElements.forEach((element: HTMLElement[]) => {
      element[1].appendChild(element[0]);
    });
  }

// end
}