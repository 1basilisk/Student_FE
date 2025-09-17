import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
function Header() {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  let role = null;
  if (token) {
    try {
      const user = jwtDecode(token);
      role = user.role;
    } catch (err) {
      console.error(err);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (<>
  
    <header className="fixed top-0 left-0 right-0 bg-gray-800 text-white p-4 flex justify-between items-center shadow z-50">
      <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>
        Student Management System
      </h1>

      <nav className="space-x-4">
        {token ? (
          <>

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
     <div className="pt-16"></div>
  </>
  );
}

export default Header;
