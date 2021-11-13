import {
    useDispatch,
    useSelector
} from 'react-redux';
import {
    getLang,
    setLang
} from '../store/generalSlice';

function Localization() {
    const dispatch = useDispatch();
    const local = useSelector(getLang);

    const languages = [
        {
            name: 'English',
            value: 'en'
        },
        {
            name: 'Georgian',
            value: 'ka'
        }
    ];

    const handleClick = (lang) => {
        dispatch(setLang(lang));
    };

    return (
        <div className="Localization">
            {
                languages.map((lang, index) =>
                    <button
                        key={index}
                        className={`btn btn-sm ${ lang.value === local ? 'btn-success' : 'btn-secondary' }`}
                        onClick={() => handleClick(lang.value)}
                    >
                        { lang.name }
                    </button>
                )
            }
        </div>
    );
}

export default Localization;
