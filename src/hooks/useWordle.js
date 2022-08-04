import { useState } from "react";

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0); //total of 6 guesses
    const [currentGuess, setCurrentGuess] = useState(""); //to get the curretn guess
    const [guesses, setGuesses] = useState([...Array(6)]); // each guess is an array of formated guesses
    const [history, setHistory] = useState([]); //each guess is a string that stores users past gusses to prevent user to not submit duplicte guesses
    const [isCorrect, setIsCorrect] = useState(false);

    const [usedKeys, setUsedKeys] = useState({}); //{a:'green,b:'yellow'}

    // format a guess into a array of letter objects
    // eg [{key:'a',color:"yellow"}]

    const formatGuess = () => {
        // console.log("Formattiing the guess.....", currentGuess);
        // const data = solution.word;
        let solutionArray = [...solution];
        let formattedGuess = [...currentGuess].map((char) => {
            //set default gray for each character to the guess
            return { key: char, color: "grey" };
        });
        //find any letter whic his in its correct postion and change its color to green
        formattedGuess.forEach((char, idx) => {
            if (solutionArray[idx] === char.key) {
                formattedGuess[idx].color = "green";
                // we do this so we do not double match
                solutionArray[idx] = null;
            }
        });
        // find any yellow color letter i.e it is in solution but is not present in its correct postion
        formattedGuess.forEach((char, idx) => {
            if (solutionArray.includes(char.key) && char.color !== "green") {
                formattedGuess[idx].color = "yellow";
                solutionArray[solutionArray.indexOf(char.key)] = null;
            }
        });

        return formattedGuess;
    };

    // add a new guess to the guesses state
    // update the isCorrect state if the guess is correct
    // add one to the turn state
    const addNewGuess = (formattedGuess) => {
        //if our current guess if equal tothe solution we have got the answer
        if (currentGuess === solution) {
            setIsCorrect(true);
        }
        //sw have an guesses state for 6 arrays so as per the turn we put our formatted guess in the index of the guesses state
        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses];
            newGuesses[turn] = formattedGuess;
            return newGuesses;
        });

        //we store our current guess as a string in history state which consists of all the previous guesses we have already made
        setHistory((prevHistory) => {
            return [...prevHistory, currentGuess];
        });

        // we increment our turn by 1 after evry submssion
        setTurn((prevTurn) => {
            return prevTurn + 1;
        });
        //we reset our current guess state after performing the above operation and checks
        setCurrentGuess("");

        // setused keys for our keypad
        setUsedKeys((prevUsedKeys) => {
            let newKeys = { ...prevUsedKeys };
            formattedGuess.forEach((l) => {
                const currentColor = newKeys[l.keys];

                if (l.color === "green") {
                    newKeys[l.key] = "green";
                    return;
                }
                if (l.color === "yellow" && currentColor !== "green") {
                    newKeys[l.key] = "yellow";
                    return;
                }
                if (
                    l.color === "grey" &&
                    currentColor !== "green" &&
                    currentGuess !== "yellow"
                ) {
                    newKeys[l.keys] = "grey";
                    return;
                }
            });
            return newKeys;
        });
    };

    // handle event and track current guess
    // if the user presses enter,add the new guess
    const handleKeyup = ({ key }) => {
        if (key === "Enter") {
            // if we have turns left and
            if (turn > 5) {
                console.log("You dont have enough guesses left");
                return;
            }
            // we have not have entered the word before and
            if (history.includes(currentGuess)) {
                console.log("Already tried this word");
                return;
            }
            // word if of 5 character long
            if (currentGuess.length !== 5) {
                console.log("guess shoud be 5 character long ");
                return;
            }
            //if we have reached here than the above condtions have failed and now we can check our guess
            const formatted = formatGuess();
            addNewGuess(formatted);
        }

        //when we press backspace we delete the last inputted character in the current guess
        if (key === "Backspace") {
            setCurrentGuess((prev) => {
                return prev.slice(0, -1);
            });
            return;
        }

        // regular expression to check if we type a key which is b/w a-z
        if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess((prev) => {
                    return prev + key;
                });
            }
        }
    };

    return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup };
};

export default useWordle;
