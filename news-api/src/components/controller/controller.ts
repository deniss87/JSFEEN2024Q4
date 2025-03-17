import AppLoader from './appLoader';
import {SourcesData, NewsData} from '../app/interfaces';
import {Endpoint} from '../app/enums';
import { Callback } from '../app/types';

class AppController extends AppLoader {
    public getSources(callback: Callback<SourcesData>): void {
        super.getResp(
            {
                endpoint: Endpoint.SOURCES,
            },
            callback
        );
    }

    public getNews(e: Event, callback: Callback<NewsData>): void {
        const target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        let currentTarget: HTMLElement | null = target;

        while (currentTarget && currentTarget !== newsContainer) {
            if (currentTarget.classList.contains('source__item')) {
                const sourceId = currentTarget.getAttribute('data-source-id');
                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: Endpoint.EVERYTHING,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            currentTarget = currentTarget.parentElement as HTMLElement;
        }

    }
}

export default AppController;
