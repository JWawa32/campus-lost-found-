import React, { useMemo } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  FaHome,
  FaSearch,
  FaPlus,
  FaUser,
  FaHistory,
  FaBox,
  FaComment,
  FaLifeRing,
} from "react-icons/fa";

const DashboardSidebar = ({ isOpen, onClose }) => {
  const menuItems = useMemo(
    () => [
      {
        label: "Dashboard",
        path: "/app/dashboard",
        icon: FaHome,
        description: "Overview",
      },
      {
        label: "Search Items",
        path: "/app/search",
        icon: FaSearch,
        description: "Find items",
      },
      {
        label: "Post Item",
        path: "/app/post-item",
        icon: FaPlus,
        description: "Report lost/found",
      },
      {
        label: "My Items",
        path: "/app/my-items",
        icon: FaBox,
        description: "Your postings",
      },
      {
        label: "Messages",
        path: "/app/messages",
        icon: FaComment,
        description: "Inbox",
      },
      {
        label: "Activity",
        path: "/app/activity",
        icon: FaHistory,
        description: "Recent activity",
      },
      {
        label: "Profile",
        path: "/app/profile",
        icon: FaUser,
        description: "Account settings",
      },
    ],
    []
  );

  const navLinkClass = ({ isActive }) =>
    [
      "group flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm transition-colors duration-150",
      isActive
        ? "bg-emerald-100 text-emerald-900 font-medium"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
    ].join(" ");

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-30 bg-black/30 transition-opacity duration-200 lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 z-40 h-[calc(100vh-64px)] w-72 overflow-y-auto border-r border-gray-200 bg-gray-50 transition-transform duration-250 ease-out will-change-transform lg:sticky lg:top-16 lg:z-20 lg:h-[calc(100vh-64px)] lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex min-h-full flex-col">
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="absolute right-3 top-3 rounded-lg p-1.5 text-gray-500 transition-colors duration-150 hover:bg-gray-200 hover:text-gray-700 lg:hidden"
            aria-label="Close sidebar"
            type="button"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Brand / Header */}
          <div className="border-b border-gray-200 px-5 pb-3 pt-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-base font-bold text-white shadow-md">
                Z
              </div>
              <div className="min-w-0">
                <h2 className="truncate text-sm font-semibold text-gray-900">
                  Student Portal
                </h2>
                <p className="truncate text-xs text-gray-500">
                  Lost &amp; Found
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={navLinkClass}
                  onClick={onClose}
                >
                  {({ isActive }) => (
                    <>
                      <div
                        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-colors duration-150 ${
                          isActive
                            ? "bg-emerald-200 text-emerald-700"
                            : "text-gray-500 group-hover:text-emerald-600"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium leading-5">
                          {item.label}
                        </div>
                        <div
                          className={`truncate text-xs leading-4 ${
                            isActive ? "text-emerald-700/70" : "text-gray-500"
                          }`}
                        >
                          {item.description}
                        </div>
                      </div>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Bottom Section */}
          <div className="border-t border-gray-200 bg-white p-3.5">
            <Link
              to="/contact"
              className="group flex items-center gap-3 rounded-lg bg-emerald-50 px-3 py-2.5 text-sm font-medium text-emerald-800 transition-colors duration-150 hover:bg-emerald-100"
              onClick={onClose}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-emerald-600 flex-shrink-0">
                <FaLifeRing className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="truncate">Help &amp; Support</div>
                <div className="text-xs text-emerald-700/70 leading-4 truncate">
                  Contact our team
                </div>
              </div>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
