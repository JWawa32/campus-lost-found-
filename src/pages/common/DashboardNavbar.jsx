import React, { useContext, useRef, useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthContext from "../../context/Authcontext/AuthContext";
import {
  FaBars,
  FaHome,
  FaPlus,
  FaSearch,
  FaUser,
  FaSignOutAlt,
  FaShieldAlt,
} from "react-icons/fa";
import NotificationsDropdown from "../../components/NotificationsDropdown";

const DashboardNavbar = ({ onToggleSidebar }) => {
  const { user, signOutUser, isAdmin } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  const fallbackAvatar =
    "https://ui-avatars.com/api/?name=User&background=10b981&color=ffffff";

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!isMenuOpen) return;

      const clickedInsideMenu = menuRef.current?.contains(event.target);
      const clickedButton = buttonRef.current?.contains(event.target);

      if (!clickedInsideMenu && !clickedButton) {
        closeMenu();
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") closeMenu();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen, closeMenu]);

  const handleSignOut = useCallback(async () => {
    try {
      await signOutUser();
      toast.success("Successfully signed out!");
      closeMenu();
      navigate("/");
    } catch {
      toast.error("Cannot sign out, please try again.");
    }
  }, [signOutUser, closeMenu, navigate]);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-6">
          {/* Left side */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={onToggleSidebar}
              className="rounded-lg p-2 text-gray-500 transition-colors duration-150 hover:bg-gray-100 hover:text-gray-700 lg:hidden"
              aria-label="Toggle sidebar"
              type="button"
            >
              <FaBars className="h-5 w-5" />
            </button>

            <div className="hidden lg:flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-md">
                <span className="text-sm font-bold text-white">Z</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                Zetech
              </span>
            </div>
          </div>

          {/* Center quick actions - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-1.5">
            <Link
              to="/app/dashboard"
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors duration-150 hover:bg-gray-100 hover:text-gray-900"
            >
              <FaHome className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/app/search"
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors duration-150 hover:bg-gray-100 hover:text-gray-900"
            >
              <FaSearch className="h-4 w-4" />
              <span>Search</span>
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-1.5">
            <Link
              to="/app/post-item"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition duration-150 hover:bg-emerald-700 active:bg-emerald-800"
            >
              <FaPlus className="h-4 w-4" />
              <span className="hidden sm:inline">Post Item</span>
            </Link>

            <NotificationsDropdown />

            <div className="w-px h-6 bg-gray-200 mx-1 hidden sm:block" />

            <button
              ref={buttonRef}
              onClick={toggleMenu}
              className="flex items-center gap-2 rounded-lg p-1 transition-colors duration-150 hover:bg-gray-100"
              aria-label="User menu"
              aria-expanded={isMenuOpen}
              type="button"
            >
              <div className="h-9 w-9 overflow-hidden rounded-lg ring-1 ring-gray-200 transition duration-150 hover:ring-emerald-400">
                <img
                  src={user?.photoURL || fallbackAvatar}
                  alt={user?.displayName || "User"}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              <span className="hidden max-w-[100px] truncate text-sm font-medium text-gray-700 lg:inline">
                {user?.displayName?.split(" ")[0] || "Account"}
              </span>
            </button>

            {/* Dropdown Menu */}
            <div
              className={`absolute right-4 top-16 z-50 w-56 origin-top-right overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-150 ${
                isMenuOpen
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-1 opacity-0"
              }`}
              ref={menuRef}
            >
              <div className="border-b border-gray-100 px-4 py-3.5">
                <p className="text-sm font-semibold text-gray-900">
                  {user?.displayName || "User"}
                </p>
                <p className="truncate text-xs text-gray-500 mt-0.5">{user?.email}</p>
              </div>

              <nav className="px-2 py-2">
                <Link
                  to="/app/dashboard"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors duration-150 hover:bg-gray-100 hover:text-gray-900"
                >
                  <FaHome className="h-4 w-4 flex-shrink-0" />
                  Dashboard
                </Link>

                <Link
                  to="/app/profile"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors duration-150 hover:bg-gray-100 hover:text-gray-900"
                >
                  <FaUser className="h-4 w-4 flex-shrink-0" />
                  My Profile
                </Link>

                {isAdmin && (
                  <>
                    <div className="my-2 h-px bg-gray-100" />
                    <Link
                      to="/admin"
                      onClick={closeMenu}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-amber-600 transition-colors duration-150 hover:bg-amber-50 hover:text-amber-700"
                    >
                      <FaShieldAlt className="h-4 w-4 flex-shrink-0" />
                      Admin Panel
                    </Link>
                  </>
                )}

                <div className="my-2 h-px bg-gray-100" />

                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 transition-colors duration-150 hover:bg-red-50 hover:text-red-700"
                  type="button"
                >
                  <FaSignOutAlt className="h-4 w-4 flex-shrink-0" />
                  Sign Out
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
