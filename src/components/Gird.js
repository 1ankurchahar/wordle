import React from "react";
import Row from "./Row";

const Gird = ({ currentGuess, guesses, turn }) => {
    return (
        <div>
            {guesses.map((g, idx) => {
                if (turn === idx) {
                    return <Row key={idx} currentGuess={currentGuess} />;
                } else return <Row key={idx} guess={g} />;
            })}
        </div>
    );
};

export default Gird;
