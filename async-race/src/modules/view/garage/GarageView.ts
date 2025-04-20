// import { View } from "../../app/types/view";
import { View } from "../View";
import { modifyHTML } from "./htmlTemplates/modifyHTML";
import { carImg } from "./htmlTemplates/carImg";
import { findCarLogo } from "../../app/utils/findCarLogo";
import { garageCarType } from "../../app/types/types";
import { CarList } from "./module/CarList";
import { ModalView } from "../modal/ModalView";


export class GarageView extends View  {
  data: garageCarType[];
  carList: CarList;

  constructor(data: garageCarType[]) {
    super();
    this.data = data;
    // this.cleanView(this.mainContainer);
    this.mainContainer.replaceChildren();
    this.createHtmlElements();

    this.mount();
    this.carList = new CarList(this.data);
    this.addEvents();

}

  createHtmlElements() {

    /**
     * MODIFY SECTION
     */

    // modify container
    const modifyContainer = this.createElement('section', this.mainContainer, {
      id: 'modify-section',
      html: modifyHTML
    });

    // modify GENERATE CARS BUTTON
    this.createElement('button', modifyContainer, {
      id: 'button__modify-generate',
      text: "GENERATE CARS",
      className: 'button__modify',
      event: ['click', () => {
        this.controller.getRandomCars();
      }] 
    });

  }

  private addEvents() {
    const createCarButton = document.getElementById("button__car-create");
    const createCarNameInput: HTMLInputElement = document.querySelector("#input__car-create");
    const createCarColorInput: HTMLInputElement = document.querySelector("#input__car-color-create");

    const updateCarButton = document.getElementById("button__car-update");
    const updateCarInput: HTMLInputElement = document.querySelector("#input__car-update");
    const updateCarColorInput: HTMLInputElement = document.querySelector("#input__car-color-update");

    const raceCarButton = document.getElementById("button__race-start");

    if (createCarButton && createCarNameInput && createCarColorInput) {
      createCarButton.addEventListener('click', () => {
        this.controller.createCar(
          createCarNameInput.value,
          createCarColorInput.value
        );
      });
    }

    if (updateCarButton && updateCarInput && updateCarColorInput) {
      updateCarButton.addEventListener('click', () => {
        this.controller.updateCar(
          Number(updateCarInput.getAttribute('carId')),
          updateCarInput.value,
          updateCarColorInput.value
        );
      });
    }

  }


// end
}