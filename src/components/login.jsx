import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password: '',
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
            const res = await api.post('/auth/login', form);
            setMessage(res.data.msg || 'Login successful');
            localStorage.setItem('token', res.data.token);
            console.log('Login successful:', res.data);
            const token = localStorage.getItem('token');
            const user = jwtDecode(token);
            if (user.role === 'admin') navigate('/admin-dashboard');
            else
                navigate('/student-dashboard');
        } catch (err) {
            console.error(err);
            const errorMsg = err.response?.data?.msg || 'Login failed';
            setMessage(errorMsg);
        }
    };

    return (
        <div className="max-w-md mx-auto p-8 bg-white shadow rounded-lg mt-12">
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

            {message && (
                <p className="text-center text-red-500 mb-4">{message}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Login
                </button>
            </form>

            <button
                onClick={() => navigate('/signup')}
                className="w-full mt-4 text-blue-600 hover:underline"
            >
                Go to Signup
            </button>
        </div>

    );
}

export default login;