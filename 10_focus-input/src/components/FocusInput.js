import React from "react";

export default function FocusInput() {
    return (
        <React.Fragment>
            <label htmlFor='focused-input'>focus me on page load!</label>
            <br />
            <input name='focused-input' />
        </React.Fragment>
    );
}
