import React from "react";

const Row = ({ guess, currentGuess }) => {
    function getBgColor(color) {
        if (color === "green") return "bg-green-600  opacity-80 bg-opacity-90";
        else if (color === "yellow")
            return "bg-yellow-300  opacity-80 bg-opacity-90";
        else return "bg-gray-500  opacity-80 bg-opacity-90";
    }
    const rowClasses =
        "block m-1 h-16 w-16 bg-slate-200 border-slate-700 border-solid ";

    if (guess) {
        return (
            <div className='row '>
                {guess.map((letter, idx) => (
                    <div className={letter.color} key={idx}>
                        {letter.key}
                    </div>
                    /*
                    // Tailwind CSS
                    <div className={`${getBgColor(letter.color)}`} key={idx}>
                        {letter.key}
                    </div>
                    */
                ))}
            </div>
        );
    }
    if (currentGuess) {
        let letters = currentGuess.split("");
        return (
            <div className='row current'>
                {letters.map((letter, idx) => (
                    <div key={idx} className='filled'>
                        {letter}
                    </div>
                ))}
                {
                    // this will give us an array of undifined values to have 5 squares each in a row
                    //as we are guessing so our current guess will have less than 5 characters this will make only that many no of squares which inturns make our UI buggy
                    [...Array(5 - letters.length)].map((_, idx) => (
                        <div key={idx}></div>
                    ))
                }
            </div>
        );
    }
    return (
        <div className='row'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        /*
        // Tailwind CSS
        <div className='text-center justify-center flex'>
            <div className={rowClasses}></div>
            <div className={rowClasses}></div>
            <div className={rowClasses}></div>
            <div className={rowClasses}></div>
            <div className={rowClasses}></div>
        </div>
        */
    );
};

export default Row;
