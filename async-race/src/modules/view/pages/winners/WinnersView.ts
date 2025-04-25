import { ViewModel } from "../../ViewModel";
import { AppController } from "../../../app/AppController";
import { winnerListType, winnersDataType } from "../../../app/types/types";
import { carLogoSvg } from  "../_assets/images";

type SortKey = 'name' | 'wins' | 'time'; 
type SortOrder = 'asc' | 'desc';

export class WinnersView extends ViewModel {
  controller: AppController

  mainContainer: HTMLElement;
  winnersContainer: HTMLElement;

  page: number;
  pageTotal: number;
	pageStart: number;
	pageEnd: number;
  itemsPerPage: number;
	winnersTotal: number;
  prevBtnStatus: boolean;
  nextBtnStatus: boolean;
  sortName: SortOrder;
  sortWins: SortOrder;
  sortTime: SortOrder;
  sort: SortKey;
  order: SortOrder;

  data: winnerListType[];

  constructor ( appController: AppController, mainContainer: HTMLElement ) {
    super();
    this.controller = appController;
    this.mainContainer = mainContainer;

    this.page = 1;
    this.itemsPerPage = 10;
    this.prevBtnStatus = false;
    this.nextBtnStatus = true;

    this.sort = 'time';
    this.order = 'asc';

  }

  create() {
    // CLEAN OLD VIEW
    this.mainContainer.replaceChildren();


    // CREATE VIEW
    this.getData();

    // MOUNT VIEW
    this.mount();

  }

  async getData() {
    // GET WINNERS DATA
    this.data = await this.controller.getWinnersData();
    this.winnersTotal = this.data.length;
    this.pageTotal = Math.ceil(this.winnersTotal / this.itemsPerPage);

    this.winnersBody();
    this.winnersTable();

    this.mount();
    this.sortEvents();
  }

  update() {
    this.winnersContainer.replaceChildren();
    this.winnersTable();
    this.mount();
    this.sortEvents();
  }

  winnersBody() {

    // WINNERS TITLE
    const titleContainer = this.createElement('div', this.mainContainer, {
      className: 'container__winners-title'
    });
    this.createElement('h3', titleContainer, {
        id: 'text__winners-title',
        text: `RACE WINNERS (${this.data.length})`,
        className: 'text__title' 
    });
    
    // WINNERS TABLE CONTAINER
    this.winnersContainer = this.createElement('div', this.mainContainer, {
      className: 'container__winners-list'
    });
  }

  winnersTable() {

    // WINNERS TABLE
    const tableHeaderHTML = `
            <tr class="table__winners-header">
              <th></th>
              <th></th>                                   
              <th id="table__winners-name" class="table__winners-header-sort">NAME</th>
              <th id="table__winners-wins" class="table__winners-header-sort">WINS</th>
              <th id="table__winners-time" class="table__winners-header-sort">BEST TIME</th>
            </tr>
    `;
    const winnersTable = this.createElement('table', this.winnersContainer, {
      className: 'table__winners',
      html: tableHeaderHTML
    });

    // sort all data
    let sortedData = this.sortByKey(this.data, this.sort, this.order);

    let startId = 0;
    let endId = this.itemsPerPage;

    if (this.page > 1) {
        startId = this.itemsPerPage * (this.page - 1);
        endId = startId + (this.itemsPerPage);
    }

    // WINNERS TABLE
    for (let i = startId; i < endId && i < this.winnersTotal; i += 1) {
      const tableBodyHTML = `
            <tr class="table__winners-data">
              <td>${sortedData[i].id}</td>
              <td>${carLogoSvg(
                    `img__winners-car-logo-${sortedData[i].id}`, 
                    `img__winners-car-logo`,
                    `${sortedData[i].color}`
                  )}
              </td>
              <td class="table__winners-name">${sortedData[i].name}</td>
              <td>${sortedData[i].wins}</td>
              <td>${sortedData[i].time}</td>
            </tr>`;
      winnersTable.innerHTML += tableBodyHTML;
    }
    
    // PAGINATION

     // winners pages
     const paginationContainer = this.createElement('div', this.winnersContainer, {
      className: 'container__pagination'
    });

    // WINNERS TABLE: BUTTON PREVIOUS PAGE
    this.createElement('button', paginationContainer, {
      id: 'button__prev-page',
      text: '<<',
      className: 'button__pagination',
      event: ['click', () => {
        this.controller.setPagination(this, 'prevPage');
      }] 
    });
    // WINNERS TABLE: TOTAL PAGES
    this.createElement('h4', paginationContainer, {
      id: 'text__winners-pages',
      text: `Page ${this.page} of ${this.pageTotal}`,
      className: 'text__total-pages' 
    });

    // WINNERS TABLE: BUTTON NEXT PAGE
    this.createElement('button', paginationContainer, {
      id: 'button__next-page',
      text: '>>',
      className: 'button__pagination',
      event: ['click', () => {
        this.controller.setPagination(this, 'nextPage');
      }] 
    });
}

// SORT DATA
sortByKey<T>(arr: T[], key: keyof T, order: SortOrder = 'asc'): T[] {
  return [...arr].sort((a, b) => {
    const valA = a[key];
    const valB = b[key];

    // Normalize values
    const aStr = typeof valA === 'string' ? valA : String(valA);
    const bStr = typeof valB === 'string' ? valB : String(valB);

    // If both values are numeric, compare as numbers
    const aNum = parseFloat(aStr);
    const bNum = parseFloat(bStr);
    const bothAreNumbers = !isNaN(aNum) && !isNaN(bNum);

    let result = 0;

    if (bothAreNumbers) {
      result = aNum - bNum;
    } else {
      result = aStr.localeCompare(bStr);
    }

    return order === 'asc' ? result : -result;
   });
  }
  sortEvents() {
    const tableSortName = document.getElementById('table__winners-name');
    const tableSortWins = document.getElementById('table__winners-wins');
    const tableSortTime = document.getElementById('table__winners-time');

    tableSortName.addEventListener('click', () => {
      this.sort = 'name';
      const order = this.toogleSortStatus();
      this.update();
    
    });    
    tableSortWins.addEventListener('click', () => {
      this.sort = 'wins';
      const order = this.toogleSortStatus();
      this.update();
    });
    tableSortTime.addEventListener('click', () => {
      this.sort = 'time';
      const order = this.toogleSortStatus();
      this.update();
    });
  }

  toogleSortStatus() {
    if (this.order === 'asc') this.order = 'desc'
    else this.order = 'asc'
  }

// end
}