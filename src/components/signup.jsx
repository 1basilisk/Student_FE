import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import Header from './header';

function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);  

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    course: '',
    role: 'student',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const validate = (password) => {
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
    } else {
      setError('');
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === 'password') {
      validate(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const res = await api.post('/auth/signup', form);
      setMessage(res.data.msg || 'Signup successful');
      console.log('User created:', res.data);
      navigate('/login');
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.msg || 'Signup failed';
      setMessage(errorMsg);
    }
    finally {
      setLoading(false); 
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-md mx-auto p-8 bg-white dark:bg-gray-800 shadow rounded-lg mt-12 text-gray-900 dark:text-white">
        <h2 className="text-2xl font-bold text-center mb-6">Student Signup</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Name</label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Course</label>
            <input
              name="course"
              type="text"
              value={form.course}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={!!error || loading}
            className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
            ) : null}

            {loading ? 'Signing up...' : 'Signup'}
            
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-green-400 dark:text-green-300">{message}</p>
        )}

        <button
          onClick={() => navigate('/login')}
          className="w-full mt-4 text-blue-600 hover:underline dark:text-blue-400"
        >
          Go to Login
        </button>
      </div>
    </>
  );
}

export default Signup;
