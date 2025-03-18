import './news.css';
import {NewsItem} from '../../app/interfaces';
/*global document*/

class News {
    draw(data: NewsItem[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');
        
        if (!newsItemTemp) return;
        
        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;
            const newsItem = newsClone.querySelector<HTMLElement>('.news__item');
            const metaPhoto = newsClone.querySelector<HTMLElement>('.news__meta-photo');
            const metaAuthor = newsClone.querySelector<HTMLElement>('.news__meta-author');
            const metaDate = newsClone.querySelector<HTMLElement>('.news__meta-date');
            const title = newsClone.querySelector<HTMLElement>('.news__description-title');
            const source = newsClone.querySelector<HTMLElement>('.news__description-source');
            const content = newsClone.querySelector<HTMLElement>('.news__description-content');
            const readMore = newsClone.querySelector<HTMLAnchorElement>('.news__read-more a');


            if (newsItem && idx % 2) {
                newsItem.classList.add('alt');
            }
            
            if (metaPhoto) {
                metaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            }
            if (metaAuthor) {
                metaAuthor.textContent = item.author || item.source.name;
            }
            if (metaDate) {
                metaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            }
            if (title) {
                title.textContent = item.title;
            }
            if (source) {
                source.textContent = item.source.name;
            }
            if (content) {
                content.textContent = item.description;
            }
            if (readMore) {
                readMore.setAttribute('href', item.url);
            }

            fragment.append(newsClone);
        });

        const newsContainer = document.querySelector<HTMLElement>('.news');
        if (newsContainer) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
            // window.location.href = '#news-id';
        }
    }
}

export default News;
