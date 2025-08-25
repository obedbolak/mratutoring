// src/app/resources/page.tsx
'use client';

import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button, Card, CardContent } from '@/components/ui';
import {
  Download,
  FileText,
  Video,
  BookOpen,
  Calculator,
  Atom,
  ExternalLink,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function ResourcesPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedType, setSelectedType] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const resources = [
    {
      id: 1,
      title: 'WAEC Mathematics Past Questions (2015-2023)',
      type: 'PDF',
      subject: 'Mathematics',
      description:
        'Complete collection of WAEC Mathematics past questions with detailed solutions.',
      size: '15.2 MB',
      downloads: 1256,
      icon: FileText,
      color: 'from-blue-500 to-indigo-500',
      premium: false,
    },
    {
      id: 2,
      title: 'A-Level Physics Formula Sheet',
      type: 'PDF',
      subject: 'Physics',
      description:
        'Essential formulas and constants for A-Level Physics examinations.',
      size: '2.8 MB',
      downloads: 892,
      icon: Calculator,
      color: 'from-green-500 to-emerald-500',
      premium: false,
    },
    {
      id: 3,
      title: 'Organic Chemistry Reaction Mechanisms',
      type: 'Video',
      subject: 'Chemistry',
      description:
        'Step-by-step video explanations of important organic reactions.',
      size: '120 min',
      downloads: 654,
      icon: Video,
      color: 'from-purple-500 to-pink-500',
      premium: true,
    },
    {
      id: 4,
      title: 'JAMB Biology Syllabus & Topics',
      type: 'PDF',
      subject: 'Biology',
      description:
        'Updated JAMB Biology syllabus with topic breakdown and study guide.',
      size: '5.1 MB',
      downloads: 2103,
      icon: BookOpen,
      color: 'from-red-500 to-orange-500',
      premium: false,
    },
    {
      id: 5,
      title: 'Calculus Problem Solving Techniques',
      type: 'Video',
      subject: 'Mathematics',
      description:
        'Master calculus with practical problem-solving strategies and examples.',
      size: '180 min',
      downloads: 743,
      icon: Video,
      color: 'from-blue-500 to-indigo-500',
      premium: true,
    },
    {
      id: 6,
      title: 'NECO Physics Practical Guide',
      type: 'PDF',
      subject: 'Physics',
      description:
        'Complete guide to NECO Physics practical experiments and procedures.',
      size: '8.7 MB',
      downloads: 567,
      icon: Atom,
      color: 'from-green-500 to-emerald-500',
      premium: false,
    },
  ];

  const resourceTypes = ['All Types', 'PDF', 'Video', 'Interactive'];
  const subjects = [
    'All Subjects',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
  ];

  const filteredResources = resources.filter((resource) => {
    const typeMatch = selectedType === 'all' || resource.type === selectedType;
    const subjectMatch =
      selectedSubject === 'all' || resource.subject === selectedSubject;
    return typeMatch && subjectMatch;
  });

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
              Study
              <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent block">
                Resources & Materials
              </span>
            </h1>
            <p
              className={`text-xl ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              } max-w-3xl mx-auto`}
            >
              Access past questions, study guides, video tutorials, and
              comprehensive materials for WAEC, NECO, JAMB, and A-Level
              examinations.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            className="flex flex-col md:flex-row gap-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex-1">
              <label
                className={`block text-sm font-medium ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                } mb-2`}
              >
                Resource Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-white'
                    : 'bg-white border-slate-300 text-slate-900'
                } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
              >
                {resourceTypes.map((type) => (
                  <option
                    key={type}
                    value={type === 'All Types' ? 'all' : type}
                  >
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label
                className={`block text-sm font-medium ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                } mb-2`}
              >
                Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-white'
                    : 'bg-white border-slate-300 text-slate-900'
                } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
              >
                {subjects.map((subject) => (
                  <option
                    key={subject}
                    value={subject === 'All Subjects' ? 'all' : subject}
                  >
                    {subject}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Resources Grid */}
      <section ref={ref} className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {filteredResources.map((resource) => {
              const Icon = resource.icon;
              return (
                <motion.div key={resource.id} variants={itemVariants}>
                  <Card
                    className={`h-full hover:shadow-xl transition-all duration-300 ${
                      isDark
                        ? 'bg-slate-800 border-slate-700'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <CardContent className="p-6 pt-3">
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`p-3 rounded-lg bg-gradient-to-r ${resource.color}`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              isDark
                                ? 'bg-slate-700 text-slate-300'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {resource.type}
                          </span>
                          {resource.premium && (
                            <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 text-white">
                              Premium
                            </span>
                          )}
                        </div>
                      </div>

                      <h3
                        className={`text-lg font-semibold mb-2 ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {resource.title}
                      </h3>

                      <p
                        className={`text-sm mb-4 ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        {resource.description}
                      </p>

                      <div className="flex items-center justify-between mb-4 text-sm">
                        <span
                          className={
                            isDark ? 'text-slate-400' : 'text-slate-600'
                          }
                        >
                          Size: {resource.size}
                        </span>
                        <span
                          className={
                            isDark ? 'text-slate-400' : 'text-slate-600'
                          }
                        >
                          {resource.downloads} downloads
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span
                          className={`text-sm font-medium ${
                            isDark ? 'text-slate-300' : 'text-slate-700'
                          }`}
                        >
                          {resource.subject}
                        </span>
                        {resource.premium ? (
                          <Button
                            variant="outline"
                            className="flex items-center gap-2"
                          >
                            <ExternalLink className="w-4 h-4" />
                            View
                          </Button>
                        ) : (
                          <Button className="flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Download
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <p
                className={`text-lg ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                No resources found for the selected filters.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 ${isDark ? 'bg-slate-800' : 'bg-indigo-50'}`}>
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
              Need More Resources?
            </h2>
            <p
              className={`text-lg ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              } mb-8`}
            >
              Join our premium membership to access exclusive study materials,
              video tutorials, and personalized learning resources.
            </p>
            <Button size="lg" className="text-lg px-8 py-4">
              Upgrade to Premium
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
