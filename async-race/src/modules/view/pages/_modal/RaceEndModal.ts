import { ViewModel } from "../../ViewModel";

export class RaceEndModal extends ViewModel {
    root: HTMLElement;

    winnerName: string;
    winnerTime: number;
    modalContainer: HTMLElement;
    modalWindow: HTMLElement;

    constructor(params: {name: string, time: number}) {
        super();
        this.root = document.getElementById('root');
        (params.name !== '') 
          ? this.winnerName = params.name 
          : this.winnerName = 'unnamed car';

        this.winnerTime = params.time;
        this.create();
        this.mount();
        this.open();
        console.log(params);
    }

    create() {
        this.modalContainer = this.createElement('div', this.root, {
          id: 'modal__container',
        });
        this.modalWindow = this.createElement('div', this.modalContainer, {
          id: 'modal__race-winner',
          className: 'modal__race-winner'
        });
        this.createElement('div', this.modalWindow, {
          id: 'modal__race-winner-title',
          html: '<h1>RACE RESULT<h1>'
        });
        const winnersList = this.createElement('div', this.modalWindow, {
          id: 'modal__race-winner-car',
          html: `<p>Winner is <b>${this.winnerName}</b> <br>with time <b>${this.winnerTime}s</b></p>`
        });
        const modalClose = this.createElement('div', this.modalWindow, {
          id: 'modal__race-winner-close',
        });
        const modalCloseBtn = this.createElement('button', modalClose, {
          id: 'button__race-winner-close',
          className: 'button__race-winner',
          text: 'CLOSE',
          event: ['click', () => {
            this.close();
          }]  
        });
    }

    open() {
        this.modalWindow.classList.add('modal__race-winner-open');

    }

    close() {
        this.modalContainer.remove();

    }
}