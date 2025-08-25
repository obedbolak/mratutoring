// src/app/not-found.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button, Card, CardContent } from '@/components/ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Home,
  Search,
  BookOpen,
  Users,
  ArrowLeft,
  HelpCircle,
  MessageCircle,
  TrendingUp,
  Star,
  Clock,
  RefreshCw,
} from 'lucide-react';
import { motion, Variants } from 'framer-motion';

export default function NotFoundPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const isDark = theme === 'dark';
  const [countdown, setCountdown] = useState(10);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  // Auto-redirect countdown
  useEffect(() => {
    if (countdown > 0 && shouldRedirect) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && shouldRedirect) {
      router.push('/');
    }
  }, [countdown, shouldRedirect, router]);

  const popularPages = [
    {
      title: 'Find Tutors',
      description: 'Browse qualified home teachers in your area',
      href: '/teachers',
      icon: Users,
      color: 'from-blue-500 to-indigo-500',
    },
    {
      title: 'Study Lessons',
      description: 'Access comprehensive subject lessons',
      href: '/lessons',
      icon: BookOpen,
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Study Resources',
      description: 'Download past questions and study materials',
      href: '/resources',
      icon: Star,
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Get Help',
      description: 'Find answers in our help center',
      href: '/help',
      icon: HelpCircle,
      color: 'from-orange-500 to-red-500',
    },
  ];

  const quickActions = [
    {
      label: 'Go Home',
      href: '/',
      icon: Home,
      variant: 'default' as const,
    },
    {
      label: 'Go Back',
      onClick: () => router.back(),
      icon: ArrowLeft,
      variant: 'outline' as const,
    },
    {
      label: 'Search',
      href: '/search',
      icon: Search,
      variant: 'outline' as const,
    },
    {
      label: 'Contact Support',
      href: '/contact',
      icon: MessageCircle,
      variant: 'outline' as const,
    },
  ];

  // Animation variants with proper typing
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const bounceVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.3,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  };

  const rotatingAnimation = {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: 'linear' as const,
    },
  };

  const pulseAnimation = {
    rotate: [0, 10, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatDelay: 3,
    },
  };

  return (
    <div
      className={`min-h-screen ${
        isDark ? 'bg-slate-900' : 'bg-slate-50'
      } relative overflow-hidden`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-20 left-10 w-32 h-32 rounded-full ${
            isDark ? 'bg-indigo-900/20' : 'bg-indigo-100/50'
          } blur-xl`}
        ></div>
        <div
          className={`absolute top-40 right-20 w-24 h-24 rounded-full ${
            isDark ? 'bg-purple-900/20' : 'bg-purple-100/50'
          } blur-xl`}
        ></div>
        <div
          className={`absolute bottom-20 left-1/4 w-40 h-40 rounded-full ${
            isDark ? 'bg-blue-900/20' : 'bg-blue-100/50'
          } blur-xl`}
        ></div>
        <div
          className={`absolute bottom-40 right-10 w-28 h-28 rounded-full ${
            isDark ? 'bg-green-900/20' : 'bg-green-100/50'
          } blur-xl`}
        ></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* 404 Number */}
          <motion.div className="mb-8" variants={bounceVariants}>
            <motion.div animate={floatingAnimation} className="relative">
              <h1
                className={`text-8xl md:text-9xl font-bold ${
                  isDark ? 'text-slate-800' : 'text-slate-200'
                } select-none`}
              >
                404
              </h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={rotatingAnimation}
                  className={`w-24 h-24 border-4 border-dashed rounded-full ${
                    isDark ? 'border-indigo-400/30' : 'border-indigo-600/30'
                  }`}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Error Message */}
          <motion.div variants={itemVariants} className="mb-8">
            <h2
              className={`text-3xl md:text-4xl font-bold ${
                isDark ? 'text-white' : 'text-slate-900'
              } mb-4`}
            >
              Oops! Page Not Found
            </h2>
            <p
              className={`text-lg md:text-xl ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              } mb-2`}
            >
              The page you&apos;re looking for seems to have gone on a study
              break.
            </p>
            <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Don&apos;t worry, we&apos;ll help you get back on track with your
              learning journey!
            </p>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {action.href ? (
                    <Link href={action.href}>
                      <Button
                        variant="primary"
                        size="lg"
                        className="flex items-center gap-2"
                      >
                        <Icon className="w-5 h-5" />
                        {action.label}
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={action.onClick}
                      className="flex items-center gap-2"
                    >
                      <Icon className="w-5 h-5" />
                      {action.label}
                    </Button>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* Popular Pages */}
          <motion.div variants={itemVariants} className="mb-12">
            <h3
              className={`text-xl font-semibold ${
                isDark ? 'text-white' : 'text-slate-900'
              } mb-6`}
            >
              Or explore these popular sections:
            </h3>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={containerVariants}
            >
              {popularPages.map((page, index) => {
                const Icon = page.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{
                      y: -5,
                      transition: { type: 'spring', stiffness: 300 },
                    }}
                  >
                    <Link href={page.href}>
                      <Card
                        className={`h-full hover:shadow-xl transition-all duration-300 cursor-pointer group ${
                          isDark
                            ? 'bg-slate-800 border-slate-700 hover:border-slate-600'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <CardContent className="p-6 text-center">
                          <motion.div
                            className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${page.color} mb-4`}
                            whileHover={{
                              scale: 1.1,
                              transition: { duration: 0.3 },
                            }}
                          >
                            <Icon className="w-6 h-6 text-white" />
                          </motion.div>
                          <h4
                            className={`text-lg font-semibold ${
                              isDark ? 'text-white' : 'text-slate-900'
                            } mb-2 group-hover:text-indigo-600 transition-colors`}
                          >
                            {page.title}
                          </h4>
                          <p
                            className={`text-sm ${
                              isDark ? 'text-slate-400' : 'text-slate-600'
                            }`}
                          >
                            {page.description}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Fun Facts or Tips */}
          <motion.div variants={itemVariants} className="mb-8">
            <Card
              className={`max-w-2xl mx-auto ${
                isDark
                  ? 'bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-indigo-700/50'
                  : 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200'
              }`}
            >
              <CardContent className="p-6 text-center">
                <motion.div
                  animate={pulseAnimation}
                  className="inline-block mb-3"
                >
                  <TrendingUp
                    className={`w-8 h-8 ${
                      isDark ? 'text-indigo-400' : 'text-indigo-600'
                    }`}
                  />
                </motion.div>
                <h4
                  className={`text-lg font-semibold ${
                    isDark ? 'text-white' : 'text-slate-900'
                  } mb-2`}
                >
                  Did you know?
                </h4>
                <p
                  className={`${isDark ? 'text-indigo-200' : 'text-slate-600'}`}
                >
                  Studies show that students who use personalized tutoring
                  improve their grades by an average of 30%. Why not find a
                  tutor while you&apos;re here?
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Auto-redirect Option */}
          <motion.div variants={itemVariants} className="text-center">
            {!shouldRedirect ? (
              <button
                onClick={() => setShouldRedirect(true)}
                className={`text-sm ${
                  isDark
                    ? 'text-slate-400 hover:text-slate-300'
                    : 'text-slate-500 hover:text-slate-600'
                } transition-colors duration-200 flex items-center gap-2 mx-auto`}
              >
                <Clock className="w-4 h-4" />
                Auto-redirect to homepage in 10 seconds
              </button>
            ) : (
              <div
                className={`text-sm ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                } flex items-center gap-2 justify-center`}
              >
                <motion.div
                  animate={{
                    rotate: 360,
                    transition: {
                      duration: 1,
                      repeat: Infinity,
                      ease: 'linear' as const,
                    },
                  }}
                >
                  <RefreshCw className="w-4 h-4" />
                </motion.div>
                Redirecting to homepage in {countdown} seconds...
                <button
                  onClick={() => setShouldRedirect(false)}
                  className={`ml-2 underline ${
                    isDark ? 'hover:text-slate-300' : 'hover:text-slate-600'
                  }`}
                >
                  Cancel
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            className={`absolute w-2 h-2 rounded-full ${
              isDark ? 'bg-indigo-400/20' : 'bg-indigo-600/20'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
              transition: {
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              },
            }}
          />
        ))}
      </div>
    </div>
  );
}
