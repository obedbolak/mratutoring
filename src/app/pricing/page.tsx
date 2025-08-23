// src/app/pricing/page.tsx
'use client';

import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button, Card, CardContent } from '@/components/ui';
import {
  Check,
  Star,
  Users,
  Video,
  MessageCircle,
  Calendar,
  Award,
  BookOpen,
  Clock,
  Shield,
  Zap,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function PricingPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>(
    'monthly'
  );

  const plans = [
    {
      name: 'Basic Student',
      description: 'Perfect for individual students getting started',
      price: {
        monthly: '5,000',
        yearly: '50,000',
      },
      popular: false,
      features: [
        'Browse unlimited tutor profiles',
        'Book up to 4 sessions per month',
        'Basic messaging with tutors',
        'Access to study resources',
        'Mobile app access',
        'Email support',
      ],
      limitations: [
        'Limited to 4 sessions/month',
        'No priority booking',
        'Standard support only',
      ],
      icon: BookOpen,
      color: 'from-blue-500 to-indigo-500',
    },
    {
      name: 'Premium Student',
      description: 'Most popular choice for serious learners',
      price: {
        monthly: '12,000',
        yearly: '120,000',
      },
      popular: true,
      features: [
        'Everything in Basic',
        'Unlimited tutoring sessions',
        'Priority tutor booking',
        'Video call sessions',
        'Advanced progress tracking',
        'Homework help chat',
        'Practice tests and assessments',
        'Priority customer support',
        'Study group access',
      ],
      limitations: [],
      icon: Star,
      color: 'from-indigo-500 to-purple-500',
    },
    {
      name: 'Family Plan',
      description: 'Best value for families with multiple students',
      price: {
        monthly: '20,000',
        yearly: '200,000',
      },
      popular: false,
      features: [
        'Everything in Premium',
        'Up to 4 student accounts',
        'Family dashboard',
        'Progress reports for parents',
        'Bulk session discounts',
        'Dedicated family coordinator',
        'Group tutoring sessions',
        'Advanced analytics',
      ],
      limitations: [],
      icon: Users,
      color: 'from-purple-500 to-pink-500',
    },
  ];

  const tutorPlans = [
    {
      name: 'New Tutor',
      description: 'For tutors just starting on our platform',
      commission: '15%',
      features: [
        'Profile listing',
        'Basic messaging',
        'Payment processing',
        'Student reviews',
        'Mobile app access',
        'Email support',
      ],
      color: 'from-green-500 to-emerald-500',
    },
    {
      name: 'Verified Tutor',
      description: 'For experienced tutors with good ratings',
      commission: '12%',
      features: [
        'Everything in New Tutor',
        'Verified badge',
        'Priority in search results',
        'Advanced scheduling tools',
        'Performance analytics',
        'Priority support',
      ],
      color: 'from-emerald-500 to-teal-500',
    },
    {
      name: 'Expert Tutor',
      description: 'For top-performing tutors with excellent ratings',
      commission: '10%',
      features: [
        'Everything in Verified Tutor',
        'Expert badge',
        'Top placement in searches',
        'Advanced teaching tools',
        'Dedicated account manager',
        'Marketing support',
      ],
      color: 'from-teal-500 to-cyan-500',
    },
  ];

  const additionalServices = [
    {
      name: 'One-time Session',
      price: '3,500 FCFA',
      description: 'Single tutoring session without subscription',
      icon: Clock,
    },
    {
      name: 'Exam Intensive',
      price: '25,000 FCFA',
      description: '1-week intensive exam preparation package',
      icon: Award,
    },
    {
      name: 'Group Sessions',
      price: '2,000 FCFA',
      description: 'Per student for group tutoring sessions',
      icon: Users,
    },
  ];

  const faqs = [
    {
      question: 'Can I cancel my subscription anytime?',
      answer:
        "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.",
    },
    {
      question: 'Do you offer refunds?',
      answer:
        'We offer a 7-day money-back guarantee for new subscriptions. Unused session credits can be refunded within 30 days.',
    },
    {
      question: 'How do tutor commissions work?',
      answer:
        'Tutors keep 85-90% of their session fees depending on their tier. We handle all payment processing and provide platform support.',
    },
    {
      question: 'Are there any setup fees?',
      answer:
        'No setup fees for students. Tutors pay a one-time 5,000 FCFA verification fee to get started on the platform.',
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
              Simple, Transparent
              <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent block">
                Pricing
              </span>
            </h1>
            <p
              className={`text-xl ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              } max-w-3xl mx-auto mb-8`}
            >
              Choose the perfect plan for your learning journey. No hidden fees,
              cancel anytime, and start with a 7-day free trial.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <span
                className={
                  billingCycle === 'monthly'
                    ? 'font-semibold'
                    : 'text-slate-500'
                }
              >
                Monthly
              </span>
              <button
                onClick={() =>
                  setBillingCycle(
                    billingCycle === 'monthly' ? 'yearly' : 'monthly'
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                  billingCycle === 'yearly' ? 'bg-indigo-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    billingCycle === 'yearly'
                      ? 'translate-x-6'
                      : 'translate-x-1'
                  }`}
                />
              </button>
              <span
                className={
                  billingCycle === 'yearly' ? 'font-semibold' : 'text-slate-500'
                }
              >
                Yearly
                <span className="ml-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  Save 17%
                </span>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Student Plans */}
      <section ref={ref} className="pb-16">
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
              Student Plans
            </h2>
            <p
              className={`text-lg ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              } max-w-2xl mx-auto`}
            >
              Choose the plan that fits your learning needs and budget.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Card
                    className={`relative h-full ${
                      plan.popular
                        ? `ring-2 ring-indigo-600 ${
                            isDark ? 'bg-slate-800' : 'bg-white'
                          }`
                        : isDark
                        ? 'bg-slate-800 border-slate-700'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                          Most Popular
                        </span>
                      </div>
                    )}

                    <CardContent className="p-8">
                      <div className="text-center mb-8">
                        <div
                          className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${plan.color} mb-4`}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h3
                          className={`text-2xl font-bold ${
                            isDark ? 'text-white' : 'text-slate-900'
                          } mb-2`}
                        >
                          {plan.name}
                        </h3>
                        <p
                          className={`${
                            isDark ? 'text-slate-400' : 'text-slate-600'
                          } mb-4`}
                        >
                          {plan.description}
                        </p>
                        <div className="flex items-baseline justify-center gap-1">
                          <span
                            className={`text-4xl font-bold ${
                              isDark ? 'text-white' : 'text-slate-900'
                            }`}
                          >
                            {plan.price[billingCycle]} FCFA
                          </span>
                          <span
                            className={`${
                              isDark ? 'text-slate-400' : 'text-slate-600'
                            }`}
                          >
                            /{billingCycle === 'monthly' ? 'month' : 'year'}
                          </span>
                        </div>
                      </div>

                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-start gap-3"
                          >
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span
                              className={
                                isDark ? 'text-slate-300' : 'text-slate-600'
                              }
                            >
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        className={`w-full ${
                          plan.popular
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                            : ''
                        }`}
                        variant={plan.popular ? 'primary' : 'outline'}
                      >
                        {plan.popular ? 'Start Free Trial' : 'Get Started'}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Tutor Plans */}
      <section className={`py-20 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
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
              Tutor Commission Structure
            </h2>
            <p
              className={`text-lg ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              } max-w-2xl mx-auto`}
            >
              Earn more as you build your reputation and deliver excellent
              results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tutorPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  className={`h-full ${
                    isDark
                      ? 'bg-slate-700 border-slate-600'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div
                        className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${plan.color} mb-4`}
                      >
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <h3
                        className={`text-xl font-bold ${
                          isDark ? 'text-white' : 'text-slate-900'
                        } mb-2`}
                      >
                        {plan.name}
                      </h3>
                      <p
                        className={`text-sm ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        } mb-4`}
                      >
                        {plan.description}
                      </p>
                      <div
                        className={`text-3xl font-bold ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {plan.commission}
                      </div>
                      <div
                        className={`text-sm ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        platform commission
                      </div>
                    </div>

                    <ul className="space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-start gap-2 text-sm"
                        >
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span
                            className={
                              isDark ? 'text-slate-300' : 'text-slate-600'
                            }
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
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
              Additional Services
            </h2>
            <p
              className={`text-lg ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              } max-w-2xl mx-auto`}
            >
              Flexible options for different learning needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card
                    className={`p-6 text-center ${
                      isDark
                        ? 'bg-slate-800 border-slate-700'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <CardContent className="space-y-4">
                      <Icon
                        className={`w-10 h-10 ${
                          isDark ? 'text-indigo-400' : 'text-indigo-600'
                        } mx-auto`}
                      />
                      <h3
                        className={`text-lg font-semibold ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {service.name}
                      </h3>
                      <p
                        className={`text-2xl font-bold ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {service.price}
                      </p>
                      <p
                        className={`text-sm ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={`py-20 ${isDark ? 'bg-slate-800' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
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
              Pricing FAQ
            </h2>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  className={
                    isDark
                      ? 'bg-slate-700 border-slate-600'
                      : 'bg-white border-slate-200'
                  }
                >
                  <CardContent className="p-6">
                    <h3
                      className={`text-lg font-semibold ${
                        isDark ? 'text-white' : 'text-slate-900'
                      } mb-3`}
                    >
                      {faq.question}
                    </h3>
                    <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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
              Ready to Get Started?
            </h2>
            <p
              className={`text-lg ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              } mb-8`}
            >
              Join thousands of students and tutors already using MisterA's to
              achieve their goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-4">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Contact Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
