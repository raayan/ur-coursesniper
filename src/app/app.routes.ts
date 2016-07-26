import { provideRouter, RouterConfig } from '@angular/router';

import { MainViewComponent } from './main-view/main-view.component';

export const routes: RouterConfig = [
    { path: '/', component: MainViewComponent, index: true },
    
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];