import {useState} from 'react';

export const App = () => {
    const [count, setCount] = useState<number>(0);
    const increment = () => setCount(prev => prev + 1);
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={increment}>
                Increment
            </button>
        </div>
    );
};

export default App;
