import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  let role = null;
  if (token) {
    try {
      const user = jwtDecode(token);
      role = user.role;
    } catch (err) {
      console.error('Invalid token');
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>
        My App
      </h1>

      <nav className="space-x-4">
        {token ? (
          <>
            {role === 'admin' && (
              <button onClick={() => navigate('/admin-dashboard')} className="hover:underline">
                Admin Dashboard
              </button>
            )}

            {role === 'student' && (
              <button onClick={() => navigate('/student-dashboard')} className="hover:underline">
                Student Dashboard
              </button>
            )}

            <button onClick={() => navigate('/change-password')} className="hover:underline">
              Change Password
            </button>

            <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/login')} className="hover:underline">
              Login
            </button>
            <button onClick={() => navigate('/signup')} className="hover:underline">
              Signup
            </button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
