import { ViewModel } from "../../ViewModel";
import { AppController } from "../../../app/AppController";
import { garageCarType } from "../../../app/types/types";
import { carLogoSvg, finishLogoSvg } from  "../_assets/images";

export class GarageView extends ViewModel {

  controller: AppController;

  mainContainer: HTMLElement;
  sectionModify: HTMLElement;
  sectionControl: HTMLElement;
  sectionGarage: HTMLElement;
  garageContainer: HTMLElement;

  garageData: garageCarType[];

  page: number;
  pageTotal: number;
	pageStart: number;
	pageEnd: number;
  itemsPerPage: number;
	carsTotal: number;
  raceCars: number[];
  winnerResult: {};
  prevBtnStatus: boolean;
  nextBtnStatus: boolean;

  constructor ( appController: AppController, mainElement: HTMLElement ) {
    super();
    this.controller = appController;
    this.mainContainer = mainElement;

    this.page = 1;
    this.itemsPerPage = 7;
    this.prevBtnStatus = false;
    this.nextBtnStatus = true;

  }

  create() {
    // CLEAN OLD VIEW
    this.mainContainer.replaceChildren();

    // CREATE VIEW
    this.garageBody();
    this.garageModify();
    this.garageControl();
    this.getGarage();

    // MOUNT VIEW
    this.mount();

  }

  update() {
    this.getGarage();
  }

   
  /**
   * MAIN BODY
   */

  garageBody() {
    this.sectionModify = this.createElement('section', this.mainContainer, {
      className: 'section__modify',
    });
    this.sectionControl = this.createElement('section', this.mainContainer, {
      className: 'section__control',
    });
    this.sectionGarage = this.createElement('section', this.mainContainer, {
      className: 'section__garage',
    });
  }


  /**
   * MODIFY SECTION
   */

  garageModify() {

    // create car
    let parentNode =  this.createElement('div', this.sectionModify, {
      className: ['container__modify-create', 'container__modify']
    });
    const inputCarName: HTMLInputElement = this.createElement('input', parentNode, {
      type: 'text',
      id: 'input__car-create-name',
      className: 'input__garage-text',
      placeholder: 'CAR NAME'
    }) as HTMLInputElement;
    const inputCarColor: HTMLInputElement = this.createElement('input', parentNode, {
      type: 'color',
      id: 'input__car-create-color',
      className: 'input__garage-color',
      value: '#ffffff'
    }) as HTMLInputElement;
    this.createElement('button', parentNode, {
      type: 'button',
      id: 'button__car-create',
      className: 'button__modify',
      text: 'CREATE',
      event: ['click', () => {
        this.controller.createCar(inputCarName.value, inputCarColor.value);
      }]
    });

    // update car
    parentNode =  this.createElement('div', this.sectionModify, {
      className: ['container__modify-create', 'container__modify']
    });
    const inputUpdateCarName: HTMLInputElement = this.createElement('input', parentNode, {
      type: 'text',
      id: 'input__car-update-name',
      className: 'input__garage-text',
    }) as HTMLInputElement;
    const inputUpdateCarColor: HTMLInputElement = this.createElement('input', parentNode, {
      type: 'color',
      id: 'input__car-update-color',
      className: 'input__garage-color',
      value: '#ffffff',
    }) as HTMLInputElement;
    this.createElement('button', parentNode, {
      type: 'button',
      id: 'button__car-update',
      className: 'button__modify',
      text: 'UPDATE',
      disabled: '',
      event: ['click', () => {
        this.controller.updateCar(Number(inputUpdateCarName.name), inputUpdateCarName.value, inputUpdateCarColor.value);
      }]
    });
    
    
  }

  /**
   * CONTROL SECTION
   */

  garageControl() {
    // CONTROL BUTTON SECTION
    const controlBtnContainer = this.createElement('div', this.sectionControl, {
      className: 'control-btn-container'
    });

    // CONTROL RACE BUTTON
    this.createElement('button', controlBtnContainer, {
      id: 'button__race-start',
      text: "RACE",
      className: 'button__control',
      event: ['click', () => {
        this.controller.startRace(this.raceCars);
      }] 
    });

    // CONTROL CANCEL BUTTON
    this.createElement('button', controlBtnContainer, {
      id: 'button__race-return',
      text: "CANCEL",
      className: 'button__control',
      disabled: ''
    });

    // CONTROL GENERATE CARS BUTTON
    this.createElement('button', controlBtnContainer, {
      id: 'button__modify-generate',
      text: "GENERATE CARS",
      className: 'button__control',
      event: ['click', () => {
        this.controller.createRandomCars();
      }] 
    });

  }

