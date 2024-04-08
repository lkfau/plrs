import CreateAccountPage from '../CreateAccountPage';
import Login from '../LoginPage';
import Home from '../HomePage';
import Schedules from '../SavedSchedules';
import Recommend from '../RecommendPage';
import OptionsPage from '../OptionsPage';

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
    title: 'Settings',
    icon: 'settings',
    component: OptionsPage,
    showTitle: false,
    transparentTitle: false,
    showLoggedIn: true,
    showLoggedOut: false
  },
  // {
  //   title: 'Change Password',
  //   icon: 'Change Password',
  //   component: Settings,
  //   showTitle: true,
  //   transparentTitle: false,
  //   showLoggedIn: true,
  //   showLoggedOut: false
  // },
];