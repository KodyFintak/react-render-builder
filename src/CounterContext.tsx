import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';

interface Counter {
    value: number;
    increment: () => void;
}

export const CounterContext = createContext<Counter | undefined>(undefined);

export const useCounter = (): Counter => {
    const counter = useContext(CounterContext);

    if (!counter) {
        throw new Error('useCounter must be used in a CounterContext to function!');
    }

    return counter;
};

export function CounterProvider(props: PropsWithChildren) {
    const [counterValue, setCounter] = useState(0);
    const counter: Counter = useMemo(
        () => ({
            value: counterValue,
            increment: () => setCounter(value => value++),
        }),
        [counterValue, setCounter],
    );

    return <CounterContext.Provider value={counter}>{props.children}</CounterContext.Provider>;
}
