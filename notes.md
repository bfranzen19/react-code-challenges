# [LinkedInLearning React.js Code Challenges](https://www.linkedin.com/learning/react-js-code-challenges/put-your-react-js-skills-to-the-test?autoplay=true&u=83102426)

## COLOR RENDERER
* build a color renderer that displays color swatches on a UI
* update the `ColorRenderer` component to display one instance of the `Color` component for each color in the array of colors.

---
* map through the array of colors
    * for each color, render an instance of the color component
        * each component will need a unique key so use the hex
* the `Color` child component receives 2 props: `hex` and `name` that also need to be passed to each instance
```jsx
// ColorRenderer.js
export default function ColorRenderer() {
    return (
        <h2>
            {colors.map((color) => (
                <Color key={color.hex} hex={color.hex} name={color.name} />
            ))}
        </h2>
    );
}

```


## DARK MODE
* implement a component that allows dark mode to light mode toggle
* css class `dark-mode` that changes an element's background to dark gray
* the `<div>` with the `className` `.page` takes up the whole screen, add `dark-mode` class to this.
* when the button with the `className` `dark-mode-button` is clicked, the page should be displayed in dark mode.
* when the button with the `className` `light-mode-button` is clicked, the page should be displayed without dark mode (light mode).

---
* create a boolean flag in state, which will store whether or not the user is currently in dark mode
    * set the default to `false` to automatically use light mode
* add click handlers to both `<button>` elements
* on click, setDarkMode to `true` in the dark mode `<button>` (false for light mode)
* update the `className` in the `<div>` to update the class if `darkMode` state is set to `true`
    * use string templating to 
```jsx
//DarkMode.js
import {useState} from "react";

export default function DarkMode() {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className={`page ${darkMode && "dark-mode"}`}>
            <button
                className='dark-mode-button'
                onClick={() => setDarkMode(true)}
            >
                Dark Mode
            </button>
            <button
                className='light-mode-button'
                onClick={() => setDarkMode(false)}
            >
                Light Mode
            </button>
        </div>
    );
}

```



## FORM VALIDATOR
* validate a user sign-up form on submit
    * all fields must be filled in
    * email must have exactly 1 `@`
    * the password must be 8 or more characters long
    * the password and password confirmation fields must match
    * _if these conditions aren't met, display the error messages._ 
    *_if they are met, display a success message_ 

---
* add `onSubmit` to the form and create a function to handle submit
```jsx
<form onSubmit={handleSubmit}>
```

* create a `message` state field to hold the error/success message
```jsx
const [message, setMessage] = useState('');

...
<form onSubmit='handleSubmit'>
    ...
    {message}
    <input type='submit' value='submit'>
</form>
```

* create the `handleSubmit` function
    * prevent the deafult behavior (which is to refresh the page)
    * call the `findErrors()` function to validate all the fields
    * set the message with the errors, if any, or the success message
```jsx
const handleSubmit = (event) => {
        event.preventDefault();

        const errors = findErrors();
        setMessage(errors.length ? errors.join(", ") : "user created");
    };

```

* create the `findErrors()` function to validate inputs and push any errors into the errors array that will be returned
* this is where all validation will happen
* create an array to store all of the error messages (if any)
    * check if all `<input>` fields have values
    * use `filter()` to check that there is exactly 1 `@` in the email `<input>`
        * use spread operator `...` to add each character from the email `<input>` to an array
        * run the `filter()` higher order function on the array of email `<input>` characters
        * filter the characters to make sure only `@` character(s) exist
        * check the length of the filtered array to see if it's equal to 1
    * check if the length of the password is 8 or more characters
    * check that the password value matches the password confirmation value
* if any of the validations fail, push a string with a description of what to fix into the errors array
```jsx
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
```

```jsx
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

```

## DOG PICTURES
* use a dog picture api to display dog images
* 

---
* 
```jsx

```


## SCORE KEEPER
* 




## WINDOW EVENT
* 




## COLOR PICKER
* 




## PIXEL ART
* 




## SIMPLE CALCULATOR
* 




## FOCUS ON AN INPUT
* 




## SHOPPING CART
* 




