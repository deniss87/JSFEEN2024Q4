import { Model } from "../../types/model";
import { ApiController } from "../../api/ApiController";

export class GarageModel implements Model {
	data: ApiController;

	constructor() {
		this.data = new ApiController();
	}

	async getCarTotal() {
		const result = await this.data.getData()
		return result.length;
	}

	async getAllCars() {
		const result = await this.data.getData()
		return result;
	}

//   value: number;

// 	constructor() {
// 		this.value = 0;
//   }

// 	increment() {
// 		this.value += 1;
// 		return this.value;
// 	}

// 	decrement() {
// 		this.value -= 1;
// 		return this.value;
// 	}

// 	multipleAndDivide() {
// 		this.value *= 5;
// 		this.value /= 3;
// 		this.value = Math.ceil(this.value);
// 		return this.value;
// 	}
}