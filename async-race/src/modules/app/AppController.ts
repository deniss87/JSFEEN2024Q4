import { Controller } from './types/controller';
import { AppModel } from './AppModel';
import { View } from '../view/View';
import { garageCarType, paginationViewType } from './types/types';

import { randomCars } from './utils/randomCars';
import { carRaceAnimation, getAnimationSpeed } from './utils/carRaceAnimation';

export class AppController implements Controller {
  model: AppModel;

  view: View;

  allAnimations: Animation[];

  constructor() {
    this.model = new AppModel();
    this.view = new View(this);

    this.allAnimations = [];
  }

  async getData(endpoint: string) {
    return this.model.getData(endpoint);
  }

  async createCar(carName: string, carColor: string) {
    const data = {
      name: carName,
      color: carColor,
    };

    if (await this.model.createData('garage', data)) {
      this.viewRouter('garage');
    }
  }

  async getWinnersData() {
    return this.model.getWinnersInfo();
  }

  createRandomCars() {
    const carData = randomCars();
    const createPromises: Promise<any>[] = [];

    carData.forEach((car) => {
      const carName = `${car.brand} ${car.model}`;
      const carColor = car.color;
      const data = {
        name: carName,
        color: carColor,
      };
      createPromises.push(this.model.createData('garage', data));
    });

    Promise.all(createPromises).then(() => {
      this.viewRouter('garage');
    });
  }

  async updateCar(carId: number, carName: string, carColor: string) {
    const data = {
      name: carName,
      color: carColor,
    };

    if (await this.model.updateData('garage', carId, data)) {
      this.viewRouter('garage');
    }
  }

  selectCar(carId: number, carName: string, carColor: string) {
    const inputCarName: HTMLInputElement = document.querySelector(
      '#input__car-update-name',
    );
    const inputCarColor: HTMLInputElement = document.querySelector(
      '#input__car-update-color',
    );
    const buttonUpdate: HTMLElement = document.getElementById('button__car-update');

    if (inputCarName && inputCarColor && buttonUpdate) {
      inputCarName.value = carName;
      inputCarColor.value = carColor;
      buttonUpdate.removeAttribute('disabled');

      inputCarName.setAttribute('name', carId.toString());

      // scroll to the top
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  }

  async deleteCar(carId: number) {
    await this.model.deleteData('garage', carId);
    await this.model.deleteData('winners', carId);
    this.viewRouter('garage');
  }

  /**
   **  RACE
   */
  async setCarEngine(carId: number, carStatus: string) {
    try {
      const response: any = await this.model.carEngine(carId, carStatus);
      const startBtn = document.getElementById(
        `button__car-engine-start-${carId}`,
      );
      const stopBtn = document.getElementById(
        `button__car-engine-stop-${carId}`,
      );

      if (carStatus === 'started') {
        // disable start button & enable stop
        startBtn.setAttribute('disabled', '');
        stopBtn.removeAttribute('disabled');

        // car animation
        const carAnimation = carRaceAnimation(
          carId,
          response.velocity,
          response.distance,
        );
        // stops the engine when the animation ends
        carAnimation.addEventListener('finish', () => {
          this.model.carEngine(carId, 'stopped');
        });
        // Handle return to garage
        stopBtn.addEventListener('click', () => {
          carAnimation.cancel();
          this.model.carEngine(carId, 'stopped');
          startBtn.removeAttribute('disabled');
          stopBtn.setAttribute('disabled', '');
        });
        // animation start
        carAnimation.play();

        // Resolve car engine promise
        const enginePromise = this.model.carEngine(carId, 'drive');
        enginePromise.then((engineResponse) => {
          if (engineResponse.status === 500) {
            console.log(`Car ${engineResponse.id} engine was broken down`);
            carAnimation.pause();
          }
        });
      } else if (carStatus === 'stopped') {
        console.log('car is stopped');
      } else {
        console.log('wrong request');
      }
    } catch (err) {
      throw new Error(err);
    }
    // end
  }

  async startRace(raceCars: number[]) {
    const raceBtn = document.getElementById('button__race-start');
    const returnCarBtn = document.getElementById('button__race-return');

    if (raceBtn) {
      raceBtn.setAttribute('disabled', '');
    }

    const racePromises: any = [];

    raceCars.forEach((carId) => {
      racePromises.push(this.model.carEngine(carId, 'started'));
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
            const carSpeed: number | string = Number(
              getAnimationSpeed(carDistance, carVelocity) / 1000,
            ).toFixed(2);

            // car race info
            // console.log(`id: ${carId} | velocity: ${carVelocity} | speed: ${carSpeed}`)

            // car animation
            const carAnimation = carRaceAnimation(
              carId,
              carVelocity,
              carDistance,
            );
            this.allAnimations.push(carAnimation);

            const animationPromise = new Promise((resolve) => {
              carAnimation.addEventListener('finish', () => {
                this.model.carEngine(carId, 'stopped');
                resolve({ id: carId, wins: 1, time: carSpeed });
              });
              // Handle return to garage
              returnCarBtn.addEventListener('click', () => {
                raceBtn.removeAttribute('disabled');
                returnCarBtn.setAttribute('disabled', '');
                const finishLogo = document.querySelectorAll('.img__race-finish');
                finishLogo.forEach((element) => {
                  element.classList.remove('img__race-end');
                });
                carAnimation.cancel();
                resolve(`Car ${carId} animation cancelled`);
              });
            });

            // Save animation promise for tracking
            animationPromises.push(animationPromise);

            // Start animation
            carAnimation.play();

            // Resolve car engine promise
            const enginePromise = this.model.carEngine(carId, 'drive');
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
        const finishLogo = document.getElementById(
          `img__race-finish-${winner.id}`,
        );
        finishLogo.classList.add('img__race-end');

        const winnerData = this.model
          .getData('garage', winner.id)
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
                const winnerData = {
                  name: car.name,
                  time: winner.time,
                };
                this.viewRouter('raceEndModal', winnerData);
                returnCarBtn.removeAttribute('disabled');
              }
            }, 1000);
          });

        this.model
          .getData('winners', winner.id)
          .then((response: { id: number; wins: number; time: number }) => {
            if (response) {
              console.log(response);
              let newTime: number;
              winner.time < response.time
                ? (newTime = winner.time)
                : (newTime = response.time);

              const winnerData = {
                wins: response.wins + 1,
                time: newTime,
              };

              // console.log('WinnersTime: ', winnerCar.time);
              // console.log('Old time: ', response.time);
              // console.log('new time: ', newTime);

              this.model.updateData('winners', winner.id, winnerData);
            } else {
              const data = {
                id: winner.id,
                time: winner.time,
                wins: 1,
              };
              this.model.createData('winners', data);
            }
          });
      });
    // end
  }

  /**
   * VIEW
   */
  setPagination(view: paginationViewType, value: string) {
    return this.view.setPage(view, value);
  }

  viewRouter(view: string, param?: any) {
    return this.view.getView(view, param);
  }

  public async start() {
    this.viewRouter('garage');
    console.log('App is running...');
  }
}
