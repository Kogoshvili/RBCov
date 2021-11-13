import PropTypes from 'prop-types';

function Table({
    headers,
    data,
    pagination,
    orderable,
    searchable,
    handlePageClick,
    handleRadioChange,
    handleTextInputChange,
    dataRenderer,
    headerRenderer,
    pageRendered
}) {
    const renderHeaders = () =>
        <thead>
            <tr>
                { pagination && <th scope="col">#</th> }
                {
                    headers.map((header, index) =>
                        <th scope="col" key={index}>
                            { __(header) }
                            {
                                orderable &&
                                        <input
                                            type="radio"
                                            name="orderby"
                                            value={ header }
                                            onClick={(e) => handleRadioChange(e)}
                                        />
                            }
                        </th>
                    )
                }
            </tr>
            {
                searchable &&
                    <tr>
                        { pagination && <th scope="col"></th> }
                        {
                            headers.map((header, index) =>
                                <th scope="col" key={ index }>
                                    <input
                                        className="form-control form-control-sm"
                                        type="text"
                                        name={ header } onChange={(e) => handleTextInputChange(e)}
                                    />
                                </th>
                            )
                        }
                    </tr>
            }
        </thead>;

    const renderData = () => data?.map((item, index) =>
        <tr key={item.id}>
            { pagination && <th scope="row">{ pagination.from + index }</th> }
            {
                headers.map((header) =>
                    <td key={item.id}>{ item[header] }</td>
                )
            }
        </tr>
    );

    const renderPages = () => pagination?.links?.map(link => {
        if (isNaN(link.label)) return null;

        return (
            <li key={link.label} className={`page-item ${ link.active && 'active' }`}>
                <a className="page-link" href="#" onClick={() => handlePageClick(link.label)}>{link.label}</a>
            </li>
        );
    });

    return (
        <div className="Table">
            <div className="table-wrapper">
                <table className="table table-striped">
                    { headerRenderer?.(headers) || renderHeaders() }
                    <tbody>
                        { dataRenderer?.(data) || renderData() }
                    </tbody>
                </table>
            </div>
            {
                pagination &&
                    <div className="pagination-wrapper">
                        <ul className="pagination">
                            { pageRendered?.(pagination) || renderPages() }
                        </ul>
                    </div>
            }
        </div>
    );
}

Table.propTypes = {
    headers: PropTypes.array,
    data: PropTypes.array,
    pagination: PropTypes.object,
    orderable: PropTypes.bool,
    searchable: PropTypes.bool,
    handlePageClick: PropTypes.func,
    handleRadioChange: PropTypes.func,
    handleTextInputChange: PropTypes.func,
    dataRenderer: PropTypes.func,
    headerRenderer: PropTypes.func,
    pageRendered: PropTypes.func
};

export default Table;
