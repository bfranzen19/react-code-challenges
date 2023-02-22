import React from "react";

function ColorPicker() {
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
                <button key={color} style={{backgroundColor: color}}></button>
            ))}
        </div>
    );
}

function Pixel() {
    return (
        <div
            style={{
                height: "20px",
                width: "20px",
                backgroundColor: "lightGray",
                margin: "1px"
            }}
        ></div>
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
    return (
        <div>
            <ColorPicker />
            <Pixels />
        </div>
    );
}
