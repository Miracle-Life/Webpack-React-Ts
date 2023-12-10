import React, {useState} from 'react';

import style from './App.scss';

export const App = () => {
    const [count, setCount] = useState(0);
    const increment = () => setCount(prev => prev + 1);
    return (
        <div className={style.container}>
            <p className={style.par}>Count: {count}</p>
            <button className={style.button} onClick={increment}>
                Increment
                <span>+</span>
            </button>
        </div>
    );
};

export default App;
