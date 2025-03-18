import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const NavLink = ({ to, children, className = '' }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`${className} ${
        isActive
          ? 'text-indigo-600 font-semibold'
          : 'text-gray-600 hover:text-indigo-600'
      } transition-colors duration-200`}
    >
      {children}
    </Link>
  );
};

const MobileNavLink = ({ to, children, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`block px-4 py-2 text-base font-medium ${
        isActive
          ? 'text-indigo-600 bg-indigo-50'
          : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
      }`}
    >
      {children}
    </Link>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              EventCursor
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/events">Events</NavLink>
            <NavLink to="/vendors">Vendors</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 focus:outline-none"
                >
                  <FaUser className="h-5 w-5" />
                  <span>{user.name}</span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <Link
                      to={`/${user.role}/dashboard`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="text-gray-600 hover:text-indigo-600"
                >
                  Login
                </NavLink>
                <Link
                  to="/register"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <FaTimes className="block h-6 w-6" />
              ) : (
                <FaBars className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <MobileNavLink to="/" onClick={() => setIsOpen(false)}>
              Home
            </MobileNavLink>
            <MobileNavLink to="/events" onClick={() => setIsOpen(false)}>
              Events
            </MobileNavLink>
            <MobileNavLink to="/vendors" onClick={() => setIsOpen(false)}>
              Vendors
            </MobileNavLink>
            <MobileNavLink to="/about" onClick={() => setIsOpen(false)}>
              About
            </MobileNavLink>
            <MobileNavLink to="/contact" onClick={() => setIsOpen(false)}>
              Contact
            </MobileNavLink>
            {user ? (
              <>
                <MobileNavLink
                  to={`/${user.role}/dashboard`}
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </MobileNavLink>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <MobileNavLink to="/login" onClick={() => setIsOpen(false)}>
                  Login
                </MobileNavLink>
                <MobileNavLink to="/register" onClick={() => setIsOpen(false)}>
                  Register
                </MobileNavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 