  /**
   * GARAGE SECTION
   */
  async getGarage() {

    // GET GARAGE DATA
    this.garageData = await this.controller.getData('garage');
    this.carsTotal = this.garageData.length;
    this.pageTotal = Math.ceil(this.carsTotal / this.itemsPerPage);

    // CLEAN OLD VIEW
    if (this.sectionGarage) this.sectionGarage.replaceChildren();
    this.createGarage();
  }

  createGarage() {
    // console.log(this.garageData);

    // GARAGE TITLE
    let parentNode = this.createElement('div', this.sectionGarage, {
      className: 'garage-header'
    });
    this.createElement('h3', parentNode, {
        id: 'text__garage-title',
        text: `CARS IN GARAGE (${this.garageData.length})`,
        className: 'text__garage' 
    });

    // GARAGE CAR CONTAINER
    this.garageContainer = this.createElement('div', this.sectionGarage, {
      id: 'garage-car-list',
    });

    // garage car list 
    this.raceCars = [];
    let startId = 0;
    let endId = this.itemsPerPage;

    if (this.page > 1) {
      startId = this.itemsPerPage * (this.page - 1);
      endId = startId + this.itemsPerPage;
    } 

    // CREATE GARAGE CAR LIST
    for (let i = startId; i < endId && i < this.carsTotal; i += 1) {
      this.createCarList(this.garageData[i], this.garageContainer);
      this.raceCars.push(this.garageData[i].id);
    }

    // PAGINATION

     // winners pages
     const paginationContainer = this.createElement('div', this.garageContainer, {
      className: 'container__pagination'
    });

    // PAGINATON: BUTTON PREVIOUS PAGE
    this.createElement('button', paginationContainer, {
      id: 'button__prev-page',
      text: '<<',
      className: 'button__pagination',
      event: ['click', () => {
        this.controller.setPagination(this, 'prevPage');
      }] 
    });
    // if (this.prevBtnStatus === false) prevBtn.setAttribute('disabled', '');

    // PAGINATON: TOTAL PAGES
    this.createElement('h4', paginationContainer, {
      id: 'text__winners-pages',
      text: `Page ${this.page} of ${this.pageTotal}`,
      className: 'text__total-pages' 
    });

    // PAGINATON: BUTTON NEXT PAGE
    this.createElement('button', paginationContainer, {
      id: 'button__next-page',
      text: '>>',
      className: 'button__pagination',
      event: ['click', () => {
        this.controller.setPagination(this, 'nextPage');
      }] 
    });
    // if (this.nextBtnStatus === false) nextBtn.setAttribute('disabled', '');
    this.mount();
  }

  createCarList(car: garageCarType, garageContainer: HTMLElement) {

    const garageCarName = this.createElement('div', garageContainer, {
      id: 'garage-car-name-' + car.id,
      className: 'garage-car-name'
    });
    const garageCarRace = this.createElement('div', garageContainer, {
      id: 'garage-car-race-' + car.id,
      className: 'garage-race'
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
      className: 'garage-race-buttons'
    });
    // garage race: button start
    this.createElement('button', raceBtnContainer, {
      id: 'button__car-engine-start-'+ car.id,
      text: 'A',
      className: 'button__car-engine',
      title: 'Start the engine',
      event: ['click', () => {
        this.controller.setCarEngine(car.id, 'started');
      }] 
    });
    // garage race: button stop
    this.createElement('button', raceBtnContainer, {
      id: 'button__car-engine-stop-'+ car.id,
      text: 'B',
      title: 'Stop the engine',
      className: 'button__car-engine',
      disabled: ''
    });
    // garage race: car svg
    this.createElement('div', garageCarRace, {
      className: 'garage-race-car-logo',
      html: carLogoSvg(
        `img__garage-car-${car.id}`, 
        `img__garage-car`,
        `${car.color}`
      )
    });
    // garage race: finish svg
    this.createElement('div', garageCarRace, {
      id: `garage-race-finish-logo-${car.id}`,
      className: 'garage-race-finish-logo',
      html: finishLogoSvg(
        `img__race-finish-${car.id}`,
        `img__race-finish`
      ),
    });
  }


// end
}

