import { ViewModel } from "./ViewModel";
import { AppController } from "../app/AppController";
import { LoginView } from "./pages/login/loginView";
import { MainView } from "./pages/main/MainView";
import { AboutView } from "./pages/about/AboutView";


export class View extends ViewModel {
  controller: AppController;

  root: HTMLElement | null;
  loginView: LoginView;
  mainView: MainView;
  aboutView: AboutView;


  constructor(appController: AppController) {
    super();
    this.controller = appController;

    // MAIN VIEW
    this.root = this.createElement('div', document.body, {
      id: 'root'
    })

    // LOGIN VIEW
    this.loginView = new LoginView(this.controller, this.root);
    this.mainView = new MainView(this.controller, this.root);
    this.aboutView = new AboutView(this.controller, this.root);

    // MOUNT MAIN VIEW
    this.mount();

  }
  
  // VIEW
  getView(view: string, param?: any) {
    // const views = [
    //   ['login', this.create(view)],
    //   ['main', this.create(view)],
    // ];

    // for (let i = 0; i < views.length; i += 1) {
    //   if (views[i][0] === view) {
    //     return views[i][1];
    //   } 
    // }
  }

  create(view: string) {
    if (view === 'login') return this.loginView.create();
    if (view === 'main') return this.mainView.create();
    if (view === 'about') return this.aboutView.create();
  }



// end  
}