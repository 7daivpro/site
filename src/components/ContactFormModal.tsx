"use client";

import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'success' | 'error' | null>(null);
  const [submissionMessage, setSubmissionMessage] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmissionStatus('success');
        setSubmissionMessage("Thanks! We've received your info and will be in touch shortly with your free automation analysis.");
        setTimeout(() => {
            onClose();
            // Reset state after a delay, in case the user opens the modal again
            setTimeout(() => {
                setSubmissionStatus(null)
                setIsSubmitting(false)
            }, 500)
        }, 3000);
      } else {
        setSubmissionStatus('error');
        setSubmissionMessage(result.message || 'An unknown error occurred. Please try again.');
        setIsSubmitting(false);
      }
    } catch {
      setSubmissionStatus('error');
      setSubmissionMessage('A network error occurred. Please check your connection and try again.');
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    // Prevent closing while submitting
    if (isSubmitting) return;
    
    // Reset state when closing the modal if it's not a success case
    if (submissionStatus !== 'success') {
        setSubmissionStatus(null)
        setSubmissionMessage('')
    }
    onClose();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
          onClick={handleClose} // Close on backdrop click
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-primary p-6 sm:p-8 rounded-xl shadow-2xl w-[80vw] max-w-4xl relative max-h-[90vh] overflow-y-auto ring-1 ring-white/10"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {submissionStatus === 'success' ? (
                <div className='text-center py-10'>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-orbitron text-center mb-4 text-white">All Set!</h2>
                    <p className="text-sm sm:text-base text-center text-white/80 max-w-md mx-auto">{submissionMessage}</p>
                </div>
            ) : (
                <>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-orbitron text-center mb-2 text-white">
                    You’re Bleeding Time — Let Us Fix It
                    </h2>
                    <p className="text-xs sm:text-sm text-center text-white/80 mb-4 sm:mb-6">
                    Fill this out and receive a free ChatGPT super guide.
                    </p>
                    <p className="text-[11px] sm:text-xs text-center text-secondary mb-5 sm:mb-6 font-medium">
                    No costs, no obligations.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                        <div>
                            <label htmlFor="contact-name" className="block text-xs sm:text-sm font-medium text-white/90 mb-1">Name</label>
                            <input type="text" name="name" id="contact-name" required className="w-full bg-white/5 p-2.5 sm:p-3 rounded-lg focus:ring-2 focus:ring-secondary outline-none placeholder:text-white/40 text-xs sm:text-sm ring-1 ring-white/10 focus:ring-offset-2 focus:ring-offset-primary transition-all" placeholder="Your Name" />
                        </div>
                        <div>
                            <label htmlFor="contact-email" className="block text-xs sm:text-sm font-medium text-white/90 mb-1">Email</label>
                            <input type="email" name="email" id="contact-email" required className="w-full bg-white/5 p-2.5 sm:p-3 rounded-lg focus:ring-2 focus:ring-secondary outline-none placeholder:text-white/40 text-xs sm:text-sm ring-1 ring-white/10 focus:ring-offset-2 focus:ring-offset-primary transition-all" placeholder="your@email.com" />
                        </div>
                        <div>
                            <label htmlFor="contact-number" className="block text-xs sm:text-sm font-medium text-white/90 mb-1">Phone Number</label>
                            <input type="tel" name="number" id="contact-number" required className="w-full bg-white/5 p-2.5 sm:p-3 rounded-lg focus:ring-2 focus:ring-secondary outline-none placeholder:text-white/40 text-xs sm:text-sm ring-1 ring-white/10 focus:ring-offset-2 focus:ring-offset-primary transition-all" placeholder="(123) 456-7890" />
                        </div>
                        <div>
                            <label htmlFor="contact-role" className="block text-xs sm:text-sm font-medium text-white/90 mb-1">Your Role</label>
                            <input type="text" name="role" id="contact-role" required className="w-full bg-white/5 p-2.5 sm:p-3 rounded-lg focus:ring-2 focus:ring-secondary outline-none placeholder:text-white/40 text-xs sm:text-sm ring-1 ring-white/10 focus:ring-offset-2 focus:ring-offset-primary transition-all" placeholder="e.g., Founder, Ops Lead" />
                        </div>
                        <div>
                            <label htmlFor="contact-priorityProcess" className="block text-xs sm:text-sm font-medium text-white/90 mb-1">What’s the #1 process you’d love to automate first?</label>
                            <textarea name="priorityProcess" id="contact-priorityProcess" rows={2} required className="w-full bg-white/5 p-2.5 sm:p-3 rounded-lg focus:ring-2 focus:ring-secondary outline-none placeholder:text-white/40 text-xs sm:text-sm ring-1 ring-white/10 focus:ring-offset-2 focus:ring-offset-primary transition-all" placeholder="e.g., lead gen, reporting, onboarding"></textarea>
                        </div>
                        <div>
                            <label htmlFor="contact-timeSpent" className="block text-xs sm:text-sm font-medium text-white/90 mb-1">How much time does your team spend on this per week?</label>
                            <select name="timeSpent" id="contact-timeSpent" required className="custom-select w-full bg-white/5 p-2.5 sm:p-3 rounded-lg text-white text-xs sm:text-sm ring-1 ring-white/10 focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-primary transition-all">
                                <option value="" disabled selected>Select an option</option>
                                <option value="<1">Less than 1 hour</option>
                                <option value="1–5">1–5 hours</option>
                                <option value="6–20">6–20 hours</option>
                                <option value="20+">More than 20 hours</option>
                                <option value="unsure">Not sure yet</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="contact-tools" className="block text-xs sm:text-sm font-medium text-white/90 mb-1">What tools or platforms do you use now?</label>
                            <input type="text" name="tools" id="contact-tools" className="w-full bg-white/5 p-2.5 sm:p-3 rounded-lg focus:ring-2 focus:ring-secondary outline-none placeholder:text-white/40 text-xs sm:text-sm ring-1 ring-white/10 focus:ring-offset-2 focus:ring-offset-primary transition-all" placeholder="e.g., HubSpot, Airtable, Zapier" />
                        </div>
                        <div>
                            <label htmlFor="contact-timeline" className="block text-xs sm:text-sm font-medium text-white/90 mb-1">When are you looking to implement automation?</label>
                            <select name="timeline" id="contact-timeline" required className="custom-select w-full bg-white/5 p-2.5 sm:p-3 rounded-lg text-white text-xs sm:text-sm ring-1 ring-white/10 focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-primary transition-all">
                                <option value="" disabled selected>Select a timeline</option>
                                <option value="asap">ASAP</option>
                                <option value="30d">Within 30 days</option>
                                <option value="90d">Within 90 days</option>
                                <option value="exploring">Just exploring for now</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="contact-budget" className="block text-xs sm:text-sm font-medium text-white/90 mb-1">Do you have a budget in place for this?</label>
                            <select name="budget" id="contact-budget" required className="custom-select w-full bg-white/5 p-2.5 sm:p-3 rounded-lg text-white text-xs sm:text-sm ring-1 ring-white/10 focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-primary transition-all">
                                <option value="" disabled selected>Select an option</option>
                                <option value="yes">Yes</option>
                                <option value="planning">Not yet, but planning to</option>
                                <option value="no">No budget yet</option>
                            </select>
                        </div>
                        <div>
                        <label htmlFor="contact-teamSize" className="block text-xs sm:text-sm font-medium text-white/90 mb-1">
                            How big is your team or company?
                        </label>
                        <select name="teamSize" id="contact-teamSize" required className="custom-select w-full bg-white/5 p-2.5 sm:p-3 rounded-lg text-white text-xs sm:text-sm ring-1 ring-white/10 focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-primary transition-all">
                            <option value="" disabled selected>Select a size</option>
                            <option value="1-5">1–5 people</option>
                            <option value="6-20">6–20 people</option>
                            <option value="21-100">21–100 people</option>
                            <option value="101+">100+ people</option>
                        </select>
                        </div>
                        <div>
                            <label htmlFor="contact-website" className="block text-xs sm:text-sm font-medium text-white/90 mb-1">What’s your website? <span className="text-white/50">(Optional)</span></label>
                            <input type="url" name="website" id="contact-website" className="w-full bg-white/5 p-2.5 sm:p-3 rounded-lg focus:ring-2 focus:ring-secondary outline-none placeholder:text-white/40 text-xs sm:text-sm ring-1 ring-white/10 focus:ring-offset-2 focus:ring-offset-primary transition-all" placeholder="https://yourcompany.com" />
                        </div>

                        {submissionStatus === 'error' && (
                            <p className="text-sm text-red-500 text-center">{submissionMessage}</p>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-secondary py-3 sm:py-3.5 px-6 rounded-lg font-ibm-plex text-white hover:bg-opacity-90 transition-colors text-sm sm:text-base font-medium mt-2 disabled:bg-opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Submitting...' : 'GET THE CHATGPT SUPER GUIDE'}
                        </button>
                    </form>
                </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
