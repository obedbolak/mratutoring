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
  TrendingUp,
  Award,
  Target,
  Bell,
  Search,
} from 'lucide-react';

export default function StudentDashboard() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const stats = {
    activeCourses: 3,
    completedLessons: 37,
    studyTimeToday: '4.5h',
    averageScore: 85,
    streak: 7,
    certificates: 2,
  };

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
      attendees: 24,
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
      attendees: 18,
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
      attendees: 15,
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
      grade: 'A',
      lastActivity: '2 hours ago',
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
      grade: 'B+',
      lastActivity: '1 day ago',
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
      grade: 'B',
      lastActivity: '3 hours ago',
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'assignment',
      title: 'Completed Calculus Assignment',
      course: 'Mathematics',
      time: '2 hours ago',
      score: 95,
    },
    {
      id: 2,
      type: 'lesson',
      title: 'Watched Quantum Mechanics Lecture',
      course: 'Physics',
      time: '1 day ago',
    },
    {
      id: 3,
      type: 'achievement',
      title: 'Earned "Week Streak" Badge',
      time: '2 days ago',
    },
  ];

  const notifications = [
    {
      id: 1,
      type: 'reminder',
      message: 'Mathematics class starts in 30 minutes',
      time: 'Just now',
      read: false,
    },
    {
      id: 2,
      type: 'grade',
      message: 'New grade posted for Physics Lab Report',
      time: '1 hour ago',
      read: false,
    },
    {
      id: 3,
      type: 'announcement',
      message: 'Chemistry lab schedule updated',
      time: '3 hours ago',
      read: true,
    },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Calendar },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'resources', label: 'Resources', icon: FileText },
    { id: 'activity', label: 'Activity', icon: TrendingUp },
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Notifications */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1
              className={`text-3xl font-bold ${
                isDark ? 'text-white' : 'text-slate-900'
              } mb-2`}
            >
              Welcome back, {user?.name || 'Student'}! 👋
            </h1>
            <p
              className={`text-lg ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              {stats.streak} day learning streak! Keep it up!
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              className={`p-2 rounded-lg relative ${
                isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
              }`}
            >
              <Bell
                className={`w-6 h-6 ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
              />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button
              className={`p-2 rounded-lg ${
                isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
              }`}
            >
              <Search
                className={`w-6 h-6 ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
              />
            </button>
          </div>
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
                    className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
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

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        Active Courses
                      </p>
                      <p
                        className={`text-3xl font-bold mt-2 ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {stats.activeCourses}
                      </p>
                    </div>
                    <div
                      className={`p-3 rounded-lg ${
                        isDark ? 'bg-blue-900/30' : 'bg-blue-100'
                      }`}
                    >
                      <BookOpen
                        className={`w-6 h-6 ${
                          isDark ? 'text-blue-400' : 'text-blue-600'
                        }`}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        Study Streak
                      </p>
                      <p
                        className={`text-3xl font-bold mt-2 ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {stats.streak} days
                      </p>
                    </div>
                    <div
                      className={`p-3 rounded-lg ${
                        isDark ? 'bg-orange-900/30' : 'bg-orange-100'
                      }`}
                    >
                      <Target
                        className={`w-6 h-6 ${
                          isDark ? 'text-orange-400' : 'text-orange-600'
                        }`}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        Average Score
                      </p>
                      <p
                        className={`text-3xl font-bold mt-2 ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {stats.averageScore}%
                      </p>
                    </div>
                    <div
                      className={`p-3 rounded-lg ${
                        isDark ? 'bg-green-900/30' : 'bg-green-100'
                      }`}
                    >
                      <TrendingUp
                        className={`w-6 h-6 ${
                          isDark ? 'text-green-400' : 'text-green-600'
                        }`}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        Certificates
                      </p>
                      <p
                        className={`text-3xl font-bold mt-2 ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {stats.certificates}
                      </p>
                    </div>
                    <div
                      className={`p-3 rounded-lg ${
                        isDark ? 'bg-purple-900/30' : 'bg-purple-100'
                      }`}
                    >
                      <Award
                        className={`w-6 h-6 ${
                          isDark ? 'text-purple-400' : 'text-purple-600'
                        }`}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Upcoming Classes - Takes 2 columns */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <h3
                        className={`text-xl font-semibold ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        Upcoming Classes
                      </h3>
                      <Button variant="ghost" size="sm">
                        View All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingClasses.map((class_) => (
                        <div
                          key={class_.id}
                          className={`p-4 rounded-lg border ${
                            isDark
                              ? 'border-slate-700 bg-slate-800/50'
                              : 'border-slate-200 bg-white'
                          } hover:shadow-md transition-shadow`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div
                                className={`p-2 rounded-lg ${
                                  class_.type === 'live'
                                    ? isDark
                                      ? 'bg-red-900/30'
                                      : 'bg-red-100'
                                    : isDark
                                    ? 'bg-blue-900/30'
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
                                  {class_.topic}
                                </p>
                              </div>
                            </div>
                            <Button size="sm">
                              Join
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-4">
                              <span
                                className={
                                  isDark ? 'text-slate-300' : 'text-slate-700'
                                }
                              >
                                <Clock className="w-4 h-4 inline mr-1" />
                                {class_.date}, {class_.time}
                              </span>
                              <span
                                className={
                                  isDark ? 'text-slate-400' : 'text-slate-600'
                                }
                              >
                                {class_.duration}
                              </span>
                            </div>
                            <span
                              className={
                                isDark ? 'text-slate-400' : 'text-slate-600'
                              }
                            >
                              <Users className="w-4 h-4 inline mr-1" />
                              {class_.attendees} students
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Notifications - Takes 1 column */}
              <div>
                <Card>
                  <CardHeader>
                    <h3
                      className={`text-xl font-semibold ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      Notifications
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-3 rounded-lg ${
                            notif.read
                              ? isDark
                                ? 'bg-slate-800/30'
                                : 'bg-slate-50'
                              : isDark
                              ? 'bg-indigo-900/20 border border-indigo-700/50'
                              : 'bg-indigo-50 border border-indigo-200'
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            <div
                              className={`mt-0.5 w-2 h-2 rounded-full ${
                                notif.read ? 'bg-slate-400' : 'bg-indigo-500'
                              }`}
                            />
                            <div className="flex-1">
                              <p
                                className={`text-sm ${
                                  isDark ? 'text-slate-200' : 'text-slate-900'
                                }`}
                              >
                                {notif.message}
                              </p>
                              <p
                                className={`text-xs mt-1 ${
                                  isDark ? 'text-slate-500' : 'text-slate-500'
                                }`}
                              >
                                {notif.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="ghost" className="w-full mt-4">
                      View All Notifications
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* COURSES TAB */}
        {activeTab === 'courses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <Card
                key={course.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-40 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative">
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        course.grade.startsWith('A')
                          ? 'bg-green-500 text-white'
                          : course.grade.startsWith('B')
                          ? 'bg-blue-500 text-white'
                          : 'bg-yellow-500 text-white'
                      }`}
                    >
                      Grade: {course.grade}
                    </span>
                  </div>
                </div>
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

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
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
                      className={`w-full rounded-full h-2.5 ${
                        isDark ? 'bg-slate-700' : 'bg-slate-200'
                      }`}
                    >
                      <div
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2.5 rounded-full transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <p
                      className={`text-xs mt-1 ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      {course.progress}% complete
                    </p>
                  </div>

                  <div
                    className={`text-sm ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    } mb-4 flex items-center gap-2`}
                  >
                    <Clock className="w-4 h-4" />
                    Next: {course.nextClass}
                  </div>

                  <Button className="w-full">
                    Continue Learning
                    <Play className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* RESOURCES TAB */}
        {activeTab === 'resources' && (
          <Card>
            <CardHeader>
              <h3
                className={`text-xl font-semibold ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                GCE Past Questions & Study Materials
              </h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  'Mathematics',
                  'Physics',
                  'Chemistry',
                  'Biology',
                  'English',
                  'French',
                ].map((subject) => (
                  <div
                    key={subject}
                    className={`p-4 rounded-lg border ${
                      isDark
                        ? 'border-slate-700 bg-slate-800/50'
                        : 'border-slate-200 bg-white'
                    } hover:shadow-md transition-shadow`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4
                        className={`font-semibold ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {subject} 2023
                      </h4>
                      <span
                        className={`px-2 py-1 text-xs rounded ${
                          isDark
                            ? 'bg-slate-700 text-slate-300'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        PDF
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm mb-3">
                      <span
                        className={isDark ? 'text-slate-400' : 'text-slate-600'}
                      >
                        <Download className="w-4 h-4 inline mr-1" />
                        1.2k
                      </span>
                      <span
                        className={isDark ? 'text-slate-400' : 'text-slate-600'}
                      >
                        <Star className="w-4 h-4 inline mr-1 text-yellow-500" />
                        4.8
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
        )}

        {/* ACTIVITY TAB */}
        {activeTab === 'activity' && (
          <Card>
            <CardHeader>
              <h3
                className={`text-xl font-semibold ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                Recent Activity
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className={`p-4 rounded-lg border ${
                      isDark
                        ? 'border-slate-700 bg-slate-800/50'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-2 rounded-lg ${
                          activity.type === 'assignment'
                            ? isDark
                              ? 'bg-green-900/30'
                              : 'bg-green-100'
                            : activity.type === 'lesson'
                            ? isDark
                              ? 'bg-blue-900/30'
                              : 'bg-blue-100'
                            : isDark
                            ? 'bg-yellow-900/30'
                            : 'bg-yellow-100'
                        }`}
                      >
                        {activity.type === 'assignment' && (
                          <CheckCircle
                            className={`w-5 h-5 ${
                              isDark ? 'text-green-400' : 'text-green-600'
                            }`}
                          />
                        )}
                        {activity.type === 'lesson' && (
                          <Play
                            className={`w-5 h-5 ${
                              isDark ? 'text-blue-400' : 'text-blue-600'
                            }`}
                          />
                        )}
                        {activity.type === 'achievement' && (
                          <Award
                            className={`w-5 h-5 ${
                              isDark ? 'text-yellow-400' : 'text-yellow-600'
                            }`}
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4
                          className={`font-semibold ${
                            isDark ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          {activity.title}
                        </h4>
                        {activity.course && (
                          <p
                            className={`text-sm ${
                              isDark ? 'text-slate-400' : 'text-slate-600'
                            }`}
                          >
                            {activity.course}
                          </p>
                        )}
                        <p
                          className={`text-xs mt-1 ${
                            isDark ? 'text-slate-500' : 'text-slate-500'
                          }`}
                        >
                          {activity.time}
                        </p>
                      </div>
                      {activity.score && (
                        <span
                          className={`text-2xl font-bold ${
                            isDark ? 'text-green-400' : 'text-green-600'
                          }`}
                        >
                          {activity.score}%
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
