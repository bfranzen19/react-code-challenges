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
* practicing adding and removing effects within react
* add and remove event listeners from the entire page (`window` object)
* starter code: there's a button that toggles mounting a child component (`WindowEvent`)
* when `WindowEvent` component is active, add an event listener to the window that triggers an alert if the user double clicks on the page
* when the `WindowEvent` component is inactive, remove the window event

---
* import and add a `useEffect()` and pass `[]` to it so it only fires once
* within the `useEffect()`, create a function (`doubleClick()`) to fire the `alert()` with the message
* add an event listener to the `window` for the `dblclick` event
* when there's a double click anywhere in the `window`, trigger the `doubleClick()` function to fire the alert
* when the `WindowEvent` component is unmounted, need to make it so that the `doubleClick()` function can't fire anymore
    * can accomplish this by returning a function from the `useEffect()` and use `window.removeEventListener('dblclick', doubleClick)`
```jsx
// WindowEvent.js
import {useEffect} from "react";

export default function WindowEvent() {
    useEffect(() => {
        const doubleClick = () => alert("mouse pressed");

        window.addEventListener("dblclick", doubleClick);
        return () => window.removeEventListener("dblclick", doubleClick);
    }, []);

    return <h2>Window event active</h2>;
}
```


## 7. COLOR PICKER
* working with multiple components and lifting up state. 
* create a color picking app that sets the background fo the page to a color of the user's choosing. 
* when the user clicks on a color, it changes the background of the whole page
---
* lifting state - moving state up to the top level component that needs that data and, if necessary, passing a function to update that state to the child components
* pass the `setBackgroundColor()` down to the `Color` component as a prop
* in the `Color` component, accept the `setBackgroundColor` prop, and add an `onClick` to set the background color to the hex code
```jsx
// Color.js
export default function Color({hex, name, setBackgroundColor}) {
    return (
        <button
            className='color-square'
            style={{backgroundColor: hex}}
            onClick={() => setBackgroundColor(hex)}
        >
            <h2>{name}</h2>
        </button>
    );
}

// ColorPicker.js
import {useState} from "react";
import Color from "./Color";

const colors = [
    {
        hex: "#91A6FF",
        name: "Cornflower Blue"
    },
    {
        hex: "#FF88DC",
        name: "Persian Pink"
    },
    {
        hex: "#80FF72",
        name: "Screamin Green"
    },
    {
        hex: "#FF5154",
        name: "Tart Orange"
    }
];


export default function ColorPicker() {
    const [backgroundColor, setBackgroundColor] = useState("white");

    return (
        <div className='page' style={{backgroundColor}}>
            {colors.map((color) => (
                <Color
                    key={color.hex}
                    hex={color.hex}
                    name={color.name}
                    setBackgroundColor={setBackgroundColor}
                />
            ))}
        </div>
    );
}

```


## 8. PIXEL ART
* `Context` allows you to share data between components more easily. instead of having to pass a prop down multiple levels, use `Context`
    * often need to pass props multiple layers and `Context` allows this to happen easier
* when a color is clicked, it will select that color and turn the grid square the selected color when clicked, allowing you to draw.
* use `Context` to share state between components
---
* implement `Context`
    * import `createContext` 
    * create a variable `ColorContext` and set it to `createContext()`
    * pass an object to `createContext()`:
        * color, set to `lightGray` default
        * an empty function to update color (`setColor()`)
```jsx
const ColorContext = createContext({
    color: 'lightGray',
    setColor: () => {}
});
```

* in the `PixelArt()` function, (this is the top level component) set up state
* use `<ColorContext.Provider>` in the `return` and pass it the values for `color` and `setColor()`
    * it won't change the `color` because both are set to `'lightGray'` already but the `setColor()` function will now be set to the function update `state` instead of an empty function that was created previously.
* wrap other components in the `<ColorContext.Provider>`
```jsx
export default function PixelArt() {
    const [color, setColor] = useState("lightGray");

    return (
        <ColorContext.Provider value={{color, setColor}}>
            <ColorPicker />
            <Pixels />
        </ColorContext.Provider>
    );
}
```

