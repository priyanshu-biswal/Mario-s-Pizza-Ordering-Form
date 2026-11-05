import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Eye, EyeOff, RotateCcw } from 'lucide-react';

export default function RegistrationForm() {
  const initialFormState = {
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    gender: '',
    terms: false
  };

  const [formData, setFormData] = useState(initialFormState);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Real-Time Validation
  useEffect(() => {
    const errs = {};

    if (!formData.name.trim()) {
      errs.name = 'Full Name is required.';
    } else if (formData.name.trim().length < 3) {
      errs.name = 'Name must be at least 3 characters long.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errs.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone) {
      errs.phone = 'Phone number is required.';
    } else if (!phoneRegex.test(formData.phone)) {
      errs.phone = 'Enter a valid 10-digit Indian phone number.';
    }

    // Strong password regex: 8+ chars, upper, lower, digit, special char
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!formData.password) {
      errs.password = 'Password is required.';
    } else if (!passwordRegex.test(formData.password)) {
      errs.password = 'Password must be 8+ chars with uppercase, lowercase, number & special symbol.';
    }

    if (!formData.confirmPassword) {
      errs.confirmPassword = 'Please confirm your password.';
    } else if (formData.confirmPassword !== formData.password) {
      errs.confirmPassword = 'Passwords do not match.';
    }

    if (!formData.gender) {
      errs.gender = 'Please select your gender.';
    }

    if (!formData.terms) {
      errs.terms = 'You must accept the terms and conditions.';
    }

    setErrors(errs);
  }, [formData]);

  const isValid = Object.keys(errors).length === 0;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setTouched({});
    setIsSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Save basic registered user details in LocalStorage
      localStorage.setItem('mario_registered_user', JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
        registeredAt: new Date().toISOString()
      }));
    }, 1200);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-slate-100">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800">
            User Registration
          </h2>
          <p className="text-slate-500 text-sm mt-1">Create an account to track your orders quickly</p>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-red-600 font-medium bg-slate-100 px-3 py-1.5 rounded-lg transition"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset Form
        </button>
      </div>

      {isSubmitted ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-4">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
          <h3 className="text-xl font-bold text-emerald-800">Registration Successful!</h3>
          <p className="text-emerald-700 text-sm">
            Welcome aboard, <strong>{formData.name}</strong>! Your account has been registered successfully.
          </p>
          <button
            onClick={handleReset}
            className="mt-4 px-6 py-2.5 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition"
          >
            Register Another Account
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g. Priyanshu Biswal"
              className={`w-full px-4 py-2.5 rounded-xl border text-sm transition focus:outline-none focus:ring-2 ${
                touched.name && errors.name
                  ? 'border-red-500 focus:ring-red-200 bg-red-50/30'
                  : 'border-slate-300 focus:border-red-500 focus:ring-red-100'
              }`}
            />
            {touched.name && errors.name && (
              <p className="flex items-center gap-1 text-xs text-red-600 mt-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
              </p>
            )}
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="name@example.com"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm transition focus:outline-none focus:ring-2 ${
                  touched.email && errors.email
                    ? 'border-red-500 focus:ring-red-200 bg-red-50/30'
                    : 'border-slate-300 focus:border-red-500 focus:ring-red-100'
                }`}
              />
              {touched.email && errors.email && (
                <p className="flex items-center gap-1 text-xs text-red-600 mt-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="10-digit Mobile Number"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm transition focus:outline-none focus:ring-2 ${
                  touched.phone && errors.phone
                    ? 'border-red-500 focus:ring-red-200 bg-red-50/30'
                    : 'border-slate-300 focus:border-red-500 focus:ring-red-100'
                }`}
              />
              {touched.phone && errors.phone && (
                <p className="flex items-center gap-1 text-xs text-red-600 mt-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
                </p>
              )}
            </div>
          </div>

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="••••••••"
                  className={`w-full px-4 py-2.5 pr-10 rounded-xl border text-sm transition focus:outline-none focus:ring-2 ${
                    touched.password && errors.password
                      ? 'border-red-500 focus:ring-red-200 bg-red-50/30'
                      : 'border-slate-300 focus:border-red-500 focus:ring-red-100'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {touched.password && errors.password && (
                <p className="flex items-start gap-1 text-xs text-red-600 mt-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" /> {errors.password}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Confirm Password *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="••••••••"
                  className={`w-full px-4 py-2.5 pr-10 rounded-xl border text-sm transition focus:outline-none focus:ring-2 ${
                    touched.confirmPassword && errors.confirmPassword
                      ? 'border-red-500 focus:ring-red-200 bg-red-50/30'
                      : 'border-slate-300 focus:border-red-500 focus:ring-red-100'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {touched.confirmPassword && errors.confirmPassword && (
                <p className="flex items-center gap-1 text-xs text-red-600 mt-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              Gender *
            </label>
            <div className="flex gap-6">
              {['Male', 'Female', 'Other'].map(g => (
                <label key={g} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={formData.gender === g}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="accent-red-600 w-4 h-4"
                  />
                  {g}
                </label>
              ))}
            </div>
            {touched.gender && errors.gender && (
              <p className="flex items-center gap-1 text-xs text-red-600 mt-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.gender}
              </p>
            )}
          </div>

          {/* Terms & Conditions */}
          <div>
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                onBlur={handleBlur}
                className="accent-red-600 w-4 h-4 mt-0.5 rounded"
              />
              <span className="text-xs text-slate-600">
                I agree to the <a href="#" className="text-red-600 underline">Terms and Conditions</a> and Privacy Policy.
              </span>
            </label>
            {touched.terms && errors.terms && (
              <p className="flex items-center gap-1 text-xs text-red-600 mt-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.terms}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition flex items-center justify-center gap-2 ${
              isValid && !isSubmitting
                ? 'bg-red-600 hover:bg-red-700 active:scale-[0.99] shadow-red-200'
                : 'bg-slate-300 cursor-not-allowed shadow-none'
            }`}
          >
            {isSubmitting ? (
              <span className="inline-block animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
            ) : (
              'Complete Registration'
            )}
          </button>
        </form>
      )}
    </div>
  );
}