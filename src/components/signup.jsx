import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import Header from './header';


function Signup() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        course: '',
        role: 'student',

  });


  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    
  };

  return (
    <>
    <Header/>
    <div className="max-w-md mx-auto p-8 bg-white shadow rounded-lg mt-12">
  <h2 className="text-2xl font-bold text-center mb-6">Student Signup</h2>

  <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <label className="block text-gray-700 font-medium mb-1">Name</label>
      <input
        name="name"
        type="text"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <div>
      <label className="block text-gray-700 font-medium mb-1">Email</label>
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <div>
      <label className="block text-gray-700 font-medium mb-1">Course</label>
      <input
        name="course"
        type="text"
        value={form.course}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <div>
      <label className="block text-gray-700 font-medium mb-1">Password</label>
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <button
      type="submit"
      className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
    >
      Sign Up
    </button>
  </form>

  {message && (
    <p className="mt-4 text-center text-green-600">{message}</p>
  )}

  <button
    onClick={() => navigate('/login')}
    className="w-full mt-4 text-blue-600 hover:underline"
  >
    Go to Login
  </button>
</div>

  </>
  );
}

export default Signup;
