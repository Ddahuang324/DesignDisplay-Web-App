
import React, { useState, useEffect, useCallback } from 'react';

const slides = [
    'https://images.unsplash.com/photo-1558002118-a71382a43a9f?q=80&w=2940&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=2940&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=2728&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=2832&auto=format&fit=crop'
];

const Hero: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentSlide(prev => (prev + 1) % slides.length);
    }, []);

    const prevSlide = () => {
        setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 5000);
        return () => clearInterval(slideInterval);
    }, [nextSlide]);

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
        <section id="home" className="relative h-screen w-full overflow-hidden">
            <div className="absolute inset-0">
                {slides.map((src, index) => (
                    <div
                        key={src}
                        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ${index === currentSlide ? 'opacity-100 animate-fade-in' : 'opacity-0'}`}
                        style={{ backgroundImage: `url("${src}")` }}
                    />
                ))}
            </div>
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative h-full flex flex-col justify-center items-center text-center text-white p-8">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight animate-fade-in" style={{ animationDelay: '200ms' }}>
                    极简主义，重塑空间之美
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mb-8 animate-fade-in" style={{ animationDelay: '500ms' }}>
                    我们相信，好的设计始于对生活的理解，终于对细节的完美追求。
                </p>
                <a href="#cases" onClick={handleScrollTo} className="min-w-[120px] max-w-[480px] cursor-pointer inline-flex items-center justify-center overflow-hidden rounded-full h-12 px-6 bg-primary text-accent text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors animate-fade-in" style={{ animationDelay: '800ms' }}>
                    <span className="truncate">探索我们的作品</span>
                </a>
            </div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4">
                <button onClick={prevSlide} className="text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10">
                    <span className="material-symbols-outlined text-4xl">arrow_back_ios</span>
                </button>
                <button onClick={nextSlide} className="text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10">
                    <span className="material-symbols-outlined text-4xl">arrow_forward_ios</span>
                </button>
            </div>
        </section>
    );
};

export default Hero;
