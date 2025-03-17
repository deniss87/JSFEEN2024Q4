import News from './news/news';
import Sources from './sources/sources';
import {NewsData, SourcesData} from '../app/interfaces';

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: Partial<NewsData>) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: Partial<SourcesData>) {
			const values = data?.sources ? data?.sources : [];
			this.sources.draw(values);
    }
}

export default AppView;
