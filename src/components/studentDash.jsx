// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../api';
// import { jwtDecode } from 'jwt-decode';


// function StudentDashboard() {
//   const [profile, setProfile] = useState(null);
//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');
  

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await api.get(`/students/me`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setProfile(res.data);
//       } catch (err) {
//         console.error('Failed to load profile');
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h2>Student Dashboard</h2>

//       {profile ? (
//         <div>
//           <p><strong>Name:</strong> {profile.name}</p>
//           <p><strong>Email:</strong> {profile.email}</p>
//           <p><strong>Course:</strong> {profile.course}</p>
//           <p><strong>Enrollment Date:</strong> {new Date(profile.enrollmentDate).toLocaleDateString()}</p>
//         </div>
//       ) : (
//         <p>Loading profile...</p>
//       )}

//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// }

// export default StudentDashboard;
import { useState, useEffect } from 'react';
import api from '../api';// Your configured Axios instance

export default function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    api
      .get('/students/me', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setStudent(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch student info', err);
        setLoading(false);
      });
  }, [token]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    api
      .put('/students/me', student, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        alert('Information updated successfully');
        setIsEditing(false);
      })
      .catch((err) => {
        console.error('Failed to update student info', err);
        alert('Update failed');
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
  }

return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Student Dashboard</h1>

            <div className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Name</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="name"
                            value={student.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    ) : (
                        <p className="text-gray-800">{student.name}</p>
                    )}
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">Email</label>
                    {isEditing ? (
                        <input
                            type="email"
                            name="email"
                            value={student.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    ) : (
                        <p className="text-gray-800">{student.email}</p>
                    )}
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">Course</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="course"
                            value={student.course}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    ) : (
                        <p className="text-gray-800">{student.course}</p>
                    )}
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">Enrollment Date</label>
                    <p className="text-gray-800">
                        {student.enrollmentDate
                            ? new Date(student.enrollmentDate).toLocaleDateString('en-GB')
                            : ''}
                    </p>
                </div>
            </div>

            <div className="mt-6 flex justify-between items-center">
                {isEditing ? (
                    <button
                        onClick={handleSave}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Save
                    </button>
                ) : (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    >
                        Edit Info
                    </button>
                )}

                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                    Logout
                </button>
            </div>
        </div>
    </div>
);
}
