'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Home' },
  // { href: '/lahza', label: 'LAHZA' },  // Commented out until future release
  { href: '/films', label: 'Films' },
  { href: '/weddings', label: 'Weddings' },
  { href: '/blogs', label: 'Blogs' },
  { href: '/testimonial', label: 'Testimonial' },
  { href: '/contact', label: 'Contact' },
  { href: '/about', label: 'About' },
];

const menuVariants = {
  closedDesktop: { x: '100%', opacity: 0 },
  openDesktop: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
    },
  },
  closedMobile: { y: '100%', opacity: 0 },
  openMobile: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
    },
  },
};

const itemVariants = {
  closed: { opacity: 0 },
  open: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 0.1,
      type: 'spring',
      stiffness: 100,
      damping: 20,
    },
  }),
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className='w-full  '>
      <header
        className={`w-full py-3 px-4 ${isMobile ? 'bg-[#f8f5f0]' : 'bg-white'}`}
      >
        <div className='max-w-6xl mx-auto flex justify-between items-center'>
          {pathname !== '/' && (
            <Link href='/' className='flex items-center'>
              <Image
                src='/weddinglogo.png'
                alt='Wedding Theory Logo'
                width={50}
                height={50}
                unoptimized
              />
            </Link>
          )}
          {pathname === '/' && <div></div>}
          <motion.button
            onClick={toggleMenu}
            className='text-gray-700 focus:outline-none z-50 relative flex items-center'
            aria-label='Toggle menu'
            title='Toggle menu'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {!isMobile && <span className='mr-2 font-sans text-sm'>MENU</span>}
            <motion.div
              animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
              transition={{ duration: 0.6, ease: [0.6, 0.05, -0.01, 0.9] }}
            >
              {isOpen ? (
                <svg
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              ) : (
                <svg
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              )}
            </motion.div>
          </motion.button>
        </div>
      </header>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial={isMobile ? 'closedMobile' : 'closedDesktop'}
            animate={isMobile ? 'openMobile' : 'openDesktop'}
            exit={isMobile ? 'closedMobile' : 'closedDesktop'}
            className={`fixed ${
              isMobile ? 'inset-0' : 'inset-y-0 right-0'
            } bg-white z-40 flex items-center justify-center ${
              isMobile ? 'w-full h-full' : 'w-full md:w-1/3'
            } `}
          >
            {isMobile && pathname !== '/' && (
              <div className='absolute top-6 left-4 flex items-center'>
                <Image
                  src='/weddinglogo.png'
                  alt='Wedding Theory Logo'
                  width={40}
                  height={40}
                  unoptimized
                />
              </div>
            )}
            <ul className={`${isMobile ? 'text-center' : 'text-right pr-8'}`}>
              {navItems.map((item, index) => (
                <motion.li
                  key={item.href}
                  variants={itemVariants}
                  custom={index}
                  initial='closed'
                  animate='open'
                  exit='closed'
                  className='mb-6'
                >
                  <Link
                    href={item.href}
                    className={`text-2xl font-serif transition-colors ${
                      pathname === item.href
                        ? 'text-black'
                        : 'text-gray-800 hover:text-black'
                    }`}
                    onClick={toggleMenu}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
