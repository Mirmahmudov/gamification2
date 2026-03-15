import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../../utils/auth';
import { useStudentData } from '../../contexts/StudentDataContext';
import MobileBottomNav from '../MobileBottomNav';
import {
  HiOutlineSquares2X2,
  HiOutlineNewspaper,
  HiOutlineUser,
  HiOutlineChartBar,
  HiOutlineBookOpen,
  HiOutlineScale,
  HiOutlineClipboardDocumentList,
} from 'react-icons/hi2';

const StudentLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { fullName, image, loading } = useStudentData();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/student', label: 'Dashboard', icon: HiOutlineSquares2X2 },
    { path: '/student/news', label: 'Yangiliklar', icon: HiOutlineNewspaper, badge: 5 },
    { path: '/student/profile', label: 'Profil', icon: HiOutlineUser },
    { path: '/student/rating', label: 'Reyting', icon: HiOutlineChartBar },
    { path: '/student/my-books', label: 'Kitoblarim', icon: HiOutlineBookOpen },
    { path: '/student/auction', label: 'Auksion', icon: HiOutlineScale },
    { path: '/student/assessment', label: 'Baholash nizomi', icon: HiOutlineClipboardDocumentList },
  ];

  const isActive = (path) => {
    if (path === '/student') {
      return location.pathname === '/student';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar (hidden on small, visible on lg+) */}
      <aside
        className="hidden lg:flex lg:flex-col lg:w-64 bg-white border-r border-gray-200 flex-shrink-0 lg:sticky lg:top-0 lg:h-screen"
      >
        {/* Logo */}
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
          <img src="/imgs/logo.svg" alt="" className="w-[130px] h-10" />

          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3.5 px-4 py-3.5 mb-1 rounded-xl
                transition-all duration-200 relative group
                hover:-translate-y-0.5 hover:shadow-sm
                ${isActive(item.path)
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <span className={`text-xl ${isActive(item.path) ? 'scale-110' : ''} transition-transform`}>
                <item.icon />
              </span>
              <span className="flex-1 font-medium text-[15px]">{item.label}</span>
              {item.badge && (
                <span className="min-w-[22px] h-[22px] px-1.5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* User Info & Logout */}
        <div className="px-4 py-4 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-11 h-11 rounded-full flex-shrink-0 shadow-sm overflow-hidden bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center">
              {image ? (
                <img src={image} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl">😊</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-900 text-[15px] truncate">
              {loading ? '...' : fullName || 'Student'}
            </div>
              <div className="text-xs text-gray-500 font-medium">Student</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 font-semibold text-[15px]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Chiqish</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-0 p-4 md:p-6 lg:p-8 pb-24 lg:pb-8">
        <div className="transition-opacity duration-200">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav role="student" />
    </div>
  );
};

export default StudentLayout;