// src/app/cookies/page.tsx
'use client';

import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button, Card, CardContent } from '@/components/ui';
import {
  Cookie,
  Settings,
  Shield,
  BarChart,
  Target,
  CheckCircle,
  XCircle,
  Info,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function CookiePage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [cookieSettings, setCookieSettings] = useState({
    necessary: true,
    analytics: true,
    marketing: false,
    preferences: true,
  });

  const cookieTypes = [
    {
      id: 'necessary',
      name: 'Necessary Cookies',
      description:
        'Essential for the website to function properly. These cannot be disabled.',
      icon: Shield,
      color: 'from-green-500 to-emerald-500',
      required: true,
      examples: [
        'Authentication and login status',
        'Security and fraud prevention',
        'Shopping cart contents',
        'Form submission data',
      ],
    },
    {
      id: 'analytics',
      name: 'Analytics Cookies',
      description: 'Help us understand how visitors interact with our website.',
      icon: BarChart,
      color: 'from-blue-500 to-indigo-500',
      required: false,
      examples: [
        'Page views and traffic sources',
        'User behavior and navigation patterns',
        'Performance optimization data',
        'Error tracking and debugging',
      ],
    },
    {
      id: 'marketing',
      name: 'Marketing Cookies',
      description:
        'Used to deliver personalized advertisements and track campaign effectiveness.',
      icon: Target,
      color: 'from-purple-500 to-pink-500',
      required: false,
      examples: [
        'Personalized ad content',
        'Social media integration',
        'Campaign performance tracking',
        'Retargeting and remarketing',
      ],
    },
    {
      id: 'preferences',
      name: 'Preference Cookies',
      description:
        'Remember your choices and preferences to improve your experience.',
      icon: Settings,
      color: 'from-orange-500 to-red-500',
      required: false,
      examples: [
        'Language and region settings',
        'Theme preferences (dark/light mode)',
        'Layout and display options',
        'Customized content preferences',
      ],
    },
  ];

  const handleCookieToggle = (cookieType: string) => {
    if (cookieType === 'necessary') return; // Cannot disable necessary cookies

    setCookieSettings((prev) => ({
      ...prev,
      [cookieType]: !prev[cookieType as keyof typeof prev],
    }));
  };

  const handleAcceptAll = () => {
    setCookieSettings({
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    });
  };

  const handleRejectOptional = () => {
    setCookieSettings({
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    });
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-6">
              <div
                className={`p-4 rounded-full ${
                  isDark ? 'bg-indigo-900' : 'bg-indigo-100'
                }`}
              >
                <Cookie
                  className={`w-12 h-12 ${
                    isDark ? 'text-indigo-400' : 'text-indigo-600'
                  }`}
                />
              </div>
            </div>

            <h1
              className={`text-4xl sm:text-5xl font-bold ${
                isDark ? 'text-white' : 'text-slate-900'
              } mb-6`}
            >
              Cookie
              <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent block">
                Policy
              </span>
            </h1>
            <p
              className={`text-xl ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              } max-w-3xl mx-auto mb-6`}
            >
              Learn about how MisterA's uses cookies to improve your experience
              and customize your preferences.
            </p>
            <div
              className={`text-sm ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              Last updated: January 15, 2025
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cookie Settings */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card
              className={`${
                isDark
                  ? 'bg-gradient-to-br from-indigo-900 to-purple-900'
                  : 'bg-gradient-to-br from-indigo-50 to-purple-50'
              } border-0`}
            >
              <CardContent className="p-8 text-center">
                <h2
                  className={`text-2xl font-bold ${
                    isDark ? 'text-white' : 'text-slate-900'
                  } mb-4`}
                >
                  Manage Your Cookie Preferences
                </h2>
                <p
                  className={`${
                    isDark ? 'text-indigo-200' : 'text-slate-600'
                  } mb-6`}
                >
                  Choose which types of cookies you'd like to accept. You can
                  change these settings at any time.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={handleAcceptAll} size="lg">
                    Accept All Cookies
                  </Button>
                  <Button
                    onClick={handleRejectOptional}
                    variant="outline"
                    size="lg"
                  >
                    Reject Optional Cookies
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Cookie Types */}
          <div className="space-y-6">
            {cookieTypes.map((cookieType, index) => {
              const Icon = cookieType.icon;
              const isEnabled =
                cookieSettings[cookieType.id as keyof typeof cookieSettings];

              return (
                <motion.div
                  key={cookieType.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card
                    className={
                      isDark
                        ? 'bg-slate-800 border-slate-700'
                        : 'bg-white border-slate-200'
                    }
                  >
                    <CardContent className="p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-start gap-4 flex-1">
                          <div
                            className={`p-3 rounded-lg bg-gradient-to-r ${cookieType.color}`}
                          >
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3
                                className={`text-xl font-bold ${
                                  isDark ? 'text-white' : 'text-slate-900'
                                }`}
                              >
                                {cookieType.name}
                              </h3>
                              {cookieType.required && (
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                  Required
                                </span>
                              )}
                            </div>
                            <p
                              className={`${
                                isDark ? 'text-slate-300' : 'text-slate-600'
                              } mb-4`}
                            >
                              {cookieType.description}
                            </p>

                            <div className="mb-4">
                              <h4
                                className={`text-sm font-semibold ${
                                  isDark ? 'text-slate-200' : 'text-slate-800'
                                } mb-2`}
                              >
                                Examples of use:
                              </h4>
                              <ul
                                className={`text-sm space-y-1 ${
                                  isDark ? 'text-slate-400' : 'text-slate-600'
                                }`}
                              >
                                {cookieType.examples.map(
                                  (example, exampleIndex) => (
                                    <li
                                      key={exampleIndex}
                                      className="flex items-start gap-2"
                                    >
                                      <div className="w-1 h-1 bg-current rounded-full mt-2 flex-shrink-0"></div>
                                      {example}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="ml-4">
                          <button
                            onClick={() => handleCookieToggle(cookieType.id)}
                            disabled={cookieType.required}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                              cookieType.required
                                ? 'bg-green-600 cursor-not-allowed'
                                : isEnabled
                                ? 'bg-indigo-600'
                                : 'bg-gray-300'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                isEnabled ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                          <div className="flex items-center gap-1 mt-2">
                            {isEnabled ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-600" />
                            )}
                            <span
                              className={`text-xs ${
                                isDark ? 'text-slate-400' : 'text-slate-600'
                              }`}
                            >
                              {isEnabled ? 'Enabled' : 'Disabled'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className={`py-16 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-slate-900'
              } mb-8 text-center`}
            >
              Additional Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card
                className={
                  isDark
                    ? 'bg-slate-700 border-slate-600'
                    : 'bg-slate-50 border-slate-200'
                }
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Info
                      className={`w-6 h-6 ${
                        isDark ? 'text-indigo-400' : 'text-indigo-600'
                      }`}
                    />
                    <h3
                      className={`text-lg font-semibold ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      What are Cookies?
                    </h3>
                  </div>
                  <p
                    className={`text-sm ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    Cookies are small text files that are stored on your device
                    when you visit a website. They help websites remember your
                    preferences and provide you with a better browsing
                    experience.
                  </p>
                </CardContent>
              </Card>

              <Card
                className={
                  isDark
                    ? 'bg-slate-700 border-slate-600'
                    : 'bg-slate-50 border-slate-200'
                }
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Settings
                      className={`w-6 h-6 ${
                        isDark ? 'text-indigo-400' : 'text-indigo-600'
                      }`}
                    />
                    <h3
                      className={`text-lg font-semibold ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      Managing Cookies
                    </h3>
                  </div>
                  <p
                    className={`text-sm ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    You can manage your cookie preferences through your browser
                    settings or using our cookie preference center. Some
                    features may not work properly if you disable certain
                    cookies.
                  </p>
                </CardContent>
              </Card>

              <Card
                className={
                  isDark
                    ? 'bg-slate-700 border-slate-600'
                    : 'bg-slate-50 border-slate-200'
                }
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield
                      className={`w-6 h-6 ${
                        isDark ? 'text-indigo-400' : 'text-indigo-600'
                      }`}
                    />
                    <h3
                      className={`text-lg font-semibold ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      Your Privacy
                    </h3>
                  </div>
                  <p
                    className={`text-sm ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    We respect your privacy and only collect data that helps us
                    improve our services. We never sell your personal
                    information to third parties.
                  </p>
                </CardContent>
              </Card>

              <Card
                className={
                  isDark
                    ? 'bg-slate-700 border-slate-600'
                    : 'bg-slate-50 border-slate-200'
                }
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Cookie
                      className={`w-6 h-6 ${
                        isDark ? 'text-indigo-400' : 'text-indigo-600'
                      }`}
                    />
                    <h3
                      className={`text-lg font-semibold ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      Third-Party Cookies
                    </h3>
                  </div>
                  <p
                    className={`text-sm ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    Some cookies may be set by third-party services we use, such
                    as analytics providers or social media platforms. These are
                    governed by their respective privacy policies.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-slate-900'
              } mb-6`}
            >
              Questions About Cookies?
            </h2>
            <p
              className={`text-lg ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              } mb-8`}
            >
              If you have any questions about our use of cookies, please don't
              hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">Contact Support</Button>
              <Button variant="outline" size="lg">
                Privacy Policy
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
