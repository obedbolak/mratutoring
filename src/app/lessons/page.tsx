// src/app/lessons/page.tsx
'use client';

import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button, Card, CardContent } from '@/components/ui';
import Link from 'next/link';
import {
  Calculator,
  Atom,
  BookOpen,
  GraduationCap,
  Clock,
  Star,
  Users,
  Play,
  Filter,
  Search,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function LessonsPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const lessons = [
    {
      id: 1,
      title: 'Advanced Algebra & Calculus',
      subject: 'Mathematics',
      level: 'A-Level',
      duration: '12 weeks',
      students: 156,
      rating: 4.9,
      price: '15,000 FCFA',
      description:
        'Master advanced mathematical concepts including limits, derivatives, and integration.',
      topics: ['Calculus', 'Algebra', 'Functions', 'Graphs'],
      icon: Calculator,
      color: 'from-blue-500 to-indigo-500',
    },
    {
      id: 2,
      title: 'Mechanics & Thermodynamics',
      subject: 'Physics',
      level: 'A-Level',
      duration: '10 weeks',
      students: 134,
      rating: 4.8,
      price: '12,000 FCFA',
      description:
        'Understand motion, forces, energy, and heat transfer principles.',
      topics: ['Motion', 'Forces', 'Energy', 'Heat'],
      icon: Atom,
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 3,
      title: 'Organic Chemistry Fundamentals',
      subject: 'Chemistry',
      level: 'O-Level',
      duration: '8 weeks',
      students: 98,
      rating: 4.7,
      price: '10,000 FCFA',
      description:
        'Learn about carbon compounds, reactions, and molecular structures.',
      topics: ['Hydrocarbons', 'Reactions', 'Structures', 'Synthesis'],
      icon: BookOpen,
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 4,
      title: 'Cell Biology & Genetics',
      subject: 'Biology',
      level: 'A-Level',
      duration: '9 weeks',
      students: 112,
      rating: 4.6,
      price: '11,000 FCFA',
      description: 'Explore cellular processes, DNA, and inheritance patterns.',
      topics: ['Cells', 'DNA', 'Genetics', 'Evolution'],
      icon: GraduationCap,
      color: 'from-red-500 to-orange-500',
    },
    {
      id: 5,
      title: 'Basic Arithmetic & Geometry',
      subject: 'Mathematics',
      level: 'O-Level',
      duration: '6 weeks',
      students: 203,
      rating: 4.8,
      price: '8,000 FCFA',
      description:
        'Build strong foundations in numbers, shapes, and problem-solving.',
      topics: ['Numbers', 'Shapes', 'Measurements', 'Word Problems'],
      icon: Calculator,
      color: 'from-blue-500 to-indigo-500',
    },
    {
      id: 6,
      title: 'Baccalauréat Preparation Course',
      subject: 'General',
      level: 'Baccalauréat',
      duration: '16 weeks',
      students: 287,
      rating: 4.9,
      price: '20,000 FCFA',
      description:
        'Comprehensive preparation for Baccalauréat with past questions and practice tests.',
      topics: ['French', 'Mathematics', 'Sciences', 'Mock Tests'],
      icon: GraduationCap,
      color: 'from-yellow-500 to-amber-500',
    },
  ];

  const levels = [
    'All Levels',
    'O-Level',
    'A-Level',
    'Baccalauréat',
    'University Prep',
  ];
  const subjects = [
    'All Subjects',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'General',
  ];

  const filteredLessons = lessons.filter((lesson) => {
    const levelMatch =
      selectedLevel === 'all' || lesson.level === selectedLevel;
    const subjectMatch =
      selectedSubject === 'all' || lesson.subject === selectedSubject;
    return levelMatch && subjectMatch;
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
              Explore Our
              <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent block">
                Subject Lessons
              </span>
            </h1>
            <p
              className={`text-xl ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              } max-w-3xl mx-auto`}
            >
              Comprehensive lessons designed to help you excel in Mathematics,
              Physics, Chemistry, and more. Perfect for O-Level, A-Level, and
              Baccalauréat preparation.
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
                Filter by Level
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-white'
                    : 'bg-white border-slate-300 text-slate-900'
                } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
              >
                {levels.map((level) => (
                  <option
                    key={level}
                    value={level === 'All Levels' ? 'all' : level}
                  >
                    {level}
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
                Filter by Subject
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

      {/* Rest of the component remains the same, just with updated pricing in FCFA */}
      <section ref={ref} className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {filteredLessons.map((lesson) => {
              const Icon = lesson.icon;
              return (
                <motion.div key={lesson.id} variants={itemVariants}>
                  <Card
                    className={`h-full hover:shadow-xl transition-all duration-300 ${
                      isDark
                        ? 'bg-slate-800 border-slate-700'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`p-3 rounded-lg bg-gradient-to-r ${lesson.color}`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <span
                          className={`text-sm px-2 py-1 rounded-full ${
                            isDark
                              ? 'bg-slate-700 text-slate-300'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {lesson.level}
                        </span>
                      </div>

                      <h3
                        className={`text-xl font-semibold mb-2 ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {lesson.title}
                      </h3>

                      <p
                        className={`text-sm mb-4 ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        {lesson.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {lesson.topics.map((topic, index) => (
                          <span
                            key={index}
                            className={`text-xs px-2 py-1 rounded-full ${
                              isDark
                                ? 'bg-slate-700 text-slate-300'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {topic}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span
                              className={
                                isDark ? 'text-slate-400' : 'text-slate-600'
                              }
                            >
                              {lesson.duration}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span
                              className={
                                isDark ? 'text-slate-400' : 'text-slate-600'
                              }
                            >
                              {lesson.students}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span
                            className={`text-sm ${
                              isDark ? 'text-slate-300' : 'text-slate-600'
                            }`}
                          >
                            {lesson.rating}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span
                          className={`text-2xl font-bold ${
                            isDark ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          {lesson.price}
                        </span>
                        <Button className="flex items-center gap-2">
                          <Play className="w-4 h-4" />
                          Start Learning
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {filteredLessons.length === 0 && (
            <div className="text-center py-12">
              <p
                className={`text-lg ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                No lessons found for the selected filters.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
