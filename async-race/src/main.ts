import { GarageView } from './modules/garage/GarageView';

const root = document.getElementById('root');
const counterView = new GarageView(root);

counterView.mount();