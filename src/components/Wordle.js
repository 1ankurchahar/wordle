import React, { useEffect, useState } from "react";
import useWordle from "../hooks/useWordle";
import Gird from "./Gird";
import Keypad from "./Keypad";
import Modal from "./Modal";

const Wordle = ({ solution }) => {
    const { currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys } =
        useWordle(solution);

    const [showModel, setShowModel] = useState(false);

    useEffect(() => {
        window.addEventListener("keyup", handleKeyup);

        // game end
        if (isCorrect) {
            console.log("You won");
            window.removeEventListener("keyup", handleKeyup);

            setTimeout(() => setShowModel(true), 2500);
        }
        if (turn > 5) {
            console.log("Out of turns");
            window.removeEventListener("keyup", handleKeyup);

            setTimeout(() => setShowModel(true), 2500);
        }

        return () => window.removeEventListener("keyup", handleKeyup);
    }, [handleKeyup, isCorrect, turn]);

    useEffect(() => {
        console.log(guesses, turn, isCorrect);
    }, [guesses, turn, isCorrect]);

    return (
        <>
            <div>solution -{solution}</div>
            <div>current guess -{currentGuess}</div>
            <Gird currentGuess={currentGuess} guesses={guesses} turn={turn} />
            <Keypad usedKeys={usedKeys} />
            {showModel && (
                <Modal isCorrect={isCorrect} turn={turn} solution={solution} />
            )}
        </>
    );
};

export default Wordle;
