import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import styles from './App.module.css';
import Navigation from './ui/Navigation';
import Login from './pages/Login';
import Recommend from './pages/Recommend';
import Schedules from './pages/Schedules';
import AuthContext from "./context/auth-context";

function App() {

    const ctx = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Navigation />
            <div className={styles.flex}>
                <div className={styles.container}>
                    <Routes>
                        <Route path='/' element={<Login />} />
                        {ctx.user_id != null && <Route path='/recommend' element={<Recommend />} />}
                        {ctx.user_id != null && <Route path='/schedules' element={<Schedules />} />}
                        <Route path='*' element={<Navigate to="/" />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
