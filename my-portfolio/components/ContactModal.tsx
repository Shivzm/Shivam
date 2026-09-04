"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Dark blurred background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#171026]/40 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl z-10"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 bg-gray-100 text-gray-500 hover:bg-[#7b46ea] hover:text-white rounded-full transition-colors"
            >
              <FiX size={20} />
            </button>

            <h3 className="font-serif text-4xl text-[#171026] mb-2">
              Let&apos;s connect.
            </h3>
            <p className="text-gray-500 mb-8 font-medium">
              Drop me a message and I&apos;ll get back to you soon.
            </p>

            {/* Form prevents default reload */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onClose();
              }}
              className="space-y-5"
            >
              <div>
                <label className="block text-xs font-bold tracking-widest text-[#7b46ea] uppercase mb-2">
                  Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7b46ea]/50 focus:border-[#7b46ea] transition-all font-medium text-[#171026]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold tracking-widest text-[#7b46ea] uppercase mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7b46ea]/50 focus:border-[#7b46ea] transition-all font-medium text-[#171026]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold tracking-widest text-[#7b46ea] uppercase mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we collaborate?"
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7b46ea]/50 focus:border-[#7b46ea] transition-all resize-none font-medium text-[#171026]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#171026] text-white rounded-xl font-bold tracking-wide shadow-lg shadow-black/10 hover:bg-[#7b46ea] transition-colors mt-2"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
