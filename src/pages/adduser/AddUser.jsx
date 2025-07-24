import { useState } from "react";
import "./adduser.css";


const initialForm = {
    fullName: {
        label: "Full Name",
        type: "text",
        value: "",
        error: "",
        required: true,
        regex: /^[A-Za-z\s]+$/,
        onChangeRegex: /^[A-Za-z\s]*$/,
        onChangeError: "Invalid Fullname",
    },
    email: {
        label: "Email",
        type: "email",
        value: "",
        error: "",
        required: true,
        regex: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
        onChangeRegex: /^[A-Za-z0-9@._-]*$/,
        onChangeError: "Invalid email",
    },
    contact: {
        label: "Contact Number",
        type: "text",
        value: "",
        error: "",
        required: true,
        regex: /^[0-9]{10}$/,
        onChangeRegex: /^[0-9]*$/,
        onChangeError: "Contact must be 10 digits",
        minLength: 10,
        maxLength: 10,
    },
    addressLine: {
        label: "Address Line",
        type: "text",
        value: "",
        error: "",
        required: true,
        regex: /^[A-Za-z0-9\s,.-]+$/,
        onChangeRegex: /^[A-Za-z0-9\s,.-]*$/,
        onChangeError: "Invalid Address",
    },
    state: {
        label: "State",
        type: "select",
        value: "",
        error: "",
        required: true,
        regex: /^(?!\s*$).+/,
        onChangeRegex: /^(?!\s*$).+/,
        option: ["Maharashtra", "West Bengal", "Karnataka", "Gujarat", "Tamil Nadu"],
        onChangeError: "Invalid State",
    },
    city: {
        label: "City",
        type: "text",
        value: "",
        error: "",
        required: true,
        regex: /^[A-Za-z\s]+$/,
        onChangeRegex: /^[A-Za-z\s]*$/,
        onChangeError: "Invalid City",
    },
    pincode: {
        label: "Pincode",
        type: "text",
        value: "",
        error: "",
        required: true,
        regex: /^[0-9]{6}$/,
        onChangeRegex: /^[0-9]*$/,
        onChangeError: "Pincode must be 6 digits",
        minLength: 6,
        maxLength: 6,
    },
};


function AddUser() {
    const [formdata, setFormData] = useState(initialForm);
    const [isFormValid, setIsFormValid] = useState(false);

    const handelInputChange = (e) => {
        const { name, value } = e.target;

        if (value.length === 1 && value[0] === " ") { return };

        setFormData((prev) => {
            const field = prev[name];
            const { regex = '', onChangeError, onChangeRegex } = field;
            const isValid = regex?.test(value.trim());

            if (!onChangeRegex.test(value)) return prev;

            const updatedForm = {
                ...prev,
                [name]: {
                    ...prev[name],
                    value,
                    error: isValid ? "" : onChangeError,
                }
            }

            const allValid = Object.values(updatedForm).every((each) => {
                const { required, regex, value } = each;
                return !required || regex?.test(value.trim())
            });
            setIsFormValid(allValid);
            return updatedForm;
        })
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if(!isFormValid){
            return;
        }
        const userData = {};

        for (const key in formdata) {
            userData[key] = formdata[key].value.trim();
        };

        const dataInStorage = JSON.parse(localStorage.getItem('users')) || [];

        dataInStorage.push(userData);

        localStorage.setItem("users",JSON.stringify(dataInStorage));
        setFormData(initialForm);
        setIsFormValid(false);
    }

    console.log('formdata', formdata);

    return (
        <section className="add-user__section">
            <h2>Add User</h2>
            <form onSubmit={handleOnSubmit}>
                {
                    Object.entries(formdata).map(([name, field]) => {
                        const { label: fieldLabel, type = "text", error = '', option = [], minLength, maxLength } = field;
                        const value = formdata[name]?.value;
                        return (
                            <div key={name}>
                                <label>{fieldLabel}</label>
                                {
                                    type === 'select' ?
                                        (
                                            <select name={name} value={value} onChange={handelInputChange}>
                                                <option value=''>Select</option>
                                                {
                                                    option.map((each) => {
                                                        return (
                                                            <option key={each} value={each}>{each}</option>
                                                        )
                                                    })
                                                }

                                            </select>
                                        )
                                        : (
                                            <input
                                                type={type}
                                                name={name}
                                                value={value}
                                                onChange={handelInputChange}
                                                minLength={minLength}
                                                maxLength={maxLength}
                                            />)
                                }
                                {!!error && <div className="error-text">{error}</div>}
                            </div>
                        )
                    })
                }
                <button type="submit" className="submit-button" disabled={!isFormValid}>Add User</button>
            </form>
        </section>
    )
}

export default AddUser;