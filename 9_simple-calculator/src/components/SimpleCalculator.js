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

const handleClick = (event) => {
    // console.log("click: ", event.target.childNodes[0].data);
    if (event.target.id === "button-one") {
        event.target.style.backgroundColor === "lightblue"
            ? (event.target.style.backgroundColor = "lightgray")
            : (event.target.style.backgroundColor = "lightblue");
    }

    if (event.target.id === "button-two") {
        event.target.style.backgroundColor === "lightgreen"
            ? (event.target.style.backgroundColor = "lightslategray")
            : (event.target.style.backgroundColor = "lightgreen");
    }

    if (
        event.target.id === "plus" ||
        event.target.id === "minus" ||
        event.target.id === "clear"
    ) {
        event.target.style.backgroundColor === "tomato"
            ? (event.target.style.backgroundColor = "ghostwhite")
            : (event.target.style.backgroundColor = "tomato");
    }
};

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
