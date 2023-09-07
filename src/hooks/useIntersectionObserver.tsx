import {RefObject, useEffect, useState} from 'react'

const useIntersectionObserver = (
    elementRef: RefObject<Element>,
    freezeOnceVisible = false,
    options?: IntersectionObserverInit
): IntersectionObserverEntry | undefined => {
    const {root = null, rootMargin = "0%", threshold = 0} = options || {};
    const [entry, setEntry] = useState<IntersectionObserverEntry>()

    const frozen = entry?.isIntersecting && freezeOnceVisible

    const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
        setEntry(entry)
    }

    useEffect(() => {
        const node = elementRef?.current // DOM Ref
        const hasIOSupport = ('IntersectionObserver' in window)

        if (!hasIOSupport || frozen || !node) return

        const observer = new IntersectionObserver(updateEntry, {threshold, root, rootMargin})

        observer.observe(node)

        return () => observer.disconnect()

    }, [elementRef?.current, root, rootMargin, threshold, frozen])

    return entry
}

export default useIntersectionObserver;