import React from 'react';
import Link from 'next/link';

const Navbar = ({ currentUser }) => {
  const NavButton = React.forwardRef(({ onClick, href, className }, ref) => {
    return (
      <a href={href} onClick={onClick} ref={ref} className="nav_link">
        <i className={className}></i>
        {/* <i className="bx bx-user nav_icon"></i> */}
      </a>
    );
  });

  const links = [
    currentUser && {
      label: 'Dashboard',
      icon: 'bx bx-grid-alt nav_icon',
      href: '#',
    },
    currentUser && {
      label: 'Messages',
      icon: 'bx bx-message-square-detail nav_icon',
      href: '#',
    },
    currentUser && {
      label: 'Bookmark',
      icon: 'bx bx-bookmark nav_icon',
      href: '#',
    },
    currentUser && {
      label: 'Files',
      icon: 'bx bx-folder nav_icon',
      href: '#',
    },
    currentUser && {
      label: 'Profile',
      icon: 'bx bx-user nav_icon',
      href: `/profiles/${currentUser.id}`,
    },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href, icon }) => {
      return (
        <li key={label} className="nav-item">
          <Link href={href}>
            <NavButton className={icon} />
          </Link>
        </li>
      );
    });

  const authLinks = [
    currentUser && {
      label: 'Signout',
      icon: 'bx bx-log-out nav_icon',
      href: '/auth/signout',
    },
    !currentUser && {
      label: 'Signin',
      icon: 'bx bx-log-in nav_icon',
      href: '/auth/signin',
    },
    !currentUser && {
      label: 'Signup',
      icon: 'bi bi-person-plus nav_icon',
      href: '/auth/signup',
    },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href, icon }) => {
      return (
        <li key={href} className="nav-item">
          <Link href={href}>
            <NavButton className={icon} />
          </Link>
        </li>
      );
    });

  return (
    <div className="l-navbar" id="nav-bar">
      <nav className="nav">
        <div>
          {/* <a href="/" className="nav_logo">
            <i className="bx bx-layer nav_logo-icon"></i>
            <span className="nav_logo-name">MeetBe</span>
          </a> */}
          <div className="nav_list">
            <li>
              <div className="nav_toggle ">
                <i className="bx bx-menu nav_icon nav_logo-icon"></i>
              </div>
            </li>

            <Link href="/">
              <NavButton className="bx bx-layer nav_logo-icon" />
            </Link>
            {links}
          </div>
        </div>
        <div className="nav_list">{authLinks}</div>
      </nav>
    </div>
  );
};

export default Navbar;
