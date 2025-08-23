// src/app/careers/page.tsx
'use client';

import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button, Card, CardContent } from '@/components/ui';
import Link from 'next/link';
import {
  MapPin,
  Clock,
  Users,
  DollarSign,
  Briefcase,
  GraduationCap,
  Heart,
  TrendingUp,
  Coffee,
  Wifi,
  Car,
  Shield,
  ArrowRight,
  Star,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function CareersPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const benefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance for you and your family',
    },
    {
      icon: GraduationCap,
      title: 'Learning & Development',
      description: 'Professional development budget and learning opportunities',
    },
    {
      icon: Coffee,
      title: 'Work-Life Balance',
      description: 'Flexible working hours and remote work options',
    },
    {
      icon: Car,
      title: 'Transportation',
      description: 'Transport allowance or company vehicle for senior roles',
    },
    {
      icon: Wifi,
      title: 'Tech Setup',
      description: 'Latest equipment and home office setup support',
    },
    {
      icon: Shield,
      title: 'Job Security',
      description: 'Stable employment with growth opportunities',
    },
  ];

  const jobOpenings = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'Yaoundé, Cameroon',
      type: 'Full-time',
      experience: '3-5 years',
      salary: '800,000 - 1,200,000 FCFA',
      description:
        'Join our engineering team to build scalable educational technology solutions.',
      requirements: [
        'React/Next.js expertise',
        'Node.js backend experience',
        'Database design',
        'API development',
      ],
      posted: '2 days ago',
    },
    {
      id: 2,
      title: 'Academic Content Manager',
      department: 'Education',
      location: 'Douala, Cameroon',
      type: 'Full-time',
      experience: '2-4 years',
      salary: '600,000 - 900,000 FCFA',
      description:
        'Oversee curriculum development and educational content quality across subjects.',
      requirements: [
        'Education background',
        'Curriculum development',
        'Content management',
        'Subject expertise',
      ],
      posted: '1 week ago',
    },
    {
      id: 3,
      title: 'Tutor Relations Specialist',
      department: 'Operations',
      location: 'Bamenda, Cameroon',
      type: 'Full-time',
      experience: '1-3 years',
      salary: '450,000 - 700,000 FCFA',
      description:
        'Build and maintain relationships with our network of tutors across Cameroon.',
      requirements: [
        'Communication skills',
        'Relationship building',
        'Data analysis',
        'Problem solving',
      ],
      posted: '3 days ago',
    },
    {
      id: 4,
      title: 'Digital Marketing Manager',
      department: 'Marketing',
      location: 'Yaoundé, Cameroon',
      type: 'Full-time',
      experience: '2-4 years',
      salary: '550,000 - 850,000 FCFA',
      description:
        'Lead our digital marketing efforts to reach students and parents across Cameroon.',
      requirements: [
        'Digital marketing',
        'Social media management',
        'Analytics',
        'Campaign management',
      ],
      posted: '5 days ago',
    },
    {
      id: 5,
      title: 'Customer Success Representative',
      department: 'Support',
      location: 'Remote',
      type: 'Full-time',
      experience: '1-2 years',
      salary: '400,000 - 600,000 FCFA',
      description:
        'Help students and parents get the most out of our platform with exceptional support.',
      requirements: [
        'Customer service',
        'Problem solving',
        'Multilingual (English/French)',
        'Patience',
      ],
      posted: '1 day ago',
    },
    {
      id: 6,
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'Yaoundé, Cameroon',
      type: 'Contract',
      experience: '2-3 years',
      salary: '500,000 - 800,000 FCFA',
      description:
        'Design intuitive and engaging user experiences for our educational platform.',
      requirements: [
        'UI/UX design',
        'Figma/Sketch',
        'User research',
        'Prototyping',
      ],
      posted: '1 week ago',
    },
  ];

  const departments = [
    'All Departments',
    'Engineering',
    'Education',
    'Operations',
    'Marketing',
    'Support',
    'Design',
  ];

  const filteredJobs = jobOpenings.filter(
    (job) =>
      selectedDepartment === 'all' ||
      selectedDepartment === 'All Departments' ||
      job.department === selectedDepartment
  );

  const values = [
    {
      title: 'Student-Centric',
      description:
        'Everything we do is focused on improving student learning outcomes and educational access.',
      icon: GraduationCap,
    },
    {
      title: 'Innovation',
      description:
        'We continuously innovate to solve educational challenges using technology and creativity.',
      icon: TrendingUp,
    },
    {
      title: 'Integrity',
      description:
        'We operate with honesty, transparency, and ethical practices in all our interactions.',
      icon: Shield,
    },
    {
      title: 'Collaboration',
      description:
        'We believe in the power of teamwork and building strong relationships with all stakeholders.',
      icon: Users,
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
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              className={`text-4xl sm:text-5xl font-bold ${
                isDark ? 'text-white' : 'text-slate-900'
              } mb-6`}
            >
              Join Our Mission to
              <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent block">
                Transform Education
              </span>
            </h1>
            <p
              className={`text-xl ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              } max-w-3xl mx-auto mb-8`}
            >
              Be part of a team that's revolutionizing education in Cameroon.
              We're looking for passionate individuals who share our vision of
              making quality education accessible to all.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-4">
                View Open Positions
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Learn About Our Culture
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              { label: 'Team Members', value: '25+' },
              { label: 'Office Locations', value: '3' },
              { label: 'Years Growing', value: '2' },
              { label: 'Employee Rating', value: '4.8★' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
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
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className={`py-20 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
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
              Our Values
            </h2>
            <p
              className={`text-lg ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              } max-w-2xl mx-auto`}
            >
              The principles that guide our work and shape our company culture.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card
                    className={`text-center p-6 h-full ${
                      isDark
                        ? 'bg-slate-700 border-slate-600'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <CardContent className="space-y-4">
                      <div
                        className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${
                          isDark ? 'bg-indigo-900' : 'bg-indigo-100'
                        }`}
                      >
                        <Icon
                          className={`w-6 h-6 ${
                            isDark ? 'text-indigo-400' : 'text-indigo-600'
                          }`}
                        />
                      </div>
                      <h3
                        className={`text-lg font-semibold ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {value.title}
                      </h3>
                      <p
                        className={`text-sm ${
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
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
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
              Benefits & Perks
            </h2>
            <p
              className={`text-lg ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              } max-w-2xl mx-auto`}
            >
              We believe in taking care of our team members with comprehensive
              benefits and support.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card
                    className={`p-6 h-full hover:shadow-lg transition-all duration-300 ${
                      isDark
                        ? 'bg-slate-800 border-slate-700'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <CardContent className="space-y-4">
                      <Icon
                        className={`w-8 h-8 ${
                          isDark ? 'text-indigo-400' : 'text-indigo-600'
                        }`}
                      />
                      <h3
                        className={`text-lg font-semibold ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {benefit.title}
                      </h3>
                      <p
                        className={`${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section
        ref={ref}
        className={`py-20 ${isDark ? 'bg-slate-800' : 'bg-gray-50'}`}
      >
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
              Open Positions
            </h2>
            <p
              className={`text-lg ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              } max-w-2xl mx-auto mb-8`}
            >
              Find your next opportunity to make a difference in education.
            </p>

            {/* Department Filter */}
            <div className="max-w-md mx-auto">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDark
                    ? 'bg-slate-700 border-slate-600 text-white'
                    : 'bg-white border-slate-300 text-slate-900'
                } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {filteredJobs.map((job) => (
              <motion.div key={job.id} variants={itemVariants}>
                <Card
                  className={`h-full hover:shadow-lg transition-all duration-300 ${
                    isDark
                      ? 'bg-slate-700 border-slate-600'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3
                          className={`text-xl font-semibold ${
                            isDark ? 'text-white' : 'text-slate-900'
                          } mb-2`}
                        >
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 text-sm">
                          <span
                            className={`px-2 py-1 rounded-full ${
                              isDark
                                ? 'bg-indigo-900 text-indigo-300'
                                : 'bg-indigo-100 text-indigo-700'
                            }`}
                          >
                            {job.department}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full ${
                              isDark
                                ? 'bg-slate-600 text-slate-300'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {job.type}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`text-xs ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        {job.posted}
                      </span>
                    </div>

                    <p
                      className={`${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      } mb-4`}
                    >
                      {job.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4" />
                        <span
                          className={
                            isDark ? 'text-slate-300' : 'text-slate-700'
                          }
                        >
                          {job.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4" />
                        <span
                          className={
                            isDark ? 'text-slate-300' : 'text-slate-700'
                          }
                        >
                          {job.experience} experience
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="w-4 h-4" />
                        <span
                          className={
                            isDark ? 'text-slate-300' : 'text-slate-700'
                          }
                        >
                          {job.salary} per month
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex flex-wrap gap-1">
                        {job.requirements.slice(0, 2).map((req, index) => (
                          <span
                            key={index}
                            className={`text-xs px-2 py-1 rounded-full ${
                              isDark
                                ? 'bg-slate-600 text-slate-300'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {req}
                          </span>
                        ))}
                        {job.requirements.length > 2 && (
                          <span
                            className={`text-xs ${
                              isDark ? 'text-slate-400' : 'text-slate-500'
                            }`}
                          >
                            +{job.requirements.length - 2} more
                          </span>
                        )}
                      </div>
                      <Button size="sm" className="flex items-center gap-1">
                        Apply Now
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <p
                className={`text-lg ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                No positions found for the selected department.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
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
              Don't See the Right Role?
            </h2>
            <p
              className={`text-lg ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              } mb-8`}
            >
              We're always looking for talented individuals who share our
              passion for education. Send us your resume and tell us how you'd
              like to contribute.
            </p>
            <Button size="lg" className="text-lg px-8 py-4">
              Send Us Your Resume
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
