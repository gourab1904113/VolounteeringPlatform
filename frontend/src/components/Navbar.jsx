import {
  HeartHandshake,
  ShoppingCartIcon,
  User,
  LogIn,
  UserPlus,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-base-100/80 backdrop-blur-lg border-b border-base-content/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="navbar px-4 min-h-[4rem] flex justify-between items-center">
          {/* Left Section - Logo */}
          <div className="flex-1 lg:flex-none">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <div className="flex items-center gap-2">
                <HeartHandshake className="size-9 text-primary" />
                <span
                  className="font-semibold font-mono tracking-widest text-2xl
                  bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
                >
                  VOLUNTEER
                </span>
              </div>
            </Link>
          </div>

          {/* Right Section - Profile, Login, Signup, Events */}
          <div className="flex items-center gap-4">
            {/* Events Link */}
            <Link
              to="/events" // Route to the events page
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <ShoppingCartIcon className="size-5" />{" "}
              {/* Change the icon as needed */}
              <span className="hidden md:inline">Events</span>{" "}
              {/* Hidden on small screens */}
            </Link>

            {/* Profile Link */}
            <Link
              to="/profile"
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <User className="size-5" />
              <span className="hidden md:inline">Profile</span>
            </Link>

            {/* Login Link */}
            <Link
              to="/login"
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <LogIn className="size-5" />
              <span className="hidden md:inline">Login</span>
            </Link>

            {/* Signup Link */}
            <Link
              to="/signup"
              className="flex items-center gap-1 bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <UserPlus className="size-5" />
              <span>Signup</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
