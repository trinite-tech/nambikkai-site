import { useState } from 'react';
import { sendOTP, verifyOTP } from '../lib/emailService';
import { supabase } from '../lib/supabase';

export default function SignupForm() {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Password, 4: Welcome
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Step 1: Send OTP (bypassing Supabase auth)
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await sendOTP(email);
      if (result.success) {
        setMessage('OTP sent to your email!');
        setStep(2);
      } else {
        setMessage('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      setMessage('Failed to send OTP. Please try again.');
    }
    setLoading(false);
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await verifyOTP(email, otpCode);
    if (result.verified) {
      setMessage('OTP verified successfully!');
      setStep(3);
    } else {
      setMessage('Invalid or expired OTP. Please try again.');
    }
    setLoading(false);
  };

  // Step 3: Set Password and Create Account via Admin API
  const handleSetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    
    setLoading(true);
    
    try {
      // Create user via admin API (no email confirmation required)
      const response = await fetch('/api/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const result = await response.json();

      if (result.success) {
        setMessage('Account created successfully!');
        setStep(4);
      } else {
        setMessage(result.error || 'Failed to create account');
      }
    } catch (error) {
      console.error('Account creation error:', error);
      setMessage('Failed to create account. Please try again.');
    }
    setLoading(false);
  };

  // Step 4: Welcome and redirect to login
  const handleGoToLogin = () => {
    window.location.href = '/login';
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      {step === 1 && (
        <form onSubmit={handleSendOTP}>
          <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded mb-4"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOTP}>
          <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
          <p className="mb-4">Enter the 6-digit code sent to {email}</p>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value)}
            className="w-full p-3 border rounded mb-4"
            maxLength="6"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleSetPassword}>
          <h2 className="text-2xl font-bold mb-4">Set Password</h2>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded mb-4"
            required
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 border rounded mb-4"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
      )}

      {step === 4 && (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-green-600">Welcome to Nambikkai News!</h2>
          <p className="mb-4">Your account has been created successfully.</p>
          <button
            onClick={handleGoToLogin}
            className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600"
          >
            Go to Login
          </button>
        </div>
      )}

      {message && (
        <div className={`mt-4 p-3 rounded ${message.includes('success') || message.includes('sent') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}
    </div>
  );
}