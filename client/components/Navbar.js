import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Navbar = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navVariants = {
    opened: {
      opacity: 1,
      width: '250px',
    },
    closed: { opacity: 1 },
  };

  const navListVariants = {
    opened: { opacity: 1 },
    closed: { opacity: 1 },
  };

  const pVariants = {
    opened: { opacity: 1 },
    closed: { opacity: 0 },
  };

  const NavButton = React.forwardRef(
    ({ onClick, href, className, label }, ref) => {
      return (
        <a href={href} onClick={onClick} ref={ref} className="navbar__link">
          <i className={className}></i>
          {isOpen ? (
            <motion.p
              initial={false}
              animate={isOpen ? 'opened' : 'closed'}
              transition={{ delay: 0.5 }}
              variants={pVariants}
            >
              {label}
            </motion.p>
          ) : (
            ''
          )}
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
        <li key={label} className="navbar__list-item">
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
      transition={{ type: 'spring' }}
      animate={isOpen ? 'opened' : 'closed'}
      variants={navVariants}
    >
      <motion.ul
        className="navbar__list--top"
        initial={false}
        animate={isOpen ? 'opened' : 'closed'}
        variants={navListVariants}
      >
        <motion.li whileHover={{ scale: 1.1 }} className="navbar__list-item">
          <motion.i
            whileHover={{ scale: 1.1 }}
            className="bx bx-menu navbar__logo-icon"
            onClick={() => setIsOpen((isOpen) => !isOpen)}
          />
          {isOpen ? (
            <motion.p
              // animate={{ x: 100 }}
              onClick={() => setIsOpen((isOpen) => !isOpen)}
            >
              Menu
            </motion.p>
          ) : (
            ''
          )}
        </motion.li>
      </motion.ul>
      <motion.ul
        className="navbar__list--mid"
        initial={false}
        animate={isOpen ? 'opened' : 'closed'}
        variants={navListVariants}
      >
        {links}
      </motion.ul>
      {/* <motion.ul className="navbar__list">ELUWINA</motion.ul> */}
      <motion.ul
        className="navbar__list--bot"
        initial={false}
        animate={isOpen ? 'opened' : 'closed'}
        variants={navListVariants}
      >
        {authLinks}
      </motion.ul>
    </motion.nav>
  );
};

export default Navbar;
