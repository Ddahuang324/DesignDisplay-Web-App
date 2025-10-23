
import React, { useEffect } from 'react';
import { useInView } from '../hooks/useInView';
import { useMousePosition } from '../hooks/useMousePosition';

const caseStudies = [
    {
        title: "丁丁民宿",
        category: "住宅",
        image: "/Assets/敦煌丁延龙民宿设计效果图/1.jpg"
    },
    {
        title: "三号桥民宿",
        category: "住宅",
        image: "/Assets/敦煌三号桥民宿设计效果图/1.jpg"
    },
    {
        title: "兰州村",
        category: "住宅",
        image: "/Assets/兰州村/unnamed.jpg",
        link: "https://pano.kujiale.com/cloud/design/3FO3MGMSP87T/show?fromqrcode=true&friendid=3FO4LDI9J9MD"
    },
    {
        title: "墅小样茶餐厅",
        category: "商业",
        image: "/Assets/墅小样茶餐厅/unnamed.jpg",
        link: "https://vr.justeasy.cn/view/17r5pa1i78a99e33-1756382939.html?wxwork_userid=XiaoYangKongJianSheJi15638282531"
    },
    {
        title: "未知宾馆",
        category: "商业",
        image: "/Assets/未知宾馆/unnamed.jpg",
        link: "https://vr.justeasy.cn/view/vryc174702841k42-1747028483.html"
    },
    {
        title: "未知名宿",
        category: "住宅",
        image: "/Assets/未知名宿/unnamed.jpg",
        link: "https://vr.justeasy.cn/view/174y2020u80402q7-1756382835.html"
    }
];

const Cases: React.FC = () => {
    const [sectionRef, isVisible] = useInView<HTMLElement>({ threshold: 0.1 });
    const mousePosRef = useMousePosition();

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        let rafId: number | null = null;
        const onMove = () => {
            if (rafId != null) return;
            rafId = requestAnimationFrame(() => {
                const rect = section.getBoundingClientRect();
                const { x, y } = mousePosRef.current;
                const nx = ((x - rect.left) / rect.width) * 2 - 1;
                const ny = ((y - rect.top) / rect.height) * 2 - 1;
                const moveX = Math.max(-1, Math.min(1, nx)) * 40; // 减少偏移幅度
                const moveY = Math.max(-1, Math.min(1, ny)) * 40;
                section.style.setProperty('--mouse-x', `${moveX}px`);
                section.style.setProperty('--mouse-y', `${moveY}px`);
                // 与 --cursor-size: 320px 对齐，居中偏移一半尺寸（≈160）
                const mouseX = x - rect.left - 160;
                const mouseY = y - rect.top - 160;
                section.style.setProperty('--cursor-x', `${mouseX}px`);
                section.style.setProperty('--cursor-y', `${mouseY}px`);
                rafId = null;
            });
        };

        const start = () => section.addEventListener('pointermove', onMove, { passive: true });
        const stop = () => section.removeEventListener('pointermove', onMove as any);

        if (isVisible) start(); else stop();
        return () => {
            stop();
            if (rafId != null) cancelAnimationFrame(rafId);
        };
    }, [isVisible, mousePosRef, sectionRef]);

    return (
        <section 
            id="cases" 
            ref={sectionRef}
            className={`py-16 md:py-24 bg-background-light dark:bg-transparent animated-bg-dark ${isVisible ? 'aurora-visible' : ''}`}
        >
            <div className={`container mx-auto px-4 ${isVisible ? 'section-visible' : ''}`}>
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-text-dark dark:text-text-light">我们的案例</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">探索我们如何将愿景变为现实。</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {caseStudies.map((study, index) => (
                        <div 
                            key={index} 
                            className={`group relative overflow-hidden rounded-lg shadow-lg ${study.link ? 'cursor-pointer' : ''}`}
                            onClick={() => study.link && window.open(study.link, '_blank')}
                        >
                            <img src={study.image} alt={study.title} className="w-full h-72 object-cover transform group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-6">
                                <span className="text-sm font-semibold text-accent bg-primary/80 px-2 py-1 rounded">{study.category}</span>
                                <h3 className="text-xl font-bold text-white mt-2">
                                    {study.title}
                                    {study.link && <span className="ml-2 text-sm">🔗 VR</span>}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Cases;