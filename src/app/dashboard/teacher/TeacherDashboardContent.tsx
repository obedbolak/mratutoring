import React, { useState } from 'react';
import {
  Users,
  BookOpen,
  Calendar,
  Clock,
  TrendingUp,
  Video,
  FileText,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Plus,
  Edit,
  Eye,
  Download,
  Upload,
  Star,
  BarChart3,
  Target,
  Award,
  Bell,
  Search,
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export default function TeacherDashboard() {
  const { toggleTheme, theme } = useTheme();
  const [user] = useState({ name: 'Prof. Anderson' });
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState('overview');

  const stats = {
    totalStudents: 124,
    activeCourses: 5,
    upcomingClasses: 8,
    averageRating: 4.8,
    totalLessons: 156,
    completionRate: 87,
  };

  const upcomingClasses = [
    {
      id: 1,
      title: 'Calculus - Derivatives',
      course: 'Advanced Mathematics',
      time: '10:00 AM',
      date: 'Today',
      duration: '1h 30m',
      students: 24,
      room: 'Room 101',
      type: 'live',
    },
    {
      id: 2,
      title: 'Quantum Mechanics Introduction',
      course: 'General Physics',
      time: '2:00 PM',
      date: 'Today',
      duration: '2h',
      students: 18,
      room: 'Lab 201',
      type: 'live',
    },
    {
      id: 3,
      title: 'Organic Chemistry Lab Session',
      course: 'Organic Chemistry',
      time: '9:00 AM',
      date: 'Tomorrow',
      duration: '3h',
      students: 15,
      room: 'Lab 301',
      type: 'practical',
    },
  ];

  const myCourses = [
    {
      id: 1,
      title: 'Advanced Mathematics',
      code: 'MATH 201',
      students: 45,
      lessons: 24,
      completedLessons: 18,
      progress: 75,
      nextClass: 'Today, 10:00 AM',
      avgGrade: 'A-',
      attendance: 92,
    },
    {
      id: 2,
      title: 'General Physics',
      code: 'PHYS 101',
      students: 38,
      lessons: 20,
      completedLessons: 12,
      progress: 60,
      nextClass: 'Today, 2:00 PM',
      avgGrade: 'B+',
      attendance: 88,
    },
    {
      id: 3,
      title: 'Organic Chemistry',
      code: 'CHEM 202',
      students: 32,
      lessons: 16,
      completedLessons: 7,
      progress: 45,
      nextClass: 'Tomorrow, 9:00 AM',
      avgGrade: 'B',
      attendance: 85,
    },
    {
      id: 4,
      title: 'Introduction to Calculus',
      code: 'MATH 101',
      students: 52,
      lessons: 18,
      completedLessons: 14,
      progress: 78,
      nextClass: 'Friday, 11:00 AM',
      avgGrade: 'B+',
      attendance: 90,
    },
  ];

  const recentSubmissions = [
    {
      id: 1,
      student: 'John Smith',
      assignment: 'Calculus Problem Set 5',
      course: 'Advanced Mathematics',
      submitted: '2 hours ago',
      status: 'pending',
    },
    {
      id: 2,
      student: 'Sarah Johnson',
      assignment: 'Physics Lab Report',
      course: 'General Physics',
      submitted: '5 hours ago',
      status: 'pending',
    },
    {
      id: 3,
      student: 'Mike Chen',
      assignment: 'Chemistry Experiment Analysis',
      course: 'Organic Chemistry',
      submitted: '1 day ago',
      status: 'graded',
      grade: 95,
    },
    {
      id: 4,
      student: 'Emily Davis',
      assignment: 'Quantum Theory Essay',
      course: 'General Physics',
      submitted: '2 days ago',
      status: 'graded',
      grade: 88,
    },
  ];

  const studentPerformance = [
    {
      student: 'John Smith',
      course: 'MATH 201',
      grade: 92,
      attendance: 95,
      progress: 88,
    },
    {
      student: 'Sarah Johnson',
      course: 'PHYS 101',
      grade: 88,
      attendance: 90,
      progress: 85,
    },
    {
      student: 'Mike Chen',
      course: 'CHEM 202',
      grade: 85,
      attendance: 88,
      progress: 82,
    },
    {
      student: 'Emily Davis',
      course: 'MATH 201',
      grade: 78,
      attendance: 75,
      progress: 70,
    },
    {
      student: 'David Wilson',
      course: 'PHYS 101',
      grade: 91,
      attendance: 92,
      progress: 90,
    },
  ];

  const notifications = [
    {
      id: 1,
      type: 'submission',
      message: '3 new assignment submissions',
      time: 'Just now',
      read: false,
    },
    {
      id: 2,
      type: 'question',
      message: '5 student questions pending',
      time: '30 minutes ago',
      read: false,
    },
    {
      id: 3,
      type: 'reminder',
      message: 'Class starts in 1 hour',
      time: '1 hour ago',
      read: true,
    },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Calendar },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'submissions', label: 'Submissions', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  type ButtonVariant = 'primary' | 'outline' | 'ghost';
  type ButtonSize = 'sm' | 'md' | 'lg';

  interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
  }

  const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
  }: ButtonProps) => {
    const baseStyles =
      'rounded-lg font-medium transition-colors inline-flex items-center justify-center';
    const variants: Record<ButtonVariant, string> = {
      primary: `${
        isDark
          ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
      }`,
      outline: `${
        isDark
          ? 'border border-slate-600 hover:bg-slate-800 text-slate-300'
          : 'border border-slate-300 hover:bg-slate-50 text-slate-700'
      }`,
      ghost: `${
        isDark
          ? 'hover:bg-slate-800 text-slate-300'
          : 'hover:bg-slate-100 text-slate-700'
      }`,
    };
    const sizes: Record<ButtonSize, string> = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2',
      lg: 'px-6 py-3 text-lg',
    };
    return (
      <button
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1
              className={`text-3xl font-bold ${
                isDark ? 'text-white' : 'text-slate-900'
              } mb-2`}
            >
              Welcome, {user?.name || 'Teacher'}! 📚
            </h1>
            <p
              className={`text-lg ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              You have {stats.upcomingClasses} classes scheduled today
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Lesson
            </Button>
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
          <div
            className={`border-b ${
              isDark ? 'border-slate-700' : 'border-slate-200'
            }`}
          >
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
              <div
                className={`${
                  isDark
                    ? 'bg-slate-800 border border-slate-700'
                    : 'bg-white border border-slate-200'
                } rounded-lg shadow-sm`}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        Total Students
                      </p>
                      <p
                        className={`text-3xl font-bold mt-2 ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {stats.totalStudents}
                      </p>
                    </div>
                    <div
                      className={`p-3 rounded-lg ${
                        isDark ? 'bg-blue-900/30' : 'bg-blue-100'
                      }`}
                    >
                      <Users
                        className={`w-6 h-6 ${
                          isDark ? 'text-blue-400' : 'text-blue-600'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`${
                  isDark
                    ? 'bg-slate-800 border border-slate-700'
                    : 'bg-white border border-slate-200'
                } rounded-lg shadow-sm`}
              >
                <div className="p-6">
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
                        isDark ? 'bg-green-900/30' : 'bg-green-100'
                      }`}
                    >
                      <BookOpen
                        className={`w-6 h-6 ${
                          isDark ? 'text-green-400' : 'text-green-600'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`${
                  isDark
                    ? 'bg-slate-800 border border-slate-700'
                    : 'bg-white border border-slate-200'
                } rounded-lg shadow-sm`}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        Average Rating
                      </p>
                      <p
                        className={`text-3xl font-bold mt-2 ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {stats.averageRating}
                      </p>
                    </div>
                    <div
                      className={`p-3 rounded-lg ${
                        isDark ? 'bg-yellow-900/30' : 'bg-yellow-100'
                      }`}
                    >
                      <Star
                        className={`w-6 h-6 ${
                          isDark ? 'text-yellow-400' : 'text-yellow-600'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`${
                  isDark
                    ? 'bg-slate-800 border border-slate-700'
                    : 'bg-white border border-slate-200'
                } rounded-lg shadow-sm`}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        Completion Rate
                      </p>
                      <p
                        className={`text-3xl font-bold mt-2 ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {stats.completionRate}%
                      </p>
                    </div>
                    <div
                      className={`p-3 rounded-lg ${
                        isDark ? 'bg-purple-900/30' : 'bg-purple-100'
                      }`}
                    >
                      <Target
                        className={`w-6 h-6 ${
                          isDark ? 'text-purple-400' : 'text-purple-600'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Upcoming Classes */}
              <div className="lg:col-span-2">
                <div
                  className={`${
                    isDark
                      ? 'bg-slate-800 border border-slate-700'
                      : 'bg-white border border-slate-200'
                  } rounded-lg shadow-sm`}
                >
                  <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                      <h3
                        className={`text-xl font-semibold ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        Today's Schedule
                      </h3>
                      <Button variant="ghost" size="sm">
                        View Calendar
                      </Button>
                    </div>
                  </div>
                  <div className="p-6">
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
                                  {class_.title}
                                </h4>
                                <p
                                  className={`text-sm ${
                                    isDark ? 'text-slate-400' : 'text-slate-600'
                                  }`}
                                >
                                  {class_.course}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                              </Button>
                              <Button size="sm">Start Class</Button>
                            </div>
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
                              <span
                                className={
                                  isDark ? 'text-slate-400' : 'text-slate-600'
                                }
                              >
                                {class_.room}
                              </span>
                            </div>
                            <span
                              className={
                                isDark ? 'text-slate-400' : 'text-slate-600'
                              }
                            >
                              <Users className="w-4 h-4 inline mr-1" />
                              {class_.students} enrolled
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Submissions & Notifications */}
              <div className="space-y-6">
                <div
                  className={`${
                    isDark
                      ? 'bg-slate-800 border border-slate-700'
                      : 'bg-white border border-slate-200'
                  } rounded-lg shadow-sm`}
                >
                  <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                    <h3
                      className={`text-xl font-semibold ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      Pending Reviews
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      {recentSubmissions
                        .filter((s) => s.status === 'pending')
                        .map((submission) => (
                          <div
                            key={submission.id}
                            className={`p-3 rounded-lg ${
                              isDark
                                ? 'bg-slate-800/50 border border-slate-700'
                                : 'bg-slate-50 border border-slate-200'
                            }`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <p
                                  className={`font-medium text-sm ${
                                    isDark ? 'text-white' : 'text-slate-900'
                                  }`}
                                >
                                  {submission.student}
                                </p>
                                <p
                                  className={`text-xs ${
                                    isDark ? 'text-slate-400' : 'text-slate-600'
                                  }`}
                                >
                                  {submission.assignment}
                                </p>
                              </div>
                              <span
                                className={`px-2 py-1 rounded text-xs ${
                                  isDark
                                    ? 'bg-yellow-900/30 text-yellow-400'
                                    : 'bg-yellow-100 text-yellow-700'
                                }`}
                              >
                                Pending
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span
                                className={`text-xs ${
                                  isDark ? 'text-slate-500' : 'text-slate-500'
                                }`}
                              >
                                {submission.submitted}
                              </span>
                              <Button size="sm" variant="ghost">
                                <Eye className="w-3 h-3 mr-1" />
                                Review
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                    <Button variant="ghost" className="w-full mt-4">
                      View All Submissions
                    </Button>
                  </div>
                </div>

                <div
                  className={`${
                    isDark
                      ? 'bg-slate-800 border border-slate-700'
                      : 'bg-white border border-slate-200'
                  } rounded-lg shadow-sm`}
                >
                  <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                    <h3
                      className={`text-xl font-semibold ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      Notifications
                    </h3>
                  </div>
                  <div className="p-6">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* COURSES TAB */}
        {activeTab === 'courses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myCourses.map((course) => (
              <div
                key={course.id}
                className={`overflow-hidden hover:shadow-lg transition-shadow ${
                  isDark
                    ? 'bg-slate-800 border border-slate-700'
                    : 'bg-white border border-slate-200'
                } rounded-lg shadow-sm`}
              >
                <div className="h-32 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative">
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white/20 backdrop-blur-sm border-white/40 text-white hover:bg-white/30"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white/20 backdrop-blur-sm border-white/40 text-white hover:bg-white/30"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3
                        className={`text-xl font-semibold ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {course.title}
                      </h3>
                      <p
                        className={`text-sm ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        {course.code}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        course.avgGrade.startsWith('A')
                          ? 'bg-green-500 text-white'
                          : course.avgGrade.startsWith('B')
                          ? 'bg-blue-500 text-white'
                          : 'bg-yellow-500 text-white'
                      }`}
                    >
                      Avg: {course.avgGrade}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p
                        className={`text-2xl font-bold ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {course.students}
                      </p>
                      <p
                        className={`text-xs ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        Students
                      </p>
                    </div>
                    <div>
                      <p
                        className={`text-2xl font-bold ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {course.lessons}
                      </p>
                      <p
                        className={`text-xs ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        Lessons
                      </p>
                    </div>
                    <div>
                      <p
                        className={`text-2xl font-bold ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {course.attendance}%
                      </p>
                      <p
                        className={`text-xs ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        Attendance
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span
                        className={isDark ? 'text-slate-300' : 'text-slate-700'}
                      >
                        Course Progress
                      </span>
                      <span
                        className={isDark ? 'text-slate-300' : 'text-slate-700'}
                      >
                        {course.completedLessons}/{course.lessons} lessons
                      </span>
                    </div>
                    <div
                      className={`w-full rounded-full h-2.5 ${
                        isDark ? 'bg-slate-700' : 'bg-slate-200'
                      }`}
                    >
                      <div
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2.5 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  <div
                    className={`text-sm ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    } mb-4 flex items-center gap-2`}
                  >
                    <Clock className="w-4 h-4" />
                    Next: {course.nextClass}
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1" size="sm">
                      <Video className="w-4 h-4 mr-2" />
                      Start Class
                    </Button>
                    <Button variant="outline" className="flex-1" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Add Material
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* STUDENTS TAB */}
        {activeTab === 'students' && (
          <div
            className={`${
              isDark
                ? 'bg-slate-800 border border-slate-700'
                : 'bg-white border border-slate-200'
            } rounded-lg shadow-sm`}
          >
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <h3
                  className={`text-xl font-semibold ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Student Performance
                </h3>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr
                      className={`border-b ${
                        isDark ? 'border-slate-700' : 'border-slate-200'
                      }`}
                    >
                      <th
                        className={`text-left p-3 ${
                          isDark ? 'text-slate-300' : 'text-slate-700'
                        }`}
                      >
                        Student
                      </th>
                      <th
                        className={`text-left p-3 ${
                          isDark ? 'text-slate-300' : 'text-slate-700'
                        }`}
                      >
                        Course
                      </th>
                      <th
                        className={`text-left p-3 ${
                          isDark ? 'text-slate-300' : 'text-slate-700'
                        }`}
                      >
                        Grade
                      </th>
                      <th
                        className={`text-left p-3 ${
                          isDark ? 'text-slate-300' : 'text-slate-700'
                        }`}
                      >
                        Attendance
                      </th>
                      <th
                        className={`text-left p-3 ${
                          isDark ? 'text-slate-300' : 'text-slate-700'
                        }`}
                      >
                        Progress
                      </th>
                      <th
                        className={`text-left p-3 ${
                          isDark ? 'text-slate-300' : 'text-slate-700'
                        }`}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentPerformance.map((student, index) => (
                      <tr
                        key={index}
                        className={`border-b ${
                          isDark ? 'border-slate-700' : 'border-slate-200'
                        }`}
                      >
                        <td className="p-3">
                          <p
                            className={`font-medium ${
                              isDark ? 'text-white' : 'text-slate-900'
                            }`}
                          >
                            {student.student}
                          </p>
                        </td>
                        <td
                          className={`p-3 ${
                            isDark ? 'text-slate-400' : 'text-slate-600'
                          }`}
                        >
                          {student.course}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              student.grade >= 90
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                : student.grade >= 80
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                            }`}
                          >
                            {student.grade}%
                          </span>
                        </td>
                        <td
                          className={`p-3 ${
                            isDark ? 'text-slate-400' : 'text-slate-600'
                          }`}
                        >
                          {student.attendance}%
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-20 h-2 rounded-full ${
                                isDark ? 'bg-slate-700' : 'bg-slate-200'
                              }`}
                            >
                              <div
                                className="h-2 rounded-full bg-indigo-600"
                                style={{ width: `${student.progress}%` }}
                              />
                            </div>
                            <span
                              className={`text-xs ${
                                isDark ? 'text-slate-400' : 'text-slate-600'
                              }`}
                            >
                              {student.progress}%
                            </span>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <MessageSquare className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SUBMISSIONS TAB */}
        {activeTab === 'submissions' && (
          <div
            className={`${
              isDark
                ? 'bg-slate-800 border border-slate-700'
                : 'bg-white border border-slate-200'
            } rounded-lg shadow-sm`}
          >
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <h3
                className={`text-xl font-semibold ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                Recent Submissions
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentSubmissions.map((submission) => (
                  <div
                    key={submission.id}
                    className={`p-4 rounded-lg border ${
                      isDark
                        ? 'border-slate-700 bg-slate-800/50'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4
                            className={`font-semibold ${
                              isDark ? 'text-white' : 'text-slate-900'
                            }`}
                          >
                            {submission.student}
                          </h4>
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              submission.status === 'pending'
                                ? isDark
                                  ? 'bg-yellow-900/30 text-yellow-400'
                                  : 'bg-yellow-100 text-yellow-700'
                                : isDark
                                ? 'bg-green-900/30 text-green-400'
                                : 'bg-green-100 text-green-700'
                            }`}
                          >
                            {submission.status === 'pending'
                              ? 'Pending Review'
                              : `Graded: ${submission.grade}%`}
                          </span>
                        </div>
                        <p
                          className={`text-sm ${
                            isDark ? 'text-slate-400' : 'text-slate-600'
                          }`}
                        >
                          {submission.assignment} • {submission.course}
                        </p>
                        <p
                          className={`text-xs mt-1 ${
                            isDark ? 'text-slate-500' : 'text-slate-500'
                          }`}
                        >
                          Submitted {submission.submitted}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {submission.status === 'pending' && (
                          <Button size="sm">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Grade Now
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ANALYTICS TAB */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className={`${
                  isDark
                    ? 'bg-slate-800 border border-slate-700'
                    : 'bg-white border border-slate-200'
                } rounded-lg shadow-sm`}
              >
                <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                  <h3
                    className={`text-xl font-semibold ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    Course Performance Overview
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {myCourses.map((course) => (
                      <div key={course.id}>
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`text-sm font-medium ${
                              isDark ? 'text-slate-300' : 'text-slate-700'
                            }`}
                          >
                            {course.title}
                          </span>
                          <span
                            className={`text-sm ${
                              isDark ? 'text-slate-400' : 'text-slate-600'
                            }`}
                          >
                            {course.avgGrade}
                          </span>
                        </div>
                        <div
                          className={`w-full rounded-full h-2 ${
                            isDark ? 'bg-slate-700' : 'bg-slate-200'
                          }`}
                        >
                          <div
                            className="bg-gradient-to-r from-green-600 to-blue-600 h-2 rounded-full"
                            style={{ width: `${course.attendance}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className={`${
                  isDark
                    ? 'bg-slate-800 border border-slate-700'
                    : 'bg-white border border-slate-200'
                } rounded-lg shadow-sm`}
              >
                <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                  <h3
                    className={`text-xl font-semibold ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    Student Engagement
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-sm ${
                            isDark ? 'text-slate-400' : 'text-slate-600'
                          }`}
                        >
                          Average Attendance
                        </span>
                        <span
                          className={`text-2xl font-bold ${
                            isDark ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          89%
                        </span>
                      </div>
                      <div
                        className={`w-full rounded-full h-3 ${
                          isDark ? 'bg-slate-700' : 'bg-slate-200'
                        }`}
                      >
                        <div
                          className="bg-green-600 h-3 rounded-full"
                          style={{ width: '89%' }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-sm ${
                            isDark ? 'text-slate-400' : 'text-slate-600'
                          }`}
                        >
                          Assignment Completion
                        </span>
                        <span
                          className={`text-2xl font-bold ${
                            isDark ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          92%
                        </span>
                      </div>
                      <div
                        className={`w-full rounded-full h-3 ${
                          isDark ? 'bg-slate-700' : 'bg-slate-200'
                        }`}
                      >
                        <div
                          className="bg-blue-600 h-3 rounded-full"
                          style={{ width: '92%' }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-sm ${
                            isDark ? 'text-slate-400' : 'text-slate-600'
                          }`}
                        >
                          Active Participation
                        </span>
                        <span
                          className={`text-2xl font-bold ${
                            isDark ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          76%
                        </span>
                      </div>
                      <div
                        className={`w-full rounded-full h-3 ${
                          isDark ? 'bg-slate-700' : 'bg-slate-200'
                        }`}
                      >
                        <div
                          className="bg-purple-600 h-3 rounded-full"
                          style={{ width: '76%' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`${
                isDark
                  ? 'bg-slate-800 border border-slate-700'
                  : 'bg-white border border-slate-200'
              } rounded-lg shadow-sm`}
            >
              <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <h3
                  className={`text-xl font-semibold ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Teaching Insights
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div
                    className={`p-4 rounded-lg ${
                      isDark ? 'bg-slate-800' : 'bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp
                        className={`w-5 h-5 ${
                          isDark ? 'text-green-400' : 'text-green-600'
                        }`}
                      />
                      <h4
                        className={`font-semibold ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        Top Performing
                      </h4>
                    </div>
                    <p
                      className={`text-sm ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      Advanced Mathematics has the highest average grade (A-)
                      and 92% attendance rate
                    </p>
                  </div>

                  <div
                    className={`p-4 rounded-lg ${
                      isDark ? 'bg-slate-800' : 'bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <AlertCircle
                        className={`w-5 h-5 ${
                          isDark ? 'text-yellow-400' : 'text-yellow-600'
                        }`}
                      />
                      <h4
                        className={`font-semibold ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        Needs Attention
                      </h4>
                    </div>
                    <p
                      className={`text-sm ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      4 students in Organic Chemistry are falling behind with
                      grades below 70%
                    </p>
                  </div>

                  <div
                    className={`p-4 rounded-lg ${
                      isDark ? 'bg-slate-800' : 'bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Award
                        className={`w-5 h-5 ${
                          isDark ? 'text-purple-400' : 'text-purple-600'
                        }`}
                      />
                      <h4
                        className={`font-semibold ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        Achievement
                      </h4>
                    </div>
                    <p
                      className={`text-sm ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      Your average rating improved to 4.8 stars this semester,
                      up from 4.6
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
