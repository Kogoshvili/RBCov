import {
    useEffect,
    useState
} from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Table from '../components/Table';
import { clearToken } from '../store/authSlice';

function Dashboard() {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [params, setParams] = useState({});
    const [pagination, setPagination] = useState({});

    useEffect(() => getData(), []);

    useEffect(() => getData(), [params]);

    const handleTextInputChange = (e) => {
        const { name, value } = e.target;

        if (value === '' && params[name]) {
            setParams(
                ({ [name]: _, ...newParams }) => newParams
            );

            return;
        }

        setParams(
            (prevState) => ({ ...prevState, [name]: value })
        );
    };

    const handleRadioChange = (e) => {
        const { name, value } = e.target;

        if (params[name]?.orderby === value && params[name].direction === 'asc') {
            e.target.checked = false;
        }

        setParams(
            (prevState) => ({
                ...prevState,
                [name]:
                    {
                        orderby: value,
                        direction: e.target.checked ? 'asc' : 'desc'
                    }
            })
        );
    };

    const getData = async (page = 0) => {
        const { data: { data, ...pagination } } = await axios.post(
            '/api/statistics',
            { ...params, page }
        );

        setData(data);
        setPagination(pagination);
    };

    const renderData = (rows) => rows?.map((item, index) =>
        <tr key={item.id}>
            { pagination && <th scope="row">{ pagination.from + index }</th> }
            <td>{ __(item.country.name) }</td>
            <td>{ item.confirmed }</td>
            <td>{ item.recovered }</td>
            <td>{ item.death }</td>
        </tr>
    );

    return (
        <div id="Dashboard">
            <h1>{ __('dashboard') }</h1>
            <div className="logout-wrapper">
                <button className="btn btn-secondary" onClick={() => dispatch(clearToken())}>{__('log out')}</button>
            </div>
            <Table
                headers={['country', 'confirmed', 'recovered', 'deaths']}
                data={data}
                pagination={pagination}
                orderable={true}
                searchable={true}
                handlePageClick={getData}
                handleRadioChange={handleRadioChange}
                handleTextInputChange={handleTextInputChange}
                dataRenderer={renderData}
            />
        </div>
    );
}

export default Dashboard;
