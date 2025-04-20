import { View } from "../../View";
import { garageCarType } from "../../../app/types/types";
import { carImg } from "../htmlTemplates/carImg";

export class CarList extends View {
	data: garageCarType[];
	page: number;
	itemsPerPage: number;
	pageTotal: number;
	pageStart: number;
	pageEnd: number;
	pageCurrent: number;
	carsTotal: number;
	btnPrev: HTMLElement;
	btnNext: HTMLElement;
  garageCarList: HTMLElement;
	
  constructor(data: garageCarType[]) {
    super();
    this.data = data;
    this.itemsPerPage = 7;
    this.carsTotal = this.data.length;
    this.pageTotal = Math.ceil(this.carsTotal / this.itemsPerPage);
    this.pageCurrent = 1;

    // console.log('Total cars: ', this.carsTotal);
    // console.log('Total pages: ', this.pageTotal);
    // console.log(this.data);

    this.createPage(this.pageCurrent);
    this.mount();
  }

  createPage(page: number) {
    // console.log("current page: ", page);

    // garage container
    const garageContainer = this.createElement('section', this.mainContainer, {
      id: 'garage-section',
    });

    // garage title
    const garageTitleContainer = this.createElement('div', garageContainer, {
      className: 'garage-header'
    }
  );
    this.createElement('h1', garageTitleContainer, {
        id: 'text__garage-title',
        text: `Garage: (${this.carsTotal})`,
        className: 'text__garage' 
      });

    // garage RACE BUTTON
    this.createElement('button', garageTitleContainer, {
      id: 'button__race-start',
      text: "START THE RACE",
      className: 'button__garage-title',
      event: ['click', () => {
        this.controller.race(this.raceCars);
      }] 
    });

    // garage RETURN THE CARS TO THE GARAGE BUTTON
    this.createElement('button', garageTitleContainer, {
      id: 'button__race-return',
      text: "RETURN THE CARS TO THE GARAGE",
      className: 'button__garage-title',
      disabled: ''
    });

    // garage car name container
    this.garageCarList = this.createElement('div', garageContainer, {
      id: 'garage-car-list',
    });

    this.createGarageList(page, this.garageCarList);

    //garage race: BUTTON PREVIOUS PAGE
    this.btnPrev = this.createElement('button', garageContainer, {
      id: 'button__prev-page',
      text: 'PREV',
      className: 'button__pagination',
      event: ['click', () => {
        this.createPrevPage();
      }] 
    });
    this.btnPrev.setAttribute("disabled", "");

    //garage race: BUTTON NEXT PAGE
    this.btnNext = this.createElement('button', garageContainer, {
      id: 'button__next-page',
      text: 'NEXT',
      className: 'button__pagination',
      event: ['click', () => {
        this.createNextPage();
      }] 
    });


  }

  createGarageList(page: number, garageCarList: HTMLElement) {
    this.raceCars = [];
    // garage car: CARS LIST
    let startId = 0;
    let endId = this.itemsPerPage - 1 ;

    if (page > 1) {
      startId = this.itemsPerPage * (page - 1);
      endId = startId + (this.itemsPerPage - 1);
    } 

    // console.log(startId, endId);
    for (let i = startId; i < endId && i < this.carsTotal; i += 1) {
      this.createHTMLElements(this.data[i], garageCarList);
    }
    
  }
  
  createNextPage() {
    
    if (this.pageCurrent > 0 && this.pageCurrent < this.pageTotal ) {
      const btnPrev = document.querySelector('#button__prev-page');
      btnPrev.removeAttribute("disabled");

      this.pageCurrent += 1;

      this.htmlElements = [];
      this.createGarageList(this.pageCurrent, this.garageCarList);
      this.garageCarList.replaceChildren();
      this.mount();

      if (this.pageCurrent === this.pageTotal) {
        const btnNext = document.querySelector('#button__next-page');
        btnNext.setAttribute("disabled", "");
      }
    }

  }

  createPrevPage() {
    if (this.pageCurrent > 1 && this.pageCurrent <= this.pageTotal ) {
      const btnNext = document.querySelector('#button__next-page');
      btnNext.removeAttribute("disabled");

      this.pageCurrent -= 1;

      this.htmlElements = [];
      this.createGarageList(this.pageCurrent, this.garageCarList);
      this.garageCarList.replaceChildren();
      this.mount();

      if (this.pageCurrent === 1) {
        const btnPrev = document.querySelector('#button__prev-page');
        btnPrev.setAttribute("disabled", "");
      }
    }
  }


  createHTMLElements(car: garageCarType, garageContainer: HTMLElement) {
    // add current car id to array
    this.raceCars.push(car.id);

    const garageCarName = this.createElement('div', garageContainer, {
      id: 'garage-car-name-' + car.id,
      className: 'garage-car-name'
    });
    const garageCarRace = this.createElement('div', garageContainer, {
      id: 'garage-car-race-' + car.id,
      className: 'garage-car-race'
    });
  
    // GARAGE: CAR NAME

    // garage car: LOGO
    this.createElement('span', garageCarName, {
      id: 'img__garage-car-logo'+ car.id,
      // html: `<img src="./${findCarLogo(car.name)}.svg">`,
      className: 'img__garage-car-logo' 
    });
    // garage car: NAME
    this.createElement('h4', garageCarName, {
      id: 'text__garage-car-'+ car.id,
      text: `#${car.id} ${car.name}`,
      className: 'text__garage-car' 
    });
    // garage car: SELECT BUTTON
    this.createElement('button', garageCarName, {
      id: 'button__car-select'+ car.id,
      text: 'SELECT',
      className: 'button__garage',
      event: ['click', () => {
        this.controller.selectCar(car.id, car.name, car.color);
      }]  
    });
    // garage car: REMOVE BUTTON
    this.createElement('button', garageCarName, {
      id: 'button__car-remove'+ car.id,
      text: 'REMOVE',
      className: 'button__garage',
      event: ['click', () => {
        this.controller.deleteCar(car.id);
      }] 
    });

    // GARAGE: CAR RACE

    // garage race: buttons container
    const raceBtnContainer = this.createElement('div', garageCarRace, {
      id: 'car-race-buttons'+ car.id,
    });
    // garage race: button start
    this.createElement('button', raceBtnContainer, {
      id: 'button__car-engine-start-'+ car.id,
      text: 'A',
      className: 'button__car-engine',
      event: ['click', () => {
        this.controller.setCarEngine(car.id, 'started');
      }] 
    });
    // garage race: button stop
    this.createElement('button', raceBtnContainer, {
      id: 'button__car-engine-stop-'+ car.id,
      text: 'B',
      className: 'button__car-engine'
    });
    // garage race: car svg
    this.createElement('div', garageCarRace, {
      id: 'img__container'+ car.id,
      html: carImg(car.id, car.color).toString(),
      className: 'img__car',
    });
    // garage race: finish svg
    this.createElement('div', garageCarRace, {
      id: 'img__finish',
      html: "|",
    });

  }



// end
}