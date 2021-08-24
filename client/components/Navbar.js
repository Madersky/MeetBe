import React from 'react';
import Link from 'next/link';

const Navbar = ({ userId }) => {
  const MyProfileButton = React.forwardRef(
    ({ onClick, href, className }, ref) => {
      return (
        <a href={href} onClick={onClick} ref={ref} className="nav_link">
          <i className={className}></i>
          <span></span>
          {/* <i className="bx bx-user nav_icon"></i> */}
        </a>
      );
    }
  );

  return (
    <div className="l-navbar" id="nav-bar">
      <nav className="nav">
        <div>
          <a href="/" className="nav_logo">
            <i className="bx bx-layer nav_logo-icon"></i>
            <span className="nav_logo-name">MeetBe</span>
          </a>
          <div className="nav_list">
            <a href="#" className="nav_link active">
              <i className="bx bx-grid-alt nav_icon"></i>
              <span className="nav_name">Dashboard</span>
            </a>

            <a href="#" className="nav_link">
              <i className="bx bx-message-square-detail nav_icon"></i>
              <span className="nav_name">Messages</span>
            </a>
            <a href="#" className="nav_link">
              <i className="bx bx-bookmark nav_icon"></i>
              <span className="nav_name">Bookmark</span>
            </a>
            <a href="#" className="nav_link">
              <i className="bx bx-folder nav_icon"></i>
              <span className="nav_name">Files</span>
            </a>
            <Link href={`/profiles/${userId}`}>
              <MyProfileButton className="bx bx-user nav_icon" />
              {/* <i className="bx bx-user nav_icon"></i> */}
            </Link>
            {/* <a href="/profiles" className="nav_link">
              <i className="bx bx-user nav_icon"></i>
            </a> */}
          </div>
        </div>
        <a href="/auth/signout" className="nav_link">
          <i className="bx bx-log-out nav_icon"></i>
          <span className="nav_name">SignOut</span>
        </a>
      </nav>
    </div>
  );
};

export default Navbar;
