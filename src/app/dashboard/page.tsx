// src/app/dashboard/page.tsx
'use client';

import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button, Card, CardContent, CardHeader } from '@/components/ui';
import {
  Calendar,
  Clock,
  BookOpen,
  Download,
  Play,
  CheckCircle,
  FileText,
  Video,
  Users,
  Star,
  ChevronRight,
} from 'lucide-react';

export default function StudentDashboard() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - replace with actual API calls
  const upcomingClasses = [
    {
      id: 1,
      subject: 'Mathematics',
      topic: 'Calculus - Derivatives',
      time: '10:00 AM',
      date: 'Today',
      instructor: 'Dr. Sarah Johnson',
      duration: '1h 30m',
      type: 'live',
      link: '/class/math-101',
    },
    {
      id: 2,
      subject: 'Physics',
      topic: 'Quantum Mechanics',
      time: '2:00 PM',
      date: 'Today',
      instructor: 'Prof. Michael Chen',
      duration: '2h',
      type: 'live',
      link: '/class/physics-201',
    },
    {
      id: 3,
      subject: 'Chemistry',
      topic: 'Organic Chemistry Lab',
      time: '9:00 AM',
      date: 'Tomorrow',
      instructor: 'Dr. Emily Wilson',
      duration: '3h',
      type: 'practical',
      link: '/class/chem-lab',
    },
  ];

  const enrolledCourses = [
    {
      id: 1,
      title: 'Advanced Mathematics',
      code: 'MATH 201',
      instructor: 'Dr. Sarah Johnson',
      progress: 75,
      nextClass: 'Today, 10:00 AM',
      totalLessons: 24,
      completedLessons: 18,
      image: '/course-math.jpg',
    },
    {
      id: 2,
      title: 'General Physics',
      code: 'PHYS 101',
      instructor: 'Prof. Michael Chen',
      progress: 60,
      nextClass: 'Today, 2:00 PM',
      totalLessons: 20,
      completedLessons: 12,
      image: '/course-physics.jpg',
    },
    {
      id: 3,
      title: 'Organic Chemistry',
      code: 'CHEM 202',
      instructor: 'Dr. Emily Wilson',
      progress: 45,
      nextClass: 'Tomorrow, 9:00 AM',
      totalLessons: 16,
      completedLessons: 7,
      image: '/course-chemistry.jpg',
    },
  ];

  const gceResources = [
    {
      id: 1,
      subject: 'Mathematics',
      year: '2023',
      type: 'Past Questions',
      downloads: 1250,
      rating: 4.8,
      fileSize: '2.5 MB',
      format: 'PDF',
    },
    {
      id: 2,
      subject: 'Mathematics',
      year: '2023',
      type: 'Solutions',
      downloads: 980,
      rating: 4.9,
      fileSize: '3.1 MB',
      format: 'PDF',
    },
    {
      id: 3,
      subject: 'Physics',
      year: '2023',
      type: 'Past Questions',
      downloads: 890,
      rating: 4.7,
      fileSize: '1.8 MB',
      format: 'PDF',
    },
    {
      id: 4,
      subject: 'Chemistry',
      year: '2023',
      type: 'Past Questions',
      downloads: 765,
      rating: 4.6,
      fileSize: '2.2 MB',
      format: 'PDF',
    },
  ];

  const weeklySchedule = [
    {
      day: 'Monday',
      classes: [
        { time: '9:00 AM', subject: 'Mathematics', room: 'Room 101' },
        { time: '2:00 PM', subject: 'Physics', room: 'Lab 201' },
      ],
    },
    {
      day: 'Tuesday',
      classes: [
        { time: '10:00 AM', subject: 'Chemistry', room: 'Lab 301' },
        { time: '3:00 PM', subject: 'Mathematics', room: 'Room 101' },
      ],
    },
    {
      day: 'Wednesday',
      classes: [
        { time: '9:00 AM', subject: 'Physics', room: 'Room 202' },
        { time: '1:00 PM', subject: 'Chemistry', room: 'Lab 301' },
      ],
    },
    {
      day: 'Thursday',
      classes: [
        { time: '10:00 AM', subject: 'Mathematics', room: 'Room 101' },
        { time: '2:00 PM', subject: 'Physics', room: 'Lab 201' },
      ],
    },
    {
      day: 'Friday',
      classes: [
        { time: '9:00 AM', subject: 'Chemistry', room: 'Lab 301' },
        { time: '11:00 AM', subject: 'Review Session', room: 'Hall A' },
      ],
    },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Calendar },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'schedule', label: 'Schedule', icon: Clock },
    { id: 'resources', label: 'GCE Resources', icon: FileText },
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1
            className={`text-3xl font-bold ${
              isDark ? 'text-white' : 'text-slate-900'
            } mb-2`}
          >
            Welcome back, {user?.name || 'Student'}!
          </h1>
          <p
            className={`text-lg ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Continue your learning journey
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-slate-200 dark:border-slate-700">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? `border-indigo-500 ${
                            isDark ? 'text-indigo-400' : 'text-indigo-600'
                          }`
                        : `border-transparent ${
                            isDark
                              ? 'text-slate-400 hover:text-slate-300'
                              : 'text-slate-500 hover:text-slate-700'
                          }`
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div
                      className={`p-2 rounded-lg ${
                        isDark ? 'bg-blue-900' : 'bg-blue-100'
                      }`}
                    >
                      <BookOpen
                        className={`w-6 h-6 ${
                          isDark ? 'text-blue-400' : 'text-blue-600'
                        }`}
                      />
                    </div>
                    <div className="ml-4">
                      <p
                        className={`text-2xl font-bold ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        3
                      </p>
                      <p
                        className={`text-sm ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        Active Courses
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div
                      className={`p-2 rounded-lg ${
                        isDark ? 'bg-green-900' : 'bg-green-100'
                      }`}
                    >
                      <CheckCircle
                        className={`w-6 h-6 ${
                          isDark ? 'text-green-400' : 'text-green-600'
                        }`}
                      />
                    </div>
                    <div className="ml-4">
                      <p
                        className={`text-2xl font-bold ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        37
                      </p>
                      <p
                        className={`text-sm ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        Completed Lessons
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div
                      className={`p-2 rounded-lg ${
                        isDark ? 'bg-yellow-900' : 'bg-yellow-100'
                      }`}
                    >
                      <Clock
                        className={`w-6 h-6 ${
                          isDark ? 'text-yellow-400' : 'text-yellow-600'
                        }`}
                      />
                    </div>
                    <div className="ml-4">
                      <p
                        className={`text-2xl font-bold ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        4.5h
                      </p>
                      <p
                        className={`text-sm ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        Study Time Today
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div
                      className={`p-2 rounded-lg ${
                        isDark ? 'bg-purple-900' : 'bg-purple-100'
                      }`}
                    >
                      <Star
                        className={`w-6 h-6 ${
                          isDark ? 'text-purple-400' : 'text-purple-600'
                        }`}
                      />
                    </div>
                    <div className="ml-4">
                      <p
                        className={`text-2xl font-bold ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        85%
                      </p>
                      <p
                        className={`text-sm ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        Average Score
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Classes */}
            <Card>
              <CardHeader>
                <h3
                  className={`text-xl font-semibold ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Upcoming Classes
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingClasses.map((class_) => (
                    <div
                      key={class_.id}
                      className={`p-4 rounded-lg border ${
                        isDark
                          ? 'border-slate-700 bg-slate-800'
                          : 'border-slate-200 bg-white'
                      } flex items-center justify-between`}
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-2 rounded-lg ${
                            class_.type === 'live'
                              ? isDark
                                ? 'bg-red-900'
                                : 'bg-red-100'
                              : isDark
                              ? 'bg-blue-900'
                              : 'bg-blue-100'
                          }`}
                        >
                          {class_.type === 'live' ? (
                            <Video
                              className={`w-5 h-5 ${
                                isDark ? 'text-red-400' : 'text-red-600'
                              }`}
                            />
                          ) : (
                            <Users
                              className={`w-5 h-5 ${
                                isDark ? 'text-blue-400' : 'text-blue-600'
                              }`}
                            />
                          )}
                        </div>
                        <div>
                          <h4
                            className={`font-semibold ${
                              isDark ? 'text-white' : 'text-slate-900'
                            }`}
                          >
                            {class_.subject}
                          </h4>
                          <p
                            className={`text-sm ${
                              isDark ? 'text-slate-400' : 'text-slate-600'
                            }`}
                          >
                            {class_.topic} • {class_.instructor}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-medium ${
                            isDark ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          {class_.date}, {class_.time}
                        </p>
                        <p
                          className={`text-sm ${
                            isDark ? 'text-slate-400' : 'text-slate-600'
                          }`}
                        >
                          {class_.duration}
                        </p>
                      </div>
                      <Button size="sm">
                        Join Class
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                <CardContent className="p-6">
                  <h3
                    className={`text-xl font-semibold mb-2 ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {course.title}
                  </h3>
                  <p
                    className={`text-sm ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    } mb-4`}
                  >
                    {course.code} • {course.instructor}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span
                        className={isDark ? 'text-slate-300' : 'text-slate-700'}
                      >
                        Progress
                      </span>
                      <span
                        className={isDark ? 'text-slate-300' : 'text-slate-700'}
                      >
                        {course.completedLessons}/{course.totalLessons} lessons
                      </span>
                    </div>
                    <div
                      className={`w-full rounded-full h-2 ${
                        isDark ? 'bg-slate-700' : 'bg-slate-200'
                      }`}
                    >
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <p
                    className={`text-sm ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    } mb-4`}
                  >
                    Next class: {course.nextClass}
                  </p>

                  <Button className="w-full">
                    Continue Learning
                    <Play className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="space-y-6">
            {weeklySchedule.map((day) => (
              <Card key={day.day}>
                <CardContent className="p-6">
                  <h3
                    className={`text-lg font-semibold mb-4 ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {day.day}
                  </h3>
                  <div className="space-y-3">
                    {day.classes.map((class_, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          isDark ? 'bg-slate-800' : 'bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`text-sm font-medium ${
                              isDark ? 'text-slate-300' : 'text-slate-600'
                            }`}
                          >
                            {class_.time}
                          </div>
                          <div>
                            <p
                              className={`font-medium ${
                                isDark ? 'text-white' : 'text-slate-900'
                              }`}
                            >
                              {class_.subject}
                            </p>
                            <p
                              className={`text-sm ${
                                isDark ? 'text-slate-400' : 'text-slate-600'
                              }`}
                            >
                              {class_.room}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Join
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h3
                  className={`text-xl font-semibold ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  GCE Past Questions & Solutions
                </h3>
                <p
                  className={`text-sm ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  Download past examination papers and detailed solutions
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {gceResources.map((resource) => (
                    <div
                      key={resource.id}
                      className={`p-4 rounded-lg border ${
                        isDark
                          ? 'border-slate-700 bg-slate-800'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4
                            className={`font-semibold ${
                              isDark ? 'text-white' : 'text-slate-900'
                            }`}
                          >
                            {resource.subject} {resource.year}
                          </h4>
                          <p
                            className={`text-sm ${
                              isDark ? 'text-slate-400' : 'text-slate-600'
                            }`}
                          >
                            {resource.type}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 text-xs rounded ${
                            isDark
                              ? 'bg-slate-700 text-slate-300'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {resource.format}
                        </span>
                      </div>

                      <div className="flex items-center space-x-4 text-sm mb-3">
                        <span
                          className={
                            isDark ? 'text-slate-400' : 'text-slate-600'
                          }
                        >
                          {resource.downloads} downloads
                        </span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          <span
                            className={
                              isDark ? 'text-slate-400' : 'text-slate-600'
                            }
                          >
                            {resource.rating}
                          </span>
                        </div>
                        <span
                          className={
                            isDark ? 'text-slate-400' : 'text-slate-600'
                          }
                        >
                          {resource.fileSize}
                        </span>
                      </div>

                      <Button size="sm" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
