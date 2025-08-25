// src/app/about/page.tsx
'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button, Card, CardContent } from '@/components/ui';
import {
  Target,
  Eye,
  Heart,
  Users,
  BookOpen,
  Award,
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function AboutPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const teamMembers = [
    {
      name: 'Adebayo Adeyemi',
      role: 'Founder & CEO',
      description:
        'Former Mathematics teacher with 15+ years in education technology.',
      image: '/api/placeholder/200/200',
      linkedin: '#',
      twitter: '#',
    },
    {
      name: 'Dr. Kemi Oladele',
      role: 'Head of Academics',
      description:
        'PhD in Educational Psychology, expert in curriculum development.',
      image: '/api/placeholder/200/200',
      linkedin: '#',
      twitter: '#',
    },
    {
      name: 'Ibrahim Hassan',
      role: 'Technology Director',
      description: 'Software engineer passionate about educational innovation.',
      image: '/api/placeholder/200/200',
      linkedin: '#',
      twitter: '#',
    },
    {
      name: 'Grace Enwere',
      role: 'Teacher Relations Manager',
      description: 'Dedicated to supporting our community of expert tutors.',
      image: '/api/placeholder/200/200',
      linkedin: '#',
      twitter: '#',
    },
  ];

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description:
        'We strive for the highest standards in education and student outcomes.',
      color: 'from-blue-500 to-indigo-500',
    },
    {
      icon: Heart,
      title: 'Accessibility',
      description:
        'Quality education should be accessible to every student, everywhere.',
      color: 'from-red-500 to-pink-500',
    },
    {
      icon: Users,
      title: 'Community',
      description:
        'Building strong relationships between students, teachers, and families.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description:
        'Continuously improving how students learn and teachers teach.',
      color: 'from-purple-500 to-violet-500',
    },
  ];

  const stats = [
    { label: 'Students Helped', value: '15,000+', icon: Users },
    { label: 'Expert Teachers', value: '500+', icon: BookOpen },
    { label: 'Success Rate', value: '98%', icon: Award },
    { label: 'Cities Covered', value: '25+', icon: MapPin },
  ];

  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [missionRef, missionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [teamRef, teamInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [valuesRef, valuesInView] = useInView({
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
      <section ref={heroRef} className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              className={`text-4xl sm:text-6xl font-bold ${
                isDark ? 'text-white' : 'text-slate-900'
              } mb-6`}
            >
              About
              <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent block">
                MisterA&apos;s Platform
              </span>
            </h1>
            <p
              className={`text-xl ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              } max-w-3xl mx-auto mb-12`}
            >
              We&apos;re on a mission to make quality education accessible to
              every student in Nigeria by connecting them with the best home
              teachers and learning resources.
            </p>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate={heroInView ? 'visible' : 'hidden'}
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="text-center"
                  >
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${
                        isDark ? 'bg-slate-800' : 'bg-white'
                      } shadow-lg mb-4 mx-auto`}
                    >
                      <Icon
                        className={`w-8 h-8 ${
                          isDark ? 'text-indigo-400' : 'text-indigo-600'
                        }`}
                      />
                    </div>
                    <div
                      className={`text-3xl font-bold ${
                        isDark ? 'text-white' : 'text-slate-900'
                      } mb-2`}
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
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section
        ref={missionRef}
        className={`py-20 ${isDark ? 'bg-slate-800' : 'bg-white'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, x: -50 }}
            animate={
              missionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
            }
            transition={{ duration: 0.6 }}
          >
            <div>
              <h2
                className={`text-3xl font-bold ${
                  isDark ? 'text-white' : 'text-slate-900'
                } mb-6`}
              >
                Our Mission
              </h2>
              <p
                className={`text-lg ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                } mb-6`}
              >
                To revolutionize education in Nigeria by providing personalized,
                high-quality tutoring that helps every student reach their full
                potential. We believe that with the right guidance and support,
                any student can excel academically.
              </p>
              <div className="flex items-center gap-3">
                <Target className="w-6 h-6 text-indigo-600" />
                <span
                  className={`font-semibold ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Empowering Students, Supporting Teachers
                </span>
              </div>
            </div>

            <div>
              <h2
                className={`text-3xl font-bold ${
                  isDark ? 'text-white' : 'text-slate-900'
                } mb-6`}
              >
                Our Vision
              </h2>
              <p
                className={`text-lg ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                } mb-6`}
              >
                To become the leading educational platform in Africa, where
                every student has access to excellent teaching and every
                qualified teacher can build a meaningful career making a
                difference in students&apos; lives.
              </p>
              <div className="flex items-center gap-3">
                <Eye className="w-6 h-6 text-indigo-600" />
                <span
                  className={`font-semibold ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Transforming Education Across Africa
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className={`text-3xl font-bold ${
                isDark ? 'text-white' : 'text-slate-900'
              } mb-4`}
            >
              How Our Platform Works
            </h2>
            <p
              className={`text-lg ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              } max-w-2xl mx-auto`}
            >
              We&apos;ve made it simple to find the perfect tutor and start your
              learning journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Browse & Choose',
                description:
                  'Explore our verified teachers, filter by subject, location, and experience level.',
                icon: Users,
              },
              {
                step: '2',
                title: 'Connect & Schedule',
                description:
                  'Message your chosen tutor and schedule sessions that fit your timetable.',
                icon: BookOpen,
              },
              {
                step: '3',
                title: 'Learn & Excel',
                description:
                  'Attend personalized sessions and watch your grades improve significantly.',
                icon: Award,
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="relative mb-6">
                    <div
                      className={`w-20 h-20 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4`}
                    >
                      {item.step}
                    </div>
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${
                        isDark ? 'bg-slate-800' : 'bg-white'
                      } shadow-lg absolute -bottom-2 left-1/2 transform -translate-x-1/2`}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          isDark ? 'text-indigo-400' : 'text-indigo-600'
                        }`}
                      />
                    </div>
                  </div>
                  <h3
                    className={`text-xl font-semibold ${
                      isDark ? 'text-white' : 'text-slate-900'
                    } mb-3`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        ref={valuesRef}
        className={`py-20 ${isDark ? 'bg-slate-800' : 'bg-gray-50'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={
              valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
            }
            transition={{ duration: 0.6 }}
          >
            <h2
              className={`text-3xl font-bold ${
                isDark ? 'text-white' : 'text-slate-900'
              } mb-4`}
            >
              Our Core Values
            </h2>
            <p
              className={`text-lg ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              } max-w-2xl mx-auto`}
            >
              The principles that guide everything we do and shape our
              commitment to education.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={valuesInView ? 'visible' : 'hidden'}
          >
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Card
                    className={`text-center p-6 h-full ${
                      isDark
                        ? 'bg-slate-700 border-slate-600'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <CardContent className="space-y-4">
                      <div
                        className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${value.color} mb-4`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3
                        className={`text-xl font-semibold ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {value.title}
                      </h3>
                      <p
                        className={`${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section ref={teamRef} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className={`text-3xl font-bold ${
                isDark ? 'text-white' : 'text-slate-900'
              } mb-4`}
            >
              Meet Our Team
            </h2>
            <p
              className={`text-lg ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              } max-w-2xl mx-auto`}
            >
              Passionate educators and technologists working together to
              transform education.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={teamInView ? 'visible' : 'hidden'}
          >
            {teamMembers.map((member, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card
                  className={`text-center overflow-hidden ${
                    isDark
                      ? 'bg-slate-800 border-slate-700'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                      {member.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <h3
                      className={`text-lg font-semibold ${
                        isDark ? 'text-white' : 'text-slate-900'
                      } mb-1`}
                    >
                      {member.name}
                    </h3>
                    <p className="text-indigo-600 font-medium mb-3">
                      {member.role}
                    </p>
                    <p
                      className={`text-sm ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      } mb-4`}
                    >
                      {member.description}
                    </p>
                    <div className="flex justify-center gap-3">
                      <Button variant="ghost" size="sm" className="p-2">
                        <Linkedin className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-2">
                        <Twitter className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact */}
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
              Get in Touch
            </h2>
            <p
              className={`text-lg ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              } mb-8`}
            >
              Have questions or want to learn more about our platform? We&apos;d
              love to hear from you.
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-8">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-indigo-600" />
                <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                  hello@mistera.ng
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-indigo-600" />
                <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                  +234 803 123 4567
                </span>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button size="lg" className="text-lg px-8 py-4">
                Contact Us
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Join Our Team
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
