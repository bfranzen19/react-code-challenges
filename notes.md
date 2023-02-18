# [LinkedInLearning React.js Code Challenges](https://www.linkedin.com/learning/react-js-code-challenges/put-your-react-js-skills-to-the-test?autoplay=true&u=83102426)

## 1. COLOR RENDERER
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


## 2. DARK MODE
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



## 3. FORM VALIDATOR
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

## 4. DOG PICTURES
* use a dog picture api to display dog images
* use the `dog.ceo` api to fetch a random dog image and display that image on page load (instead of the hard coded one there now)
* when the dog button is clicked, fetch a new dog image and render it on the ui

---
* create a `useEffect()`
    * react hook that runs at multiple points in a react component's lifecycle
    * will run when the component mounts and whenever state is updated
    * pass an array to the `useEffect()` to tell it when to run
        * empty array `[]` it will only run on initial mount (not when state updates)
        * can pass different state variables into the array and the `useEffect()` will re-run when any of those states change
        * if an array is not passed it, it can trigger an infinite loop
* create a function that fetches the dog picture from the api 
    * `fetchPuppy()` will be async
    * use `fetch()` to fetch from the api
    * when the response comes back from the api, convert it to `JSON`
    * the api will return a message, this is what will be returned
* `useState()` to initialize state
* run the `fetchPuppy()` function from `useEffect()`
    * use a `.then()` so that after the function finishes, we can update the state with the returned dog picture
    * run `setPic()` with the returned picture (`dog.message` from `fetchPuppy()`)
* set the `<img>` `src` to the picture that was returned from the api instead of the hardcoded one (this is the `dogPic` state variable)
* add an `onClick` to the `<button>`
    * make it async for the `fetchPuppy()` async function
    * await `fetchPuppy()` in the `setDogPic()` state setter
```jsx
import {useEffect, useState} from "react";

const fetchPuppy = async () => {
    const url = "https://dog.ceo/api/breeds/image/random";
    const response = await fetch(url);
    const dog = await response.json();

    return dog.message;
};

export default function DogPictures() {
    const [dogPic, setDogPic] = useState("");

    useEffect(() => {
        fetchPuppy().then((pic) => setDogPic(pic));
    }, []);

    return (
        <div className='dog-pics'>
            <img src={dogPic} alt='rando puppo' />
            <button onClick={async (e) => setDogPic(await fetchPuppy())}>
                🐶
            </button>
        </div>
    );
}
```


## 5. SCORE KEEPER
* build a score keeping app
* use localStorage to store the data in the browser
    * localStorage allows you to store data in key: value pairs (like an object)
* use localStorage to store the score so that it persists when you come back to the page
    * should be able to refresh the page and still see the score from the previous render
```javascript
localStorage.getItem(key) // retrieve an item
localStorage.setItem(key,value) // set data in localStorage
```

---
* `useEffect()` whenever the score updates and use `localStorage.setItem('score', score)` and pass the score from state
* to persist the score from `localStorage`, the default value in `useState()` should get the score that's stored (by the `score` key) and, if there's no score, set it to `0`
    * `localStorage` stores everything as a string so need to make sure to cast that to an integer using `parseInt()`
```jsx
import {useEffect, useState} from "react";

export default function ScoreKeeper() {
    const [score, setScore] = useState(
        parseInt(localStorage.getItem("score")) || 0
    );

    useEffect(() => {
        localStorage.setItem("score", score);
    }, [score]);

    return (
        <div>
            <h1>your score is: {score}</h1>
            <button onClick={() => setScore((prevScore) => prevScore + 1)}>
                +
            </button>
            <button onClick={() => setScore((prevScore) => prevScore - 1)}>
                -
            </button>
            <button onClick={() => setScore(0)}>reset</button>
        </div>
    );
}
```

## 6. WINDOW EVENT
* 




## 7. COLOR PICKER
* 




## 8. PIXEL ART
* 




## 9. SIMPLE CALCULATOR
* 




## 10. FOCUS ON AN INPUT
* 




## 11. SHOPPING CART
* 




