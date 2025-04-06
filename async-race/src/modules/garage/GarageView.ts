import { View } from "../../types/view";
import { GarageController } from "./GarageController";

interface createElement {
  element: string;
  text: string;
}

export class GarageView implements View {
  controller: GarageController;
  root: HTMLElement;

  private title: HTMLElement;
  private incrementButton: HTMLElement;
  private decrementButton: HTMLElement;
  private multipleButton: HTMLElement;

  constructor(root: HTMLElement) {
      this.root = root;
      this.controller = new GarageController();

      this.render();
      // this.incrementButton = document.createElement('button');
      // this.incrementButton.innerText = 'increment';
      // this.decrementButton = document.createElement('button');
      // this.decrementButton.innerText = 'decrement';
      // this.multipleButton = document.createElement('button');
      // this.multipleButton.innerText = 'multiply';

      // this.bindListeners();
  }

  createElement(elementName: string, parentNode: HTMLElement, params: {}) {

    const element = document.createElement(elementName);
    for (const [key, value] of Object.entries(params)) {
      console.log(`${key}: ${value}`);
      if (key === 'id') element.setAttribute("id", String(value));
      if (key === 'text') element.innerText = String(value);
      if (key === 'className') element.classList.add(String(value));
    }

    parentNode.appendChild(element);
    return element;
  }

  async render() {
    
    const title = this.createElement('h1', this.root, {
        id: 'title',
        text: 'Loading ...',
        className: 'header-title' 
      }
    );

    const garageView = this.createElement('div', this.root, {
        id: 'garageView'
      }
    );

    const allCars: [] = await this.controller.getAllCars();

    title.innerHTML = `Garage: (${allCars.length})`;

    console.log(allCars);

    allCars.forEach((e: any) => {
      console.log(e.name);
      this.createElement('p', garageView, {
        id: 'garageView',
        text: e.name
        }
      );
    });
  }

  // private onIncrementClick = () => {
  //   this.updateTitle(this.controller.handleIncrement())
  // }

  // private onDecrementClick = () => {
  //     this.updateTitle(this.controller.handleDecrement())
  // }

  // private onMultiplyClick = () => {
  //     this.updateTitle(this.controller.handleMultiply())
  // }

  // private bindListeners() {
  //     this.incrementButton.addEventListener('click', this.onIncrementClick);
  //     this.decrementButton.addEventListener('click', this.onDecrementClick);
  //     this.multipleButton.addEventListener('click', this.onMultiplyClick);
  // }

  // public updateTitle(value: number) {
  //     this.title.innerText = `Value = ${value}`;
  // }

  public mount() {
    // this.root.appendChild(this.title);
    // this.root.appendChild(this.incrementButton);
    // this.root.appendChild(this.decrementButton);
    // this.root.appendChild(this.multipleButton);
  }
  }