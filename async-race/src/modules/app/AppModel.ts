import { Model } from './types/model';
import { garageCarType, winnersDataType, winnerListType } from './types/types';

export class AppModel implements Model {
  private server: string;

  constructor() {
    this.server = 'http://127.0.0.1:3000';
  }

  async getData<T>(endpoint: string, id?: number) {
    let url = `${this.server}/${endpoint}`;
    if (id !== undefined) url += `/${id}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async getWinners<T>(id?: number) {
    try {
      if (id === undefined) {
        const [winners, garage] = await Promise.all([
          this.getData<winnersDataType[]>('winners'),
          this.getData<garageCarType[]>('garage'),
        ]);

        const result = winners.map((winner: any) => {
          const car: any = garage.find(
            (car: garageCarType) => car.id === winner.id,
          );

          return {
            id: winner.id,
            name: car.name,
            color: car.color,
            wins: winner.wins,
            time: winner.time,
          };
        });

        return result;
      }
      const winnerData = (await this.getData<winnersDataType>(
        'winners',
        id,
      )) as winnersDataType;
      const garageData = (await this.getData<garageCarType>(
        'garage',
        id,
      )) as garageCarType;

      if (winnerData) {
        console.log('update winner');
      } else {
        console.log('new winner');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getWinnersInfo(): Promise<winnerListType[]> {
    try {
      const [winners, garage] = await Promise.all([
        this.getData<winnersDataType[]>('winners'),
        this.getData<garageCarType[]>('garage'),
      ]);

      const result = winners.map((winner: any) => {
        const car: any = garage.find(
          (car: garageCarType) => car.id === winner.id,
        );

        return {
          id: winner.id,
          name: car.name,
          color: car.color,
          wins: winner.wins,
          time: winner.time,
        };
      });

      return result;
    } catch (error) {
      console.error('Error fetching winners with car info:', error);
      return [];
    }
  }

  async createData(endpoint: string, data: {}): Promise<{}[]> {
    const url = `${this.server}/${endpoint}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteData(endpoint: string, id: number): Promise<{}[]> {
    const url = `${this.server}/${endpoint}/${id}`;
    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async updateData(endpoint: string, id: number, data: {}): Promise<{}[]> {
    const url = `${this.server}/${endpoint}/${id}`;

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async carEngine(carId: number, carStatus: string) {
    const params = new URLSearchParams({
      id: carId.toString(),
      status: carStatus,
    });
    const url = `${this.server}/engine` + `?${params}`;

    try {
      const response = fetch(url, {
        method: 'PATCH',
        body: new URLSearchParams({ id: carId.toString(), status: carStatus }),
      });

      if (carStatus === 'started') {
        return await response
          .then((response) => {
            const data = response.json();
            return data;
          })
          .then((data) => {
            data.id = carId;
            return data;
          });
      }

      if (carStatus === 'drive') {
        return response
          .then(
            (response) =>
              // console.log('Drive: ', response.status);
              response.status,
          )
          .then((resStatus) => {
            const data = { id: carId, status: resStatus };
            return data;
          });
      }

      return response;
    } catch (error) {
      console.log('Error:', error);
    }
  }

  // end
}
