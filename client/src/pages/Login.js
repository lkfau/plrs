import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/auth-context';

const Login = () => {
    const navigate = useNavigate();
    const ctx = useContext(AuthContext);

    useEffect(() => { if (ctx.user_id != null) navigate('/recommend'); }, [ctx, navigate]);

    return <button onClick={() => ctx.logIn(1)}>Log in as test user</button>;
}

export default Login;
