
import { useState, useEffect } from 'react';

export const useScrollSpy = (ids: string[], options: { offset: number } = { offset: 0 }): string => {
    const [activeId, setActiveId] = useState('');

    useEffect(() => {
        const listener = () => {
            const scroll = window.pageYOffset;

            const position = ids
                .map((id) => {
                    const el = document.getElementById(id);
                    if (!el) return { id, top: -1, bottom: -1 };
                    const rect = el.getBoundingClientRect();
                    const top = Math.floor(rect.top + scroll - options.offset);
                    const bottom = Math.floor(rect.bottom + scroll - options.offset);
                    return { id, top, bottom };
                })
                .find(({ top, bottom }) => scroll >= top && scroll < bottom);

            setActiveId(position?.id || '');
        };

        listener();
        window.addEventListener('resize', listener);
        window.addEventListener('scroll', listener);

        return () => {
            window.removeEventListener('resize', listener);
            window.removeEventListener('scroll', listener);
        };
    }, [ids, options.offset]);

    return activeId;
};
