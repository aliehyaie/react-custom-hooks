import {useCallback, useEffect, useState} from "react";

const useSyncStorage = <T, >(key: string, initialValue: T | null, type: "localStorage" | "sessionStorage" = "localStorage") => {
    const getStorageValue = useCallback(() => {
        if (!window) return;
        const storedValue = window[type].getItem(key);
        return storedValue ? JSON.parse(storedValue) : initialValue;
    }, []);

    const [value, setStorage] = useState<T>(getStorageValue);

    const removeStorage = useCallback(() => {
        setStorage(initialValue);
        window[type].removeItem(key);
    }, []);

    useEffect(() => {
        if (!window || !value) return;
        window[type].setItem(key, JSON.stringify(value));
    }, [value]);

    return {value, setStorage, removeStorage};
}

export default useSyncStorage;