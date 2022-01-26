import { NavigationTab } from '@core/models/navigation-tab';
import Route from './route';

const NavigationTabs: NavigationTab[] = [
  { link: Route.TV_SHOWS, displayName: 'TV Shows' },
  { link: Route.MOVIES, displayName: 'Movies' },
];

export default NavigationTabs;
