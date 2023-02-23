import {useState} from "react";

const initialState = {};

export default function SimpleCalculator() {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <div>
            <div>
                <h2>number 1</h2>
                {numbers.map((number) => (
                    <button key={number}>{number}</button>
                ))}
            </div>
            <div>
                <h2>number 2</h2>
                {numbers.map((number) => (
                    <button key={number}>{number}</button>
                ))}
            </div>
            <div>
                <h2>actions</h2>
                <button>+</button>
                <button>-</button>
                <button>c</button>
            </div>
            <div>
                <h2>result:</h2>
            </div>
        </div>
    );
}
