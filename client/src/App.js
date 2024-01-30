import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import styles from './App.module.css';
import Navigation from './ui/Navigation';
import Recommend from './pages/Recommend';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <div className={styles.container}>
        <Routes>
          <Route path="/" element={<Recommend />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
