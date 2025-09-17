import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Axios instance

function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createForm, setCreateForm] = useState({
    name: '',
    email: '',
    course: '',
  });
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await api.get('/students', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(res.data);
    } catch (err) {
      console.error('Failed to fetch students');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;

    try {
      await api.delete(`/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Student deleted successfully');
      fetchStudents();
    } catch (err) {
      console.error('Failed to delete student', err);
      alert('Failed to delete student');
    }
  };

  const handleEditClick = (student) => {
    setEditingId(student._id);
    setEditForm({
      name: student.name,
      email: student.email,
      course: student.course,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async (id) => {
    try {
      await api.put(
        `/students/${id}`,
        { ...editForm },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Student updated successfully');
      setEditingId(null);
      fetchStudents();
    } catch (err) {
      console.error('Failed to update student', err);
      alert('Failed to update student');
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setCreateForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(
        '/students',
        { ...createForm },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Student created successfully');
      setCreateForm({ name: '', email: '', course: '' });
      setShowCreateForm(false);
      fetchStudents();
    } catch (err) {
      console.error('Failed to create student', err);
      alert('Failed to create student');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>

      <div className="my-6">
        <button
          onClick={() => setShowCreateForm((prev) => !prev)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          {showCreateForm ? 'Hide Add Student Form' : 'Add Student'}
        </button>
      </div>

      {showCreateForm && (
        <div className="my-4 p-4 border rounded">
          <h3 className="text-xl font-semibold mb-4">Add New Student</h3>
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={createForm.name}
              onChange={handleCreateChange}
              className="border px-2 py-1 w-full"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={createForm.email}
              onChange={handleCreateChange}
              className="border px-2 py-1 w-full"
              required
            />
            <input
              type="text"
              name="course"
              placeholder="Course"
              value={createForm.course}
              onChange={handleCreateChange}
              className="border px-2 py-1 w-full"
              required
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Create Student
            </button>
          </form>
        </div>
      )}

      <h3 className="text-xl font-semibold mt-6 mb-4">All Students</h3>

      {students.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Course</th>
              <th className="border px-4 py-2">Enrollment Date</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s._id}>
                <td className="border px-4 py-2">
                  {editingId === s._id ? (
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleEditChange}
                      className="border px-2 py-1"
                    />
                  ) : (
                    s.name
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editingId === s._id ? (
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleEditChange}
                      className="border px-2 py-1"
                    />
                  ) : (
                    s.email
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editingId === s._id ? (
                    <input
                      type="text"
                      name="course"
                      value={editForm.course}
                      onChange={handleEditChange}
                      className="border px-2 py-1"
                    />
                  ) : (
                    s.course
                  )}
                </td>
                <td className="border px-4 py-2">
                  {new Date(s.enrollmentDate).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2 space-x-2">
                  {editingId === s._id ? (
                    <>
                      <button
                        onClick={() => handleEditSave(s._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleEditCancel}
                        className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditClick(s)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(s._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No students found.</p>
      )}
    </div>
  );
}

export default AdminDashboard;
