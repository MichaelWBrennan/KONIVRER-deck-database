/**
 * KONIVRER Deck Database
 *
 * Copyright (c) 2024 KONIVRER Deck Database
 * Licensed under the MIT License
 */

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Mail,
  Lock,
  User,
  MapPin,
  Eye,
  EyeOff,
  Shield,
  CheckCircle,
  AlertCircle,
  Loader2,
  Github,
  Chrome,
  Zap,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// Form validation schemas
const LoginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

const RegisterSchema = z
  .object({
    email: z.string().email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        'Password must contain uppercase, lowercase, number, and special character',
      ),
    confirmPassword: z.string(),
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must be less than 20 characters')
      .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    location: z.string().optional(),
    agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms'),
    agreeToPrivacy: z.boolean().refine(val => val === true, 'You must agree to the privacy policy'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type LoginFormData = z.infer<typeof LoginSchema>;
type RegisterFormData = z.infer<typeof RegisterSchema>;

interface ModernAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'register';
}

const ModernAuthModal: React.FC<ModernAuthModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'login' as 'login' | 'register',
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(defaultTab as 'login' | 'register');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [ssoLoading, setSsoLoading] = useState<string | null>(null);
  const { login, register } = useAuth();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
      firstName: '',
      lastName: '',
      location: '',
      agreeToTerms: false,
      agreeToPrivacy: false,
    },
  });

  useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultTab as 'login' | 'register');
      loginForm.reset();
      registerForm.reset();
    }
  }, [isOpen, defaultTab, loginForm, registerForm]);

  const handleLogin = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      onClose();
    } catch (error) {
      loginForm.setError('root', {
        message: error instanceof Error ? error.message : 'Login failed',
      });
    }
  };

  const handleRegister = async (data: RegisterFormData) => {
    try {
      await register({
        email: data.email,
        password: data.password,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        location: data.location,
      });
      onClose();
    } catch (error) {
      registerForm.setError('root', {
        message: error instanceof Error ? error.message : 'Registration failed',
      });
    }
  };

  const handleSSOLogin = async (provider: string) => {
    setSsoLoading(provider);
    try {
      // Implement SSO login logic here
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      onClose();
    } catch (error) {
      console.error(`${provider} login failed:`, error);
    } finally {
      setSsoLoading(null);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'var(--bg-overlay)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md rounded-2xl overflow-hidden"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            boxShadow: 'var(--shadow-xl)',
          }}
          onClick={e => e.stopPropagation()}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-accent-secondary/5"></div>
          <div className="relative z-10 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-lg flex items-center justify-center">
                  <Shield className="text-white" size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
                    {activeTab === 'login' ? 'Welcome Back' : 'Join KONIVRER'}
                  </h2>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Ancient Archives Await
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg transition-colors"
                style={{ color: 'var(--text-secondary)', background: 'var(--bg-tertiary)' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-1 mb-6 p-1 bg-tertiary rounded-lg">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'login'
                    ? 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white shadow-md'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'register'
                    ? 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white shadow-md'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                Register
              </button>
            </div>

            {/* Forms */}
            <AnimatePresence mode="wait">
              {activeTab === 'login' && (
                <motion.form
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={loginForm.handleSubmit(handleLogin)}
                  className="space-y-4"
                >
                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tertiary"
                        size={16}
                      />
                      <input
                        {...loginForm.register('email')}
                        type="email"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border transition-colors"
                        style={{
                          background: 'var(--bg-tertiary)',
                          border: '1px solid var(--border-primary)',
                          color: 'var(--text-primary)',
                        }}
                        placeholder="Enter your email"
                      />
                    </div>
                    {loginForm.formState.errors.email && (
                      <p className="text-red-400 text-sm mt-1">
                        {loginForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tertiary"
                        size={16}
                      />
                      <input
                        {...loginForm.register('password')}
                        type={showPassword ? 'text' : 'password'}
                        className="w-full pl-10 pr-12 py-3 rounded-lg border transition-colors"
                        style={{
                          background: 'var(--bg-tertiary)',
                          border: '1px solid var(--border-primary)',
                          color: 'var(--text-primary)',
                        }}
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-tertiary hover:text-primary"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {loginForm.formState.errors.password && (
                      <p className="text-red-400 text-sm mt-1">
                        {loginForm.formState.errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* Error Message */}
                  {loginForm.formState.errors.root && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 text-sm flex items-center gap-2"
                    >
                      <AlertCircle size={16} />
                      {loginForm.formState.errors.root.message}
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loginForm.formState.isSubmitting}
                    className="btn btn-primary w-full flex items-center justify-center gap-2"
                  >
                    {loginForm.formState.isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      <>
                        <Shield size={16} />
                        Sign In
                      </>
                    )}
                  </button>

                  {/* Demo Accounts */}
                  <div className="text-center text-sm text-secondary">
                    <p className="mb-2">Demo accounts:</p>
                    <div className="space-y-1">
                      <p>
                        <strong>user1@example.com</strong> / password (Player + Judge)
                      </p>
                      <p>
                        <strong>judge@example.com</strong> / password (All roles)
                      </p>
                    </div>
                  </div>
                </motion.form>
              )}

              {activeTab === 'register' && (
                <motion.form
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={registerForm.handleSubmit(handleRegister)}
                  className="space-y-4"
                >
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        First Name
                      </label>
                      <input
                        {...registerForm.register('firstName')}
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border transition-colors"
                        style={{
                          background: 'var(--bg-tertiary)',
                          border: '1px solid var(--border-primary)',
                          color: 'var(--text-primary)',
                        }}
                        placeholder="First name"
                      />
                      {registerForm.formState.errors.firstName && (
                        <p className="text-red-400 text-sm mt-1">
                          {registerForm.formState.errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Last Name
                      </label>
                      <input
                        {...registerForm.register('lastName')}
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border transition-colors"
                        style={{
                          background: 'var(--bg-tertiary)',
                          border: '1px solid var(--border-primary)',
                          color: 'var(--text-primary)',
                        }}
                        placeholder="Last name"
                      />
                      {registerForm.formState.errors.lastName && (
                        <p className="text-red-400 text-sm mt-1">
                          {registerForm.formState.errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Username Field */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Username
                    </label>
                    <div className="relative">
                      <User
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tertiary"
                        size={16}
                      />
                      <input
                        {...registerForm.register('username')}
                        type="text"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border transition-colors"
                        style={{
                          background: 'var(--bg-tertiary)',
                          border: '1px solid var(--border-primary)',
                          color: 'var(--text-primary)',
                        }}
                        placeholder="Choose a username"
                      />
                    </div>
                    {registerForm.formState.errors.username && (
                      <p className="text-red-400 text-sm mt-1">
                        {registerForm.formState.errors.username.message}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tertiary"
                        size={16}
                      />
                      <input
                        {...registerForm.register('email')}
                        type="email"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border transition-colors"
                        style={{
                          background: 'var(--bg-tertiary)',
                          border: '1px solid var(--border-primary)',
                          color: 'var(--text-primary)',
                        }}
                        placeholder="Enter your email"
                      />
                    </div>
                    {registerForm.formState.errors.email && (
                      <p className="text-red-400 text-sm mt-1">
                        {registerForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Location Field */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Location (Optional)
                    </label>
                    <div className="relative">
                      <MapPin
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tertiary"
                        size={16}
                      />
                      <input
                        {...registerForm.register('location')}
                        type="text"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border transition-colors"
                        style={{
                          background: 'var(--bg-tertiary)',
                          border: '1px solid var(--border-primary)',
                          color: 'var(--text-primary)',
                        }}
                        placeholder="City, Country"
                      />
                    </div>
                  </div>

                  {/* Password Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tertiary"
                          size={16}
                        />
                        <input
                          {...registerForm.register('password')}
                          type={showPassword ? 'text' : 'password'}
                          className="w-full pl-10 pr-12 py-3 rounded-lg border transition-colors"
                          style={{
                            background: 'var(--bg-tertiary)',
                            border: '1px solid var(--border-primary)',
                            color: 'var(--text-primary)',
                          }}
                          placeholder="Password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-tertiary hover:text-primary"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                      {registerForm.formState.errors.password && (
                        <p className="text-red-400 text-sm mt-1">
                          {registerForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tertiary"
                          size={16}
                        />
                        <input
                          {...registerForm.register('confirmPassword')}
                          type={showConfirmPassword ? 'text' : 'password'}
                          className="w-full pl-10 pr-12 py-3 rounded-lg border transition-colors"
                          style={{
                            background: 'var(--bg-tertiary)',
                            border: '1px solid var(--border-primary)',
                            color: 'var(--text-primary)',
                          }}
                          placeholder="Confirm"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-tertiary hover:text-primary"
                        >
                          {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                      {registerForm.formState.errors.confirmPassword && (
                        <p className="text-red-400 text-sm mt-1">
                          {registerForm.formState.errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Terms and Privacy */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <input
                        {...registerForm.register('agreeToTerms')}
                        type="checkbox"
                        id="agreeToTerms"
                        className="w-4 h-4 mt-0.5"
                      />
                      <label htmlFor="agreeToTerms" className="text-sm">
                        I agree to the{' '}
                        <a
                          href="#"
                          className="text-accent-primary hover:underline"
                        >
                          Terms of Service
                        </a>
                      </label>
                    </div>
                    {registerForm.formState.errors.agreeToTerms && (
                      <p className="text-red-400 text-sm">
                        {registerForm.formState.errors.agreeToTerms.message}
                      </p>
                    )}
                    <div className="flex items-start gap-3">
                      <input
                        {...registerForm.register('agreeToPrivacy')}
                        type="checkbox"
                        id="agreeToPrivacy"
                        className="w-4 h-4 mt-0.5"
                      />
                      <label htmlFor="agreeToPrivacy" className="text-sm">
                        I agree to the{' '}
                        <a
                          href="#"
                          className="text-accent-primary hover:underline"
                        >
                          Privacy Policy
                        </a>
                      </label>
                    </div>
                    {registerForm.formState.errors.agreeToPrivacy && (
                      <p className="text-red-400 text-sm">
                        {registerForm.formState.errors.agreeToPrivacy.message}
                      </p>
                    )}
                  </div>

                  {/* Error Message */}
                  {registerForm.formState.errors.root && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 text-sm flex items-center gap-2"
                    >
                      <AlertCircle size={16} />
                      {registerForm.formState.errors.root.message}
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={registerForm.formState.isSubmitting}
                    className="btn btn-primary w-full flex items-center justify-center gap-2"
                  >
                    {registerForm.formState.isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <Zap size={16} />
                        Create Account
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Social Login Options */}
            <div className="mt-6 pt-6 border-t border-color">
              <p className="text-center text-sm text-secondary mb-4">
                Or continue with
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleSSOLogin('github')}
                  disabled={ssoLoading !== null}
                  className="btn btn-secondary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {ssoLoading === 'github' ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Github size={16} />
                  )}
                  {ssoLoading === 'github' ? 'Connecting...' : 'GitHub'}
                </button>
                <button
                  onClick={() => handleSSOLogin('google')}
                  disabled={ssoLoading !== null}
                  className="btn btn-secondary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {ssoLoading === 'google' ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Chrome size={16} />
                  )}
                  {ssoLoading === 'google' ? 'Connecting...' : 'Google'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModernAuthModal;