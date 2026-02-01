import { Link, useNavigate } from "react-router";
import useFetch from "../hooks/useFetch.js";
import { useContext, useState } from "react";
import UserContext from "../contexts/userContext.jsx";
import useControlledForm from "../hooks/useControlledForm.js";

export default function Register() {
    const { fetcher } = useFetch();
    const { loginHandler } = useContext(UserContext);
    const navigate = useNavigate();

    const data = {
        username: '',
        email: '',
        password: '',
        rePassword: ''
    }

    const [initialValues, setInitialValues] = useState(data);

    const onSubmit = async(values) => {
        const data = values;

        const result = await fetcher('/register', 'POST', data);

        loginHandler(result);
        navigate('/');
    }

    const {values, changeHandler, submitHandler} = useControlledForm(initialValues, onSubmit);

    return (
        <div className="card">
            <h1 className="auth-text">Create account</h1>
            <div className="subtitle">Start organizing with love</div>

            <form method="POST" onSubmit={submitHandler}>
                <input className="form-input" type="text" name="username" onChange={changeHandler} value={values.username} placeholder="Name" required />
                <input className="form-input" type="email" name="email" onChange={changeHandler} value={values.email} placeholder="Email" required />
                <input className="form-input" type="password" name="password" onChange={changeHandler} value={values.password} placeholder="Password" required />
                <input className="form-input" type="password" name="rePassword" onChange={changeHandler} value={values.rePAssword} placeholder="Confirm Password" required />
                <button className="form-button" type="submit">Register</button>
            </form>

            <div className="footer">
                Already have an account?
                <Link to="/login"> Login</Link>
            </div>
        </div>
    )
}