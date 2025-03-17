import {
  HeartHandshake,
  ShoppingCartIcon,
  User,
  LogIn,
  UserPlus,
  LogOut,
  Album,
  Box,
  MessageCircle,
  Users,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../store/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth(); // Get user state and logout function

  return (
    <div className="bg-base-100/80 backdrop-blur-lg border-b border-base-content/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="navbar px-4 min-h-[4rem] flex justify-between items-center">
          {/* Left Section - Logo */}
          <div className="flex-1 lg:flex-none">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <div className="flex items-center gap-2">
                <HeartHandshake className="size-9 text-primary" />
                <span className="font-semibold font-mono tracking-widest text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  VOLUNTEER
                </span>
              </div>
            </Link>
          </div>

          {/* Right Section - Profile, Login, Signup, Events */}
          <div className="flex items-center gap-4">
            {/* Events Link */}

            <Link
              to="/teams"
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <Users className="size-5" />
              <span className="hidden md:inline">Teams</span>
            </Link>

            <Link
              to="/helps"
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <MessageCircle className="size-5" />
              <span className="hidden md:inline">Helps</span>
            </Link>

            <Link
              to="/myparticipation"
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <Box className="size-5" />
              <span className="hidden md:inline">My Participation</span>
            </Link>

            <Link
              to="/myevents"
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <Album className="size-5" />
              <span className="hidden md:inline">My Events</span>
            </Link>

            {/* If user is logged in, show Profile and Logout */}
            {user ? (
              <>
                {/* Profile Link */}
                <Link
                  to="/profile"
                  className="flex items-center gap-1 hover:text-primary transition-colors"
                >
                  <User className="size-5" />
                  <span className="hidden md:inline">Profile</span>
                </Link>

                {/* Logout Button */}
                <button
                  onClick={logout}
                  className="flex items-center gap-1 bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors"
                >
                  <LogOut className="size-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
