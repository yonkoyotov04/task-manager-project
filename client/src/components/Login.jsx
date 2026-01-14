import { Link, useNavigate } from "react-router";
import useFetch from "../hooks/useFetch.js";
import { useContext, useState } from "react";
import UserContext from "../contexts/userContext.jsx";
import useControlledForm from "../hooks/useControlledForm.js";

export default function Login() {
    const { fetcher } = useFetch();
    const { loginHandler } = useContext(UserContext);
    const navigate = useNavigate();

    const [initialValues, setInitialValues] = useState({email: '', password: ''});

    const onSubmit = async (values) => {
        const data = values;

        const result = await fetcher('/login', "POST", data);

        loginHandler(result);
        navigate('/');
    }

    const {values, changeHandler, submitHandler} = useControlledForm(initialValues, onSubmit);

    return (
        <div className="card">
            <h1 className="auth-text">Welcome back</h1>
            <div className="subtitle">Log in to your lovely tasks</div>

            <form method="POST" onSubmit={submitHandler}>
                <input className="form-input" type="email" name="email" onChange={changeHandler} value={values.email} placeholder="Email" required />
                <input className="form-input" type="password" name="password" onChange={changeHandler} value={values.password} placeholder="Password" required />
                <button className="form-button" type="submit">Login</button>
            </form>

            <div className="footer">
                Don’t have an account?
                <Link to="/register">Register</Link>
            </div>
        </div>
    )
}