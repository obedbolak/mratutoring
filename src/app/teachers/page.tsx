// src/app/teachers/page.tsx
'use client';

import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button, Card, CardContent } from '@/components/ui';
import Link from 'next/link';
import {
  MapPin,
  Star,
  Clock,
  Award,
  Users,
  MessageCircle,
  Calendar,
  CheckCircle,
  Filter,
  Search,
  GraduationCap,
  Calculator,
  Atom,
  BookOpen,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function TeachersPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const teachers = [
    {
      id: 1,
      name: 'Dr. Paul Ngono',
      subjects: ['Mathematics', 'Physics'],
      location: 'Bonanjo, Douala',
      experience: '8 years',
      rating: 4.9,
      reviews: 127,
      students: 156,
      hourlyRate: '3,500 FCFA',
      availability: 'Available',
      verified: true,
      image: '/api/placeholder/150/150',
      specialties: ['A-Level', 'Baccalauréat', 'GCE'],
      description:
        'PhD in Mathematics with extensive experience in exam preparation and advanced calculus.',
      responseTime: '< 2 hours',
      successRate: '98%',
    },
    {
      id: 2,
      name: 'Mme. Fatou Mbarga',
      subjects: ['Chemistry', 'Biology'],
      location: 'Bastos, Yaoundé',
      experience: '6 years',
      rating: 4.8,
      reviews: 89,
      students: 134,
      hourlyRate: '3,000 FCFA',
      availability: 'Available',
      verified: true,
      image: '/api/placeholder/150/150',
      specialties: ['O-Level', 'A-Level', 'Probatoire'],
      description:
        'Masters in Chemistry, specialized in organic chemistry and laboratory techniques.',
      responseTime: '< 1 hour',
      successRate: '96%',
    },
    {
      id: 3,
      name: 'M. Jean-Pierre Foka',
      subjects: ['Physics', 'Mathematics'],
      location: 'Mendong, Yaoundé',
      experience: '10 years',
      rating: 4.9,
      reviews: 203,
      students: 298,
      hourlyRate: '4,000 FCFA',
      availability: 'Busy',
      verified: true,
      image: '/api/placeholder/150/150',
      specialties: ['A-Level', 'University Prep'],
      description:
        'Former university lecturer with expertise in advanced physics and engineering mathematics.',
      responseTime: '< 3 hours',
      successRate: '99%',
    },
    {
      id: 4,
      name: 'Miss Sarah Tanda',
      subjects: ['Mathematics', 'English'],
      location: 'Commercial Ave, Bamenda',
      experience: '4 years',
      rating: 4.7,
      reviews: 67,
      students: 89,
      hourlyRate: '2,500 FCFA',
      availability: 'Available',
      verified: true,
      image: '/api/placeholder/150/150',
      specialties: ['O-Level', 'GCE', 'BEPC'],
      description:
        'Bachelor of Education graduate with a passion for making mathematics accessible to all students.',
      responseTime: '< 2 hours',
      successRate: '94%',
    },
    {
      id: 5,
      name: 'Prof. Emmanuel Njoya',
      subjects: ['Chemistry', 'Physics'],
      location: 'Bonapriso, Douala',
      experience: '15 years',
      rating: 5.0,
      reviews: 156,
      students: 234,
      hourlyRate: '5,000 FCFA',
      availability: 'Available',
      verified: true,
      image: '/api/placeholder/150/150',
      specialties: ['A-Level', 'University Prep', 'Research'],
      description:
        'University Professor with published research in physical chemistry and materials science.',
      responseTime: '< 4 hours',
      successRate: '100%',
    },
    {
      id: 6,
      name: 'Dr. Aïcha Moustapha',
      subjects: ['Biology', 'Chemistry'],
      location: 'Maroua Centre, Maroua',
      experience: '7 years',
      rating: 4.8,
      reviews: 112,
      students: 167,
      hourlyRate: '3,200 FCFA',
      availability: 'Available',
      verified: true,
      image: '/api/placeholder/150/150',
      specialties: ['O-Level', 'A-Level', 'Baccalauréat'],
      description:
        'Medical Doctor turned educator with deep knowledge of life sciences and anatomy.',
      responseTime: '< 1 hour',
      successRate: '97%',
    },
  ];

  const subjects = [
    'All Subjects',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'English',
  ];
  const locations = [
    'All Locations',
    'Douala',
    'Yaoundé',
    'Bamenda',
    'Bafoussam',
    'Maroua',
    'Garoua',
  ];
  const levels = [
    'All Levels',
    'O-Level',
    'A-Level',
    'Baccalauréat',
    'University Prep',
  ];

  const filteredTeachers = teachers.filter((teacher) => {
    const subjectMatch =
      selectedSubject === 'all' || teacher.subjects.includes(selectedSubject);
    const locationMatch =
      selectedLocation === 'all' || teacher.location.includes(selectedLocation);
    const levelMatch =
      selectedLevel === 'all' || teacher.specialties.includes(selectedLevel);
    return subjectMatch && locationMatch && levelMatch;
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

  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case 'Mathematics':
        return Calculator;
      case 'Physics':
        return Atom;
      case 'Chemistry':
        return BookOpen;
      case 'Biology':
        return GraduationCap;
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
              Find Your Perfect
              <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent block">
                Home Teacher
              </span>
            </h1>
            <p
              className={`text-xl ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              } max-w-3xl mx-auto`}
            >
              Connect with verified, experienced tutors across Cameroon. Get
              personalized attention and achieve your academic goals with our
              qualified home teachers.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
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

            <div>
              <label
                className={`block text-sm font-medium ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                } mb-2`}
              >
                Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-white'
                    : 'bg-white border-slate-300 text-slate-900'
                } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
              >
                {locations.map((location) => (
                  <option
                    key={location}
                    value={location === 'All Locations' ? 'all' : location}
                  >
                    {location}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className={`block text-sm font-medium ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                } mb-2`}
              >
                Level
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
          </motion.div>
        </div>
      </section>

      {/* Teachers Grid */}
      <section ref={ref} className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {filteredTeachers.map((teacher) => (
              <motion.div key={teacher.id} variants={itemVariants}>
                <Card
                  className={`hover:shadow-xl transition-all duration-300 ${
                    isDark
                      ? 'bg-slate-800 border-slate-700'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center text-white font-bold text-2xl">
                          {teacher.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </div>
                        {teacher.verified && (
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3
                              className={`text-xl font-semibold ${
                                isDark ? 'text-white' : 'text-slate-900'
                              }`}
                            >
                              {teacher.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <MapPin className="w-4 h-4 text-gray-500" />
                              <span
                                className={`text-sm ${
                                  isDark ? 'text-slate-400' : 'text-slate-600'
                                }`}
                              >
                                {teacher.location}
                              </span>
                            </div>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              teacher.availability === 'Available'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {teacher.availability}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span
                              className={
                                isDark ? 'text-slate-300' : 'text-slate-600'
                              }
                            >
                              {teacher.rating} ({teacher.reviews})
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span
                              className={
                                isDark ? 'text-slate-400' : 'text-slate-600'
                              }
                            >
                              {teacher.experience}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p
                      className={`text-sm mb-4 ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      {teacher.description}
                    </p>

                    {/* Subjects */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {teacher.subjects.map((subject, index) => {
                          const SubjectIcon = getSubjectIcon(subject);
                          return (
                            <div
                              key={index}
                              className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs ${
                                isDark
                                  ? 'bg-slate-700 text-slate-300'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              <SubjectIcon className="w-3 h-3" />
                              {subject}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {teacher.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 rounded-full text-xs bg-indigo-100 text-indigo-800"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                      <div>
                        <div
                          className={`text-lg font-semibold ${
                            isDark ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          {teacher.students}
                        </div>
                        <div
                          className={`text-xs ${
                            isDark ? 'text-slate-400' : 'text-slate-600'
                          }`}
                        >
                          Students
                        </div>
                      </div>
                      <div>
                        <div
                          className={`text-lg font-semibold ${
                            isDark ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          {teacher.successRate}
                        </div>
                        <div
                          className={`text-xs ${
                            isDark ? 'text-slate-400' : 'text-slate-600'
                          }`}
                        >
                          Success Rate
                        </div>
                      </div>
                      <div>
                        <div
                          className={`text-lg font-semibold ${
                            isDark ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          {teacher.responseTime}
                        </div>
                        <div
                          className={`text-xs ${
                            isDark ? 'text-slate-400' : 'text-slate-600'
                          }`}
                        >
                          Response Time
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span
                          className={`text-2xl font-bold ${
                            isDark ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          {teacher.hourlyRate}
                        </span>
                        <span
                          className={`text-sm ${
                            isDark ? 'text-slate-400' : 'text-slate-600'
                          }`}
                        >
                          /hour
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Message
                        </Button>
                        <Button size="sm" className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Book Session
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filteredTeachers.length === 0 && (
            <div className="text-center py-12">
              <p
                className={`text-lg ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                No teachers found for the selected filters.
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
              Want to Become a Teacher?
            </h2>
            <p
              className={`text-lg ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              } mb-8`}
            >
              Join our platform and start earning by sharing your knowledge.
              Help students achieve their academic goals while building a
              flexible teaching career.
            </p>
            <Button size="lg" className="text-lg px-8 py-4">
              Apply to Teach
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
