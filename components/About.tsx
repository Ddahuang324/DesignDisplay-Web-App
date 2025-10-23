
import React from 'react';
import { useInView } from '../hooks/useInView';

const About: React.FC = () => {
    const [ref, isVisible] = useInView({ threshold: 0.2 });

    const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute('href');
        if (!href) return;

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const headerOffset = 80; // Account for fixed header height
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section id="about" ref={ref} className={`py-16 md:py-24 bg-background-light dark:bg-transparent animated-bg-dark ${isVisible ? 'aurora-visible' : ''}`}>
            <div className={`container mx-auto px-4 ${isVisible ? 'section-visible' : ''}`}>
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="lg:w-1/2">
                        <img 
                            src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2940&auto=format&fit=crop" 
                            alt="Stylish modern interior" 
                            className="rounded-lg shadow-2xl w-full h-auto object-cover"
                        />
                    </div>
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl md:text-4xl font-bold text-text-dark dark:text-text-light mb-6">关于我们</h2>
                        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                            Decoration Co. 是一家专注于现代简约风格的室内设计公司。我们坚信，设计不仅是美学的呈现，更是生活方式的延伸。
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            我们的团队由充满激情和创意的设计师组成，致力于为每一位客户打造独一无二、兼具功能性与艺术性的居住和工作空间。从概念构思到最终落地，我们注重每一个细节，确保最终成果超越您的期待。
                        </p>
                        <a href="#contact" onClick={handleScrollTo} className="min-w-[120px] max-w-[480px] cursor-pointer inline-flex items-center justify-center overflow-hidden rounded-full h-12 px-6 bg-primary text-accent text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
                            <span className="truncate">与我们合作</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;