* will need to use `Context` in other components:
* `ColorPicker()` 
    * import `useContext()` from `react`
    * will need to set the color
    * get the `setColor` from `Context` using `useContext(ColorContext)`
    * when the button is clicked, need to set the color to the color of the button
        * add an `onClick()` and run `setColor(color)`
        * when a color is clicked, the current drawing color becomes that color
```jsx
function ColorPicker() {
    const {setColor} = useContext(ColorContext);

    const colors = [
        "red",
        "blue",
        "yellow",
        "green",
        "black",
        "white",
        "purple"
    ];

    return (
        <div>
            <h1>choose a color</h1>
            {colors.map((color) => (
                <button
                    key={color}
                    style={{
                        height: "20px",
                        width: "20px",
                        backgroundColor: color
                    }}
                    onClick={() => setColor(color)}
                ></button>
            ))}
        </div>
    );
}
```

* `Pixel()` component
    * sub-component of `Pixels()` component
    * don't need to pass a color prop from  `Pixels()` to `Pixel()` to access data
    * destructure `color` from `Context`
    * each pixel will have its own `state`, which will be its current background color (originally hard-coded to `'lightGray'`)
        * the background color should be set to the `color` from `Context`
    * create `pixelColor` and `setPixelColor` with `useState` to allow the pixel to keep the color instead of changing when the drawing color is changed.
        * set the default to `'lightGray'`
    * add an `onClick` to the pixel and call `setPixelColor(color)` to set the `state` of that pixel to the current drawing color
```jsx
function Pixel() {
    const {color} = useContext(ColorContext);
    const [pixelColor, setPixelColor] = useState("lightGray");

    return (
        <button
            onClick={() => setPixelColor(color)}
            style={{
                height: "20px",
                width: "20px",
                backgroundColor: pixelColor,
                margin: "1px"
            }}
        />
    );
}
```

* full `PixelArt.js`
```jsx
import React, {createContext, useContext, useState} from "react";

const ColorContext = createContext({
    color: "lightGray",
    setColor: () => {}
});

function ColorPicker() {
    const {setColor} = useContext(ColorContext);

    const colors = [
        "red",
        "blue",
        "yellow",
        "green",
        "black",
        "white",
        "purple"
    ];

    return (
        <div>
            <h1>choose a color</h1>
            {colors.map((color) => (
                <button
                    key={color}
                    style={{
                        height: "20px",
                        width: "20px",
                        backgroundColor: color
                    }}
                    onClick={() => setColor(color)}
                ></button>
            ))}
        </div>
    );
}

function Pixel() {
    const {color} = useContext(ColorContext);
    const [pixelColor, setPixelColor] = useState("lightGray");

    return (
        <button
            onClick={() => setPixelColor(color)}
            style={{
                height: "20px",
                width: "20px",
                backgroundColor: pixelColor,
                margin: "1px"
            }}
        />
    );
}

function Pixels() {
    const pixels = [];
    for (let i = 0; i < 100; i++) pixels.push(<Pixel key={i} />);

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(10,1fr)",
                width: "210px",
                margin: "0 auto"
            }}
        >
            {pixels}
        </div>
    );
}

export default function PixelArt() {
    const [color, setColor] = useState("lightGray");

    return (
        <ColorContext.Provider value={{color, setColor}}>
            <ColorPicker />
            <Pixels />
        </ColorContext.Provider>
    );
}
```

## 9. SIMPLE CALCULATOR
* very simplified version of a calculator that allows you to perform addition or subtraction on 2 numbers (to practice the `useReducer` hook)
* sometimes `state` becomes complicated and there are multiple mutation you will need to implement on the data. `useReducer` helps simplify this by moving state managment outside of the component.
* implement the logic:
    * 2 numbers can be selected 
    * you can add the 2 numbers
    * you can subtract the 2 numbers
    * you can clear the calcultor (reset both numbers and result to zero)
