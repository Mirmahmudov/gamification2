import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, setCurrentUser } from '../utils/auth';
import {
  HiOutlineUser,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeSlash,
} from 'react-icons/hi2';
import { FiLogIn } from 'react-icons/fi';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const existing = getCurrentUser();
    if (existing) {
      navigate(`/${existing.role}`);
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const trimmedLogin = username.trim().toLowerCase();
    const trimmedPassword = password.trim().toLowerCase();

    const credentials = {
      admin: { role: 'admin', displayName: 'Admin', id: 1 },
      teacher: { role: 'teacher', displayName: 'Ustoz', id: 2 },
      student: { role: 'student', displayName: 'Student', id: 3 },
      ega: { role: 'owner', displayName: 'Ega', id: 4 },
    };

    const match = credentials[trimmedLogin];

    if (!match || trimmedPassword !== trimmedLogin) {
      setError("Login yoki parol noto'g'ri. Iltimos, qayta urinib ko'ring.");
      return;
    }

    const user = {
      id: match.id,
      username: trimmedLogin,
      name: match.displayName,
      role: match.role,
      avatar: '',
    };

    setCurrentUser(user);
    navigate(`/${user.role}`);
  };

  return (
    <div className="min-h-screen  flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-md mx-auto">
        <div className="relative">
          <div className="absolute -inset-1 rounded-3xl bg-black/10 blur-2xl" />
          <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Tizimga kirish
                </h2>
                <p className="text-gray-500 text-sm md:text-base mt-1">
                  Login va parolni kiriting. 
                </p>
              </div>
              <div className=" inline-flex items-center gap-2 px-3 py-1.5 rounded-full ">
                <img src="/imgs/logo.svg" alt="CODIAL" className="h-6" />
              </div>
            </div>

       
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">Login</label>
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition">
                  <HiOutlineUser className="text-gray-400 text-lg" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin, teacher, student, ega"
                    className="w-full bg-transparent outline-none text-sm text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">Parol</label>
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition">
                  <HiOutlineLockClosed className="text-gray-400 text-lg" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Parolni kiriting"
                    className="w-full bg-transparent outline-none text-sm text-gray-900 placeholder:text-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-gray-400 hover:text-gray-600 transition"
                    aria-label={showPassword ? 'Parolni yashirish' : 'Parolni ko‘rsatish'}
                  >
                    {showPassword ? (
                      <HiOutlineEyeSlash className="text-lg" />
                    ) : (
                      <HiOutlineEye className="text-lg" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="mt-1 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#1D537C] text-white text-sm md:text-base font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"
              >
                <FiLogIn className="text-lg" />
                <span>Kirish</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;