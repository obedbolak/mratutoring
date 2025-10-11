// src/app/auth/AuthForm.tsx
'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/contexts/ToastContext';
import {
  Button,
  Input,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import Link from 'next/link';
import {
  Eye,
  EyeOff,
  Chrome,
  ArrowLeft,
  Mail,
  CheckCircle,
  Loader2,
  RefreshCw,
  GraduationCap,
  BookOpen,
  Check,
  Award,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

type AuthMode = 'login' | 'register' | 'verify-email';
type UserRole = 'student' | 'teacher';
type EducationLevel =
  | 'O-Level'
  | 'A-Level'
  | 'Cambridge IGCSE'
  | 'Cambridge Checkpoint'
  | 'International Baccalauréat';

// Registration Steps
type RegistrationStep =
  | 'role'
  | 'personal'
  | 'education'
  | 'subjects'
  | 'terms';

// Subject categories and subjects
const SUBJECTS = {
  mathematics: {
    name: 'Mathematics',
    icon: '📊',
    subjects: ['Algebra', 'Geometry', 'Calculus', 'Statistics', 'Trigonometry'],
  },
  sciences: {
    name: 'Sciences',
    icon: '🔬',
    subjects: ['Physics', 'Chemistry', 'Biology', 'Earth Science'],
  },
  languages: {
    name: 'Languages',
    icon: '📚',
    subjects: ['English', 'French', 'Spanish', 'German', 'Chinese'],
  },
  humanities: {
    name: 'Humanities',
    icon: '🏛️',
    subjects: ['History', 'Geography', 'Philosophy', 'Psychology', 'Sociology'],
  },
  arts: {
    name: 'Arts & Creative',
    icon: '🎨',
    subjects: ['Art', 'Music', 'Drama', 'Creative Writing', 'Design'],
  },
  technology: {
    name: 'Technology',
    icon: '💻',
    subjects: [
      'Computer Science',
      'Programming',
      'Web Development',
      'Digital Design',
    ],
  },
  business: {
    name: 'Business & Economics',
    icon: '💼',
    subjects: ['Economics', 'Business Studies', 'Accounting', 'Marketing'],
  },
  other: {
    name: 'Other',
    icon: '📖',
    subjects: [
      'Physical Education',
      'Health Education',
      'Study Skills',
      'Test Preparation',
    ],
  },
};

// Education Level Options (fixed to match RegisterData type)
const EDUCATION_LEVELS: {
  value: EducationLevel;
  label: string;
  description: string;
}[] = [
  { value: 'O-Level', label: 'O-Level', description: 'Ordinary Level' },
  { value: 'A-Level', label: 'A-Level', description: 'Advanced Level' },
  { value: 'Cambridge IGCSE', label: 'IGCSE', description: 'Cambridge IGCSE' },
  {
    value: 'Cambridge Checkpoint',
    label: 'Checkpoint',
    description: 'Cambridge Checkpoint',
  },
  {
    value: 'International Baccalauréat',
    label: 'IB',
    description: 'International Baccalauréat',
  },
];

// Registration Steps Configuration
const REGISTRATION_STEPS: {
  step: RegistrationStep;
  title: string;
  description: string;
}[] = [
  {
    step: 'role',
    title: 'Choose Role',
    description: 'Are you a student or teacher?',
  },
  {
    step: 'personal',
    title: 'Personal Info',
    description: 'Your basic information',
  },
  {
    step: 'education',
    title: 'Education Level',
    description: 'Select your education system',
  },
  { step: 'subjects', title: 'Subjects', description: 'Choose your interests' },
  {
    step: 'terms',
    title: 'Terms & Submit',
    description: 'Review and complete',
  },
];

// Form Context
interface FormContextType {
  formData: {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    role: UserRole;
    subjects: string[];
    level: EducationLevel | undefined;
    acceptTerms: boolean;
  };
  errors: Record<string, string>;
  currentStep: RegistrationStep | 'verification';
  registeredEmail: string;
  updateFormData: (field: string, value: any) => void;
  setErrors: (errors: Record<string, string>) => void;
  setCurrentStep: (step: RegistrationStep | 'verification') => void;
  setRegisteredEmail: (email: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  canProceed: () => boolean;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within FormProvider');
  }
  return context;
};

// Form Provider Component
const FormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    role: 'student' as UserRole,
    subjects: [] as string[],
    level: undefined as EducationLevel | undefined,
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState<
    RegistrationStep | 'verification'
  >('role');
  const [registeredEmail, setRegisteredEmail] = useState('');

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const getStepIndex = (step: RegistrationStep) => {
    return REGISTRATION_STEPS.findIndex((s) => s.step === step);
  };

  const nextStep = () => {
    if (currentStep === 'verification') return;

    const currentIndex = getStepIndex(currentStep as RegistrationStep);
    if (currentIndex < REGISTRATION_STEPS.length - 1) {
      setCurrentStep(REGISTRATION_STEPS[currentIndex + 1].step);
    }
  };

  const prevStep = () => {
    if (currentStep === 'verification') return;

    const currentIndex = getStepIndex(currentStep as RegistrationStep);
    if (currentIndex > 0) {
      setCurrentStep(REGISTRATION_STEPS[currentIndex - 1].step);
    }
  };

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 'role':
        return !!formData.role;
      case 'personal':
        return !!(
          formData.name &&
          formData.email &&
          formData.password &&
          formData.confirmPassword
        );
      case 'education':
        return !!formData.level;
      case 'subjects':
        return formData.subjects.length > 0;
      case 'terms':
        return formData.acceptTerms;
      default:
        return false;
    }
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        errors,
        currentStep,
        registeredEmail,
        updateFormData,
        setErrors,
        setCurrentStep,
        setRegisteredEmail,
        nextStep,
        prevStep,
        canProceed,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

// Progress Bar Component
const ProgressBar: React.FC = () => {
  const { currentStep } = useFormContext();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (currentStep === 'verification') return null;

  const currentIndex = REGISTRATION_STEPS.findIndex(
    (s) => s.step === currentStep
  );
  const progress = ((currentIndex + 1) / REGISTRATION_STEPS.length) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between mb-4">
        {REGISTRATION_STEPS.map((step, index) => (
          <div key={step.step} className="flex flex-col items-center flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                index <= currentIndex
                  ? isDark
                    ? 'bg-indigo-600 text-white'
                    : 'bg-indigo-600 text-white'
                  : isDark
                  ? 'bg-slate-700 text-slate-400 border border-slate-600'
                  : 'bg-slate-200 text-slate-500 border border-slate-300'
              }`}
            >
              {index < currentIndex ? <Check className="w-4 h-4" /> : index + 1}
            </div>
            <div className="text-center mt-2">
              <p
                className={`text-xs font-medium ${
                  index <= currentIndex
                    ? isDark
                      ? 'text-indigo-400'
                      : 'text-indigo-600'
                    : isDark
                    ? 'text-slate-400'
                    : 'text-slate-500'
                }`}
              >
                {step.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div
        className={`w-full h-2 rounded-full ${
          isDark ? 'bg-slate-700' : 'bg-slate-200'
        }`}
      >
        <div
          className="h-2 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

// Step 1: Role Selection
const RoleStep: React.FC = () => {
  const { formData, updateFormData, errors } = useFormContext();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3
          className={`text-xl font-semibold ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Choose Your Role
        </h3>
        <p
          className={`mt-2 text-sm ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}
        >
          Are you here to learn or teach?
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Student Option */}
        <label
          className={`relative flex items-center p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
            formData.role === 'student'
              ? isDark
                ? 'border-indigo-500 bg-indigo-900/20 ring-2 ring-indigo-500/20'
                : 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500/20'
              : isDark
              ? 'border-slate-600 bg-slate-800/50 hover:border-slate-500 hover:bg-slate-800'
              : 'border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50'
          }`}
        >
          <input
            type="radio"
            name="role"
            value="student"
            checked={formData.role === 'student'}
            onChange={(e) => updateFormData('role', e.target.value as UserRole)}
            className="sr-only"
          />
          <div className="flex items-center w-full">
            <div
              className={`p-3 rounded-lg mr-4 ${
                formData.role === 'student'
                  ? isDark
                    ? 'bg-indigo-500/20'
                    : 'bg-indigo-100'
                  : isDark
                  ? 'bg-slate-700'
                  : 'bg-slate-100'
              }`}
            >
              <GraduationCap
                className={`w-8 h-8 ${
                  formData.role === 'student'
                    ? isDark
                      ? 'text-indigo-400'
                      : 'text-indigo-600'
                    : isDark
                    ? 'text-slate-400'
                    : 'text-slate-500'
                }`}
              />
            </div>
            <div className="flex-1">
              <h4
                className={`text-lg font-medium ${
                  formData.role === 'student'
                    ? isDark
                      ? 'text-indigo-400'
                      : 'text-indigo-600'
                    : isDark
                    ? 'text-slate-300'
                    : 'text-slate-700'
                }`}
              >
                Student
              </h4>
              <p
                className={`text-sm ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                I want to learn from expert teachers and improve my knowledge
              </p>
            </div>
            {formData.role === 'student' && (
              <Check
                className={`w-6 h-6 ml-4 ${
                  isDark ? 'text-indigo-400' : 'text-indigo-600'
                }`}
              />
            )}
          </div>
        </label>

        {/* Teacher Option */}
        <label
          className={`relative flex items-center p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
            formData.role === 'teacher'
              ? isDark
                ? 'border-indigo-500 bg-indigo-900/20 ring-2 ring-indigo-500/20'
                : 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500/20'
              : isDark
              ? 'border-slate-600 bg-slate-800/50 hover:border-slate-500 hover:bg-slate-800'
              : 'border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50'
          }`}
        >
          <input
            type="radio"
            name="role"
            value="teacher"
            checked={formData.role === 'teacher'}
            onChange={(e) => updateFormData('role', e.target.value as UserRole)}
            className="sr-only"
          />
          <div className="flex items-center w-full">
            <div
              className={`p-3 rounded-lg mr-4 ${
                formData.role === 'teacher'
                  ? isDark
                    ? 'bg-indigo-500/20'
                    : 'bg-indigo-100'
                  : isDark
                  ? 'bg-slate-700'
                  : 'bg-slate-100'
              }`}
            >
              <BookOpen
                className={`w-8 h-8 ${
                  formData.role === 'teacher'
                    ? isDark
                      ? 'text-indigo-400'
                      : 'text-indigo-600'
                    : isDark
                    ? 'text-slate-400'
                    : 'text-slate-500'
                }`}
              />
            </div>
            <div className="flex-1">
              <h4
                className={`text-lg font-medium ${
                  formData.role === 'teacher'
                    ? isDark
                      ? 'text-indigo-400'
                      : 'text-indigo-600'
                    : isDark
                    ? 'text-slate-300'
                    : 'text-slate-700'
                }`}
              >
                Teacher
              </h4>
              <p
                className={`text-sm ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                I want to share my knowledge and help students learn
              </p>
            </div>
            {formData.role === 'teacher' && (
              <Check
                className={`w-6 h-6 ml-4 ${
                  isDark ? 'text-indigo-400' : 'text-indigo-600'
                }`}
              />
            )}
          </div>
        </label>
      </div>

      {errors.role && (
        <p className="text-sm text-red-600 text-center">{errors.role}</p>
      )}
    </div>
  );
};

// Step 2: Personal Information
const PersonalStep: React.FC = () => {
  const { formData, updateFormData, errors } = useFormContext();
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const isDark = theme === 'dark';

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3
          className={`text-xl font-semibold ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Personal Information
        </h3>
        <p
          className={`mt-2 text-sm ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}
        >
          Tell us about yourself
        </p>
      </div>

      <div className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          value={formData.name}
          onChange={(e) => updateFormData('name', e.target.value)}
          error={errors.name}
          placeholder="Enter your full name"
        />

        <Input
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData('email', e.target.value)}
          error={errors.email}
          placeholder="Enter your email"
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => updateFormData('password', e.target.value)}
            error={errors.password}
            placeholder="Enter your password"
          />
          <button
            type="button"
            className={`absolute right-3 top-9 ${
              isDark
                ? 'text-slate-400 hover:text-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="relative">
          <Input
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={(e) => updateFormData('confirmPassword', e.target.value)}
            error={errors.confirmPassword}
            placeholder="Confirm your password"
          />
          <button
            type="button"
            className={`absolute right-3 top-9 ${
              isDark
                ? 'text-slate-400 hover:text-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Step 3: Education Level
const EducationStep: React.FC = () => {
  const { formData, updateFormData, errors } = useFormContext();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3
          className={`text-xl font-semibold ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Education Level
        </h3>
        <p
          className={`mt-2 text-sm ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}
        >
          Select your education system
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {EDUCATION_LEVELS.map((level) => (
          <label
            key={level.value}
            className={`relative flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
              formData.level === level.value
                ? isDark
                  ? 'border-indigo-500 bg-indigo-900/20 ring-2 ring-indigo-500/20'
                  : 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500/20'
                : isDark
                ? 'border-slate-600 bg-slate-800/50 hover:border-slate-500 hover:bg-slate-800'
                : 'border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50'
            }`}
          >
            <input
              type="radio"
              name="level"
              value={level.value}
              checked={formData.level === level.value}
              onChange={(e) =>
                updateFormData('level', e.target.value as EducationLevel)
              }
              className="sr-only"
            />
            <div className="flex items-center">
              <Award
                className={`w-5 h-5 mr-3 ${
                  formData.level === level.value
                    ? isDark
                      ? 'text-indigo-400'
                      : 'text-indigo-600'
                    : isDark
                    ? 'text-slate-400'
                    : 'text-slate-500'
                }`}
              />
              <div>
                <span
                  className={`font-medium ${
                    formData.level === level.value
                      ? isDark
                        ? 'text-indigo-400'
                        : 'text-indigo-600'
                      : isDark
                      ? 'text-slate-300'
                      : 'text-slate-700'
                  }`}
                >
                  {level.label}
                </span>
                <p
                  className={`text-sm ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  {level.description}
                </p>
              </div>
            </div>
            {formData.level === level.value && (
              <Check
                className={`w-5 h-5 ${
                  isDark ? 'text-indigo-400' : 'text-indigo-600'
                }`}
              />
            )}
          </label>
        ))}
      </div>

      {errors.level && (
        <p className="text-sm text-red-600 text-center">{errors.level}</p>
      )}
    </div>
  );
};

// Step 4: Subject Selection
const SubjectsStep: React.FC = () => {
  const { formData, updateFormData, errors } = useFormContext();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleSubjectToggle = (subject: string) => {
    const currentSubjects = formData.subjects;
    const newSubjects = currentSubjects.includes(subject)
      ? currentSubjects.filter((s) => s !== subject)
      : [...currentSubjects, subject];

    updateFormData('subjects', newSubjects);
  };

  const isTeacher = formData.role === 'teacher';
  const title = isTeacher
    ? 'Subjects you can teach'
    : 'Subjects you want to learn';
  const subtitle = isTeacher
    ? 'Select the subjects you are qualified to teach'
    : 'Choose the subjects you are interested in learning';

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3
          className={`text-xl font-semibold ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          {title}
        </h3>
        <p
          className={`mt-2 text-sm ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}
        >
          {subtitle}
        </p>
      </div>

      <div className="space-y-4 max-h-80 overflow-y-auto">
        {Object.entries(SUBJECTS).map(([categoryKey, category]) => (
          <div key={categoryKey} className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">{category.icon}</span>
              <h4
                className={`text-sm font-medium ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                {category.name}
              </h4>
            </div>
            <div className="grid grid-cols-2 gap-2 ml-6">
              {category.subjects.map((subject) => (
                <label
                  key={subject}
                  className={`relative flex items-center p-2 rounded-lg cursor-pointer transition-all duration-200 border ${
                    formData.subjects.includes(subject)
                      ? isDark
                        ? 'border-indigo-500 bg-indigo-900/20'
                        : 'border-indigo-500 bg-indigo-50'
                      : isDark
                      ? 'border-slate-600 bg-slate-800/30 hover:border-slate-500 hover:bg-slate-800/50'
                      : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.subjects.includes(subject)}
                    onChange={() => handleSubjectToggle(subject)}
                    className="sr-only"
                  />
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`text-xs font-medium ${
                        formData.subjects.includes(subject)
                          ? isDark
                            ? 'text-indigo-400'
                            : 'text-indigo-600'
                          : isDark
                          ? 'text-slate-300'
                          : 'text-slate-700'
                      }`}
                    >
                      {subject}
                    </span>
                    {formData.subjects.includes(subject) && (
                      <Check
                        className={`w-3 h-3 ${
                          isDark ? 'text-indigo-400' : 'text-indigo-600'
                        }`}
                      />
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Selected subjects summary */}
      {formData.subjects.length > 0 && (
        <div
          className={`p-3 rounded-lg ${
            isDark ? 'bg-slate-800' : 'bg-slate-50'
          }`}
        >
          <p
            className={`text-xs font-medium mb-2 ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}
          >
            Selected ({formData.subjects.length}):
          </p>
          <div className="flex flex-wrap gap-1">
            {formData.subjects.map((subject) => (
              <span
                key={subject}
                className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                  isDark
                    ? 'bg-indigo-900/30 text-indigo-400 border border-indigo-700/50'
                    : 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                }`}
              >
                {subject}
                <button
                  type="button"
                  onClick={() => handleSubjectToggle(subject)}
                  className={`ml-1 hover:opacity-75 ${
                    isDark ? 'text-indigo-400' : 'text-indigo-600'
                  }`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {errors.subjects && (
        <p className="text-sm text-red-600 text-center">{errors.subjects}</p>
      )}
    </div>
  );
};

// Step 5: Terms and Submit
const TermsStep: React.FC = () => {
  const { formData, updateFormData, errors } = useFormContext();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3
          className={`text-xl font-semibold ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Review & Complete
        </h3>
        <p
          className={`mt-2 text-sm ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}
        >
          Review your information and accept our terms
        </p>
      </div>

      {/* Summary */}
      <div
        className={`p-4 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}
      >
        <h4
          className={`text-sm font-medium mb-3 ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}
        >
          Summary
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
              Role:
            </span>
            <span className={isDark ? 'text-slate-200' : 'text-slate-900'}>
              {formData.role === 'student' ? 'Student' : 'Teacher'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
              Name:
            </span>
            <span className={isDark ? 'text-slate-200' : 'text-slate-900'}>
              {formData.name}
            </span>
          </div>
          <div className="flex justify-between">
            <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
              Email:
            </span>
            <span className={isDark ? 'text-slate-200' : 'text-slate-900'}>
              {formData.email}
            </span>
          </div>
          <div className="flex justify-between">
            <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
              Level:
            </span>
            <span className={isDark ? 'text-slate-200' : 'text-slate-900'}>
              {formData.level}
            </span>
          </div>
          <div className="flex justify-between">
            <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
              Subjects:
            </span>
            <span className={isDark ? 'text-slate-200' : 'text-slate-900'}>
              {formData.subjects.length} selected
            </span>
          </div>
        </div>
      </div>

      {/* Terms Checkbox */}
      <div className="flex items-start space-x-3">
        <input
          id="terms"
          type="checkbox"
          checked={formData.acceptTerms}
          onChange={(e) => updateFormData('acceptTerms', e.target.checked)}
          className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
        <label
          htmlFor="terms"
          className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}
        >
          I agree to the{' '}
          <Link href="/terms" className="text-indigo-600 hover:text-indigo-500">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            href="/privacy"
            className="text-indigo-600 hover:text-indigo-500"
          >
            Privacy Policy
          </Link>
        </label>
      </div>

      {errors.acceptTerms && (
        <p className="text-sm text-red-600 text-center">{errors.acceptTerms}</p>
      )}
    </div>
  );
};

// Email Verification Component (same as before)
const EmailVerification: React.FC = () => {
  const { registeredEmail, setCurrentStep } = useFormContext();
  const { theme } = useTheme();
  const { sendVerificationEmail } = useAuth();
  const { success, error: showError } = useToast();
  const [isResendingEmail, setIsResendingEmail] = useState(false);
  const isDark = theme === 'dark';

  const handleResendVerification = async () => {
    try {
      setIsResendingEmail(true);
      const result = await sendVerificationEmail();

      if (result.success) {
        success('Verification email sent successfully!');
      } else {
        showError(result.error || 'Failed to send verification email');
      }
    } catch (_error) {
      console.error('Error resending verification email:', _error);
      showError('Failed to resend verification email');
    } finally {
      setIsResendingEmail(false);
    }
  };

  return (
    <Card className="shadow-2xl">
      <CardHeader>
        <CardTitle className="text-center">
          <div className="flex flex-col items-center space-y-4">
            <div
              className={`p-4 rounded-full ${
                isDark ? 'bg-indigo-900' : 'bg-indigo-100'
              }`}
            >
              <Mail
                className={`w-8 h-8 ${
                  isDark ? 'text-indigo-400' : 'text-indigo-600'
                }`}
              />
            </div>
            <div>
              <h3
                className={`text-2xl font-semibold ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                Check Your Email
              </h3>
              <p
                className={`mt-2 text-sm ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                We&apos;ve sent a verification link to
              </p>
              <p
                className={`font-medium ${
                  isDark ? 'text-indigo-400' : 'text-indigo-600'
                }`}
              >
                {registeredEmail}
              </p>
            </div>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div
          className={`p-4 rounded-lg ${
            isDark ? 'bg-slate-800' : 'bg-slate-50'
          }`}
        >
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p
                className={`font-medium ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                What&apos;s next?
              </p>
              <ol
                className={`mt-2 space-y-1 list-decimal list-inside ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                <li>Check your email inbox (and spam folder)</li>
                <li>Click the verification link in the email</li>
                <li>Return here to sign in to your account</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleResendVerification}
            disabled={isResendingEmail}
            variant="outline"
            className="w-full"
          >
            {isResendingEmail ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Resend Verification Email
              </>
            )}
          </Button>

          <Button onClick={() => setCurrentStep('role')} className="w-full">
            Continue to Sign In
          </Button>
        </div>

        <div className="text-center">
          <p
            className={`text-sm ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Wrong email address?{' '}
            <button
              type="button"
              onClick={() => setCurrentStep('role')}
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              Try again
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

// Navigation Buttons Component
const NavigationButtons: React.FC<{
  mode: AuthMode;
  onSubmit?: () => void;
}> = ({ mode, onSubmit }) => {
  const { currentStep, nextStep, prevStep, canProceed } = useFormContext();
  const { isLoading } = useAuth();

  if (currentStep === 'verification' || mode === 'login') return null;

  const currentIndex = REGISTRATION_STEPS.findIndex(
    (s) => s.step === currentStep
  );
  const isFirstStep = currentIndex === 0;
  const isLastStep = currentIndex === REGISTRATION_STEPS.length - 1;

  return (
    <div className="flex justify-between pt-6">
      <Button
        type="button"
        variant="outline"
        onClick={prevStep}
        disabled={isFirstStep || isLoading}
        className={isFirstStep ? 'invisible' : ''}
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Previous
      </Button>

      {isLastStep ? (
        <Button
          type="button"
          onClick={onSubmit}
          disabled={!canProceed() || isLoading}
          loading={isLoading}
        >
          Create Account
        </Button>
      ) : (
        <Button type="button" onClick={nextStep} disabled={!canProceed()}>
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      )}
    </div>
  );
};

// Step Renderer Component
const StepRenderer: React.FC = () => {
  const { currentStep } = useFormContext();

  switch (currentStep) {
    case 'role':
      return <RoleStep />;
    case 'personal':
      return <PersonalStep />;
    case 'education':
      return <EducationStep />;
    case 'subjects':
      return <SubjectsStep />;
    case 'terms':
      return <TermsStep />;
    case 'verification':
      return <EmailVerification />;
    default:
      return <RoleStep />;
  }
};

// Main Auth Form Component
const AuthFormContent: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const { login, register, loginWithGoogle, isLoading, isAuthenticated } =
    useAuth();
  const { success, error: showError } = useToast();
  const {
    formData,
    errors,
    setErrors,
    setCurrentStep,
    setRegisteredEmail,
    updateFormData,
  } = useFormContext();

  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);

  const isDark = theme === 'dark';

  // Set mode from URL params
  useEffect(() => {
    const modeParam = searchParams.get('mode');
    if (
      modeParam === 'register' ||
      modeParam === 'login' ||
      modeParam === 'verify-email'
    ) {
      setMode(modeParam as AuthMode);
    }
  }, [searchParams]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const validateCurrentStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (mode === 'register') {
      // Validate based on current step (this is handled in canProceed)
      return true;
    } else {
      // Login validation
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }

      if (!formData.password) {
        newErrors.password = 'Password is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateCurrentStep()) return;

    try {
      const result = await login({
        email: formData.email,
        password: formData.password,
      });

      if (result.success) {
        success('Successfully logged in!');
        // Let the dashboard router handle the redirect
        router.push('/dashboard');
      } else {
        showError(result.error || 'Login failed');
      }
    } catch (_error) {
      showError('An unexpected error occurred');
      console.error('Auth error:', _error);
    }
  };
  const handleRegister = async () => {
    try {
      const result = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        subjects: formData.subjects,
        level: formData.level,
      });

      if (result.success) {
        setRegisteredEmail(formData.email);
        setCurrentStep('verification');
        success(
          'Account created successfully! Please check your email for verification.'
        );
      } else {
        showError(result.error || 'Registration failed');
      }
    } catch (_error) {
      showError('An unexpected error occurred');
      console.error('Auth error:', _error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (_error) {
      console.log(_error);
      showError('Google login failed');
    }
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setErrors({});
    setCurrentStep('role');
    router.push(`/auth?mode=${newMode}`);
  };

  if (mode === 'register') {
    return (
      <Card className="shadow-2xl">
        <CardHeader>
          <CardTitle className="text-center">
            <div
              className={`text-3xl font-bold bg-gradient-to-r ${
                isDark
                  ? 'from-indigo-300 to-blue-400'
                  : 'from-indigo-600 to-blue-600'
              } bg-clip-text text-transparent mb-2`}
            >
              MisterA&apos;s
            </div>
            <div
              className={`text-2xl font-semibold ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Create Account
            </div>
            <p
              className={`mt-2 text-sm ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              Join thousands of learners worldwide
            </p>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <ProgressBar />
          <StepRenderer />
          <NavigationButtons mode={mode} onSubmit={handleRegister} />

          {/* Switch to Login */}
          <div className="text-center pt-4 border-t border-slate-200 dark:border-slate-700">
            <p
              className={`text-sm ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => switchMode('login')}
                className="text-indigo-600 hover:text-indigo-500 font-medium"
                disabled={isLoading}
              >
                Sign in
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Login Form
  return (
    <Card className="shadow-2xl">
      <CardHeader>
        <CardTitle className="text-center">
          <div
            className={`text-3xl font-bold bg-gradient-to-r ${
              isDark
                ? 'from-indigo-300 to-blue-400'
                : 'from-indigo-600 to-blue-600'
            } bg-clip-text text-transparent mb-2`}
          >
            MisterA&apos;s
          </div>
          <div
            className={`text-2xl font-semibold ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Welcome Back
          </div>
          <p
            className={`mt-2 text-sm ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Sign in to continue your learning journey
          </p>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Google Login */}
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          <Chrome className="w-5 h-5 mr-2" />
          Continue with Google
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div
              className={`w-full border-t ${
                isDark ? 'border-slate-700' : 'border-slate-300'
              }`}
            />
          </div>
          <div className="relative flex justify-center text-sm">
            <span
              className={`px-2 ${
                isDark
                  ? 'bg-slate-800 text-slate-400'
                  : 'bg-white text-slate-500'
              }`}
            >
              Or continue with email
            </span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            error={errors.email}
            placeholder="Enter your email"
            disabled={isLoading}
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => updateFormData('password', e.target.value)}
              error={errors.password}
              placeholder="Enter your password"
              disabled={isLoading}
            />
            <button
              type="button"
              className={`absolute right-3 top-9 ${
                isDark
                  ? 'text-slate-400 hover:text-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
            loading={isLoading}
          >
            Sign In
          </Button>
        </form>

        {/* Switch to Register */}
        <div className="text-center">
          <p
            className={`text-sm ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Don&apos;t have an account?{' '}
            <button
              type="button"
              onClick={() => switchMode('register')}
              className="text-indigo-600 hover:text-indigo-500 font-medium"
              disabled={isLoading}
            >
              Sign up
            </button>
          </p>
        </div>

        <div className="text-center">
          <Link
            href="/forgot-password"
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            Forgot your password?
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

// Main AuthForm Component
export default function AuthForm() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <FormProvider>
      <div
        className={`min-h-screen flex items-center justify-center py-2 px-4 sm:px-6 lg:px-8 ${
          isDark ? 'bg-slate-900' : 'bg-slate-50'
        }`}
      >
        <div className="max-w-md w-full space-y-8">
          {/* Back to Home */}

          <AuthFormContent />
        </div>
      </div>
    </FormProvider>
  );
}
