import { Controller } from "../../types/controller";
import { GarageModel } from "./GarageModel";

export class GarageController implements Controller {
  model: GarageModel;

  constructor() {
      this.model = new GarageModel();
  }

  async getCarTotal() {
    return await this.model.getCarTotal();
  }

  async getAllCars() {
    return await this.model.getAllCars();
  }
//   handleIncrement() {
//       console.log('increment', this.model)
//       return this.model.increment();
//   }

//   handleDecrement() {
//       console.log('handleDecrement')
//       return this.model.decrement();
//   }

//   handleMultiply() {
//       console.log('handleMultiply')
//       return this.model.multipleAndDivide();
//   }
}