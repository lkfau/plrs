import CreateAccountPage from './CreateAccountPage';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import Account from './MyAccount';
import Schedules from './SavedSchedules';
import Recommendation from './Recommendation';
import About from './About';

export default pageOptions = [
  { title: 'Home', icon: 'home', component: HomePage, showLoggedIn: 1, showNotLoggedIn: 1 },
  { title: 'Create Account', icon: 'create', component: CreateAccountPage, showLoggedIn: 0, showLoggedOut: 1 },
  { title: 'Log In', icon: 'arrow-forward-circle-outline', component: LoginPage, showLoggedIn: 0, showLoggedOut: 1 },
  { title: 'Account', icon: 'person-circle', component: Account, showLoggedIn: 1, showLoggedOut: 0 },
  { title: 'Schedules', icon: 'list', component: Schedules, showLoggedIn: 1, showLoggedOut: 0 },
  { title: 'Recommendation', icon: 'sparkles', component: Recommendation, showLoggedIn: 1, showLoggedOut: 1 },
  { title: 'About', icon: 'information-circle', component: About, showLoggedIn: 1, showLoggedOut: 1 },
];