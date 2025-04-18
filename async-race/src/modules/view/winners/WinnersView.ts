import { View } from "../View";

export class WinnersView extends View {
  root: HTMLElement;
  data: {}[];

  constructor(winnersData: {}[]) {
    super();
    this.data = winnersData;

    this.cleanView(this.mainContainer);
    this.createHtmlElements();
    this.mount();
  }

  createHtmlElements() {
    // winners container
    const root = this.createElement('div', this.mainContainer, {
        id: 'winners-conatiner'
      }
    );
    // title
    this.createElement('h1', root, {
        id: 'title',
        text: `Winners: `,
        className: 'header-title' 
      }
    );

    // winners list
    this.data.forEach((car: any) => {
      this.createElement('p', root, {
          id: 'car-'+ car.id,
          text: `${car.id} / ${car.name} / ${car.wins} / ${car.time}`,
          className: 'car' 
        }
      )
    });
    
  }


// end  
}