import { GarageView } from "../../view/pages/garage/GarageView";
import { HeaderView } from "../../view/pages/header/HeaderView";
import { WinnersView } from "../../view/pages/winners/WinnersView";

export type garageCarType = {
  name: string;
  color: string;
  id: number;
};

export type winnersDataType = {
  id: number;
  wins: number;
  time: number;
};

export type winnerListType = {
  name: number;
  color: string;
  id: number;
  wins: number;
  time: number;
};

export type winnerCar = {
  id: number;
  name: string;
  time: number;
  wins: number;
};

export type viewType = HeaderView | GarageView | WinnersView;

export type paginationViewType = GarageView | WinnersView;
