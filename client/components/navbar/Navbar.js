import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);
  const navVariants = {
    opened: {
      width: '250px',
      stiffness: 200,
      transition: {
        when: 'beforeChildren',
      },
    },
    closed: {
      width: '68px',
    },
  };

  const pVariants = {
    opened: {
      display: 'block',
    },
    closed: {
      display: 'none',
    },
  };

  const NavButton = React.forwardRef(
    ({ onClick, href, className, label }, ref) => {
      return (
        <a
          href={href}
          onClick={onClick}
          key={label}
          ref={ref}
          className="navbar__link"
        >
          <i className={className}></i>

          {/* {isOpen && ( */}
          <motion.p
            key={label}
            style={{ display: 'none' }}
            animate={isOpen ? 'opened' : 'closed'}
            variants={pVariants}
          >
            {label}
          </motion.p>
          {/* )} */}
        </a>
      );
    }
  );

  const links = [
    currentUser && {
      label: 'Home',
      icon: 'bx bx-layer navbar__logo-icon',
      href: '/',
    },

    currentUser && {
      label: 'Dashboard',
      icon: 'bx bx-grid-alt navbar__icon',
      href: '#',
    },
    currentUser && {
      label: 'Messages',
      icon: 'bx bx-message-square-detail navbar__icon',
      href: '#',
    },
    currentUser && {
      label: 'Bookmark',
      icon: 'bx bx-bookmark navbar__icon',
      href: '#',
    },
    currentUser && {
      label: 'Files',
      icon: 'bx bx-folder navbar__icon',
      href: '#',
    },
    currentUser && {
      label: 'Profile',
      icon: 'bx bx-user navbar__icon',
      href: `/profiles/${currentUser._id}`,
    },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href, icon }) => {
      return (
        <li key={label} className="navbar__list-item--mid">
          <Link href={href}>
            <NavButton className={icon} label={label} />
          </Link>
        </li>
      );
    });

  const authLinks = [
    currentUser && {
      label: 'SignOut',
      icon: 'bx bx-log-out navbar__icon',
      href: '/auth/signout',
    },
    !currentUser && {
      label: 'Sign In',
      icon: 'bx bx-log-in navbar__icon',
      href: '/auth/signin',
    },
    !currentUser && {
      label: 'Sign Up',
      icon: 'bi bi-person-plus navbar__icon',
      href: '/auth/signup',
    },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href, icon }) => {
      return (
        <AnimatePresence>
          <li className="navbar__list-item--bot" key={label}>
            <Link href={href}>
              <NavButton className={icon} label={label} />
            </Link>
          </li>
        </AnimatePresence>
      );
    });

  return (
    <motion.nav
      className="navbar"
      animate={isOpen ? 'opened' : 'closed'}
      variants={navVariants}
    >
      <ul className="navbar__list">
        {currentUser && (
          <li className="navbar__list-item--top">
            <i
              className="bx bx-menu navbar__logo-icon"
              onClick={() => setIsOpen((isOpen) => !isOpen)}
            />

            {isOpen && (
              <motion.p
                animate={isOpen ? 'open' : 'close'}
                variants={pVariants}
                onClick={() => setIsOpen((isOpen) => !isOpen)}
              >
                Menu
              </motion.p>
            )}
          </li>
        )}
        {links}
        {authLinks}
      </ul>
    </motion.nav>
  );
};

export default Navbar;
