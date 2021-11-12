import {
    Routes,
    Route
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Authorization from './pages/Authorization';
import Dashboard from './pages/Dashboard';
import {
    selectIsAuth
} from './store/authSlice';

function App() {
    const isAuth = useSelector(selectIsAuth);

    const routes = () => {
        return (<Route path="/" element={ isAuth ? <Dashboard /> : <Authorization />} />);
    };

    return (
        <div id="root">
            <Routes>
                { routes() }
                <Route
                    path="*"
                    element={
                        <div style={{ textAlign: 'center' }}>
                            😞
                        </div>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
