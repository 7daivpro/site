"use client"

import { useState, useEffect, useRef, useCallback } from 'react';
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DotNavigation from '@/components/DotNavigation'
import { motion } from 'framer-motion'
import ContactFormModal from '@/components/ContactFormModal'

const sectionsConfig = [
  { id: 'home', label: 'Home' },
  { id: 'problem', label: 'The Problem' },
  { id: 'operations-dilemma', label: 'Dilemma' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'contact', label: 'Contact' },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>(sectionsConfig[0].id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Memoize the observer callback
  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveSection(entry.target.id);
      }
    });
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.5, // 50% of the section is visible
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Filter out null refs before observing
    const currentRefs = Object.values(sectionRefs.current).filter(el => el !== null) as HTMLElement[];
    currentRefs.forEach(el => observer.observe(el));

    return () => {
      currentRefs.forEach(el => observer.unobserve(el));
    };
  }, [observerCallback]); // Dependency array includes observerCallback

  // Callback ref function factory
  const assignRef = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  };

  return (
    <main className="overflow-x-hidden h-screen snap-y snap-mandatory overflow-y-scroll">
      <Navigation />
      <DotNavigation sections={sectionsConfig} activeSection={activeSection} />
      
      {/* Hero Section - Slide 1 */}
      <section id="home" ref={assignRef('home')} className="h-screen snap-start flex flex-col justify-center items-center relative isolate px-4 sm:px-6 lg:px-8 bg-transparent">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center lg:justify-around gap-10 sm:gap-8 md:gap-10 pt-20 sm:pt-24 md:pt-32 lg:pt-16 w-full relative z-10">
          <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl text-center lg:text-left lg:pr-8">
            <motion.h1 
              className="font-ibm-plex text-4xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 sm:mb-4 text-white leading-snug"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Supercharge your Business with AI
            </motion.h1>
            <motion.p 
              className="text-base sm:text-base md:text-lg lg:text-xl mb-5 sm:mb-6 md:mb-8 text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Focus on what you do best, while we handle the rest.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center lg:justify-start"
            >
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="bg-secondary px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-ibm-plex text-white hover:bg-opacity-90 transition-colors text-sm sm:text-sm md:text-base"
              >
                Get Started
              </button>
            </motion.div>
          </div>
          
          <motion.div
            className="hidden lg:block w-full max-w-[300px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[400px] xl:max-w-[420px] h-[260px] sm:h-[280px] md:h-[300px] lg:h-[320px] flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-slate-700/30 dark:bg-slate-800/30 backdrop-blur-lg rounded-lg p-3 sm:p-4 w-full h-full shadow-xl ring-1 ring-white/10 flex flex-col">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 flex-shrink-0">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
              </div>
              <h3 className="font-ibm-plex text-[14px] sm:text-xs md:text-sm mb-1.5 sm:mb-2 text-white/90 flex-shrink-0">DAIV Assistant</h3>
              <div className="space-y-1.5 sm:space-y-2 text-[10px] sm:text-xs overflow-y-auto flex-grow">
                <div className="bg-white/15 p-1.5 sm:p-2 rounded-md sm:rounded-lg text-white/80 w-fit ml-auto">
                  How can I grow faster?
                </div>
                <div className="bg-secondary/15 p-1.5 sm:p-2 rounded-md sm:rounded-lg text-white/80 w-80 mr-auto">
                  By automating the work that's slowing you down.
                </div>
                <div className="bg-secondary/15 p-1.5 sm:p-2 rounded-md sm:rounded-lg text-white/80 w-80 mr-auto">
                  I'll help you capture leads, follow up instantly, and scale your operations — all on autopilot.
                </div>
                <div className="bg-secondary/15 p-1.5 sm:p-2 rounded-md sm:rounded-lg text-secondary font-bold w-80 mr-auto">
                  No burnout. No missed opportunities. Just growth.
                </div>
                <div className="bg-white/15 p-1.5 sm:p-2 rounded-md sm:rounded-lg text-white/80 w-fit ml-auto">
                  Let's do it!
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section - Slide 2 (Formerly Features) */}
      <section id="problem" ref={assignRef('problem')} className="h-screen snap-start flex flex-col justify-center items-center bg-transparent px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto py-12 md:py-16 pt-16 md:pt-20 lg:pt-16 w-full">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-ibm-plex text-center mb-10 sm:mb-12 md:mb-16 leading-[1.5]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            You didn't start your business to drown in repetitive tasks…
          </motion.h2>
          
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-4 sm:mb-6">
              …but now you're spending <strong>hours</strong> replying to leads, moving data, sending follow-ups, and switching tabs like a full-time operator.
            </p>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90">
              And the <strong>worst</strong> part? These tasks don't scale, and they're stealing time from what really matters — <strong>growing your business.</strong>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Operations Dilemma Section - New Slide */}
      <section id="operations-dilemma" ref={assignRef('operations-dilemma')} className="h-screen snap-start flex flex-col justify-center items-center bg-transparent px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto py-12 md:py-16 pt-16 md:pt-20 lg:pt-16 w-full">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-ibm-plex text-center mb-10 sm:mb-12 md:mb-16 leading-snug"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            So how do you get the most out of your operations?
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 max-w-6xl mx-auto">
            {[
              {
                title: 'Do everything yourself?',
                description: 'If you\'ve got the time to learn automation tools and set everything up yourself, it can work. However, if you\'re already juggling a hundred tasks… that just isn\'t feasible.',
              },
              {
                title: 'Hire new staff?',
                description: 'It\'s an option — but finding the right person is tough. And expecting them to compete with AI at what it does best — automation — is an uphill battle.',
              },
              {
                title: 'Hire an agency?',
                description: 'Unless you have a large monthly budget, chances are your business gets passed down the chain. Before long, your operations are being managed by the assistant\'s assistant\'s intern.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="bg-white/5 backdrop-blur-sm p-4 sm:p-6 rounded-lg text-center md:text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
              >
                <h3 className="text-lg sm:text-xl md:text-2xl font-ibm-plex mb-2 sm:mb-3">{item.title}</h3>
                <p className="text-xs sm:text-sm md:text-base text-white/80">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why DAIV.PRO Section - Slide 3 (now 4) */}
      <section id="benefits" ref={assignRef('benefits')} className="h-screen snap-start flex flex-col justify-center items-center bg-transparent px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto py-12 md:py-16 pt-16 md:pt-20 lg:pt-16 w-full">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-ibm-plex text-center mb-10 sm:mb-12 md:mb-16 leading-snug"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            But why <div className='font-orbitron inline-block'>DAIV.PRO</div>?
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {[
              {
                number: '01',
                title: 'Guarantee',
                description: 'You grow, or we don\'t.\n\nWe believe in aligned incentives — which means you won\'t carry all the risk.\nWe\'re in this with you.',
              },
              {
                number: '02',
                title: 'Speed. Simplicity. Scale.',
                description: 'We\'re not here to add noise. We\'re here to build systems that quietly work — and deliver.',
              },
              {
                number: '03',
                title: 'Local',
                description: 'We\'re right here — a local team that understands your market and actually picks up the phone.',
              },
              {
                number: '04',
                title: 'Specialized',
                description: 'We don\'t do everything.\nWe focus on one thing: AI-powered automation that actually saves you time.\nThat\'s why we get results.',
              },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="flex gap-3 sm:gap-4 p-2 sm:p-0"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
              >
                <span className="text-secondary font-orbitron text-base sm:text-lg md:text-xl pt-1">{benefit.number}</span>
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-ibm-plex mb-1 sm:mb-2">{benefit.title}</h3>
                  <div className="text-xs sm:text-sm md:text-base text-white/80">
                    {benefit.description.split('\n').map((line, i) => (
                      <p key={i} className={i > 0 ? 'mt-2' : ''}>{line}</p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Started Section - Slide 4 */}
      <section id="contact" ref={assignRef('contact')} className="h-screen snap-start flex flex-col justify-center items-center bg-transparent px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto py-12 md:py-16 pt-16 md:pt-20 lg:pt-16 text-center w-full">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-orbitron mb-4 sm:mb-6 md:mb-8 leading-snug"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            Get Started
          </motion.h2>
          
          <motion.p 
            className="max-w-lg lg:max-w-2xl mx-auto mb-6 sm:mb-8 text-xs sm:text-sm md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Join our community of forward-thinking businesses leveraging AI to transform their operations.
            <br />
            Start now to receive a free e-book on how to use ChatGPT like a <div className='font-orbitron font-bold inline-block'>PRO</div>.
          </motion.p>
          
          <motion.div
            className="flex justify-center items-center max-w-xs sm:max-w-sm md:max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="bg-secondary px-8 py-3.5 rounded-lg font-ibm-plex text-white hover:bg-opacity-90 transition-colors text-sm sm:text-base md:text-lg font-medium"
            >
              Get Started
            </button>
          </motion.div>
        </div>
      </section>
      
      <Footer />
      <ContactFormModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </main>
  )
}
