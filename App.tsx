
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Cases from './components/Cases';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
            <Header />
            <main className="flex-1">
                <Hero />
                <Cases />
                <About />
                <Contact />
            </main>
            <Footer />
        </div>
    );
};

export default App;
