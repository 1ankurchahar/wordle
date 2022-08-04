import { useEffect, useState } from "react";
import Wordle from "./components/Wordle";

function App() {
    const [solution, setSolution] = useState(null);
    useEffect(() => {
        fetch("http://localhost:5000/solutions")
            .then((res) => res.json())
            .then((data) => {
                const randomSolution =
                    data[Math.floor(Math.random() * data.length)];
                // console.log(randomSolution);
                setSolution(randomSolution);
            });
    }, [setSolution]);

    return (
        <div className='App'>
            <h1 className='text-3xl font-bold underline'>Wordle</h1>
            {solution && <Wordle solution={solution.word} />}
        </div>
    );
}

export default App;
