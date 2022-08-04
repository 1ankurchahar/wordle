import React, { useEffect, useState } from "react";

const Keypad = ({ usedKeys }) => {
    const [letters, setLetters] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/letters")
            .then((res) => res.json())
            .then((val) => {
                // console.log(val);
                setLetters(val);
            });
    }, []);

    return (
        <div className='keypad'>
            {letters &&
                letters.map((l) => {
                    const color = usedKeys[l.key];

                    return (
                        <div className={color} key={l.key}>
                            {l.key}
                        </div>
                    );
                })}
        </div>
    );
};

export default Keypad;
