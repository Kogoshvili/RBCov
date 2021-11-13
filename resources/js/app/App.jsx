import {
    Routes,
    Route
} from 'react-router-dom';
// import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Authorization from './pages/Authorization';
import Dashboard from './pages/Dashboard';
import { selectIsAuth } from './store/authSlice';
import Localization from './components/Localization';
import { getLang } from './store/generalSlice';

function App() {
    const isAuth = useSelector(selectIsAuth);
    const _ = useSelector(getLang);

    const renderRoutes = () => {
        return (<Route path="/" element={ isAuth ? <Dashboard /> : <Authorization />} />);
    };

    return (
        <div id="root">
            <Localization />
            <Routes>
                { renderRoutes() }
                <Route
                    path="*"
                    element={<div style={{ textAlign: 'center' }}>😞</div>}
                />
            </Routes>
        </div>
    );
}

export default App;
