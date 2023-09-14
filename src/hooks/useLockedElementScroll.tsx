import {useState, useEffect} from "react";

const useLockedElementScroll = (initialLocked = false, rootId = "root") => {
    const [locked, setLocked] = useState(initialLocked)

    useEffect(() => {
        if (!locked) {
            return
        }

        const originalOverflow = document.body.style.overflow
        const originalPaddingRight = document.body.style.paddingRight

        document.body.style.overflow = 'hidden'

        const root = document.getElementById(rootId)
        const scrollBarWidth = root ? root.offsetWidth - root.scrollWidth : 0
        //TODO it should be checked, why scrollBarWidth is 0
        if (scrollBarWidth) {
            document.body.style.paddingRight = `${scrollBarWidth}px`
        }

        return () => {
            document.body.style.overflow = originalOverflow

            if (scrollBarWidth) {
                document.body.style.paddingRight = originalPaddingRight
            }
        }
    }, [locked])

    return [locked, setLocked]
};

export default useLockedElementScroll;