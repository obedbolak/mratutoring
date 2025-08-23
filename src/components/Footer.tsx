// src/components/Footer.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui';
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  BookOpen,
  Users,
  Award,
  MessageCircle,
  ArrowUp,
  Heart,
} from 'lucide-react';

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    platform: [
      { label: 'Browse Courses', href: '/courses' },
      { label: 'Find Instructors', href: '/instructors' },
      { label: 'Student Dashboard', href: '/dashboard' },
      { label: 'Certificates', href: '/certificates' },
      { label: 'Pricing', href: '/pricing' },
    ],
    support: [
      { label: 'Help Center', href: '/help' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Community Forum', href: '/community' },
      { label: 'Technical Support', href: '/support' },
      { label: 'System Status', href: '/status' },
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press Kit', href: '/press' },
      { label: 'Blog', href: '/blog' },
      { label: 'Partners', href: '/partners' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Accessibility', href: '/accessibility' },
      { label: 'Data Protection', href: '/data-protection' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  ];

  const stats = [
    { icon: Users, value: '50K+', label: 'Active Students' },
    { icon: BookOpen, value: '500+', label: 'Courses' },
    { icon: Award, value: '200+', label: 'Expert Instructors' },
    { icon: MessageCircle, value: '95%', label: 'Satisfaction Rate' },
  ];

  const getLinkClass = () => {
    return isDark
      ? 'text-slate-400 hover:text-white transition-colors duration-200'
      : 'text-slate-600 hover:text-slate-900 transition-colors duration-200';
  };

  const getHeadingClass = () => {
    return isDark
      ? 'text-white font-semibold mb-4'
      : 'text-slate-900 font-semibold mb-4';
  };

  const getSocialButtonClass = () => {
    return isDark
      ? 'p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all duration-200'
      : 'p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-all duration-200';
  };

  return (
    <footer
      className={`${
        isDark
          ? 'bg-slate-900 border-t border-slate-800'
          : 'bg-white border-t border-slate-200'
      } relative`}
    >
      {/* Stats Section */}
      <div className={`${isDark ? 'bg-slate-800/50' : 'bg-slate-50'} py-12`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${
                      isDark ? 'bg-indigo-900' : 'bg-indigo-100'
                    } mb-3`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        isDark ? 'text-indigo-400' : 'text-indigo-600'
                      }`}
                    />
                  </div>
                  <div
                    className={`text-2xl font-bold ${
                      isDark ? 'text-white' : 'text-slate-900'
                    } mb-1`}
                  >
                    {stat.value}
                  </div>
                  <div
                    className={`text-sm ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3
              className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-slate-900'
              } mb-4`}
            >
              Stay Updated with MisterA&apos;s Newsletter
            </h3>
            <p
              className={`text-lg ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              } mb-8 max-w-2xl mx-auto`}
            >
              Get the latest updates on new courses, features, and learning
              opportunities delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className={`flex-1 px-4 py-3 rounded-lg border ${
                  isDark
                    ? 'bg-slate-800 border-slate-600 text-slate-100 placeholder-slate-400 focus:border-indigo-500'
                    : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-indigo-500'
                } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
              />
              <Button className="px-6 py-3">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div
                className={`text-3xl font-bold bg-gradient-to-r ${
                  isDark
                    ? 'from-indigo-300 to-blue-400'
                    : 'from-indigo-600 to-blue-600'
                } bg-clip-text text-transparent mb-4`}
              >
                MisterA&apos;s
              </div>
              <p
                className={`${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                } mb-6 max-w-sm`}
              >
                Empowering learners worldwide with expert-led courses, hands-on
                projects, and a supportive community.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail
                    className={`w-5 h-5 ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  />
                  <span
                    className={isDark ? 'text-slate-400' : 'text-slate-600'}
                  >
                    misteras@gmail.com
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone
                    className={`w-5 h-5 ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  />
                  <span
                    className={isDark ? 'text-slate-400' : 'text-slate-600'}
                  >
                    +237 (542) 06-555
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin
                    className={`w-5 h-5 ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  />
                  <span
                    className={isDark ? 'text-slate-400' : 'text-slate-600'}
                  >
                    Carrefour Obili, Yaounde, Cameroon
                  </span>
                </div>
              </div>
            </div>

            {/* Platform Links */}
            <div>
              <h4 className={getHeadingClass()}>Platform</h4>
              <ul className="space-y-3">
                {footerLinks.platform.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className={getLinkClass()}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className={getHeadingClass()}>Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className={getLinkClass()}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className={getHeadingClass()}>Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className={getLinkClass()}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className={getHeadingClass()}>Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className={getLinkClass()}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div
        className={`border-t ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        } py-8`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div
              className={`text-sm ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              <p className="flex items-center gap-1">
                © 2025 MisterA&apos;s. Made with
                <Heart className="w-4 h-4 text-red-500" /> for learners
                worldwide.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={getSocialButtonClass()}
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>

            {/* Scroll to Top */}
            <button
              onClick={scrollToTop}
              className={`${getSocialButtonClass()} group`}
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5 group-hover:transform group-hover:-translate-y-1 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
