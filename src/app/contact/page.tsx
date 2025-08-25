// src/app/contact/page.tsx
'use client';

import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button, Card, CardContent } from '@/components/ui';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function ContactPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general',
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'misteras@gmail.com',
      description: "Send us an email and we'll respond within 24 hours",
      color: 'from-blue-500 to-indigo-500',
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '+237 542 06 555',
      description: 'Monday to Friday, 8:00 AM to 6:00 PM WAT',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      content: 'Carrefour Obili, Yaoundé',
      description: 'Our main office in Cameroon',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      content: 'Available 24/7',
      description: 'Get instant help from our support team',
      color: 'from-orange-500 to-red-500',
    },
  ];

  const faqItems = [
    {
      question: 'How do I find a tutor in my area?',
      answer:
        'Use our search filters to find tutors by location, subject, and availability in your city.',
    },
    {
      question: 'What are the payment methods?',
      answer:
        'We accept Mobile Money (MTN, Orange), bank transfers, and cash payments for home tutoring sessions.',
    },
    {
      question: "Can I get a refund if I'm not satisfied?",
      answer:
        'Yes, we offer a satisfaction guarantee. Contact us within 48 hours of your first session.',
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
              Get in
              <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent block">
                Touch with Us
              </span>
            </h1>
            <p
              className={`text-xl ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              } max-w-3xl mx-auto`}
            >
              Have questions about our platform, need help finding a tutor, or
              want to provide feedback? We&apos;re here to help and would love
              to hear from you.
            </p>
          </motion.div>

          {/* Contact Methods */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Card
                    className={`text-center p-6 h-full hover:shadow-lg transition-all duration-300 ${
                      isDark
                        ? 'bg-slate-800 border-slate-700'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <CardContent className="space-y-4">
                      <div
                        className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${info.color} mb-4`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3
                        className={`text-lg font-semibold ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {info.title}
                      </h3>
                      <p
                        className={`font-medium ${
                          isDark ? 'text-indigo-400' : 'text-indigo-600'
                        }`}
                      >
                        {info.content}
                      </p>
                      <p
                        className={`text-sm ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        {info.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Contact Form & FAQ */}
      <section ref={ref} className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
            >
              <Card
                className={
                  isDark
                    ? 'bg-slate-800 border-slate-700'
                    : 'bg-white border-slate-200'
                }
              >
                <CardContent className="p-8">
                  <h2
                    className={`text-2xl font-bold ${
                      isDark ? 'text-white' : 'text-slate-900'
                    } mb-6`}
                  >
                    Send us a Message
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          className={`block text-sm font-medium ${
                            isDark ? 'text-slate-300' : 'text-slate-700'
                          } mb-2`}
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 rounded-lg border ${
                            isDark
                              ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                              : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
                          } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                          placeholder="Your full name"
                        />
                      </div>

                      <div>
                        <label
                          className={`block text-sm font-medium ${
                            isDark ? 'text-slate-300' : 'text-slate-700'
                          } mb-2`}
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 rounded-lg border ${
                            isDark
                              ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                              : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
                          } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium ${
                          isDark ? 'text-slate-300' : 'text-slate-700'
                        } mb-2`}
                      >
                        Inquiry Type
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          isDark
                            ? 'bg-slate-700 border-slate-600 text-white'
                            : 'bg-white border-slate-300 text-slate-900'
                        } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                      >
                        <option value="general">General Inquiry</option>
                        <option value="tutor">Find a Tutor</option>
                        <option value="technical">Technical Support</option>
                        <option value="billing">Billing Question</option>
                        <option value="partnership">Partnership</option>
                      </select>
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium ${
                          isDark ? 'text-slate-300' : 'text-slate-700'
                        } mb-2`}
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 rounded-lg border ${
                          isDark
                            ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                            : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
                        } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                        placeholder="Brief subject of your message"
                      />
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium ${
                          isDark ? 'text-slate-300' : 'text-slate-700'
                        } mb-2`}
                      >
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          isDark
                            ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                            : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
                        } focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none`}
                        placeholder="Tell us how we can help you..."
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-8">
                <div>
                  <h2
                    className={`text-2xl font-bold ${
                      isDark ? 'text-white' : 'text-slate-900'
                    } mb-6`}
                  >
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    {faqItems.map((faq, index) => (
                      <Card
                        key={index}
                        className={
                          isDark
                            ? 'bg-slate-800 border-slate-700'
                            : 'bg-white border-slate-200'
                        }
                      >
                        <CardContent className="p-6">
                          <h3
                            className={`font-semibold ${
                              isDark ? 'text-white' : 'text-slate-900'
                            } mb-2`}
                          >
                            {faq.question}
                          </h3>
                          <p
                            className={
                              isDark ? 'text-slate-400' : 'text-slate-600'
                            }
                          >
                            {faq.answer}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Office Hours */}
                <Card
                  className={
                    isDark
                      ? 'bg-slate-800 border-slate-700'
                      : 'bg-white border-slate-200'
                  }
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Clock
                        className={`w-6 h-6 ${
                          isDark ? 'text-indigo-400' : 'text-indigo-600'
                        }`}
                      />
                      <h3
                        className={`text-lg font-semibold ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        Office Hours
                      </h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span
                          className={
                            isDark ? 'text-slate-400' : 'text-slate-600'
                          }
                        >
                          Monday - Friday
                        </span>
                        <span
                          className={isDark ? 'text-white' : 'text-slate-900'}
                        >
                          8:00 AM - 6:00 PM
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span
                          className={
                            isDark ? 'text-slate-400' : 'text-slate-600'
                          }
                        >
                          Saturday
                        </span>
                        <span
                          className={isDark ? 'text-white' : 'text-slate-900'}
                        >
                          9:00 AM - 2:00 PM
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span
                          className={
                            isDark ? 'text-slate-400' : 'text-slate-600'
                          }
                        >
                          Sunday
                        </span>
                        <span
                          className={isDark ? 'text-white' : 'text-slate-900'}
                        >
                          Closed
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
