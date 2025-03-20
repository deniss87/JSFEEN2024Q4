import './sources.css';
/*global document*/
type SourceDataType = {
    id: string;
    name: string
}
class Sources {

    public draw(data: SourceDataType[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        if (!sourceItemTemp) return;

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;
            const sourceName = sourceClone.querySelector<HTMLElement>('.source__item-name');
            const sourceItem = sourceClone.querySelector<HTMLElement>('.source__item');

            if (sourceName) {
                sourceName.textContent = item.name;
            }
            if (sourceItem) {
                sourceItem.setAttribute('data-source-id', item.id);
            }
            fragment.append(sourceClone);

        });
        const sourcesContainer = document.querySelector<HTMLElement>('.sources');
        const sourcesButtons = document.querySelectorAll<HTMLElement>('.source__button');
        
        if (sourcesContainer) {
            sourcesContainer.append(fragment);
        }
        if (sourcesButtons) {
            sourcesButtons.forEach((e) => e.setAttribute('style', 'visibility: visible'));
        }
    }

}

export default Sources;
