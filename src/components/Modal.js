import React from "react";

const Modal = ({ isCorrect, turn, solution }) => {
    return (
        <div className='modal'>
            {isCorrect && (
                <div>
                    <h1>You Win!</h1>
                    <p className='solution'> {solution}</p>
                    <p>You found the anwer in {turn} guesses</p>
                </div>
            )}

            {!isCorrect && (
                <div>
                    <h1>Oooops!</h1>
                    <p className='solution'> {solution}</p>
                    <p>Beter Luck Next Time!</p>
                </div>
            )}
        </div>
    );
};

export default Modal;
