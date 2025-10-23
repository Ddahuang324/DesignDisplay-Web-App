import React, { useState, useEffect } from 'react';
import { useScrollSpy } from '../hooks/useScrollSpy';

const navItems = [
    { href: '#home', label: '首页' },
    { href: '#cases', label: '案例' },
    { href: '#about', label: '关于' },
    { href: '#contact', label: '联系' },
];

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
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
        setIsMenuOpen(false);
    };

    const activeId = useScrollSpy(navItems.map(item => item.href.substring(1)), { offset: 100 });

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const NavLinks: React.FC<{ className?: string }> = ({ className }) => (
        <div className={className}>
            {navItems.map((item) => (
                <a
                    key={item.label}
                    href={item.href}
                    onClick={handleNavClick}
                    className={`text-sm font-medium leading-normal transition-colors duration-300 ${activeId === item.href.substring(1) ? 'text-primary' : 'text-text-dark dark:text-accent hover:text-primary dark:hover:text-primary'}`}
                >
                    {item.label}
                </a>
            ))}
        </div>
    );

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between whitespace-nowrap px-4 sm:px-6 lg:px-10 py-4 transition-all duration-300 ${isScrolled ? 'bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
                <a href="#home" onClick={handleNavClick} className="flex items-center gap-3 text-text-dark dark:text-accent">
                    <div className="size-6 text-primary">
                        <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" fill="currentColor"></path>
                        </svg>
                    </div>
                    <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] hidden sm:block">Decoration Co.</h2>
                </a>
                <NavLinks className="hidden md:flex items-center gap-8" />
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-text-dark dark:text-accent">
                        <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
                    </button>
                </div>
            </header>
            {/* Mobile Menu */}
            <div className={`fixed inset-0 z-40 bg-background-light dark:bg-background-dark transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="mt-20">
                    <NavLinks className="flex flex-col items-center gap-8 text-xl" />
                </div>
            </div>
        </>
    );
};

export default Header;
