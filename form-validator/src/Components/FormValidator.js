import {useState} from "react";

export default function FormValidator() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [message, setMessage] = useState("");

    const findErrors = () => {
        const errors = [];

        if (!email || !password || !passwordConfirm)
            errors.push("all fields must be filled in");

        if ([...email].filter((i) => i === "@").length !== 1)
            errors.push("enter a valid email");

        if (password.length < 8)
            errors.push("passwords must be 8 characters or longer");

        if (password !== passwordConfirm) errors.push("passwords must match");

        return errors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const errors = findErrors();
        setMessage(errors.length ? errors.join(", ") : "user created");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>sign up!</h2>
            <label htmlFor='email'>email</label>
            <input
                type='text'
                name='email'
                onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor='password'>password</label>
            <input
                type='password'
                name='password'
                onChange={(e) => setPassword(e.target.value)}
            />

            <label htmlFor='password-confrim'>confirm password</label>
            <input
                type='password'
                name='password-confirm'
                onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            {message}
            <input type='submit' value='submit' />
        </form>
    );
}
