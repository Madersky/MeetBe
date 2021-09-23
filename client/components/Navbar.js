import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Navbar = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const variants = {
    opened: { opacity: 1, width: '250px' },
    closed: { opacity: 1 },
  };

  const NavButton = React.forwardRef(
    ({ onClick, href, className, label }, ref) => {
      return (
        <a href={href} onClick={onClick} ref={ref} className="navbar__link">
          <i className={className}></i>
          {isOpen ? <p>{label}</p> : ''}
        </a>
      );
    }
  );

  const links = [
    currentUser && {
      label: 'Home',
      icon: 'bx bx-layer navbar__logo-icon"',
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
        <li key={label} className="navbar__item">
          <Link href={href}>
            <NavButton className={icon} label={label} />
          </Link>
        </li>
      );
    });

  const authLinks = [
    currentUser && {
      label: 'Sign Out',
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
        <motion.li
          className="navbar__list-item"
          // initial={false}
          // animate={isOpen ? 'opened' : 'closed'}
          // variants={variants}
          key={label}
        >
          <Link href={href}>
            <NavButton className={icon} label={label} />
          </Link>
        </motion.li>
      );
    });

  return (
    <motion.nav
      className="navbar"
      initial={false}
      animate={isOpen ? 'opened' : 'closed'}
      variants={variants}
    >
      <ul className="navbar__list--top">
        <li className="navbar__list-item">
          <i
            className="bx bx-menu navbar__logo-icon"
            onClick={() => setIsOpen((isOpen) => !isOpen)}
          />
          {isOpen ? <p>Menu</p> : ''}
        </li>
        {links}
      </ul>
      <ul className="navbar__list--bot">{authLinks}</ul>
    </motion.nav>
  );
};

export default Navbar;
