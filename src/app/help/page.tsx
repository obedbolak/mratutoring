// src/app/help/page.tsx
'use client';

import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button, Card, CardContent } from '@/components/ui';
import Link from 'next/link';
import {
  Search,
  BookOpen,
  Users,
  CreditCard,
  Settings,
  MessageCircle,
  Video,
  FileText,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function HelpPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const categories = [
    {
      icon: BookOpen,
      title: 'Getting Started',
      description: 'Learn the basics of using our platform',
      articles: 12,
      color: 'from-blue-500 to-indigo-500',
      href: '/help/getting-started',
    },
    {
      icon: Users,
      title: 'Finding Tutors',
      description: 'How to find and connect with the right tutor',
      articles: 8,
      color: 'from-green-500 to-emerald-500',
      href: '/help/finding-tutors',
    },
    {
      icon: CreditCard,
      title: 'Payments & Billing',
      description: 'Payment methods, billing, and refunds',
      articles: 6,
      color: 'from-purple-500 to-pink-500',
      href: '/help/payments',
    },
    {
      icon: Settings,
      title: 'Account Settings',
      description: 'Manage your profile and preferences',
      articles: 10,
      color: 'from-orange-500 to-red-500',
      href: '/help/account',
    },
    {
      icon: Video,
      title: 'Online Sessions',
      description: 'Video calls, scheduling, and technical requirements',
      articles: 7,
      color: 'from-teal-500 to-cyan-500',
      href: '/help/sessions',
    },
    {
      icon: MessageCircle,
      title: 'Communication',
      description: 'Messaging, notifications, and updates',
      articles: 5,
      color: 'from-yellow-500 to-amber-500',
      href: '/help/communication',
    },
  ];

  const popularArticles = [
    {
      title: 'How to book your first tutoring session',
      description: 'Step-by-step guide to finding and booking a tutor',
      readTime: '5 min read',
      category: 'Getting Started',
    },
    {
      title: 'Payment methods available in Cameroon',
      description:
        'Learn about Mobile Money, bank transfers, and cash payments',
      readTime: '3 min read',
      category: 'Payments',
    },
    {
      title: 'What to expect in your first session',
      description: 'Tips for making the most of your tutoring experience',
      readTime: '4 min read',
      category: 'Sessions',
    },
    {
      title: 'How to prepare for online tutoring',
      description: 'Technical requirements and best practices',
      readTime: '6 min read',
      category: 'Online Sessions',
    },
  ];

  const faqs = [
    {
      question: 'How do I find a tutor in my city?',
      answer:
        'Use our search filters to select your city (Yaoundé, Douala, Bamenda, etc.) and browse available tutors in your area. You can also filter by subject and availability.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept MTN Mobile Money, Orange Money, bank transfers, and cash payments for in-person sessions. Online payment options are available for digital lessons.',
    },
    {
      question: 'Can I cancel or reschedule a session?',
      answer:
        'Yes, you can cancel or reschedule sessions up to 24 hours in advance without any penalty. For cancellations within 24 hours, a 50% fee may apply.',
    },
    {
      question: 'How do I know if a tutor is qualified?',
      answer:
        'All our tutors undergo verification including background checks, qualification verification, and student reviews. Look for the verified badge on tutor profiles.',
    },
    {
      question: "What if I'm not satisfied with a tutoring session?",
      answer:
        "We offer a satisfaction guarantee. If you're not happy with your session, contact us within 48 hours and we'll work to resolve the issue or provide a refund.",
    },
    {
      question: 'Do you offer group tutoring sessions?',
      answer:
        'Yes, many of our tutors offer group sessions which can be more cost-effective. You can specify group session preferences when searching for tutors.',
    },
  ];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              className={`text-4xl sm:text-5xl font-bold ${
                isDark ? 'text-white' : 'text-slate-900'
              } mb-6`}
            >
              How can we
              <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent block">
                help you today?
              </span>
            </h1>
            <p
              className={`text-xl ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              } max-w-3xl mx-auto mb-8`}
            >
              Find answers to your questions, learn how to use our platform
              effectively, and get the most out of your tutoring experience.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              />
              <input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-12 pr-4 py-4 rounded-lg border text-lg ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400'
                    : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
                } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Help Categories */}
      <section ref={ref} className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className={`text-3xl font-bold ${
                isDark ? 'text-white' : 'text-slate-900'
              } mb-4`}
            >
              Browse Help Topics
            </h2>
            <p
              className={`text-lg ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              } max-w-2xl mx-auto`}
            >
              Choose a category to find detailed guides and answers to common
              questions.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Link href={category.href}>
                    <Card
                      className={`h-full hover:shadow-lg transition-all duration-300 cursor-pointer group ${
                        isDark
                          ? 'bg-slate-800 border-slate-700 hover:border-slate-600'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div
                            className={`p-3 rounded-lg bg-gradient-to-r ${category.color} group-hover:scale-110 transition-transform duration-300`}
                          >
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <span
                            className={`text-sm px-2 py-1 rounded-full ${
                              isDark
                                ? 'bg-slate-700 text-slate-400'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {category.articles} articles
                          </span>
                        </div>

                        <h3
                          className={`text-lg font-semibold ${
                            isDark ? 'text-white' : 'text-slate-900'
                          } mb-2`}
                        >
                          {category.title}
                        </h3>

                        <p
                          className={`text-sm ${
                            isDark ? 'text-slate-400' : 'text-slate-600'
                          } mb-4`}
                        >
                          {category.description}
                        </p>

                        <div className="flex items-center gap-2 text-indigo-600 group-hover:text-indigo-500">
                          <span className="text-sm font-medium">
                            Learn more
                          </span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className={`py-16 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className={`text-3xl font-bold ${
                isDark ? 'text-white' : 'text-slate-900'
              } mb-4`}
            >
              Popular Articles
            </h2>
            <p
              className={`text-lg ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              } max-w-2xl mx-auto`}
            >
              Most helpful articles based on user feedback and views.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {popularArticles.map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  className={`hover:shadow-lg transition-all duration-300 cursor-pointer ${
                    isDark
                      ? 'bg-slate-700 border-slate-600'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          isDark
                            ? 'bg-indigo-900 text-indigo-300'
                            : 'bg-indigo-100 text-indigo-700'
                        }`}
                      >
                        {article.category}
                      </span>
                      <span
                        className={`text-xs ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        {article.readTime}
                      </span>
                    </div>

                    <h3
                      className={`text-lg font-semibold ${
                        isDark ? 'text-white' : 'text-slate-900'
                      } mb-2`}
                    >
                      {article.title}
                    </h3>

                    <p
                      className={`text-sm ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      {article.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className={`text-3xl font-bold ${
                isDark ? 'text-white' : 'text-slate-900'
              } mb-4`}
            >
              Frequently Asked Questions
            </h2>
            <p
              className={`text-lg ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              } max-w-2xl mx-auto`}
            >
              Quick answers to the most common questions about our platform.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  className={
                    isDark
                      ? 'bg-slate-800 border-slate-700'
                      : 'bg-white border-slate-200'
                  }
                >
                  <CardContent className="p-0">
                    <button
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-opacity-50"
                      onClick={() =>
                        setExpandedFAQ(expandedFAQ === index ? null : index)
                      }
                    >
                      <h3
                        className={`text-lg font-semibold ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {faq.question}
                      </h3>
                      <motion.div
                        animate={{ rotate: expandedFAQ === index ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown
                          className={`w-5 h-5 ${
                            isDark ? 'text-slate-400' : 'text-slate-600'
                          }`}
                        />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {expandedFAQ === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div
                            className={`px-6 pb-4 ${
                              isDark ? 'text-slate-300' : 'text-slate-600'
                            }`}
                          >
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className={`py-16 ${isDark ? 'bg-slate-800' : 'bg-indigo-50'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className={`text-3xl font-bold ${
                isDark ? 'text-white' : 'text-slate-900'
              } mb-6`}
            >
              Still Need Help?
            </h2>
            <p
              className={`text-lg ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              } mb-8`}
            >
              Can't find what you're looking for? Our support team is here to
              help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="text-lg px-8 py-4">
                  Contact Support
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Join Community Forum
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
