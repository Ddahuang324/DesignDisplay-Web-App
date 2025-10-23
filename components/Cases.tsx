
import React from 'react';
import { useInView } from '../hooks/useInView';

const caseStudies = [
    {
        title: "现代公寓",
        category: "住宅",
        image: "https://images.unsplash.com/photo-1617103995816-95f60871badf?q=80&w=2670&auto=format&fit=crop"
    },
    {
        title: "开放式办公室",
        category: "商业",
        image: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?q=80&w=2940&auto=format&fit=crop"
    },
    {
        title: "湖边别墅",
        category: "住宅",
        image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2874&auto=format&fit=crop"
    },
    {
        title: "精品咖啡馆",
        category: "商业",
        image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2894&auto=format&fit=crop"
    },
    {
        title: "顶层阁楼",
        category: "住宅",
        image: "https://images.unsplash.com/photo-1613553507747-5f8d62ad7e0f?q=80&w=2874&auto=format&fit=crop"
    },
    {
        title: "创意工作室",
        category: "商业",
        image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2940&auto=format&fit=crop"
    }
];

const Cases: React.FC = () => {
    const [ref, isVisible] = useInView({ threshold: 0.1 });

    return (
        <section id="cases" ref={ref} className={`py-16 md:py-24 bg-background-light dark:bg-transparent animated-bg-dark ${isVisible ? 'aurora-visible' : ''}`}>
            <div className={`container mx-auto px-4 ${isVisible ? 'section-visible' : ''}`}>
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-text-dark dark:text-text-light">我们的案例</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">探索我们如何将愿景变为现实。</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {caseStudies.map((study, index) => (
                        <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg">
                            <img src={study.image} alt={study.title} className="w-full h-72 object-cover transform group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-6">
                                <span className="text-sm font-semibold text-accent bg-primary/80 px-2 py-1 rounded">{study.category}</span>
                                <h3 className="text-xl font-bold text-white mt-2">{study.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Cases;