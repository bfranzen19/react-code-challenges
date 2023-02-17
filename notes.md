# [LinkedInLearning React.js Code Challenges](https://www.linkedin.com/learning/react-js-code-challenges/put-your-react-js-skills-to-the-test?autoplay=true&u=83102426)

## COLOR RENDERER
* build a color renderer that displays color swatches on a UI
* update the `ColorRenderer` component to display one instance of the `Color` component for each color in the array of colors.

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
* 




## DOG PICTURES
* 




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




