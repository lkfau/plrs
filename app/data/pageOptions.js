import CreateAccountPage from '../CreateAccountPage';
import Login from '../LoginPage';
import Home from '../HomePage';
import Account from '../MyAccount';
import Schedules from '../SavedSchedules';
import Recommend from '../RecommendPage';
import About from '../About';

export default pageOptions = [
  {
    title: 'Home',
    icon: 'home',
    component: Home,
    showTitle: false,
    transparentTitle: false,
    showLoggedIn: true,
    showNotLoggedIn: true
  },
  {
    title: 'Login',
    icon: 'arrow-forward-circle-outline',
    component: Login,
    showTitle: true,
    transparentTitle: true,
    showLoggedIn: false,
    showLoggedOut: true
  },
  {
    title: 'Create Account',
    icon: 'create',
    component: CreateAccountPage,
    showTitle: true,
    transparentTitle: true,
    showLoggedIn: false,
    showLoggedOut: true
  },
  {
    title: 'Account',
    icon: 'person-circle',
    component: Account,
    showTitle: true,
    transparentTitle: false,
    showLoggedIn: true,
    showLoggedOut: false
  },
  {
    title: 'Schedules',
    icon: 'list',
    component: Schedules,
    showTitle: false,
    transparentTitle: false,
    showLoggedIn: true,
    showLoggedOut: false
  },
  {
    title: 'Recommend',
    icon: 'sparkles',
    component: Recommend,
    showTitle: false,
    transparentTitle: false,
    showLoggedIn: true,
    showLoggedOut: true
  },
  {
    title: 'About',
    icon: 'information-circle',
    component: About,
    showTitle: true,
    transparentTitle: true,
    showLoggedIn: true,
    showLoggedOut: true
  },
];