---
* populate the inital state object with `num1:0`, `num2:0`, and `result:'no result yet'` to allow us to clear and reset all the inital values
```jsx
const initialState = {
    num1: 0,
    num2: 0,
    result: "no result yet"
};
```

* import `useReducer` from `react`
* to use `useReducer`, need to inialize a `reducer()` function and pass it into the `useReducer` in `SimpleCalculator()`
```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

* implementing actions
    * implement an `onClick` in the button - when user clicks on the button, fire the `dispatch` function and pass in the `type` and `number`
        * in the `reducer`, check that `action.type` matches `SET_NUM_ONE`, return a copy of current `state` and set `num1` to `action.number`
    * do the same for `SET_NUM_TWO`
    * for `PLUS` and `MINUS`, dispatch the correct action
        * in `reducer`, copy `state`, and set `result: state.num1 + state.num2` (same for `MINUS`)
    * for `CLEAR`, dispatch the action and, in `reducer` return the `initalState`
* display the `result` on the page using `{state.result}`
```jsx
import {useReducer} from "react";

const initialState = {
    num1: 0,
    num2: 0,
    result: "no result yet"
};

function reducer(state, action) {
    if (action.type === "SET_NUM_ONE") return {...state, num1: action.number};
    if (action.type === "SET_NUM_TWO") return {...state, num2: action.number};
    if (action.type === "ADD")
        return {...state, result: state.num1 + state.num2};
    if (action.type === "SUBTRACT")
        return {...state, result: state.num1 - state.num2};
    if (action.type === "CLEAR") return initialState;
}

export default function SimpleCalculator() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <div>
            <div>
                <h2>number 1: {state.num1}</h2>
                {numbers.map((number) => (
                    <button
                        id='button-one'
                        key={number}
                        onClick={() => dispatch({type: "SET_NUM_ONE", number})}
                        style={{backgroundColor: "lightgray"}}
                    >
                        {number}
                    </button>
                ))}
            </div>
            <div>
                <h2>number 2: {state.num2}</h2>
                {numbers.map((number) => (
                    <button
                        id='button-two'
                        key={number}
                        onClick={() => dispatch({type: "SET_NUM_TWO", number})}
                        style={{backgroundColor: "lightslategray"}}
                    >
                        {number}
                    </button>
                ))}
            </div>
            <div>
                <h2>actions</h2>
                <button id='plus' onClick={() => dispatch({type: "ADD"})}>
                    +
                </button>
                <button id='minus' onClick={() => dispatch({type: "SUBTRACT"})}>
                    -
                </button>
                <button id='clear' onClick={() => dispatch({type: "CLEAR"})}>
                    c
                </button>
            </div>
            <div>
                <h2>result: {state.result}</h2>
            </div>
        </div>
    );
}
```



## 10. FOCUS ON AN INPUT
* focus on an input upon page load to practice using `refs` in `react`
* within `react`, usually interact with the virtual DOM but, sometimes, need to interact with the actual DOM and can do so using `refs`

---
* import `useRef` and `useEffect`
* initialize `useRef`
* add `ref={focusedInput}` to the `<input>`
```jsx
const focusedInput = useRef(null);
...
<input name='focused-input' ref={focusedInput} />
```

* implement a `useEffect` to focus on the component mounting
```jsx
useEffect(() => { focusedInput.current.focus() }, []);
```

```jsx
import React, {useEffect, useRef} from "react";

