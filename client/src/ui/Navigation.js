import styles from './Navigation.module.css'
import logo from '../assets/logo.svg'
const Navigation = () => {
  return <div className={styles.container}>
    <a href="/" className={styles.logo}><img src={logo} alt="PLRS"></img></a>
    <div className={styles.contents}>
      <a href="/recommend">Recommendations</a>
      <a href="/schedule">Schedules</a>
    </div> 
  </div>
}

export default Navigation;