import {
    useDispatch,
    useSelector
} from 'react-redux';
import { authenticateUser,
    registerUser } from '../store/authSlice';
import { useState } from 'react';

function Authorization() {
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({ name: '', email: '', password: '' });
    const error = useSelector((state) => state.auth.error);
    const [register, setRegister] = useState(false);

    const handleInputChange = (e) => {
        setUserData(
            (prevState) => ({ ...prevState, [e.target.name]: e.target.value })
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (register) {
            dispatch(registerUser(userData));
        } else {
            dispatch(authenticateUser(userData));
        }
    };

    const formFields = () => {
        return (
            <>
                <div className="form-floating">
                    <input type="email" className="form-control" name="email" id="floatingInput" placeholder="name@example.com" onChange={(e) => handleInputChange(e)}/>
                    <label htmlFor="floatingInput">Email</label>
                </div>
                {
                    register && (
                        <div className="form-floating">
                            <input type="text" className="form-control" name="name" id="floatingInput" placeholder="John" onChange={(e) => handleInputChange(e)}/>
                            <label htmlFor="floatingInput">Name</label>
                        </div>)
                }
                <div className="form-floating">
                    <input type="password" name="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={(e) => handleInputChange(e)}/>
                    <label htmlFor="floatingPassword">Password</label>
                </div>
            </>
        );
    };

    return (
        <div id="Authorization">
            <div className="floating-toggle">
                <button className="btn btn-secondary" onClick={() => setRegister(!register) }>{ register ? 'Sign In' : 'Register' }</button>
            </div>
            <h1 className="h3 mb-3 fw-normal">Authorization</h1>
            <form>
                { formFields() }
                <button
                    className="w-100 btn btn-lg btn-primary"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </form>
            {error && <p className="mt-2 text-danger">{error}</p>}
        </div>
    );
}

export default Authorization;
