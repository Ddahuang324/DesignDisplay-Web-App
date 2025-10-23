
import { useState, useEffect, useRef, RefObject } from 'react';

type UseInViewResult<T extends HTMLElement> = [RefObject<T>, boolean];

export const useInView = <T extends HTMLElement>(options: IntersectionObserverInit = {}): UseInViewResult<T> => {
    const ref = useRef<T>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                // Optional: Disconnect observer after it has triggered once
                if (ref.current) {
                   observer.unobserve(ref.current);
                }
            }
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(ref.current);
            }
        };
    }, [ref, options]);

    return [ref, isVisible];
};
