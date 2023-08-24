import type {DependencyList, EffectCallback} from 'react';
import {useEffect, useRef} from "react";

const UseUpdateEffect = (effect: EffectCallback, deps?: DependencyList) => {
    const isFirst = useRef(true)

    useEffect(() => {
        if (isFirst.current) {
            isFirst.current = false
            return;
        }
        return effect()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)
};

export default UseUpdateEffect;