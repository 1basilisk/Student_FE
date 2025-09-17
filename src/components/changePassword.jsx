import { useState } from 'react';
import api from '../api';
import Header from './header';

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const validate = (password) => {
    setError(password.length < 8 ? 'Password must be at least 8 characters long' : '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    try {
      await api.put(
        '/auth/change-password',
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Password changed successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.error('Failed to change password', err);
      alert('Failed to change password. Check current password.');
    }
  };

  const handleTextChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    validate(value);
  };

  return (
<>
  <Header />
  <div className="pt-16"></div>
  <div className="p-8 max-w-md mx-auto pt-16 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded shadow">
    <h2 className="text-2xl font-bold mb-4">Change Password</h2>

    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="password"
        placeholder="Current Password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
        required
      />

      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={handleTextChange}
        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
        required
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <input
        type="password"
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
        required
      />

      <button
        type="submit"
        disabled={!!error}
        className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white py-2 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Change Password
      </button>
    </form>
  </div>
</>

  );
}

export default ChangePassword;
