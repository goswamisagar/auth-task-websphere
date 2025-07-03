import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-hot-toast';
import axios from 'axios';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    if (password.length < 6) return 'Password must be at least 6 characters';
    if (!/[^a-zA-Z0-9]/.test(password) && !/[0-9]/.test(password)) {
      return 'Password must contain at least one number or symbol';
    }
    return null;
  };

  // Handle traditional registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) return toast.error(passwordError);

    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password
      });
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  // Handle Google registration
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const { name, email, sub: googleId } = decoded;

      const response = await axios.post(
        'http://localhost:5000/api/auth/google-register',
        { name, email, googleId }
      );

      localStorage.setItem('token', response.data.token);
      toast.success('Google registration successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Google registration failed');
    }
  };

  // Shared input style
  const inputClass = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create a new account
        </h2>


        {/* Registration Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
  <div className="space-y-4">
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
        Full Name
      </label>
      <input
        id="name"
        type="text"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={inputClass}
        onBlur={() => {
          if (!name) toast.error('Please enter your full name');
        }}
      />
    </div>
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        Email
      </label>
      <input
        id="email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={inputClass}
        onBlur={() => {
          if (!email) {
            toast.error('Please enter your email');
          } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            toast.error('Please enter a valid email address');
          }
        }}
      />
    </div>
    <div>
      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
        Password
      </label>
      <input
        id="password"
        type="password"
        required
        minLength="6"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={inputClass}
        onBlur={() => {
          if (!password) {
            toast.error('Please enter a password');
          } else if (password.length < 6) {
            toast.error('Password must be at least 6 characters');
          } else if (!/[!@#$%^&*(),.?":{}|<>0-9]/.test(password)) {
            toast.error('Password should contain at least one number or symbol');
          }
        }}
      />
      <p className="mt-1 text-xs text-gray-500">
        Must be 6+ characters with a number/symbol
      </p>
    </div>
  </div>

  <button
    type="submit"
    disabled={loading}
    className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
      loading ? 'opacity-50 cursor-not-allowed' : ''
    }`}
    onClick={() => {
      if (!name || !email || !password) {
        toast.error('Please fill in all fields');
      }
    }}
  >
    {loading ? 'Registering...' : 'Register'}
  </button>
</form>


        {/* Google Sign-Up Option */}
        {/* <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or sign up with</span>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error('Google sign-up failed')}
              text="signup_with" // Shows "Sign up with Google"
            />
          </div>
        </div> */}
      </div>
    </div>
  );
}