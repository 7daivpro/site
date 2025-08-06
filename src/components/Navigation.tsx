"use client"

import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Using lucide-react icons
import Image from 'next/image';

// import Link from 'next/link' // No longer using next/link for these scroll links

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'problem', label: 'The Problem' },
    { id: 'benefits', label: 'Why DAIV.PRO?' },
    { id: 'contact', label: 'Get Started' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); // Close mobile menu on click
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <nav className="fixed w-full z-[100] bg-primary/80 backdrop-blur-sm shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Keep DAIV.PRO as a Next.js Link if it navigates to the root page, or change to <a> if preferred */}
          <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="flex items-center gap-2 cursor-pointer">
            <Image src="/logo.png" alt="DAIV.PRO Logo" width={32} height={32} className="h-8 w-8" />
            <span className="font-orbitron text-xl">DAIV.PRO</span>
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {sections.map(section => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => handleNavClick(e, section.id)}
                className="hover:text-secondary transition-colors cursor-pointer text-sm font-medium"
              >
                {section.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-secondary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu, toggle based on isMobileMenuOpen state */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 z-[90] bg-primary/95 backdrop-blur-md pb-4 shadow-lg" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {sections.map(section => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => handleNavClick(e, section.id)}
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-secondary/20 hover:text-secondary transition-colors"
              >
                {section.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
} 