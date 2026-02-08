import { useNavigate } from "react-router";
import useControlledForm from "../hooks/useControlledForm.js";
import { useContext, useState } from "react";
import UserContext from "../contexts/UserContext.jsx";
import useFetch from "../hooks/useFetch.js";

export default function QuoteForm({}) {

    const {user} = useContext(UserContext);
    const {fetcher} = useFetch();
    const navigate = useNavigate();

    const data = {
        text: ''
    }

    const [initialValues, setInitialValues] = useState(data);

    const onSubmit = async (values) => {
        const formData = values;

        await fetcher('/quotes', "POST", formData, {accessToken: user?.accessToken})
        navigate('/');
    }

    const {values, changeHandler, submitHandler} = useControlledForm(initialValues, onSubmit);

    return (
        <div className="modal-overlay" id="taskModal">
            <div className="modal">
                <h2>Add New Quote</h2>

                <form method="POST" onSubmit={submitHandler}>
                    <input type="text" name="text" placeholder="Quote" onChange={changeHandler} value={values.text} required />

                    <div className="modal-actions">
                        <button type="button" className="cancel-btn" onClick={() => {navigate('/')}}>
                            Cancel
                        </button>
                        <button type="submit" className="save-btn">
                            Add Quote
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}