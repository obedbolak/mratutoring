// src/app/community/page.tsx
'use client';

import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button, Card, CardContent } from '@/components/ui';
import Link from 'next/link';
import {
  MessageCircle,
  Users,
  ThumbsUp,
  Eye,
  Clock,
  Pin,
  Search,
  Plus,
  BookOpen,
  HelpCircle,
  Lightbulb,
  Award,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function CommunityPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const forumCategories = [
    {
      id: 'study-help',
      name: 'Study Help',
      description: 'Get help with homework, assignments, and study questions',
      icon: BookOpen,
      color: 'from-blue-500 to-indigo-500',
      topics: 156,
      posts: 1243,
      lastPost: '2 minutes ago',
    },
    {
      id: 'exam-prep',
      name: 'Exam Preparation',
      description: 'Tips, strategies, and resources for exam success',
      icon: Award,
      color: 'from-green-500 to-emerald-500',
      topics: 89,
      posts: 678,
      lastPost: '15 minutes ago',
    },
    {
      id: 'general-discussion',
      name: 'General Discussion',
      description: 'Chat about education, learning, and academic life',
      icon: MessageCircle,
      color: 'from-purple-500 to-pink-500',
      topics: 234,
      posts: 1876,
      lastPost: '5 minutes ago',
    },
    {
      id: 'tutor-tips',
      name: 'Tutor Tips',
      description: 'Advice and strategies from experienced tutors',
      icon: Lightbulb,
      color: 'from-orange-500 to-red-500',
      topics: 67,
      posts: 445,
      lastPost: '1 hour ago',
    },
    {
      id: 'technical-support',
      name: 'Technical Support',
      description: 'Get help with platform features and technical issues',
      icon: HelpCircle,
      color: 'from-teal-500 to-cyan-500',
      topics: 45,
      posts: 234,
      lastPost: '30 minutes ago',
    },
  ];

  const recentTopics = [
    {
      id: 1,
      title: 'How to solve quadratic equations efficiently?',
      author: 'Marie Nkomo',
      category: 'Study Help',
      replies: 12,
      views: 145,
      likes: 8,
      lastActivity: '5 minutes ago',
      isPinned: false,
      isAnswered: true,
      tags: ['Mathematics', 'Algebra', 'A-Level'],
    },
    {
      id: 2,
      title: 'Best strategies for memorizing Chemistry formulas',
      author: 'Paul Dikanda',
      category: 'Exam Preparation',
      replies: 8,
      views: 89,
      likes: 15,
      lastActivity: '12 minutes ago',
      isPinned: true,
      isAnswered: false,
      tags: ['Chemistry', 'Memory', 'Study Tips'],
    },
    {
      id: 3,
      title: 'Physics practical exam tips for GCE A-Level',
      author: 'Dr. Ngono',
      category: 'Exam Preparation',
      replies: 23,
      views: 312,
      likes: 28,
      lastActivity: '18 minutes ago',
      isPinned: false,
      isAnswered: true,
      tags: ['Physics', 'Practical', 'A-Level'],
    },
    {
      id: 4,
      title: 'How to balance studies with extracurricular activities?',
      author: 'Sarah Mbarga',
      category: 'General Discussion',
      replies: 19,
      views: 267,
      likes: 22,
      lastActivity: '25 minutes ago',
      isPinned: false,
      isAnswered: false,
      tags: ['Time Management', 'Student Life'],
    },
    {
      id: 5,
      title: 'Effective online tutoring techniques',
      author: 'Jean Foka',
      category: 'Tutor Tips',
      replies: 15,
      views: 198,
      likes: 31,
      lastActivity: '45 minutes ago',
      isPinned: false,
      isAnswered: true,
      tags: ['Online Teaching', 'Tutoring', 'Best Practices'],
    },
  ];

  const topContributors = [
    {
      name: 'Dr. Paul Ngono',
      role: 'Mathematics Expert',
      posts: 156,
      reputation: 2840,
      badges: ['Expert', 'Helpful'],
    },
    {
      name: 'Mme. Fatou Mbarga',
      role: 'Chemistry Specialist',
      posts: 134,
      reputation: 2156,
      badges: ['Verified Tutor', 'Active'],
    },
    {
      name: 'Prof. Emmanuel Njoya',
      role: 'Physics Professor',
      posts: 98,
      reputation: 1987,
      badges: ['Expert', 'Mentor'],
    },
  ];

  const filteredTopics = recentTopics.filter((topic) => {
    const categoryMatch =
      selectedCategory === 'all' || topic.category === selectedCategory;
    const searchMatch =
      searchQuery === '' ||
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return categoryMatch && searchMatch;
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
              Community
              <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent block">
                Forum
              </span>
            </h1>
            <p
              className={`text-xl ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              } max-w-3xl mx-auto mb-8`}
            >
              Connect with fellow students, ask questions, share knowledge, and
              get help from our community of learners and expert tutors.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Start New Topic
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                Browse Topics
              </Button>
            </div>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}
                />
                <input
                  type="text"
                  placeholder="Search topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 rounded-lg border ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400'
                      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
                  } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`px-4 py-3 rounded-lg border ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-white'
                    : 'bg-white border-slate-300 text-slate-900'
                } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
              >
                <option value="all">All Categories</option>
                {forumCategories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Forum Categories */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-slate-900'
              } mb-2`}
            >
              Forum Categories
            </h2>
            <div className="w-20 h-1 bg-indigo-600 rounded"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forumCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={`/community/category/${category.id}`}>
                    <Card
                      className={`p-6 h-full hover:shadow-lg transition-all duration-300 cursor-pointer group ${
                        isDark
                          ? 'bg-slate-800 border-slate-700 hover:border-slate-600'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div
                            className={`p-3 rounded-lg bg-gradient-to-r ${category.color} group-hover:scale-110 transition-transform duration-300`}
                          >
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-right">
                            <div
                              className={`text-sm font-medium ${
                                isDark ? 'text-white' : 'text-slate-900'
                              }`}
                            >
                              {category.topics} topics
                            </div>
                            <div
                              className={`text-xs ${
                                isDark ? 'text-slate-400' : 'text-slate-500'
                              }`}
                            >
                              {category.posts} posts
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3
                            className={`text-lg font-semibold ${
                              isDark ? 'text-white' : 'text-slate-900'
                            } mb-2`}
                          >
                            {category.name}
                          </h3>
                          <p
                            className={`text-sm ${
                              isDark ? 'text-slate-400' : 'text-slate-600'
                            } mb-3`}
                          >
                            {category.description}
                          </p>
                          <div
                            className={`text-xs ${
                              isDark ? 'text-slate-500' : 'text-slate-400'
                            }`}
                          >
                            Last post: {category.lastPost}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Topics */}
      <section
        ref={ref}
        className={`py-20 ${isDark ? 'bg-slate-800' : 'bg-white'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6 }}
              >
                <h2
                  className={`text-2xl font-bold ${
                    isDark ? 'text-white' : 'text-slate-900'
                  } mb-2`}
                >
                  Recent Topics
                </h2>
                <div className="w-20 h-1 bg-indigo-600 rounded"></div>
              </motion.div>

              <motion.div
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
              >
                {filteredTopics.map((topic) => (
                  <motion.div key={topic.id} variants={itemVariants}>
                    <Link href={`/community/topic/${topic.id}`}>
                      <Card
                        className={`p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group ${
                          isDark
                            ? 'bg-slate-700 border-slate-600'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <CardContent className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                {topic.isPinned && (
                                  <Pin className="w-4 h-4 text-indigo-600" />
                                )}
                                {topic.isAnswered && (
                                  <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                    Answered
                                  </div>
                                )}
                                <span
                                  className={`text-sm ${
                                    isDark
                                      ? 'text-indigo-400'
                                      : 'text-indigo-600'
                                  }`}
                                >
                                  {topic.category}
                                </span>
                              </div>

                              <h3
                                className={`text-lg font-semibold ${
                                  isDark ? 'text-white' : 'text-slate-900'
                                } group-hover:text-indigo-600 transition-colors mb-2`}
                              >
                                {topic.title}
                              </h3>

                              <div className="flex flex-wrap gap-2 mb-3">
                                {topic.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className={`text-xs px-2 py-1 rounded-full ${
                                      isDark
                                        ? 'bg-slate-600 text-slate-300'
                                        : 'bg-slate-200 text-slate-600'
                                    }`}
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>

                              <div className="flex items-center gap-4 text-sm">
                                <span
                                  className={`flex items-center gap-1 ${
                                    isDark ? 'text-slate-400' : 'text-slate-600'
                                  }`}
                                >
                                  <Users className="w-4 h-4" />
                                  {topic.author}
                                </span>
                                <span
                                  className={`flex items-center gap-1 ${
                                    isDark ? 'text-slate-400' : 'text-slate-600'
                                  }`}
                                >
                                  <Clock className="w-4 h-4" />
                                  {topic.lastActivity}
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-col items-end gap-2 ml-4">
                              <div className="flex gap-4 text-sm">
                                <span
                                  className={`flex items-center gap-1 ${
                                    isDark ? 'text-slate-400' : 'text-slate-600'
                                  }`}
                                >
                                  <MessageCircle className="w-4 h-4" />
                                  {topic.replies}
                                </span>
                                <span
                                  className={`flex items-center gap-1 ${
                                    isDark ? 'text-slate-400' : 'text-slate-600'
                                  }`}
                                >
                                  <Eye className="w-4 h-4" />
                                  {topic.views}
                                </span>
                                <span
                                  className={`flex items-center gap-1 ${
                                    isDark ? 'text-slate-400' : 'text-slate-600'
                                  }`}
                                >
                                  <ThumbsUp className="w-4 h-4" />
                                  {topic.likes}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {filteredTopics.length === 0 && (
                <div className="text-center py-12">
                  <p
                    className={`text-lg ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    No topics found matching your criteria.
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.6 }}
              >
                {/* Community Stats */}
                <Card
                  className={
                    isDark
                      ? 'bg-slate-700 border-slate-600'
                      : 'bg-white border-slate-200'
                  }
                >
                  <CardContent className="p-6">
                    <h3
                      className={`text-lg font-bold ${
                        isDark ? 'text-white' : 'text-slate-900'
                      } mb-4`}
                    >
                      Community Stats
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span
                          className={
                            isDark ? 'text-slate-400' : 'text-slate-600'
                          }
                        >
                          Total Topics
                        </span>
                        <span
                          className={`font-semibold ${
                            isDark ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          591
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span
                          className={
                            isDark ? 'text-slate-400' : 'text-slate-600'
                          }
                        >
                          Total Posts
                        </span>
                        <span
                          className={`font-semibold ${
                            isDark ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          4,476
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span
                          className={
                            isDark ? 'text-slate-400' : 'text-slate-600'
                          }
                        >
                          Active Members
                        </span>
                        <span
                          className={`font-semibold ${
                            isDark ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          1,234
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span
                          className={
                            isDark ? 'text-slate-400' : 'text-slate-600'
                          }
                        >
                          Online Now
                        </span>
                        <span className={`font-semibold text-green-600`}>
                          87
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Top Contributors */}
                <Card
                  className={
                    isDark
                      ? 'bg-slate-700 border-slate-600'
                      : 'bg-white border-slate-200'
                  }
                >
                  <CardContent className="p-6">
                    <h3
                      className={`text-lg font-bold ${
                        isDark ? 'text-white' : 'text-slate-900'
                      } mb-4`}
                    >
                      Top Contributors
                    </h3>
                    <div className="space-y-4">
                      {topContributors.map((contributor, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center text-white font-semibold">
                            {contributor.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </div>
                          <div className="flex-1">
                            <div
                              className={`font-medium ${
                                isDark ? 'text-white' : 'text-slate-900'
                              }`}
                            >
                              {contributor.name}
                            </div>
                            <div
                              className={`text-xs ${
                                isDark ? 'text-slate-400' : 'text-slate-500'
                              }`}
                            >
                              {contributor.posts} posts •{' '}
                              {contributor.reputation} rep
                            </div>
                            <div className="flex gap-1 mt-1">
                              {contributor.badges.map((badge) => (
                                <span
                                  key={badge}
                                  className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full"
                                >
                                  {badge}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Forum Rules */}
                <Card
                  className={`${
                    isDark
                      ? 'bg-gradient-to-br from-indigo-900 to-purple-900'
                      : 'bg-gradient-to-br from-indigo-50 to-purple-50'
                  } border-0`}
                >
                  <CardContent className="p-6">
                    <h3
                      className={`text-lg font-bold ${
                        isDark ? 'text-white' : 'text-slate-900'
                      } mb-3`}
                    >
                      Community Guidelines
                    </h3>
                    <ul
                      className={`text-sm space-y-2 ${
                        isDark ? 'text-indigo-200' : 'text-slate-600'
                      }`}
                    >
                      <li>• Be respectful and helpful to other members</li>
                      <li>• Search before posting to avoid duplicates</li>
                      <li>• Use clear, descriptive titles for your topics</li>
                      <li>• Stay on topic and provide relevant information</li>
                      <li>• Give credit where credit is due</li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
