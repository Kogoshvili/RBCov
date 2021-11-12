import {
    useEffect,
    useState
} from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectToken } from '../store/authSlice';

function Dashboard() {
    const [data, setData] = useState([]);
    const [params, setParams] = useState({});
    const [pagination, setPagination] = useState({});
    const token = useSelector(selectToken);

    useEffect( async () => {
        const { data: { data, ...pagination } } = await axios.post(
            '/api/statistics', {}, { headers: { Authorization: `Bearer ${token}` } }
        );

        setData(data);
        setPagination(pagination);
        console.log(data, pagination);
    }, []);

    const handleTextInputChange = (e) => {
        const { name, value } = e.target;

        setParams(
            (prevState) => ({ ...prevState, [name]: { ...prevState[name], value } })
        );
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;

        setParams(
            (prevState) => ({ ...prevState, [name]: { ...prevState[name], orderby: checked ? 'desc' : 'asc' } })
        );
    };

    const handleSearch = async () => {
        const { data: { data, ...pagination } } = await axios.post(
            '/api/statistics',
            params,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );

        setData(data);
        setPagination(pagination);
    };

    const handlePageClick = (data) => {

    };

    const renderPages = () => pagination.links?.map(link => {
        if (isNaN(link.label)) return null;

        return (
            <li key={link.label} className={`page-item ${ link.active && 'active' }`}>
                <a className="page-link" href="#" onClick={handlePageClick}>{link.label}</a>
            </li>
        );
    });

    const renderData = () => data?.map((item, index) =>
        <tr key={item.id}>
            <th scope="row">{ index }</th>
            <td>{ item.country.name.en }</td>
            <td>{ item.confirmed }</td>
            <td>{ item.recovered }</td>
            <td>{ item.death }</td>
        </tr>
    );

    return (
        <div className="App">
            <h1>Dashboard</h1>
            <button onClick={handleSearch}>Search</button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col"><input type="checkbox" name="country" onChange={(e) => handleCheckboxChange(e)}/>Country</th>
                        <th scope="col"><input type="checkbox" name="confirmed" onChange={(e) => handleCheckboxChange(e)}/>Confirmed</th>
                        <th scope="col"><input type="checkbox" name="recovered" onChange={(e) => handleCheckboxChange(e)}/>Recovered</th>
                        <th scope="col"><input type="checkbox" name="death" onChange={(e) => handleCheckboxChange(e)}/>Death</th>
                    </tr>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">
                            <input className="form-control form-control-sm" type="text" name="country" onChange={(e) => handleTextInputChange(e)}/>
                        </th>
                        <th scope="col">
                            <input className="form-control form-control-sm" type="text" name="confirmed" onChange={(e) => handleTextInputChange(e)}/>
                        </th>
                        <th scope="col">
                            <input className="form-control form-control-sm" type="text" name="recovered" onChange={(e) => handleTextInputChange(e)}/>
                        </th>
                        <th scope="col">
                            <input className="form-control form-control-sm" type="text" name="death" onChange={(e) => handleTextInputChange(e)}/>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    { renderData() }
                </tbody>
            </table>
            <ul className="pagination">
                <li className="page-item">
                    <a className="page-link">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                { renderPages() }
                <li className="page-item">
                    <a className="page-link">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default Dashboard;
