import React, { useState } from 'react';
import { TabType } from '../types';

interface NavbarProps {
    onNavigate: (page: string, tab?: TabType) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleNavClick = (page: string, tab?: TabType) => {
        onNavigate(page, tab);
        setIsMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 flex flex-wrap items-center justify-between whitespace-nowrap border-b border-solid border-[#e7f3eb] dark:border-[#2a4030] bg-white/90 dark:bg-[#112116]/90 backdrop-blur-md px-4 md:px-10 py-3">
            <div className="flex items-center gap-4 text-[#0e1b12] dark:text-white cursor-pointer" onClick={() => handleNavClick('calculator')}>
                <div className="size-8 text-primary">
                    <span className="material-symbols-outlined !text-[32px]">health_and_safety</span>
                </div>
                <h2 className="text-[#0e1b12] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">KalkulatorNusantara</h2>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
                <div className="flex items-center gap-9">
                    <button onClick={() => handleNavClick('calculator')} className="text-[#0e1b12] dark:text-gray-300 text-sm font-medium leading-normal hover:text-primary transition-colors">Beranda</button>
                    <button onClick={() => handleNavClick('food-list')} className="text-[#0e1b12] dark:text-gray-300 text-sm font-medium leading-normal hover:text-primary transition-colors">Daftar Makanan</button>
                    <button onClick={() => handleNavClick('about')} className="text-[#0e1b12] dark:text-gray-300 text-sm font-medium leading-normal hover:text-primary transition-colors">Tentang</button>
                </div>
                <button
                    onClick={() => handleNavClick('calculator')}
                    className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-primary text-[#0e1b12] text-sm font-bold leading-normal tracking-[0.015em] transition hover:opacity-90">
                    <span className="truncate">Mulai Hitung</span>
                </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
                <button onClick={toggleMenu} className="text-[#0e1b12] dark:text-white focus:outline-none">
                    <span className="material-symbols-outlined text-3xl">{isMenuOpen ? 'close' : 'menu'}</span>
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white dark:bg-[#112116] border-b border-[#e7f3eb] dark:border-[#2a4030] shadow-lg md:hidden flex flex-col p-4 gap-4 animate-in slide-in-from-top-5">
                    <button onClick={() => handleNavClick('calculator')} className="text-left text-[#0e1b12] dark:text-gray-300 text-base font-medium hover:text-primary py-2 border-b border-gray-100 dark:border-gray-800">Beranda</button>
                    <button onClick={() => handleNavClick('food-list')} className="text-left text-[#0e1b12] dark:text-gray-300 text-base font-medium hover:text-primary py-2 border-b border-gray-100 dark:border-gray-800">Daftar Makanan</button>
                    <button onClick={() => handleNavClick('about')} className="text-left text-[#0e1b12] dark:text-gray-300 text-base font-medium hover:text-primary py-2 border-b border-gray-100 dark:border-gray-800">Tentang</button>
                    <button
                        onClick={() => handleNavClick('calculator')}
                        className="flex w-full items-center justify-center rounded-full h-12 bg-primary text-[#0e1b12] text-base font-bold mt-2">
                        Mulai Hitung
                    </button>
                </div>
            )}
        </header>
    );
};

export default Navbar;
