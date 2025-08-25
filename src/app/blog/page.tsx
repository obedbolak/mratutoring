// src/app/blog/page.tsx
'use client';

import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button, Card, CardContent } from '@/components/ui';
import Link from 'next/link';
import {
  ArrowRight,
  Search,
  TrendingUp,
  BookOpen,
  Users,
  Lightbulb,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function BlogPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const blogPosts = [
    {
      id: 1,
      title: 'How to Prepare for the Cameroon GCE A-Level Mathematics Exam',
      excerpt:
        'A comprehensive guide to acing your A-Level Mathematics exam with proven strategies and practice techniques.',
      content:
        'Mathematics can be challenging, but with the right preparation strategy, you can excel in your GCE A-Level exam...',
      author: 'Dr. Paul Ngono',
      authorRole: 'Mathematics Expert',
      publishDate: '2025-01-10',
      readTime: '8 min read',
      category: 'Study Tips',
      tags: ['Mathematics', 'A-Level', 'Exam Prep'],
      image: '/api/placeholder/600/300',
      featured: true,
    },
    {
      id: 2,
      title: 'The Benefits of One-on-One Tutoring vs Group Classes',
      excerpt:
        'Exploring the advantages of personalized learning and how individual attention can accelerate academic progress.',
      content:
        'When it comes to learning, one size definitely does not fit all. Every student has unique learning styles...',
      author: 'Mme. Fatou Mbarga',
      authorRole: 'Education Specialist',
      publishDate: '2025-01-08',
      readTime: '6 min read',
      category: 'Education',
      tags: ['Tutoring', 'Learning', 'Education'],
      image: '/api/placeholder/600/300',
      featured: false,
    },
    {
      id: 3,
      title: 'Effective Study Techniques for Chemistry Students',
      excerpt:
        'Master complex chemical concepts with these proven study methods and memory techniques.',
      content:
        'Chemistry requires understanding abstract concepts and memorizing numerous formulas...',
      author: 'Prof. Emmanuel Njoya',
      authorRole: 'Chemistry Professor',
      publishDate: '2025-01-05',
      readTime: '7 min read',
      category: 'Study Tips',
      tags: ['Chemistry', 'Study Methods', 'Memory'],
      image: '/api/placeholder/600/300',
      featured: false,
    },
    {
      id: 4,
      title: 'Understanding the Cameroon Education System: A Guide for Parents',
      excerpt:
        'Navigate the complexities of the Cameroonian education system and help your child succeed.',
      content:
        'The Cameroon education system combines both French and English curricula...',
      author: 'Dr. Aïcha Moustapha',
      authorRole: 'Education Consultant',
      publishDate: '2025-01-03',
      readTime: '10 min read',
      category: 'Parents',
      tags: ['Education System', 'Parents', 'Guidance'],
      image: '/api/placeholder/600/300',
      featured: false,
    },
    {
      id: 5,
      title: 'How Technology is Transforming Education in Africa',
      excerpt:
        'Exploring the role of digital platforms in making quality education accessible across the continent.',
      content:
        'Technology has become a game-changer in the African education landscape...',
      author: 'Jean-Pierre Foka',
      authorRole: 'EdTech Researcher',
      publishDate: '2025-01-01',
      readTime: '12 min read',
      category: 'Technology',
      tags: ['EdTech', 'Africa', 'Innovation'],
      image: '/api/placeholder/600/300',
      featured: true,
    },
    {
      id: 6,
      title: 'Building Confidence in Physics: Overcoming Common Challenges',
      excerpt:
        'Practical strategies to help students overcome physics anxiety and build problem-solving confidence.',
      content:
        "Physics often intimidates students, but it doesn't have to be that way...",
      author: 'Miss Sarah Tanda',
      authorRole: 'Physics Tutor',
      publishDate: '2024-12-28',
      readTime: '9 min read',
      category: 'Study Tips',
      tags: ['Physics', 'Confidence', 'Problem Solving'],
      image: '/api/placeholder/600/300',
      featured: false,
    },
  ];

  const categories = [
    { name: 'All Posts', value: 'all', count: blogPosts.length },
    { name: 'Study Tips', value: 'Study Tips', count: 3 },
    { name: 'Education', value: 'Education', count: 1 },
    { name: 'Parents', value: 'Parents', count: 1 },
    { name: 'Technology', value: 'Technology', count: 1 },
  ];

  const popularTags = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'A-Level',
    'O-Level',
    'Study Methods',
    'Exam Prep',
    'Tutoring',
    'Education',
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const categoryMatch =
      selectedCategory === 'all' || post.category === selectedCategory;
    const searchMatch =
      searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return categoryMatch && searchMatch;
  });

  const featuredPosts = blogPosts.filter((post) => post.featured);

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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Study Tips':
        return Lightbulb;
      case 'Education':
        return BookOpen;
      case 'Parents':
        return Users;
      case 'Technology':
        return TrendingUp;
      default:
        return BookOpen;
    }
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
              Educational
              <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent block">
                Insights & Tips
              </span>
            </h1>
            <p
              className={`text-xl ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              } max-w-3xl mx-auto mb-8`}
            >
              Discover expert advice, study strategies, and educational insights
              to help you succeed in your academic journey.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative mb-8">
              <Search
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-12 pr-4 py-4 rounded-lg border text-lg ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400'
                    : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
                } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.value
                      ? 'bg-indigo-600 text-white'
                      : isDark
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'bg-white text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
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
                Featured Articles
              </h2>
              <div className="w-20 h-1 bg-indigo-600 rounded"></div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map((post, index) => {
                const CategoryIcon = getCategoryIcon(post.category);
                return (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link href={`/blog/${post.id}`}>
                      <Card
                        className={`overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group ${
                          isDark
                            ? 'bg-slate-800 border-slate-700'
                            : 'bg-white border-slate-200'
                        }`}
                      >
                        <div className="aspect-video bg-gradient-to-r from-indigo-500 to-purple-600 relative overflow-hidden">
                          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                          <div className="absolute bottom-4 left-4">
                            <span className="bg-white bg-opacity-90 text-slate-900 px-3 py-1 rounded-full text-sm font-medium">
                              Featured
                            </span>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <CategoryIcon
                              className={`w-4 h-4 ${
                                isDark ? 'text-indigo-400' : 'text-indigo-600'
                              }`}
                            />
                            <span
                              className={`text-sm ${
                                isDark ? 'text-indigo-400' : 'text-indigo-600'
                              }`}
                            >
                              {post.category}
                            </span>
                          </div>

                          <h3
                            className={`text-xl font-bold ${
                              isDark ? 'text-white' : 'text-slate-900'
                            } mb-3 group-hover:text-indigo-600 transition-colors`}
                          >
                            {post.title}
                          </h3>

                          <p
                            className={`${
                              isDark ? 'text-slate-400' : 'text-slate-600'
                            } mb-4 line-clamp-2`}
                          >
                            {post.excerpt}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center text-white text-sm font-semibold">
                                {post.author
                                  .split(' ')
                                  .map((n) => n[0])
                                  .join('')}
                              </div>
                              <div>
                                <div
                                  className={`text-sm font-medium ${
                                    isDark ? 'text-white' : 'text-slate-900'
                                  }`}
                                >
                                  {post.author}
                                </div>
                                <div
                                  className={`text-xs ${
                                    isDark ? 'text-slate-400' : 'text-slate-500'
                                  }`}
                                >
                                  {new Date(
                                    post.publishDate
                                  ).toLocaleDateString()}{' '}
                                  • {post.readTime}
                                </div>
                              </div>
                            </div>
                            <ArrowRight
                              className={`w-5 h-5 ${
                                isDark ? 'text-slate-400' : 'text-slate-600'
                              } group-hover:text-indigo-600 group-hover:translate-x-1 transition-all`}
                            />
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
      )}

      {/* Blog Grid */}
      <section ref={ref} className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
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
                  {selectedCategory === 'all'
                    ? 'All Articles'
                    : `${selectedCategory} Articles`}
                </h2>
                <div className="w-20 h-1 bg-indigo-600 rounded"></div>
              </motion.div>

              <motion.div
                className="space-y-8"
                variants={containerVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
              >
                {filteredPosts.map((post) => {
                  const CategoryIcon = getCategoryIcon(post.category);
                  return (
                    <motion.div key={post.id} variants={itemVariants}>
                      <Link href={`/blog/${post.id}`}>
                        <Card
                          className={`overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group ${
                            isDark
                              ? 'bg-slate-800 border-slate-700'
                              : 'bg-white border-slate-200'
                          }`}
                        >
                          <div className="md:flex">
                            <div className="md:w-1/3">
                              <div className="aspect-video md:aspect-square bg-gradient-to-r from-slate-400 to-slate-600"></div>
                            </div>
                            <CardContent className="md:w-2/3 p-6">
                              <div className="flex items-center gap-2 mb-3">
                                <CategoryIcon
                                  className={`w-4 h-4 ${
                                    isDark
                                      ? 'text-indigo-400'
                                      : 'text-indigo-600'
                                  }`}
                                />
                                <span
                                  className={`text-sm ${
                                    isDark
                                      ? 'text-indigo-400'
                                      : 'text-indigo-600'
                                  }`}
                                >
                                  {post.category}
                                </span>
                                {post.featured && (
                                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                                    Featured
                                  </span>
                                )}
                              </div>

                              <h3
                                className={`text-xl font-bold ${
                                  isDark ? 'text-white' : 'text-slate-900'
                                } mb-3 group-hover:text-indigo-600 transition-colors`}
                              >
                                {post.title}
                              </h3>

                              <p
                                className={`${
                                  isDark ? 'text-slate-400' : 'text-slate-600'
                                } mb-4`}
                              >
                                {post.excerpt}
                              </p>

                              <div className="flex flex-wrap gap-2 mb-4">
                                {post.tags.slice(0, 3).map((tag) => (
                                  <span
                                    key={tag}
                                    className={`text-xs px-2 py-1 rounded-full ${
                                      isDark
                                        ? 'bg-slate-700 text-slate-300'
                                        : 'bg-slate-100 text-slate-600'
                                    }`}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center text-white text-sm font-semibold">
                                    {post.author
                                      .split(' ')
                                      .map((n) => n[0])
                                      .join('')}
                                  </div>
                                  <div>
                                    <div
                                      className={`text-sm font-medium ${
                                        isDark ? 'text-white' : 'text-slate-900'
                                      }`}
                                    >
                                      {post.author}
                                    </div>
                                    <div
                                      className={`text-xs ${
                                        isDark
                                          ? 'text-slate-400'
                                          : 'text-slate-500'
                                      }`}
                                    >
                                      {new Date(
                                        post.publishDate
                                      ).toLocaleDateString()}{' '}
                                      • {post.readTime}
                                    </div>
                                  </div>
                                </div>
                                <ArrowRight
                                  className={`w-5 h-5 ${
                                    isDark ? 'text-slate-400' : 'text-slate-600'
                                  } group-hover:text-indigo-600 group-hover:translate-x-1 transition-all`}
                                />
                              </div>
                            </CardContent>
                          </div>
                        </Card>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <p
                    className={`text-lg ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    No articles found matching your criteria.
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.6 }}
              >
                {/* Popular Tags */}
                <Card
                  className={
                    isDark
                      ? 'bg-slate-800 border-slate-700'
                      : 'bg-white border-slate-200'
                  }
                >
                  <CardContent className="p-6">
                    <h3
                      className={`text-lg font-bold ${
                        isDark ? 'text-white' : 'text-slate-900'
                      } mb-4`}
                    >
                      Popular Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {popularTags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setSearchQuery(tag)}
                          className={`text-sm px-3 py-1 rounded-full transition-all duration-300 ${
                            isDark
                              ? 'bg-slate-700 text-slate-300 hover:bg-indigo-900 hover:text-indigo-300'
                              : 'bg-slate-100 text-slate-600 hover:bg-indigo-100 hover:text-indigo-700'
                          }`}
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Newsletter Signup */}
                <Card
                  className={`${
                    isDark
                      ? 'bg-gradient-to-br from-indigo-900 to-purple-900'
                      : 'bg-gradient-to-br from-indigo-50 to-purple-50'
                  } border-0`}
                >
                  <CardContent className="p-6 text-center">
                    <h3
                      className={`text-lg font-bold ${
                        isDark ? 'text-white' : 'text-slate-900'
                      } mb-3`}
                    >
                      Stay Updated
                    </h3>
                    <p
                      className={`text-sm ${
                        isDark ? 'text-indigo-200' : 'text-slate-600'
                      } mb-4`}
                    >
                      Get the latest educational insights and study tips
                      delivered to your inbox.
                    </p>
                    <div className="space-y-3">
                      <input
                        type="email"
                        placeholder="Your email"
                        className={`w-full px-4 py-2 rounded-lg border text-sm ${
                          isDark
                            ? 'bg-slate-800 border-slate-600 text-white placeholder-slate-400'
                            : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
                        } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                      />
                      <Button className="w-full">Subscribe</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Posts */}
                <Card
                  className={
                    isDark
                      ? 'bg-slate-800 border-slate-700'
                      : 'bg-white border-slate-200'
                  }
                >
                  <CardContent className="p-6">
                    <h3
                      className={`text-lg font-bold ${
                        isDark ? 'text-white' : 'text-slate-900'
                      } mb-4`}
                    >
                      Recent Posts
                    </h3>
                    <div className="space-y-4">
                      {blogPosts.slice(0, 3).map((post) => (
                        <Link key={post.id} href={`/blog/${post.id}`}>
                          <div className="group cursor-pointer">
                            <h4
                              className={`text-sm font-medium ${
                                isDark ? 'text-white' : 'text-slate-900'
                              } group-hover:text-indigo-600 transition-colors mb-1`}
                            >
                              {post.title}
                            </h4>
                            <p
                              className={`text-xs ${
                                isDark ? 'text-slate-400' : 'text-slate-500'
                              }`}
                            >
                              {new Date(post.publishDate).toLocaleDateString()}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
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
