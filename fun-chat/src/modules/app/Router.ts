import { routerType } from "./types/types";

export class Router {

  url: string;
  urlParts: string[];
  registeredRoutes: routerType[];
  uri: string;
  result: routerType

  constructor(registeredRoutes: routerType[]) {
    this.registeredRoutes = registeredRoutes;
  }

  resolve(): routerType | undefined {
    this.result = undefined;

    this.url = window.location.href;
    this.urlParts = this.url.split('/');
    this.uri = '/' + this.urlParts[3];


    for (let i = 0; i < this.registeredRoutes.length; i += 1) {

      if (this.uri === this.registeredRoutes[i].uri) {
        this.result = this.registeredRoutes[i];
        return this.result;
      }
    }

    if (this.result) {
      return this.result;
    } 
    else {
      console.log('Route not found')
    }

  }
// end
}