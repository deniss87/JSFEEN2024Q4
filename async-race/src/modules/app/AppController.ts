import { Controller } from "./types/controller";
import { AppModel } from "./AppModel";
import { HeaderView } from "../view/header/HeaderView";
import { GarageView } from "../view/garage/GarageView";
import { WinnersView } from "../view/winners/WinnersView";
import { carRaceAnimation, getAnimationSpeed } from "./utils/carRaceAnimation";
import { randomCars } from "./utils/randomCars";
import { ModalView } from "../view/modal/ModalView";
import { garageCarType, winnerCar } from "./types/types";

export class AppController implements Controller {
  model: AppModel;
  data: any;
  garageView: GarageView;
  winnersView: WinnersView;
  allAnimations: Animation[];

  constructor() {
      this.model = new AppModel();
      this.allAnimations = [];
  }

  async getGarage() {
    this.data = await this.model.getData('garage');
    return new GarageView(this.data);
  }

  async getCar(id: number) {
    this.data = await this.model.getData('garage/' + id);
    console.log(this.data);
    return this.data;
  }

  async getWinners() {
    const winnersData = await this.model.getWinnersInfo();
    return new WinnersView(winnersData);
  }

  async createCar(carName: string, carColor: string) {

    const data = {
      name: carName,
      color: carColor
    }

    if ( await this.model.createData('garage', data) ) {
      this.getGarage();
    } else {
      alert('Some error occurred. Please try again');
    }

  }

  async deleteCar(carId: number) {
    
    try {
      await this.model.deleteData('garage', carId);
      await this.model.deleteData('winners', carId);
      this.getGarage();
    }
    catch (error) {
      throw new error(error);
    }

  }

  public selectCar(
    carId: number,
    carName: string,
    carColor: string
  ) {
    const inputCarName: HTMLInputElement = document.querySelector("#input__car-update");
    const inputCarColor: HTMLInputElement = document.querySelector("#input__car-color-update");
    
    if (inputCarName && inputCarColor) {
      inputCarName.value = carName;
      inputCarColor.value = carColor;

      inputCarName.setAttribute("carId", carId.toString());

      // scroll to the top
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  }

  async updateCar(
    carId: number,
    carName: string,
    carColor: string
  ) {
    const data = {
      name: carName,
      color: carColor
    }

    if ( await this.model.updateData('garage', carId, data) ) {
      this.getGarage();
    } else {
      alert('Some error occurred. Please try again');
    }
    
  }

  async getRandomCars() {
    const data = randomCars();
    data.forEach((car) => {
      const carName = car.brand + ' ' + car.model;
      this.createCar(carName, car.color);
    });
  }
  /**
   **  RACE 
   */
  async setCarEngine(carId: number, carStatus: string) {
    try {
      const response: any =  await this.model.carEngine(carId, carStatus);
      const startBtn = document.getElementById('button__car-engine-start-'+ carId);
      const stopBtn = document.getElementById('button__car-engine-stop-'+ carId);

      if (carStatus === "started") {
        // disable start button
        startBtn.setAttribute("disabled", "");

        // car animation
        const carAnimation = carRaceAnimation(carId, response.velocity, response.distance);
        // stops the engine when the animation ends
        carAnimation.addEventListener('finish', () => {
          this.model.carEngine(carId, "stopped");
        });
        // Handle return to garage
        stopBtn.addEventListener('click', () => {
          carAnimation.cancel();
          startBtn.removeAttribute("disabled");
        });
        // animation start
        carAnimation.play();

        // Resolve car engine promise
        const enginePromise = this.model.carEngine(carId, "drive");
        enginePromise.then((engineResponse) => {

          if (engineResponse.status === 500) {
            console.log(`Car ${engineResponse.id} engine was broken down`);
            carAnimation.pause();
          }
        });

      }
      else if (carStatus === "stopped") {
        console.log('car is stopped');
        // carAnimation.cancel();
      }
      else {
        console.log("wrong request");
      }

    } 
    catch (err) {
      throw new Error(err);
    }

  }

  async race(cars: number[]) {
    const raceBtn = document.getElementById('button__race-start');
    const returnCarBtn = document.getElementById('button__race-return');


    if (raceBtn) {
      raceBtn.setAttribute("disabled", "");
    }

    const racePromises: any = [];
    const enginePromises: Promise<any>[] = [];

    cars.forEach((carId) => {
      racePromises.push(this.model.carEngine(carId, "started"));
    });
    
    // Resolve race promises
    Promise.allSettled(racePromises)
      .then((results) => {
        const animationPromises: any = [];

        results.forEach((response) => {
          if (response.status === 'fulfilled') {
            const carId: number = response.value.id;
            const carVelocity: number = response.value.velocity;
            const carDistance: number = response.value.distance;
            const carSpeed: Number | string = Number(getAnimationSpeed(carDistance, carVelocity) / 1000).toFixed(2);
            // car race info
            console.log(`id: ${carId} | velocity: ${carVelocity} | speed: ${carSpeed}`)

            // car animation
            const carAnimation = carRaceAnimation(carId, carVelocity, carDistance);
            this.allAnimations.push(carAnimation);

            const animationPromise = new Promise((resolve) => {
              carAnimation.addEventListener('finish', () => {
                this.model.carEngine(carId, "stopped");
                resolve({id: carId, wins: 1, time: carSpeed});
              });
              // Handle return to garage
              returnCarBtn.addEventListener('click', () => {
                raceBtn.removeAttribute("disabled");
                raceBtn.innerText = "START THE RACE";
                returnCarBtn.setAttribute("disabled", "");
                carAnimation.cancel();
                resolve(`Car ${carId} animation cancelled`);
              });
            });

            // Save animation promise for tracking
            animationPromises.push(animationPromise);

            // Start animation
            carAnimation.play();

            // Resolve car engine promise
            const enginePromise = this.model.carEngine(carId, "drive");
            enginePromise.then((engineResponse) => {

              if (engineResponse.status === 500) {
                console.log(`Car ${engineResponse.id} engine was broken down`);
                carAnimation.pause();
              }

            });
          }
        });

        // return winner car data
        return Promise.race(animationPromises);

      })
      .then((winner) => {
        
        const winnerData = this.model.getData('garage', winner.id)
          .then((car: garageCarType) => {

            const raceEndInterval = setInterval(() => {

              let status: boolean = false;
    
              this.allAnimations.forEach((anim) => {
                if (anim.playState === 'running') {
                  status = true;
                }
              });
    
              if (status === false) {
                clearInterval(raceEndInterval);
                // alert(`The winner of this race is ${car.name} with a time of ${winner.time}sek`);
                const modal = new ModalView(car.name, winner.time);
                modal.open();
                returnCarBtn.removeAttribute('disabled');
              }
    
            }, 1000);

            

          });


        this.model.getData("winners", winner.id)
            .then((response: {id: number, wins: number, time: number}) => {
              if (response) {
                console.log(response);
                let newTime: number;
                (winner.time < response.time) 
                      ? newTime = winner.time 
                      : newTime = response.time; 
                     
                const winnerData = {
                  wins: response.wins + 1,
                  time: newTime
                }

                // console.log('WinnersTime: ', winnerCar.time);
                // console.log('Old time: ', response.time);
                // console.log('new time: ', newTime);

                this.model.updateData("winners", winner.id, winnerData);

              } else {
                const data = {
                  id: winner.id,
                  time: winner.time,
                  wins: 1
                }
                this.model.createData("winners", data);
              }
              
            })

      });   
  // end  
  }

  
  public async start() {
    console.log('App is running...');
    new HeaderView();
    this.getGarage();

  }

}