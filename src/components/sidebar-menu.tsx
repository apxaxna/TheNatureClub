"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { X, ArrowRight } from "@phosphor-icons/react";

interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_OPTIONS = [
  { label: "Home", href: "/" },
  { label: "Discovery", href: "/discovery" },
  { label: "Blogs", href: "/blogs" },
  { label: "Destinations", href: "/destinations" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonial", href: "/testimonial" },
  { label: "About us", href: "/about" },
  { label: "Contact us", href: "/contact" },
];

export const SidebarMenu = ({ isOpen, onClose }: SidebarMenuProps) => {
  // Lock body scroll and handle Escape key for accessibility
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            key="sidebar-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/55 backdrop-blur-[2px]"
            aria-hidden="true"
          />

          {/* Sidebar Drawer */}
          <motion.aside
            key="sidebar-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              duration: 0.35,
              ease: [0.32, 0.72, 0, 1], // iOS drawer ease-out curve from Emil Kowalski design engineering
            }}
            className="fixed top-0 left-0 bottom-0 z-50 flex h-full w-[88vw] sm:w-[85vw] md:w-1/2 max-w-120 md:max-w-none flex-col overflow-y-auto bg-[#1a1111] px-6 pt-5 pb-8 sm:px-8 sm:pt-6 sm:pb-10 md:px-12 md:pt-7 md:pb-12 text-stone-200 shadow-2xl"
          >
            {/* Header: On mobile Logo is on Left & Close X is on Right; On desktop Close X is on Left & Logo is on Right */}
            <div className="flex items-center justify-between">
              {/* Close Button: Right on mobile (order-2), Left on desktop (order-1) */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation menu"
                className="order-2 md:order-1 group flex size-10 md:size-11 items-center justify-center rounded-full text-stone-300 transition-all duration-200 hover:bg-white/10 hover:text-white active:scale-95 cursor-pointer -mr-2 md:mr-0 md:-ml-2"
              >
                <X
                  size={28}
                  weight="light"
                  className="transition-transform duration-200 group-hover:scale-105 md:size-8"
                />
              </button>

              {/* Logo: Left on mobile (order-1), Right on desktop (order-2) */}
              <div className="order-1 md:order-2 relative">
                <Image
                  src="https://cdn.sanity.io/images/gnfni9vb/production/3023c21884fe24c0b12286009ee20eedb9ffb337-3375x4219.png"
                  alt="The Nature Club"
                  width={150}
                  height={150}
                  priority
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain select-none"
                />
              </div>
            </div>

            {/* Main Menu Options - pushed up with normalized starting point */}
            <nav className="mt-4 sm:mt-5 md:mt-6">
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.03,
                      delayChildren: 0.06,
                    },
                  },
                }}
                className="flex flex-col space-y-4 sm:space-y-4 md:space-y-5"
              >
                {MENU_OPTIONS.map((item) => (
                  <motion.li
                    key={item.label}
                    variants={{
                      hidden: { opacity: 0, x: -14 },
                      show: {
                        opacity: 1,
                        x: 0,
                        transition: {
                          duration: 0.25,
                          ease: [0.23, 1, 0.32, 1],
                        },
                      },
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group inline-flex items-center gap-3 text-lg sm:text-xl md:text-2xl font-light tracking-[0.14em] uppercase text-stone-200 transition-all duration-200 hover:translate-x-1.5 hover:text-white active:scale-[0.98]"
                    >
                      <span>{item.label}</span>
                      <ArrowRight
                        size={18}
                        weight="light"
                        className="opacity-0 -translate-x-1.5 text-stone-400 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-stone-200"
                      />
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
