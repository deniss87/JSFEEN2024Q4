import { ViewModel } from "./ViewModel";
import { AppController } from "../app/AppController";
import { viewType, paginationViewType } from "../app/types/types";

import { HeaderView } from "../view/pages/header/HeaderView";
import { GarageView } from "../view/pages/garage/GarageView";
import { WinnersView } from "../view/pages/winners/WinnersView";
import { RaceEndModal } from "./pages/_modal/RaceEndModal";

export class View extends ViewModel {
  controller: AppController;

  root: HTMLElement | null;
  header: HTMLElement;
  main: HTMLElement;

  headerView: HeaderView;
  garageView: GarageView;
  winnersView: WinnersView;
  raceEndModal: RaceEndModal;

  constructor(appController: AppController) {
    super();
    this.controller = appController;

    // MAIN VIEW
    this.root = document.getElementById("root");
    this.header = this.createElement("header", this.root, {});
    this.main = this.createElement("main", this.root, {});

    // MOUNT MAIN VIEW
    this.mount();

    // HEADER VIEW
    this.headerView = new HeaderView(this.controller, this.header);

    // GARAGE VIEW
    this.garageView = new GarageView(this.controller, this.main);

    // WINNERS VIEW
    this.winnersView = new WinnersView(this.controller, this.main);
  }

  // VIEW
  getView(view: string, param?: any) {
    switch (view) {
      case "garage":
        this.garageView.create();
        break;
      case "winners":
        this.winnersView.create();
        break;
      case "raceEndModal":
        const modal = new RaceEndModal(param);
        modal.open();
    }
  }

  // PAGINATION
  setPage(view: paginationViewType, value: string) {
    if (value === "nextPage") {
      // update page
      if (view.page < view.pageTotal) {
        view.page += 1;
      }
      // update pagination buttons
      // if (view.page === view.pageTotal) {
      //   view.nextBtnStatus = false;
      // } else {
      //   view.prevBtnStatus = true;
      // }
      // update view
      if (view.page <= view.pageTotal) {
        view.update();
      }
    }
    if (value === "prevPage") {
      // update page
      if (view.page > 1) {
        view.page -= 1;
      }
      // update pagination buttons
      // if (view.page === 1) {
      //   view.prevBtnStatus = false;
      // } else {
      //   view.nextBtnStatus = true;
      // }
      // update view
      if (view.page >= 1) {
        view.update();
      }
    }
  }

  // end
}
