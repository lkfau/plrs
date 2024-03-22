import CreateAccountPage from './CreateAccountPage';
import Login from './LoginPage';
import Home from './HomePage';
import Account from './MyAccount';
import Schedules from './SavedSchedules';
import Recommend from './RecommendPage';
import About from './About';

export default pageOptions = [
  {
    title: 'Home',
    icon: 'home',
    component: Home,
    showTitle: true,
    showLoggedIn: true,
    showNotLoggedIn: true
  },
  {
    title: 'Create Account',
    icon: 'create',
    component: CreateAccountPage,
    showTitle: true,
    showLoggedIn: false,
    showLoggedOut: true
  },
  {
    title: 'Log In',
    icon: 'arrow-forward-circle-outline',
    component: Login,
    showTitle: true,
    showLoggedIn: false,
    showLoggedOut: true
  },
  {
    title: 'Account',
    icon: 'person-circle',
    component: Account,
    showTitle: true,
    showLoggedIn: true,
    showLoggedOut: false
  },
  {
    title: 'Schedules',
    icon: 'list',
    component: Schedules,
    showTitle: false,
    showLoggedIn: true,
    showLoggedOut: false
  },
  {
    title: 'Recommend',
    icon: 'sparkles',
    component: Recommend,
    showTitle: false,
    showLoggedIn: true,
    showLoggedOut: true
  },
  {
    title: 'About',
    icon: 'information-circle',
    component: About,
    showTitle: true,
    showLoggedIn: true,
    showLoggedOut: true
  },
];