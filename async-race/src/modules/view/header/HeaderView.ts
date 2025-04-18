// import { View } from "../../app/types/view";
import { View } from "../View";

export class HeaderView extends View {
  public mainContainer: HTMLElement;

  constructor() {
    super();
    this.createHtmlElements();
    this.mount();
  }

  
  createHtmlElements() {

    // Garage view button
    this.createElement('button', this.headerContainer, {
        id: 'button__garage-view',
        text: 'Garage',
        className: 'button__change-view',
        event: ['click', () => {
          this.controller.getGarage()
        }]
      }
    );

    // Winners view button
    this.createElement('button', this.headerContainer, {
      id: 'button__winners-view',
      text: 'Winnners',
      className: 'button__change-view' ,
      event: ['click', () => {
        this.controller.getWinners()
      }]
     }
    );

    
  }




// end
}