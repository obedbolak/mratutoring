// src/app/page.tsx
'use client';

import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button, Card, CardContent } from '@/components/ui';
import Link from 'next/link';
import {
  BookOpen,
  Users,
  Award,
  Play,
  ArrowRight,
  Clock,
  TrendingUp,
  Star,
  Quote,
  ChevronDown,
  GraduationCap,
  UserCheck,
  Calculator,
  Atom,
} from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Home() {
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();
  const isDark = theme === 'dark';

  const features = [
    {
      icon: UserCheck,
      title: 'Qualified Home Teachers',
      description:
        'Connect with verified tutors who specialize in your specific subjects and exam boards.',
    },
    {
      icon: Calculator,
      title: 'Core Subjects Coverage',
      description:
        'Expert tutors in Mathematics, Physics, Chemistry, and other essential subjects.',
    },
    {
      icon: GraduationCap,
      title: 'Exam Preparation',
      description:
        'Specialized coaching for GCE A-Level, O-Level, and other standardized exams.',
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description:
        'Book sessions that fit your timetable with convenient home or online tutoring.',
    },
  ];

  const stats = [
    { label: 'Active Students', value: '15K+' },
    { label: 'Qualified Tutors', value: '500+' },
    { label: 'Subjects Covered', value: '25+' },
    { label: 'Success Rate', value: '98%' },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Aisha Muhammad',
      role: 'A-Level Student',
      company: 'Government College',
      image: '/api/placeholder/64/64',
      rating: 5,
      text: 'My Physics tutor helped me improve from a C to an A in just 6 months. The personalized attention and exam techniques were game-changers for my A-Level results.',
    },
    {
      id: 2,
      name: 'David Okafor',
      role: 'O-Level Student',
      company: 'International School',
      image: '/api/placeholder/64/64',
      rating: 5,
      text: 'I was struggling with Chemistry until I found my tutor through this platform. Now I understand complex reactions and my grades have improved significantly.',
    },
    {
      id: 3,
      name: 'Sarah Adeleke',
      role: 'University Prep Student',
      company: 'Private Academy',
      image: '/api/placeholder/64/64',
      rating: 5,
      text: 'The Mathematics tutor I found here helped me master calculus and statistics. I scored excellent grades in my entrance exams thanks to their guidance.',
    },
    {
      id: 4,
      name: 'Ibrahim Hassan',
      role: 'A-Level Student',
      company: 'Federal College',
      image: '/api/placeholder/64/64',
      rating: 5,
      text: 'My tutor provides excellent past question practice and exam strategies. I feel confident about my upcoming A-Level Physics and Mathematics exams.',
    },
    {
      id: 5,
      name: 'Grace Enwere',
      role: 'O-Level Student',
      company: 'Mission School',
      image: '/api/placeholder/64/64',
      rating: 5,
      text: 'Having a home tutor has been amazing for my studies. The one-on-one attention helped me understand concepts I was struggling with in class.',
    },
  ];

  const faqs = [
    {
      question: 'How do I find a suitable tutor for my subject?',
      answer:
        'Simply browse our tutor profiles, filter by subject, location, and experience level. You can view their qualifications, teaching style, and student reviews before making a choice.',
    },
    {
      question: 'What subjects and exam levels do you cover?',
      answer:
        'We cover Mathematics, Physics, Chemistry, Biology, English, and more. Our tutors specialize in GCE A-Level, O-Level, JAMB, WAEC, NECO, and university entrance preparation.',
    },
    {
      question: 'Can I have lessons at home or online?',
      answer:
        'Yes! Our tutors offer both in-person home tutoring and online sessions. You can choose the format that works best for your schedule and learning style.',
    },
    {
      question: 'How are your tutors verified and qualified?',
      answer:
        'All tutors undergo thorough background checks and qualification verification. We ensure they have relevant degrees, teaching experience, and excellent track records with students.',
    },
    {
      question: "What if I'm not satisfied with my tutor?",
      answer:
        "We offer a satisfaction guarantee. If you're not happy with your first session, we'll help you find a different tutor or provide a full refund.",
    },
    {
      question: 'How much do tutoring sessions cost?',
      answer:
        "Rates vary by subject, level, and tutor experience, typically ranging from ₦2,000-₦8,000 per hour. You can see each tutor's rates upfront before booking.",
    },
  ];

  // Animation variants with proper typing
  const fadeInUp: Variants = {
    initial: {
      opacity: 0,
      y: 60,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const staggerContainer: Variants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const slideInLeft: Variants = {
    initial: {
      opacity: 0,
      x: -60,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const scaleIn: Variants = {
    initial: {
      opacity: 0,
      scale: 0.8,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  // Animation objects for inline use
  const buttonHover = {
    scale: 1.05,
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 10,
    },
  };

  const cardHover = {
    y: -10,
    scale: 1.02,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 20,
    },
  };

  // Intersection Observer hooks
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [testimonialsRef, testimonialsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [faqRef, faqInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [ctaRef, ctaInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20">
          <div className="text-center">
            <motion.h1
              className={`text-4xl sm:text-6xl font-bold ${
                isDark ? 'text-white' : 'text-slate-900'
              } mb-6`}
              initial={{ opacity: 0, y: 50 }}
              animate={
                heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
              }
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              Excel in Your Studies with
              <motion.span
                className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent block"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={
                  heroInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.5 }
                }
                transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              >
                Expert Home Tutors
              </motion.span>
            </motion.h1>

            <motion.p
              className={`text-xl ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              } mb-8 max-w-3xl mx-auto`}
              initial={{ opacity: 0, y: 30 }}
              animate={
                heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            >
              Connect with qualified tutors for Mathematics, Physics, Chemistry,
              and exam preparation. Get personalized attention to boost your
              A-Level, O-Level, and university entrance performance.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={
                heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
            >
              {isAuthenticated ? (
                <Link href="/dashboard">
                  <motion.div
                    whileHover={buttonHover}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" className="text-lg px-8 py-4">
                      Find My Tutor
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </motion.div>
                </Link>
              ) : (
                <>
                  <Link href="/auth?mode=register">
                    <motion.div
                      whileHover={buttonHover}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button size="lg" className="text-lg px-8 py-4">
                        Find a Tutor Today
                        <Play className="ml-2 w-5 h-5" />
                      </Button>
                    </motion.div>
                  </Link>
                  <Link href="/teachers">
                    <motion.div
                      whileHover={buttonHover}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outline"
                        size="lg"
                        className="text-lg px-8 py-4"
                      >
                        Browse Tutors
                      </Button>
                    </motion.div>
                  </Link>
                </>
              )}
            </motion.div>

            {/* Subject Tags */}
            <motion.div
              className="flex flex-wrap justify-center gap-3 mt-8 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={
                heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
            >
              {[
                'Mathematics',
                'Physics',
                'Chemistry',
                'Biology',
                'A-Level',
                'O-Level',
                'JAMB',
                'WAEC',
              ].map((subject, index) => (
                <motion.span
                  key={subject}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    isDark
                      ? 'bg-slate-800 text-slate-300'
                      : 'bg-white text-slate-700'
                  } shadow-md`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={
                    heroInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.8 }
                  }
                  transition={{ duration: 0.4, delay: 0.9 + index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  {subject}
                </motion.span>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
              variants={staggerContainer}
              initial="initial"
              animate={heroInView ? 'animate' : 'initial'}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <motion.div
                    className={`text-3xl font-bold ${
                      isDark ? 'text-white' : 'text-slate-900'
                    } mb-2`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={
                      heroInView
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0 }
                    }
                    transition={{
                      duration: 0.6,
                      delay: 1.2 + index * 0.1,
                      type: 'spring',
                      stiffness: 200,
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <div
                    className={`text-sm ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={
              featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
            }
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h2
              className={`text-3xl sm:text-4xl font-bold ${
                isDark ? 'text-white' : 'text-slate-900'
              } mb-4`}
            >
              Why Choose Our Tutoring Platform?
            </h2>
            <p
              className={`text-lg ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              } max-w-2xl mx-auto`}
            >
              We connect you with the best tutors to help you achieve academic
              excellence in your chosen subjects and examinations.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            animate={featuresInView ? 'animate' : 'initial'}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={cardHover}
                  className="h-full"
                >
                  <Card className="text-center p-8 hover:shadow-xl transition-all duration-300 h-full">
                    <CardContent className="space-y-4 h-full flex flex-col justify-center">
                      <motion.div
                        className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${
                          isDark ? 'bg-indigo-900' : 'bg-indigo-100'
                        } mb-4 mx-auto`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                      >
                        <Icon
                          className={`w-8 h-8 ${
                            isDark ? 'text-indigo-400' : 'text-indigo-600'
                          }`}
                        />
                      </motion.div>
                      <h3
                        className={`text-xl font-semibold ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className={`${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className={`py-20 ${isDark ? 'bg-slate-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h2
              className={`text-3xl sm:text-4xl font-bold ${
                isDark ? 'text-white' : 'text-slate-900'
              } mb-4`}
            >
              Popular Subjects & Exams
            </h2>
            <p
              className={`text-lg ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              } max-w-2xl mx-auto`}
            >
              Find expert tutors for your specific subjects and examination
              needs.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
          >
            {[
              {
                name: 'Mathematics',
                icon: Calculator,
                color: 'from-blue-500 to-indigo-500',
              },
              {
                name: 'Physics',
                icon: Atom,
                color: 'from-green-500 to-emerald-500',
              },
              {
                name: 'Chemistry',
                icon: BookOpen,
                color: 'from-purple-500 to-pink-500',
              },
              {
                name: 'Biology',
                icon: GraduationCap,
                color: 'from-red-500 to-orange-500',
              },
              {
                name: 'A-Level',
                icon: Award,
                color: 'from-yellow-500 to-amber-500',
              },
              {
                name: 'O-Level',
                icon: Users,
                color: 'from-teal-500 to-cyan-500',
              },
            ].map((subject) => {
              const Icon = subject.icon;
              return (
                <motion.div
                  key={subject.name}
                  variants={scaleIn}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center"
                >
                  <div
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${subject.color} mb-4 text-white`}
                  >
                    <Icon className="w-10 h-10" />
                  </div>
                  <h3
                    className={`font-semibold ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {subject.name}
                  </h3>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={
              testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
            }
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h2
              className={`text-3xl sm:text-4xl font-bold ${
                isDark ? 'text-white' : 'text-slate-900'
              } mb-4`}
            >
              Student Success Stories
            </h2>
            <p
              className={`text-lg ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              } max-w-2xl mx-auto`}
            >
              See how our tutors have helped students achieve academic
              excellence and exam success.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              testimonialsInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                bulletClass: `swiper-pagination-bullet ${
                  isDark ? 'bg-slate-600' : 'bg-slate-300'
                }`,
                bulletActiveClass: `swiper-pagination-bullet-active ${
                  isDark ? 'bg-indigo-400' : 'bg-indigo-600'
                }`,
              }}
              navigation={true}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="testimonials-swiper"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Card
                      className={`p-6 h-full ${
                        isDark ? 'bg-slate-700' : 'bg-white'
                      }`}
                    >
                      <CardContent className="space-y-4">
                        <div className="flex items-center space-x-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-5 h-5 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>

                        <div className="relative">
                          <Quote
                            className={`w-8 h-8 ${
                              isDark ? 'text-slate-500' : 'text-gray-300'
                            } absolute -top-2 -left-2`}
                          />
                          <p
                            className={`text-lg italic pl-6 ${
                              isDark ? 'text-slate-300' : 'text-slate-600'
                            }`}
                          >
                            {testimonial.text}
                          </p>
                        </div>

                        <div className="flex items-center space-x-4 pt-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center text-white font-semibold">
                            {testimonial.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </div>
                          <div>
                            <h4
                              className={`font-semibold ${
                                isDark ? 'text-white' : 'text-slate-900'
                              }`}
                            >
                              {testimonial.name}
                            </h4>
                            <p
                              className={`text-sm ${
                                isDark ? 'text-slate-400' : 'text-slate-600'
                              }`}
                            >
                              {testimonial.role} • {testimonial.company}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        ref={faqRef}
        className={`py-20 ${isDark ? 'bg-slate-800' : 'bg-gray-50'}`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h2
              className={`text-3xl sm:text-4xl font-bold ${
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
              Get answers to common questions about finding tutors and improving
              your academic performance.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isDark={isDark}
                index={index}
                isVisible={faqInView}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        ref={ctaRef}
        className={`py-20 ${isDark ? 'bg-slate-900' : 'bg-indigo-50'}`}
        initial={{ opacity: 0 }}
        animate={ctaInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className={`text-3xl sm:text-4xl font-bold ${
              isDark ? 'text-white' : 'text-slate-900'
            } mb-6`}
            variants={slideInLeft}
            initial="initial"
            animate={ctaInView ? 'animate' : 'initial'}
          >
            Ready to Boost Your Academic Performance?
          </motion.h2>
          <motion.p
            className={`text-lg ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            } mb-8`}
            variants={fadeInUp}
            initial="initial"
            animate={ctaInView ? 'animate' : 'initial'}
            transition={{ delay: 0.2 }}
          >
            Connect with qualified tutors today and start your journey to
            academic success. Better grades and exam results are just a click
            away.
          </motion.p>

          {!isAuthenticated && (
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={staggerContainer}
              initial="initial"
              animate={ctaInView ? 'animate' : 'initial'}
            >
              <motion.div variants={scaleIn}>
                <Link href="/auth?mode=register">
                  <motion.div
                    whileHover={buttonHover}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" className="text-lg px-8 py-4">
                      Find Your Tutor Now
                      <TrendingUp className="ml-2 w-5 h-5" />
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
              <motion.div variants={scaleIn}>
                <Link href="/tutors">
                  <motion.div
                    whileHover={buttonHover}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="text-lg px-8 py-4"
                    >
                      Browse Tutors
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.section>
    </div>
  );
}

// FAQ Item Component
function FAQItem({
  question,
  answer,
  isDark,
  index,
  isVisible,
}: {
  question: string;
  answer: string;
  isDark: boolean;
  index: number;
  isVisible: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={
        isVisible
          ? {
              opacity: 1,
              y: 0,
              transition: {
                delay: index * 0.1,
                duration: 0.5,
                ease: 'easeOut',
              },
            }
          : { opacity: 0, y: 20 }
      }
    >
      <Card
        className={`${
          isDark ? 'bg-slate-700 border-slate-600' : 'bg-white border-gray-200'
        }`}
      >
        <CardContent className="p-0">
          <motion.button
            className="w-full px-6 py-4 text-left flex justify-between items-center"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{
              backgroundColor: isDark
                ? 'rgba(51, 65, 85, 0.5)'
                : 'rgba(0, 0, 0, 0.02)',
            }}
          >
            <h3
              className={`text-lg font-semibold ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {question}
            </h3>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown
                className={`w-5 h-5 ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {isOpen && (
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
                  {answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}
