import { useCounter } from "@/hooks/useCounter"
import { useMemo } from "react";

const heavyStuff = (iterationNumber: number) => {
    console.time('heavyStuff');
    for (let i = 0; i < iterationNumber; i++) {
        console.log('Ahi vamos...');
    }
    console.timeEnd('heavyStuff');
    return `${iterationNumber} iteraciones realizadas.`;
}


export const MemoCounter = () => {

    const { count, increment } = useCounter(10000);
    const { count: count2, increment: increment2 } = useCounter(10000);

    const myHeavyValue = useMemo(() => heavyStuff(count), [count]);

    return (
        <div className="bg-gradient flex flex-col gap-4">
            <h1 className="text-2xl font-thin text-white">MemoCounter - {myHeavyValue}</h1>
            <hr />

            <h4>Count: {count}</h4>
            <h4>Count2: {count2}</h4>

            <button onClick={increment}
                className="bg-indigo-500 text-white px-4 py-2 rounded-md cursor-pointer mb-2 hover:bg-indigo-600 transition-colors"
            >
                Increment
            </button>
            <button onClick={increment2}
                className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer mb-2 hover:bg-red-600 transition-colors"
            >
                Increment 2
            </button>
        </div>
    )
}
