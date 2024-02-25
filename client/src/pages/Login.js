import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Button from '../components/UI/Button/Button';
import AuthContext from '../context/auth-context';
import styles from './Login.module.css';

const Login = () => {
    const navigate = useNavigate();
    const ctx = useContext(AuthContext);

    useEffect(() => { if (ctx.user_id != null) navigate('/recommend'); }, [ctx, navigate]);

    return (
        <div className={styles.container}>
            <h1>Parking Lot Recommendation System</h1>
            <Button onClick={() => ctx.logIn(1)}>Log in as test user</Button>
        </div>
    );
}

export default Login;
