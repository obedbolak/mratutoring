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
  Search,
  TrendingUp,
  Clock,
} from 'lucide-react';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLInputElement>(null);

  // Sample search suggestions - replace with real data
  const trendingSearches = [
    'Mathematics Grade 10',
    'Physics Tutorials',
    'Chemistry Lab',
    'Biology Notes',
    'English Literature',
    'Computer Science Basics',
    'Chemistry Experiment',
    'Physics Experiment',
    'Computer Science Experiment',
  ];

  const recentSearches = ['Algebra Basics', 'Science Project', 'History Notes'];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearchSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focus mobile search when opened
  useEffect(() => {
    if (isMobileSearchOpen && mobileSearchRef.current) {
      mobileSearchRef.current.focus();
    }
  }, [isMobileSearchOpen]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
    if (isMobileSearchOpen) {
      setSearchQuery('');
      setShowSearchSuggestions(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Handle search logic here
      console.log('Searching for:', searchQuery);
      setShowSearchSuggestions(false);
      setIsMobileSearchOpen(false);
    }
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    setShowSearchSuggestions(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
    // Delay hiding suggestions to allow clicking
    setTimeout(() => setShowSearchSuggestions(false), 150);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSearchSuggestions(false);
    setIsMobileSearchOpen(false);
    // Handle search logic here
    console.log('Searching for:', suggestion);
  };

  const handleLogoutClick = () => {
    setIsDropdownOpen(false);
    logout();
  };

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

  const searchInputStyle = isDark
    ? 'bg-slate-800 border-slate-600 text-slate-200 placeholder-slate-400 focus:border-indigo-400 focus:ring-indigo-400/20'
    : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-indigo-500 focus:ring-indigo-500/20';

  // Theme-based icon colors
  const iconPrimary = isDark ? 'text-slate-200' : 'text-slate-700';
  const iconSecondary = isDark ? 'text-slate-400' : 'text-slate-500';
  const iconMuted = isDark ? 'text-slate-500' : 'text-slate-400';
  const iconAccent = isDark ? 'text-indigo-400' : 'text-indigo-600';

  return (
    <header className={`${navBackground} sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <div
              className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${
                isDark
                  ? 'from-indigo-300 to-blue-400'
                  : 'from-indigo-600 to-blue-600'
              } bg-clip-text text-transparent cursor-pointer flex-shrink-0`}
            >
              MisterA&apos;s
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <div
            className="hidden md:flex flex-1 max-w-2xl mx-8 relative"
            ref={searchRef}
          >
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="relative">
                <Search
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                    isSearchFocused ? iconAccent : iconSecondary
                  } transition-colors duration-200`}
                />
                <input
                  type="text"
                  placeholder="Search lessons, resources, teachers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  className={`w-full pl-10 pr-10 py-2 rounded-lg border ${searchInputStyle} transition-all duration-300 focus:outline-none focus:ring-2 text-sm`}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setShowSearchSuggestions(false);
                    }}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full ${
                      isDark
                        ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-600'
                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                    } transition-all duration-200`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </form>

            {/* Desktop Search Suggestions */}
            {showSearchSuggestions && (
              <div
                className={`absolute top-full left-0 right-0 mt-2 ${cardBackground} rounded-xl shadow-lg overflow-hidden z-50`}
              >
                <div className="p-4">
                  {/* Trending Searches */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className={`w-4 h-4 ${iconAccent}`} />
                      <span
                        className={`text-sm font-medium ${
                          isDark ? 'text-slate-200' : 'text-slate-700'
                        }`}
                      >
                        Trending
                      </span>
                    </div>
                    <div className="space-y-1">
                      {trendingSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(search)}
                          className={`w-full text-left px-3 py-2 rounded-lg ${
                            isDark
                              ? 'text-slate-300 hover:bg-slate-700 hover:text-white'
                              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                          } transition-all duration-200 text-sm`}
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className={`w-4 h-4 ${iconSecondary}`} />
                        <span
                          className={`text-sm font-medium ${
                            isDark ? 'text-slate-200' : 'text-slate-700'
                          }`}
                        >
                          Recent
                        </span>
                      </div>
                      <div className="space-y-1">
                        {recentSearches.map((search, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(search)}
                            className={`w-full text-left px-3 py-2 rounded-lg ${
                              isDark
                                ? 'text-slate-300 hover:bg-slate-700 hover:text-white'
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            } transition-all duration-200 text-sm`}
                          >
                            {search}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/lessons" className={navItem}>
              Lessons
            </Link>
            <Link href="/resources" className={navItem}>
              Resources
            </Link>
            <Link href="/teachers" className={navItem}>
              Teachers
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
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                      isDark
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300'
                    } transition-all duration-300 shadow-md`}
                  >
                    {user?.image ? (
                      <Image
                        src={user.image}
                        alt={user.name || 'User'}
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                    ) : (
                      <User className={`w-4 h-4 ${iconPrimary}`} />
                    )}
                    <span className="text-sm font-medium hidden lg:block">
                      {user?.name || 'Account'}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 ${iconSecondary} transition-transform duration-200 ${
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
                            <BookOpen className={`w-4 h-4 ${iconPrimary}`} />
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
                            <Settings className={`w-4 h-4 ${iconPrimary}`} />
                            <span>Settings</span>
                          </div>
                        </Link>

                        <hr
                          className={
                            isDark ? 'border-slate-700' : 'border-slate-200'
                          }
                        />

                        <button
                          onClick={handleLogoutClick}
                          className={`w-full px-4 py-3 flex items-center gap-3 ${
                            isDark
                              ? 'text-red-400 hover:bg-slate-700'
                              : 'text-red-600 hover:bg-slate-50'
                          } transition-colors duration-200 text-left`}
                        >
                          <LogOut
                            className={`w-4 h-4 ${
                              isDark ? 'text-red-400' : 'text-red-600'
                            }`}
                          />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
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
                <Moon className={`w-5 h-5 ${iconSecondary}`} />
              )}
            </button>
          </nav>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Search Button */}
            <button
              onClick={toggleMobileSearch}
              className={`p-2 rounded-lg ${
                isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-100'
              } transition-all duration-300 ${
                isMobileSearchOpen
                  ? isDark
                    ? 'bg-slate-700 text-indigo-400'
                    : 'bg-slate-100 text-indigo-600'
                  : ''
              }`}
              aria-label="Toggle search"
            >
              <Search
                className={`w-5 h-5 ${
                  isMobileSearchOpen ? iconAccent : iconPrimary
                }`}
              />
            </button>

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
                <Moon className={`w-5 h-5 ${iconSecondary}`} />
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
                <X className={`w-6 h-6 ${iconPrimary}`} />
              ) : (
                <Menu className={`w-6 h-6 ${iconPrimary}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isMobileSearchOpen && (
          <div className="md:hidden pb-4 px-2">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="relative">
                <Search
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${iconSecondary}`}
                />
                <input
                  ref={mobileSearchRef}
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-10 py-3 rounded-lg border ${searchInputStyle} transition-all duration-300 focus:outline-none focus:ring-2`}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full ${
                      isDark
                        ? 'text-slate-400 hover:text-slate-200'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className={`md:hidden ${
              isDark ? 'bg-slate-800' : 'bg-white'
            } border-t ${isDark ? 'border-slate-700' : 'border-slate-200'}`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/lessons"
                onClick={toggleMobileMenu}
                className={`block px-3 py-2 ${navItem}`}
              >
                Lessons
              </Link>
              <Link
                href="/resources"
                onClick={toggleMobileMenu}
                className={`block px-3 py-2 ${navItem}`}
              >
                Resources
              </Link>
              <Link
                href="/teachers"
                onClick={toggleMobileMenu}
                className={`block px-3 py-2 ${navItem}`}
              >
                Teachers
              </Link>
              <Link
                href="/about"
                onClick={toggleMobileMenu}
                className={`block px-3 py-2 ${navItem}`}
              >
                About
              </Link>

              {!isAuthenticated && (
                <div className="pt-4 space-y-2">
                  <Link
                    href="/auth?mode=login"
                    onClick={toggleMobileMenu}
                    className="block"
                  >
                    <Button variant="ghost" className="w-full justify-start">
                      <LogIn className={`w-4 h-4 mr-2 ${iconPrimary}`} />
                      Sign In
                    </Button>
                  </Link>
                  <Link
                    href="/auth?mode=register"
                    onClick={toggleMobileMenu}
                    className="block"
                  >
                    <Button className="w-full justify-start">
                      <UserPlus
                        className={`w-4 h-4 mr-2 ${
                          isDark ? 'text-white' : 'text-white'
                        }`}
                      />
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
