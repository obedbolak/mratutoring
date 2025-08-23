// src/components/Header.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui';
import {
  Moon,
  Sun,
  User,
  LogIn,
  UserPlus,
  ChevronDown,
  Menu,
  X,
  BookOpen,
  LogOut,
  Settings,
} from 'lucide-react';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const isDark = theme === 'dark';

  const navBackground = isDark
    ? 'bg-slate-900/95 backdrop-blur-sm border-b border-slate-800'
    : 'bg-white/95 backdrop-blur-sm border-b border-slate-200';

  const navItem = isDark
    ? 'text-slate-300 hover:text-white transition-colors duration-200'
    : 'text-slate-600 hover:text-slate-900 transition-colors duration-200';

  const cardBackground = isDark
    ? 'bg-slate-800 border border-slate-700 shadow-xl'
    : 'bg-white border border-slate-200 shadow-lg';

  return (
    <header className={`${navBackground} sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <div
              className={`text-3xl font-bold bg-gradient-to-r ${
                isDark
                  ? 'from-indigo-300 to-blue-400'
                  : 'from-indigo-600 to-blue-600'
              } bg-clip-text text-transparent cursor-pointer`}
            >
              MisterA&apos;s
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/lessons" className={navItem}>
              Lessons
            </Link>
            <Link href="/resources" className={navItem}>
              Resources
            </Link>
            <Link href="/teachers" className={navItem}>
              Home Teachers
            </Link>
            <Link href="/about" className={navItem}>
              About
            </Link>

            {/* Auth Section */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {/* User Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={toggleDropdown}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                      isDark
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300'
                    } transition-all duration-300 shadow-md`}
                  >
                    {user?.image ? (
                      <Image
                        src={user.image}
                        alt={user.name || 'User'}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                    <span className="text-sm font-medium">
                      {user?.name || 'Account'}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* User Dropdown Menu */}
                  {isDropdownOpen && (
                    <div
                      className={`absolute right-0 mt-2 w-56 ${cardBackground} rounded-lg shadow-lg overflow-hidden z-50`}
                    >
                      <div className="py-1">
                        <div
                          className={`px-4 py-3 border-b ${
                            isDark ? 'border-slate-700' : 'border-slate-200'
                          }`}
                        >
                          <p
                            className={`text-sm font-medium ${
                              isDark ? 'text-slate-200' : 'text-slate-900'
                            }`}
                          >
                            {user?.name}
                          </p>
                          <p
                            className={`text-xs ${
                              isDark ? 'text-slate-400' : 'text-slate-500'
                            }`}
                          >
                            {user?.email}
                          </p>
                        </div>

                        <Link href="/dashboard" onClick={closeDropdown}>
                          <div
                            className={`w-full px-4 py-3 flex items-center gap-3 ${
                              isDark
                                ? 'text-slate-200 hover:bg-slate-700'
                                : 'text-slate-700 hover:bg-slate-50'
                            } transition-colors duration-200 cursor-pointer`}
                          >
                            <BookOpen className="w-4 h-4" />
                            <span>Dashboard</span>
                          </div>
                        </Link>

                        <Link href="/settings" onClick={closeDropdown}>
                          <div
                            className={`w-full px-4 py-3 flex items-center gap-3 ${
                              isDark
                                ? 'text-slate-200 hover:bg-slate-700'
                                : 'text-slate-700 hover:bg-slate-50'
                            } transition-colors duration-200 cursor-pointer`}
                          >
                            <Settings className="w-4 h-4" />
                            <span>Settings</span>
                          </div>
                        </Link>

                        <hr
                          className={
                            isDark ? 'border-slate-700' : 'border-slate-200'
                          }
                        />

                        <button
                          onClick={() => {
                            logout();
                            closeDropdown();
                          }}
                          className={`w-full px-4 py-3 flex items-center gap-3 ${
                            isDark
                              ? 'text-red-400 hover:bg-slate-700'
                              : 'text-red-600 hover:bg-slate-50'
                          } transition-colors duration-200`}
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/auth?mode=login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth?mode=register">
                  <Button size="sm">Get Started</Button>
                </Link>
              </div>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${
                isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-100'
              } transition-all duration-300`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-slate-600" />
              )}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${
                isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-100'
              } transition-all duration-300`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-slate-600" />
              )}
            </button>

            <button
              onClick={toggleMobileMenu}
              className={`p-2 rounded-lg ${
                isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-100'
              } transition-all duration-300`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className={`md:hidden ${
              isDark ? 'bg-slate-800' : 'bg-white'
            } border-t ${isDark ? 'border-slate-700' : 'border-slate-200'}`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/lessons" className={`block px-3 py-2 ${navItem}`}>
                Lessons
              </Link>
              <Link href="/resources" className={`block px-3 py-2 ${navItem}`}>
                Resources
              </Link>
              <Link href="/teachers" className={`block px-3 py-2 ${navItem}`}>
                Home Teachers
              </Link>
              <Link href="/about" className={`block px-3 py-2 ${navItem}`}>
                About
              </Link>

              {!isAuthenticated && (
                <div className="pt-4 space-y-2">
                  <Link href="/auth?mode=login" className="block">
                    <Button variant="ghost" className="w-full justify-start">
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth?mode=register" className="block">
                    <Button className="w-full justify-start">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
