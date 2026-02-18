import { Link, useLocation } from 'react-router-dom';
import {
  HiOutlineSquares2X2,
  HiOutlineChartBar,
  HiOutlineBookOpen,
  HiOutlineScale,
  HiOutlineUserGroup,
  HiOutlineUser,
} from 'react-icons/hi2';

const MobileBottomNav = ({ role }) => {
  const location = useLocation();

  const getMenuItems = () => {
    switch (role) {
      case 'student':
        return [
          { path: '/student', label: 'Bosh sahifa', icon: HiOutlineSquares2X2 },
          { path: '/student/rating', label: 'Reyting', icon: HiOutlineChartBar },
          { path: '/student/my-books', label: 'Kitoblar', icon: HiOutlineBookOpen },
          { path: '/student/auction', label: 'Auksion', icon: HiOutlineScale },
        ];
      case 'teacher':
        return [
          { path: '/teacher', label: 'Dashboard', icon: HiOutlineSquares2X2 },
          { path: '/teacher/rating', label: 'Reyting', icon: HiOutlineChartBar },
          { path: '/teacher/assessment', label: 'Baholash', icon: HiOutlineBookOpen },
          { path: '/teacher/auction', label: 'Auksion', icon: HiOutlineScale },
        ];
      case 'admin':
        return [
          { path: '/admin', label: 'Dashboard', icon: HiOutlineSquares2X2 },
          { path: '/admin/courses', label: 'Kurslar', icon: HiOutlineBookOpen },
          { path: '/admin/students', label: 'O\'quvchilar', icon: HiOutlineUserGroup },
          { path: '/admin/teachers', label: 'Ustozlar', icon: HiOutlineUser },
        ];
      case 'owner':
        return [
          { path: '/owner', label: 'Dashboard', icon: HiOutlineSquares2X2 },
          { path: '/owner/courses', label: 'Kurslar', icon: HiOutlineBookOpen },
          { path: '/owner/students', label: 'O\'quvchilar', icon: HiOutlineUserGroup },
          { path: '/owner/teachers', label: 'Ustozlar', icon: HiOutlineUser },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  const isActive = (path) => {
    if (path === `/${role}`) {
      return location.pathname === `/${role}`;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
      <div className="flex items-center justify-around px-2 py-2.5">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`
              flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all
              ${isActive(item.path)
                ? 'text-blue-600'
                : 'text-gray-500'
              }
            `}
          >
            <span className="text-2xl">
              <item.icon />
            </span>
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MobileBottomNav;