import { routerType } from "./types/types";

export class Router {
  url: string;
  urlParts: string[];
  registeredRoutes: routerType[];
  uri: string;
  result: routerType;

  constructor(registeredRoutes: routerType[]) {
    this.registeredRoutes = registeredRoutes;
  }

  resolve(): routerType | undefined {
    this.result = undefined;

    this.url = globalThis.location.href;
    this.urlParts = this.url.split("/");
    this.uri = "/" + this.urlParts[5];

    for (let index = 0; index < this.registeredRoutes.length; index += 1) {
      if (this.uri === this.registeredRoutes[index].uri) {
        this.result = this.registeredRoutes[index];
        return this.result;
      }
    }

    if (this.result) {
      return this.result;
    } else {
      console.log("Route not found");
    }
  }
  // end
}
