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
