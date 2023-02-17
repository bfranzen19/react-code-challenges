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
* 




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




