import React, { useState, useEffect } from 'react';
import {
  Users,
  GraduationCap,
  BookOpen,
  Shield,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Search,
  Download,
  Eye,
  Trash2,
  UserCheck,
  Activity,
  Bell,
  Settings,
  BarChart3,
  Mail,
  Plus,
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface UserStats {
  total: number;
  verified: number;
  unverified: number;
  byRole: {
    student: number;
    teacher: number;
    admin: number;
  };
}

interface DashboardUser {
  _id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  verified: boolean;
  createdAt: string;
  profile?: {
    subjects?: string[];
    level?: string;
  };
}

type ButtonVariant = 'primary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export default function AdminDashboard() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState<UserStats>({
    total: 0,
    verified: 0,
    unverified: 0,
    byRole: { student: 0, teacher: 0, admin: 0 },
  });
  const [users, setUsers] = useState<DashboardUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<DashboardUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<
    'all' | 'student' | 'teacher' | 'admin'
  >('all');
  const [verifiedFilter, setVerifiedFilter] = useState<
    'all' | 'verified' | 'unverified'
  >('all');

  const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
  }: ButtonProps) => {
    const baseStyles =
      'rounded-lg font-medium transition-colors inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed';
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

  // Mock data for demo
  useEffect(() => {
    setTimeout(() => {
      const mockStats = {
        total: 247,
        verified: 198,
        unverified: 49,
        byRole: {
          student: 180,
          teacher: 65,
          admin: 2,
        },
      };

      const mockUsers: DashboardUser[] = [
        {
          _id: '1',
          name: 'John Smith',
          email: 'john.smith@example.com',
          role: 'student',
          verified: true,
          createdAt: new Date().toISOString(),
        },
        {
          _id: '2',
          name: 'Dr. Sarah Johnson',
          email: 'sarah.johnson@example.com',
          role: 'teacher',
          verified: true,
          createdAt: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          _id: '3',
          name: 'Mike Chen',
          email: 'mike.chen@example.com',
          role: 'student',
          verified: false,
          createdAt: new Date(Date.now() - 172800000).toISOString(),
        },
        {
          _id: '4',
          name: 'Prof. Emily Wilson',
          email: 'emily.wilson@example.com',
          role: 'teacher',
          verified: true,
          createdAt: new Date(Date.now() - 259200000).toISOString(),
        },
        {
          _id: '5',
          name: 'David Brown',
          email: 'david.brown@example.com',
          role: 'student',
          verified: false,
          createdAt: new Date(Date.now() - 345600000).toISOString(),
        },
        {
          _id: '6',
          name: 'Lisa Anderson',
          email: 'lisa.anderson@example.com',
          role: 'student',
          verified: true,
          createdAt: new Date(Date.now() - 432000000).toISOString(),
        },
        {
          _id: '7',
          name: 'Prof. Robert Taylor',
          email: 'robert.taylor@example.com',
          role: 'teacher',
          verified: true,
          createdAt: new Date(Date.now() - 518400000).toISOString(),
        },
        {
          _id: '8',
          name: 'Jennifer White',
          email: 'jennifer.white@example.com',
          role: 'student',
          verified: false,
          createdAt: new Date(Date.now() - 604800000).toISOString(),
        },
      ];

      setStats(mockStats);
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter users
  useEffect(() => {
    let filtered = [...users];

    if (searchQuery) {
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          u.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (roleFilter !== 'all') {
      filtered = filtered.filter((u) => u.role === roleFilter);
    }

    if (verifiedFilter !== 'all') {
      filtered = filtered.filter((u) =>
        verifiedFilter === 'verified' ? u.verified : !u.verified
      );
    }

    setFilteredUsers(filtered);
  }, [searchQuery, roleFilter, verifiedFilter, users]);

  const handleVerifyUser = (userId: string) => {
    setUsers(
      users.map((u) => (u._id === userId ? { ...u, verified: true } : u))
    );
  };

  const handleDeleteUser = (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    setUsers(users.filter((u) => u._id !== userId));
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];

  if (isLoading) {
    return (
      <div
        className={`min-h-screen ${
          isDark ? 'bg-slate-900' : 'bg-slate-50'
        } flex items-center justify-center`}
      >
        <div className="text-center">
          <Activity
            className={`w-12 h-12 mx-auto mb-4 animate-spin ${
              isDark ? 'text-indigo-400' : 'text-indigo-600'
            }`}
          />
          <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

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
              Admin Dashboard 🛡️
            </h1>
            <p
              className={`text-lg ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              Manage users and monitor platform activity
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add User
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
                } rounded-lg shadow-sm p-6`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      Total Users
                    </p>
                    <p
                      className={`text-3xl font-bold mt-2 ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {stats.total}
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        isDark ? 'text-slate-500' : 'text-slate-500'
                      }`}
                    >
                      +12 this week
                    </p>
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      isDark ? 'bg-indigo-900/30' : 'bg-indigo-100'
                    }`}
                  >
                    <Users
                      className={`w-6 h-6 ${
                        isDark ? 'text-indigo-400' : 'text-indigo-600'
                      }`}
                    />
                  </div>
                </div>
              </div>

              <div
                className={`${
                  isDark
                    ? 'bg-slate-800 border border-slate-700'
                    : 'bg-white border border-slate-200'
                } rounded-lg shadow-sm p-6`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      Students
                    </p>
                    <p
                      className={`text-3xl font-bold mt-2 ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {stats.byRole.student}
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        isDark ? 'text-slate-500' : 'text-slate-500'
                      }`}
                    >
                      {Math.round((stats.byRole.student / stats.total) * 100)}%
                      of total
                    </p>
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      isDark ? 'bg-blue-900/30' : 'bg-blue-100'
                    }`}
                  >
                    <GraduationCap
                      className={`w-6 h-6 ${
                        isDark ? 'text-blue-400' : 'text-blue-600'
                      }`}
                    />
                  </div>
                </div>
              </div>

              <div
                className={`${
                  isDark
                    ? 'bg-slate-800 border border-slate-700'
                    : 'bg-white border border-slate-200'
                } rounded-lg shadow-sm p-6`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      Teachers
                    </p>
                    <p
                      className={`text-3xl font-bold mt-2 ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {stats.byRole.teacher}
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        isDark ? 'text-slate-500' : 'text-slate-500'
                      }`}
                    >
                      {Math.round((stats.byRole.teacher / stats.total) * 100)}%
                      of total
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

              <div
                className={`${
                  isDark
                    ? 'bg-slate-800 border border-slate-700'
                    : 'bg-white border border-slate-200'
                } rounded-lg shadow-sm p-6`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      Unverified
                    </p>
                    <p
                      className={`text-3xl font-bold mt-2 ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {stats.unverified}
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        isDark ? 'text-slate-500' : 'text-slate-500'
                      }`}
                    >
                      Require attention
                    </p>
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      isDark ? 'bg-yellow-900/30' : 'bg-yellow-100'
                    }`}
                  >
                    <AlertTriangle
                      className={`w-6 h-6 ${
                        isDark ? 'text-yellow-400' : 'text-yellow-600'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
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
                      Recent Registrations
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {users.slice(0, 5).map((user) => (
                        <div
                          key={user._id}
                          className={`p-4 rounded-lg border ${
                            isDark
                              ? 'border-slate-700 bg-slate-800/50'
                              : 'border-slate-200 bg-white'
                          } hover:shadow-md transition-shadow`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                  user.role === 'admin'
                                    ? isDark
                                      ? 'bg-purple-900/30'
                                      : 'bg-purple-100'
                                    : user.role === 'teacher'
                                    ? isDark
                                      ? 'bg-green-900/30'
                                      : 'bg-green-100'
                                    : isDark
                                    ? 'bg-blue-900/30'
                                    : 'bg-blue-100'
                                }`}
                              >
                                {user.role === 'admin' ? (
                                  <Shield
                                    className={`w-5 h-5 ${
                                      isDark
                                        ? 'text-purple-400'
                                        : 'text-purple-600'
                                    }`}
                                  />
                                ) : user.role === 'teacher' ? (
                                  <BookOpen
                                    className={`w-5 h-5 ${
                                      isDark
                                        ? 'text-green-400'
                                        : 'text-green-600'
                                    }`}
                                  />
                                ) : (
                                  <GraduationCap
                                    className={`w-5 h-5 ${
                                      isDark ? 'text-blue-400' : 'text-blue-600'
                                    }`}
                                  />
                                )}
                              </div>
                              <div>
                                <p
                                  className={`font-semibold ${
                                    isDark ? 'text-white' : 'text-slate-900'
                                  }`}
                                >
                                  {user.name}
                                </p>
                                <p
                                  className={`text-sm ${
                                    isDark ? 'text-slate-400' : 'text-slate-600'
                                  }`}
                                >
                                  {user.email}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  user.role === 'admin'
                                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                                    : user.role === 'teacher'
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                    : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                }`}
                              >
                                {user.role}
                              </span>
                              {user.verified ? (
                                <CheckCircle className="w-5 h-5 text-green-500" />
                              ) : (
                                <XCircle className="w-5 h-5 text-red-500" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

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
                      Quick Actions
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      <Button className="w-full justify-start">
                        <Plus className="w-4 h-4 mr-2" />
                        Add New User
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export Users
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Send Bulk Email
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        System Settings
                      </Button>
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
                      System Health
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span
                            className={
                              isDark ? 'text-slate-300' : 'text-slate-700'
                            }
                          >
                            Server Status
                          </span>
                          <span className="text-green-500">Healthy</span>
                        </div>
                        <div
                          className={`w-full rounded-full h-2 ${
                            isDark ? 'bg-slate-700' : 'bg-slate-200'
                          }`}
                        >
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: '98%' }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span
                            className={
                              isDark ? 'text-slate-300' : 'text-slate-700'
                            }
                          >
                            Database
                          </span>
                          <span className="text-green-500">Connected</span>
                        </div>
                        <div
                          className={`w-full rounded-full h-2 ${
                            isDark ? 'bg-slate-700' : 'bg-slate-200'
                          }`}
                        >
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: '100%' }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span
                            className={
                              isDark ? 'text-slate-300' : 'text-slate-700'
                            }
                          >
                            Storage
                          </span>
                          <span className="text-yellow-500">68% Used</span>
                        </div>
                        <div
                          className={`w-full rounded-full h-2 ${
                            isDark ? 'bg-slate-700' : 'bg-slate-200'
                          }`}
                        >
                          <div
                            className="bg-yellow-600 h-2 rounded-full"
                            style={{ width: '68%' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* USER MANAGEMENT TAB */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Filters */}
            <div
              className={`${
                isDark
                  ? 'bg-slate-800 border border-slate-700'
                  : 'bg-white border border-slate-200'
              } rounded-lg shadow-sm p-6`}
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                        isDark
                          ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-400'
                          : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                  </div>
                </div>
                <div>
                  <select
                    value={roleFilter}
                    onChange={(e) =>
                      setRoleFilter(
                        e.target.value as
                          | 'all'
                          | 'student'
                          | 'teacher'
                          | 'admin'
                      )
                    }
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDark
                        ? 'bg-slate-900 border-slate-700 text-white'
                        : 'bg-white border-slate-300 text-slate-900'
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  >
                    <option value="all">All Roles</option>
                    <option value="student">Students</option>
                    <option value="teacher">Teachers</option>
                    <option value="admin">Admins</option>
                  </select>
                </div>
                <div>
                  <select
                    value={verifiedFilter}
                    onChange={(e) =>
                      setVerifiedFilter(
                        e.target.value as 'all' | 'verified' | 'unverified'
                      )
                    }
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDark
                        ? 'bg-slate-900 border-slate-700 text-white'
                        : 'bg-white border-slate-300 text-slate-900'
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  >
                    <option value="all">All Status</option>
                    <option value="verified">Verified</option>
                    <option value="unverified">Unverified</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Users Table */}
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
                    Users ({filteredUsers.length})
                  </h3>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead
                    className={`border-b ${
                      isDark ? 'border-slate-700' : 'border-slate-200'
                    }`}
                  >
                    <tr>
                      <th
                        className={`text-left p-4 ${
                          isDark ? 'text-slate-300' : 'text-slate-700'
                        }`}
                      >
                        User
                      </th>
                      <th
                        className={`text-left p-4 ${
                          isDark ? 'text-slate-300' : 'text-slate-700'
                        }`}
                      >
                        Role
                      </th>
                      <th
                        className={`text-left p-4 ${
                          isDark ? 'text-slate-300' : 'text-slate-700'
                        }`}
                      >
                        Status
                      </th>
                      <th
                        className={`text-left p-4 ${
                          isDark ? 'text-slate-300' : 'text-slate-700'
                        }`}
                      >
                        Joined
                      </th>
                      <th
                        className={`text-left p-4 ${
                          isDark ? 'text-slate-300' : 'text-slate-700'
                        }`}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr
                        key={user._id}
                        className={`border-b ${
                          isDark ? 'border-slate-700' : 'border-slate-200'
                        }`}
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                user.role === 'admin'
                                  ? isDark
                                    ? 'bg-purple-900/30'
                                    : 'bg-purple-100'
                                  : user.role === 'teacher'
                                  ? isDark
                                    ? 'bg-green-900/30'
                                    : 'bg-green-100'
                                  : isDark
                                  ? 'bg-blue-900/30'
                                  : 'bg-blue-100'
                              }`}
                            >
                              {user.role === 'admin' ? (
                                <Shield
                                  className={`w-5 h-5 ${
                                    isDark
                                      ? 'text-purple-400'
                                      : 'text-purple-600'
                                  }`}
                                />
                              ) : user.role === 'teacher' ? (
                                <BookOpen
                                  className={`w-5 h-5 ${
                                    isDark ? 'text-green-400' : 'text-green-600'
                                  }`}
                                />
                              ) : (
                                <GraduationCap
                                  className={`w-5 h-5 ${
                                    isDark ? 'text-blue-400' : 'text-blue-600'
                                  }`}
                                />
                              )}
                            </div>
                            <div>
                              <p
                                className={`font-medium ${
                                  isDark ? 'text-white' : 'text-slate-900'
                                }`}
                              >
                                {user.name}
                              </p>
                              <p
                                className={`text-sm ${
                                  isDark ? 'text-slate-400' : 'text-slate-600'
                                }`}
                              >
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.role === 'admin'
                                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                                : user.role === 'teacher'
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="p-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                              user.verified
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                            }`}
                          >
                            {user.verified ? (
                              <>
                                <CheckCircle className="w-3 h-3" />
                                Verified
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3 h-3" />
                                Unverified
                              </>
                            )}
                          </span>
                        </td>
                        <td
                          className={`p-4 text-sm ${
                            isDark ? 'text-slate-400' : 'text-slate-600'
                          }`}
                        >
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="ghost" title="View User">
                              <Eye className="w-4 h-4" />
                            </Button>
                            {!user.verified && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleVerifyUser(user._id)}
                                title="Verify User"
                              >
                                <UserCheck className="w-4 h-4 text-green-600" />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteUser(user._id)}
                              title="Delete User"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
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
                    User Growth
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-sm ${
                            isDark ? 'text-slate-400' : 'text-slate-600'
                          }`}
                        >
                          This Month
                        </span>
                        <span
                          className={`text-2xl font-bold ${
                            isDark ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          +45
                        </span>
                      </div>
                      <div
                        className={`w-full rounded-full h-3 ${
                          isDark ? 'bg-slate-700' : 'bg-slate-200'
                        }`}
                      >
                        <div
                          className="bg-indigo-600 h-3 rounded-full"
                          style={{ width: '75%' }}
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
                          Last Month
                        </span>
                        <span
                          className={`text-2xl font-bold ${
                            isDark ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          +38
                        </span>
                      </div>
                      <div
                        className={`w-full rounded-full h-3 ${
                          isDark ? 'bg-slate-700' : 'bg-slate-200'
                        }`}
                      >
                        <div
                          className="bg-blue-600 h-3 rounded-full"
                          style={{ width: '63%' }}
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
                          Average Monthly
                        </span>
                        <span
                          className={`text-2xl font-bold ${
                            isDark ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          +32
                        </span>
                      </div>
                      <div
                        className={`w-full rounded-full h-3 ${
                          isDark ? 'bg-slate-700' : 'bg-slate-200'
                        }`}
                      >
                        <div
                          className="bg-green-600 h-3 rounded-full"
                          style={{ width: '53%' }}
                        />
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
                    Role Distribution
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <GraduationCap
                            className={`w-5 h-5 ${
                              isDark ? 'text-blue-400' : 'text-blue-600'
                            }`}
                          />
                          <span
                            className={`text-sm font-medium ${
                              isDark ? 'text-slate-300' : 'text-slate-700'
                            }`}
                          >
                            Students
                          </span>
                        </div>
                        <span
                          className={`text-sm ${
                            isDark ? 'text-slate-400' : 'text-slate-600'
                          }`}
                        >
                          {stats.byRole.student} (
                          {Math.round(
                            (stats.byRole.student / stats.total) * 100
                          )}
                          %)
                        </span>
                      </div>
                      <div
                        className={`w-full rounded-full h-2 ${
                          isDark ? 'bg-slate-700' : 'bg-slate-200'
                        }`}
                      >
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${
                              (stats.byRole.student / stats.total) * 100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <BookOpen
                            className={`w-5 h-5 ${
                              isDark ? 'text-green-400' : 'text-green-600'
                            }`}
                          />
                          <span
                            className={`text-sm font-medium ${
                              isDark ? 'text-slate-300' : 'text-slate-700'
                            }`}
                          >
                            Teachers
                          </span>
                        </div>
                        <span
                          className={`text-sm ${
                            isDark ? 'text-slate-400' : 'text-slate-600'
                          }`}
                        >
                          {stats.byRole.teacher} (
                          {Math.round(
                            (stats.byRole.teacher / stats.total) * 100
                          )}
                          %)
                        </span>
                      </div>
                      <div
                        className={`w-full rounded-full h-2 ${
                          isDark ? 'bg-slate-700' : 'bg-slate-200'
                        }`}
                      >
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{
                            width: `${
                              (stats.byRole.teacher / stats.total) * 100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Shield
                            className={`w-5 h-5 ${
                              isDark ? 'text-purple-400' : 'text-purple-600'
                            }`}
                          />
                          <span
                            className={`text-sm font-medium ${
                              isDark ? 'text-slate-300' : 'text-slate-700'
                            }`}
                          >
                            Admins
                          </span>
                        </div>
                        <span
                          className={`text-sm ${
                            isDark ? 'text-slate-400' : 'text-slate-600'
                          }`}
                        >
                          {stats.byRole.admin} (
                          {Math.round((stats.byRole.admin / stats.total) * 100)}
                          %)
                        </span>
                      </div>
                      <div
                        className={`w-full rounded-full h-2 ${
                          isDark ? 'bg-slate-700' : 'bg-slate-200'
                        }`}
                      >
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{
                            width: `${
                              (stats.byRole.admin / stats.total) * 100
                            }%`,
                          }}
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
                  Platform Insights
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div
                    className={`p-4 rounded-lg ${
                      isDark ? 'bg-slate-900/50' : 'bg-slate-50'
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
                        Growing Fast
                      </h4>
                    </div>
                    <p
                      className={`text-sm ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      User registrations increased by 18% this month compared to
                      last month
                    </p>
                  </div>

                  <div
                    className={`p-4 rounded-lg ${
                      isDark ? 'bg-slate-900/50' : 'bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <CheckCircle
                        className={`w-5 h-5 ${
                          isDark ? 'text-blue-400' : 'text-blue-600'
                        }`}
                      />
                      <h4
                        className={`font-semibold ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        High Verification
                      </h4>
                    </div>
                    <p
                      className={`text-sm ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      {Math.round((stats.verified / stats.total) * 100)}% of
                      users are verified, showing strong engagement
                    </p>
                  </div>

                  <div
                    className={`p-4 rounded-lg ${
                      isDark ? 'bg-slate-900/50' : 'bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Users
                        className={`w-5 h-5 ${
                          isDark ? 'text-purple-400' : 'text-purple-600'
                        }`}
                      />
                      <h4
                        className={`font-semibold ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        Student Majority
                      </h4>
                    </div>
                    <p
                      className={`text-sm ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      Students make up the largest user base at{' '}
                      {Math.round((stats.byRole.student / stats.total) * 100)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
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
                  Platform Settings
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4
                        className={`font-medium ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        User Registration
                      </h4>
                      <p
                        className={`text-sm ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        Allow new users to register accounts
                      </p>
                    </div>
                    <button className="w-12 h-6 bg-indigo-600 rounded-full relative transition-colors">
                      <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4
                        className={`font-medium ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        Email Verification Required
                      </h4>
                      <p
                        className={`text-sm ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        Require users to verify email before accessing platform
                      </p>
                    </div>
                    <button className="w-12 h-6 bg-indigo-600 rounded-full relative transition-colors">
                      <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4
                        className={`font-medium ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        Maintenance Mode
                      </h4>
                      <p
                        className={`text-sm ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        Temporarily disable access for maintenance
                      </p>
                    </div>
                    <button
                      className={`w-12 h-6 rounded-full relative transition-colors ${
                        isDark ? 'bg-slate-700' : 'bg-slate-300'
                      }`}
                    >
                      <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform" />
                    </button>
                  </div>

                  <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                    <h4
                      className={`font-medium mb-3 ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      Notification Settings
                    </h4>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span
                          className={`text-sm ${
                            isDark ? 'text-slate-300' : 'text-slate-700'
                          }`}
                        >
                          Send admin alerts for new registrations
                        </span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span
                          className={`text-sm ${
                            isDark ? 'text-slate-300' : 'text-slate-700'
                          }`}
                        >
                          Weekly system health reports
                        </span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span
                          className={`text-sm ${
                            isDark ? 'text-slate-300' : 'text-slate-700'
                          }`}
                        >
                          Critical security alerts
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                    <Button>
                      <Settings className="w-4 h-4 mr-2" />
                      Save Settings
                    </Button>
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
                  Danger Zone
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div
                    className={`p-4 rounded-lg border-2 ${
                      isDark
                        ? 'border-red-900/50 bg-red-900/10'
                        : 'border-red-200 bg-red-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4
                          className={`font-medium mb-1 ${
                            isDark ? 'text-red-400' : 'text-red-900'
                          }`}
                        >
                          Clear All Cache
                        </h4>
                        <p
                          className={`text-sm ${
                            isDark ? 'text-red-300/70' : 'text-red-700'
                          }`}
                        >
                          Remove all cached data. This may affect performance
                          temporarily.
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-600 text-red-600 hover:bg-red-50"
                      >
                        Clear Cache
                      </Button>
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-lg border-2 ${
                      isDark
                        ? 'border-red-900/50 bg-red-900/10'
                        : 'border-red-200 bg-red-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4
                          className={`font-medium mb-1 ${
                            isDark ? 'text-red-400' : 'text-red-900'
                          }`}
                        >
                          Reset Platform Statistics
                        </h4>
                        <p
                          className={`text-sm ${
                            isDark ? 'text-red-300/70' : 'text-red-700'
                          }`}
                        >
                          This will reset all analytics and statistics. This
                          action cannot be undone.
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-600 text-red-600 hover:bg-red-50"
                      >
                        Reset Stats
                      </Button>
                    </div>
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
