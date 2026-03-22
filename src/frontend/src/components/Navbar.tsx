import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Courses", to: "/courses" },
  { label: "Admissions", to: "/admissions" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { location } = useRouterState();

  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <header className="sticky top-0 z-50 bg-orange-600 shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 flex-shrink-0"
            data-ocid="nav.link"
          >
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center font-black text-orange-600 text-lg">
              DI
            </div>
            <div className="leading-tight">
              <div className="font-black text-white text-sm uppercase tracking-wider">
                D-Infotech
              </div>
              <div className="text-orange-100 text-xs">Computer Institute</div>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid="nav.link"
                className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                  isActive(link.to)
                    ? "text-white border-b-2 border-white"
                    : "text-orange-100 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop action buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/login"
              data-ocid="nav.login.button"
              className="px-4 py-1.5 text-sm font-semibold text-white border border-white rounded-full hover:bg-white hover:text-orange-600 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/admissions"
              data-ocid="nav.enroll.button"
              className="px-4 py-1.5 text-sm font-semibold bg-white text-orange-600 rounded-full hover:bg-orange-50 transition-colors"
            >
              Enroll Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden bg-orange-700 border-t border-orange-500"
          data-ocid="nav.panel"
        >
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid="nav.link"
                className={`block px-3 py-2 rounded text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? "bg-orange-600 text-white"
                    : "text-orange-100 hover:text-white hover:bg-orange-600"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 flex gap-2">
              <Link
                to="/login"
                data-ocid="nav.login.button"
                className="flex-1 text-center px-4 py-2 text-sm font-semibold text-white border border-white rounded-full hover:bg-white hover:text-orange-600 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/admissions"
                data-ocid="nav.enroll.button"
                className="flex-1 text-center px-4 py-2 text-sm font-semibold bg-white text-orange-600 rounded-full hover:bg-orange-50 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Enroll Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
