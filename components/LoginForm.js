import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function CustomLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // First try normal Supabase login
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });

      if (data.user) {
        setMessage('Login successful! Redirecting...');
        window.location.href = '/';
        return;
      }

      // If login fails, try to create the account first (for users who completed OTP but account wasn't created)
      if (error && error.message.includes('Invalid login credentials')) {
        console.log('Login failed, attempting to create account...');
        
        // Check if user completed OTP verification
        const { data: otpData } = await supabase
          .from('otp_verifications')
          .select('*')
          .eq('email', email)
          .eq('is_verified', true)
          .order('created_at', { ascending: false })
          .limit(1);

        if (otpData && otpData.length > 0) {
          // User has verified OTP, create account now
          const { data: newUser, error: signupError } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
              emailRedirectTo: undefined
            }
          });

          if (newUser.user && !signupError) {
            // Account created, now login
            const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
              email: email,
              password: password
            });

            if (loginData.user) {
              setMessage('Account created and logged in successfully!');
              window.location.href = '/';
              return;
            }
          }
        }
        
        setMessage('Invalid email or password. Please check your credentials or complete signup first.');
      } else {
        setMessage('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Login failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-4">Login to Nambikkai News</h2>
        
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded mb-4"
          required
        />
        
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded mb-4"
          required
        />
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {message && (
        <div className={`mt-4 p-3 rounded ${
          message.includes('successful') 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          {message}
        </div>
      )}

      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}