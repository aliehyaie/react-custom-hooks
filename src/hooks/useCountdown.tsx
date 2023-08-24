import {useEffect, useRef, useState} from 'react';


type CountDownHookType = (total: number, options: { autoStart?: boolean, ms?: number }) => {
    counter: number;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    isFinished: boolean;
    start: () => void;
    pause: () => void;
    reset: () => void;
    set: (total: number) => void;
};

export const useCountDown: CountDownHookType = (
    total: number,
    {ms = 1000, autoStart}
) => {
    const [counter, setCountDown] = useState(total);
    const [startCountDown, setStartCountDown] = useState(false);
    const isFinished = counter === 0;
    // Store the created interval
    const intervalId = useRef<number>();
    const start: () => void = () => setStartCountDown(true);
    const pause: () => void = () => setStartCountDown(false);
    const set: (total: number) => void = (total) => {
        clearInterval(intervalId.current!);
        setStartCountDown(false);
        setCountDown(total);
        if (autoStart) start();
    }
    const reset: () => void = () => {
        clearInterval(intervalId.current!);
        setStartCountDown(false);
        setCountDown(total);
        if (autoStart) start();
    };

    useEffect(() => {
        if (autoStart) {
            start();
        }
    }, [autoStart]);

    useEffect(() => {
        intervalId.current = setInterval(() => {
            startCountDown && counter > 0 && setCountDown(counter => counter - 1);
        }, ms);
        // Clear interval when count to zero
        if (isFinished) clearInterval(intervalId.current!);
        // Clear interval when unmount
        return () => clearInterval(intervalId.current!);
    }, [startCountDown, counter, ms]);

    const days = Math.floor(counter / (24 * 60 * 60)).toString().padStart(2, '0'); // Calculate the number of days
    const hours = Math.floor((counter % (24 * 60 * 60)) / (60 * 60)).toString().padStart(2, '0'); // Calculate the number of hours
    const minutes = Math.floor((counter % (60 * 60)) / 60).toString().padStart(2, '0'); // Calculate the number of minutes
    const seconds = (counter % 60).toString().padStart(2, '0'); // Calculate the number of seconds

    return {counter, days, hours, minutes, seconds, isFinished, start, pause, set, reset};
};
