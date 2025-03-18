import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import {NewsData, SourcesData} from './interfaces';
import {scrollUp, sourceSlider} from '../app/functions';

class App {
    private controller: AppController;
    private view: AppView;
    
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const newsContainer = document.querySelector<HTMLElement>('.sources');

        if (newsContainer) {
            newsContainer.addEventListener('click', (e: Event) => this.controller.getNews(
                    e, (data: NewsData) => this.view.drawNews(data))
            );

            this.controller.getSources((data: SourcesData) => this.view.drawSources(data));
        }

        scrollUp();
        sourceSlider();
    }

}

export default App;
