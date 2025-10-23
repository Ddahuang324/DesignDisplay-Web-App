import { useEffect, useRef } from 'react';

export interface MousePosition {
    x: number;
    y: number;
}

// 基于 requestAnimationFrame 的轻量级鼠标位置订阅（不触发 React 重新渲染）
// 用于高频交互，仅通过 ref 获取最新坐标
export const useMousePosition = () => {
    const posRef = useRef<MousePosition>({ x: 0, y: 0 });
    const frame = useRef<number | null>(null);
    const nextPos = useRef<MousePosition | null>(null);

    useEffect(() => {
        const onPointerMove = (e: PointerEvent) => {
            nextPos.current = { x: e.clientX, y: e.clientY };
            if (frame.current == null) {
                frame.current = requestAnimationFrame(() => {
                    if (nextPos.current) posRef.current = nextPos.current;
                    frame.current = null;
                });
            }
        };

        window.addEventListener('pointermove', onPointerMove, { passive: true });
        return () => {
            window.removeEventListener('pointermove', onPointerMove as any);
            if (frame.current != null) cancelAnimationFrame(frame.current);
        };
    }, []);

    return posRef; // 返回 ref，以便在效果中读取 .current
};
