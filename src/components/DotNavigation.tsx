"use client";

// import Link from 'next/link'; // No longer using next/link

interface DotNavigationProps {
  sections: Array<{ id: string; label: string }>;
  activeSection: string;
}

export default function DotNavigation({ sections, activeSection }: DotNavigationProps) {
  const handleDotClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50">
      <ul className="space-y-3">
        {sections.map((section) => (
          <li key={section.id}>
            <a // Changed from Link to a
              href={`#${section.id}`}
              onClick={(e) => handleDotClick(e, section.id)}
              className={`
                block w-3 h-3 rounded-full transition-all duration-300 ease-in-out cursor-pointer
                ${activeSection === section.id ? 'bg-white scale-125' : 'bg-gray-400 hover:bg-gray-300'}
              `}
              aria-label={`Go to ${section.label} section`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
} 