import { provideRouter, RouterConfig } from '@angular/router';

import { LandingPageComponent } from './landing-page/';
import { PollViewComponent } from './poll-view/';
import { PollVoteViewComponent } from './poll-view/poll-vote-view/poll-vote-view.component';
import { PollResultViewComponent } from './poll-view/poll-result-view/poll-result-view.component';

export const routes: RouterConfig = [
    { path: '/landing', component: LandingPageComponent, index: true },
    { path: '/:id', component: PollViewComponent, children: [
      { path: '/', component: PollVoteViewComponent, index: true},
      { path: '/results', component: PollResultViewComponent}
    ]},
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];