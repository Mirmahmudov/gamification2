import { useNavigate } from 'react-router-dom';
import { setCurrentUser } from '../utils/auth';

const Login = () => {
  const navigate = useNavigate();

  const demoUsers = [
    { id: 1, username: 'student1', password: '123', role: 'student', name: 'USER 1', avatar: '' },
    { id: 2, username: 'teacher1', password: '123', role: 'teacher', name: 'USER 2', avatar: '' },
    { id: 3, username: 'admin1', password: '123', role: 'admin', name: 'USER 3', avatar: '' },
    { id: 4, username: 'owner1', password: '123', role: 'owner', name: 'USER 4', avatar: '' },
  ];

  const handleLogin = (user) => {
    setCurrentUser(user);
    navigate(`/${user.role}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center  from-blue-500 via-purple-500 to-pink-500 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-3">
              <img src="/imgs/logo.svg" alt="" className="w-[130px] h-10" />
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-2">
            Tizimga kirish
          </h2>
          <p className="text-gray-500 text-center mb-8">
            Rolni tanlang
          </p>

          {/* User Buttons */}
          <div className="space-y-3">
            {demoUsers.map((user) => (
              <button
                key={user.id}
                onClick={() => handleLogin(user)}
                className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-purple-50 border-2 border-gray-200 hover:border-blue-300 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 group"
              >
               
                <div className="flex-1 text-left">
                  <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {user.name}
                  </div>
                  <div className="text-sm text-gray-500 capitalize">
                    {user.role === 'student' && 'O\'quvchi'}
                    {user.role === 'teacher' && 'Ustoz'}
                    {user.role === 'admin' && 'Admin'}
                    {user.role === 'owner' && 'Ega'}
                  </div>
                </div>
                <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default Login;