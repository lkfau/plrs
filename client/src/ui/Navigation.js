import { useContext } from 'react';
import styles from './Navigation.module.css'
import logo from '../assets/logo.svg'
import AuthContext from '../context/auth-context';

const Navigation = () => {
    const ctx = useContext(AuthContext);

    return (
        <div className={styles.container}>
            <a href="/" className={styles.logo}><img src={logo} alt="PLRS"></img></a>
            <div className={styles.contents}>
                <div><a href="/recommend">Recommendations</a></div>
                <div><a href="/schedules">Schedules</a></div>
                {ctx.user_id != null && <div className={styles.logOut}><span onClick={ctx.logOut}>Log Out</span></div>}
            </div>
        </div>
    );
}

export default Navigation;