export default function FocusInput() {
    const focusedInput = useRef(null);

    useEffect(() => {
        focusedInput.current.focus();
    }, []);

    return (
        <React.Fragment>
            <label htmlFor='focused-input'>focus me on page load!</label>
            <br />
            <input name='focused-input' ref={focusedInput} />
        </React.Fragment>
    );
}
```

## 11. SHOPPING CART
* build a shopping cart to add items to and calculate the price
* implement the `add to cart` logic, `+`, `-`, and `total sum`

---

* instead of a hard-coded array for the cart, swap for `state` with a default of `[]`
* add the `onClick` for the `add to cart` functionality and create the `addToCart()` function
    * create a copy of the cart
    * use `find()` to see if the item is in the cart already
        * if it is in the cart, matching on name, increment the `quantity` property
        * if not, add the item to the cart
    * reset the `cart` state to the copy 
```jsx
const addToCart = (item) => {
        const cartClone = [...cart];
        const itemInCart = cartClone.find((i) => item.name === i.name);

        if (itemInCart) {
            itemInCart.quantity += 1;
            setCart(cartClone);
        } else {
            setCart((prevCart) => [...prevCart, {...item, quantity: 1}]);
        }
    };
```

* `+` add the `onClick` to the button for increase count functionality and create the `increase()` function
* create a copy of the cart
* `find()` the item in the cart
* increase the quantity
* set the `cart` state to the copy
```jsx
const increaseCount = (name) => {
        const cartClone = [...cart];
        const item = cartClone.find((i) => i.name === name);

        item.quantity += 1;
        setCart(cartClone);
    };
```

* `-` add the `onClick` to the button to decrease the count and create the `decrease()` function
* if the item is less than 0, remove it from the cart. otherwise, remove 1 from the quantity
    * remove using `filter()`
* set the `cart` state to the copy
```jsx
const decreaseCount = (name) => {
        let cartClone = [...cart];
        const item = cartClone.find((i) => i.name === name);

        if (item.quantity > 1) item.quantity -= 1;
        else cartClone = cartClone.filter((i) => i.name !== name);

        setCart(cartClone);
    };
```

* round the `subtotal` and `total` with `.toFixed(2)`
* for the `total`, use `reduce()` to add `acc` to `i.quantity * i.price, 0` and round with `.toFixed(2)`

```jsx
import {useState} from "react";

const items = [
    {name: "apple", price: 0.39},
    {name: "banana", price: 0.79},
    {name: "tomatoes", price: 3.99}
];

function ShoppingCart() {
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        const cartClone = [...cart];
        const itemInCart = cartClone.find((i) => item.name === i.name);

        if (itemInCart) {
            itemInCart.quantity += 1;
            setCart(cartClone);
        } else {
            setCart((prevCart) => [...prevCart, {...item, quantity: 1}]);
        }
    };

    const increaseCount = (name) => {
        const cartClone = [...cart];
        const item = cartClone.find((i) => i.name === name);

        item.quantity += 1;
        setCart(cartClone);
    };

    const decreaseCount = (name) => {
        let cartClone = [...cart];
        const item = cartClone.find((i) => i.name === name);

        if (item.quantity > 1) item.quantity -= 1;
        else cartClone = cartClone.filter((i) => i.name !== name);

        setCart(cartClone);
    };

    return (
        <div>
            <h1>shopping cart</h1>
            <div className='cart'>
                <div className='items'>
                    <h2>items</h2>
                    {items.map((item) => (
                        <div key={item.name}>
                            <h3>{item.name}</h3>
                            <p>${item.price}</p>
                            <button onClick={() => addToCart(item)}>
                                add to cart
                            </button>
                        </div>
                    ))}
                </div>
                <div>
                    <h2>cart</h2>
                    {cart.length > 0 ? (
                        cart.map((item) => (
                            <div key={item.name}>
                                <h3>{item.name}</h3>
                                <p>
                                    <button
                                        onClick={() => decreaseCount(item.name)}
                                    >
                                        -
                                    </button>
                                    {item.quantity}
                                    <button
                                        onClick={() => increaseCount(item.name)}
                                    >
                                        +
                                    </button>
                                </p>
                                <p>
                                    subtotal: $
                                    {(item.quantity * item.price).toFixed(2)}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p>add an item to your cart</p>
                    )}
                </div>
            </div>
            <div className='total'>
                <h2>
                    total: $
                    {cart
                        .reduce((acc, i) => acc + i.quantity * i.price, 0)
                        .toFixed(2)}
                </h2>
            </div>
        </div>
    );
}

export default ShoppingCart;
```