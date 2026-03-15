import { Routes, Route, Navigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';

// Layouts
import StudentLayout from '../components/layouts/StudentLayout';
import TeacherLayout from '../components/layouts/TeacherLayout';
import AdminLayout from '../components/layouts/AdminLayout';
import OwnerLayout from '../components/layouts/OwnerLayout';

// Protected Route
import ProtectedRoute from '../components/ProtectedRoute';
import { StudentDataProvider } from '../contexts/StudentDataContext';

// Login
import Login from '../pages/Login';

// Shared
import StudentDetail from '../pages/shared/StudentDetail';

// Student Pages
import StudentDashboard from '../pages/student/Dashboard';
import StudentNews from '../pages/student/News';
import StudentProfile from '../pages/student/Profile';
import StudentRating from '../pages/student/Rating';
import StudentMyBooks from '../pages/student/MyBooks';
import StudentAuction from '../pages/student/Auction';
import StudentAssessment from '../pages/student/Assessment';
import StudentModals from '../pages/student/Modals';

// Teacher Pages
import TeacherDashboard from '../pages/teacher/Dashboard';
import TeacherNews from '../pages/teacher/News';
import TeacherRating from '../pages/teacher/Rating';
import TeacherAuction from '../pages/teacher/Auction';
import TeacherAssessment from '../pages/teacher/Assessment';
import TeacherAssessmentRules from '../pages/teacher/AssessmentRules';
import TeacherModals from '../pages/teacher/Modals';

// Admin Pages
import AdminDashboard from '../pages/admin/Dashboard';
import AdminNews from '../pages/admin/News';
import AdminCourses from '../pages/admin/Courses';
import AdminGroups from '../pages/admin/Groups';
import AdminStudents from '../pages/admin/Students';
import AdminTeachers from '../pages/admin/Teachers';
import AdminAuction from '../pages/admin/Auction';
import AdminModals from '../pages/admin/Modals';

// Owner Pages
import OwnerDashboard from '../pages/owner/Dashboard';
import OwnerNews from '../pages/owner/News';
import OwnerAdmins from '../pages/owner/Admins';
import OwnerCourses from '../pages/owner/Courses';
import OwnerTeachers from '../pages/owner/Teachers';
import OwnerGroups from '../pages/owner/Groups';
import OwnerStudents from '../pages/owner/Students';
import OwnerAuction from '../pages/owner/Auction';
import OwnerAssessment from '../pages/owner/Assessment';
import OwnerModals from '../pages/owner/Modals';

const AppRoutes = () => {
  const user = getCurrentUser();

  // Agar user login qilgan bo'lsa va root path ga kirsa, role bo'yicha redirect qil
  const getDefaultRedirect = () => {
    if (user) {
      return <Navigate to={`/${user.role}`} replace />;
    }
    return <Navigate to="/login" replace />;
  };

  return (
    <Routes>
      {/* Root redirect */}
      <Route path="/" element={getDefaultRedirect()} />

      {/* Login route */}
      <Route path="/login" element={<Login />} />

      {/* Student Routes */}
      <Route path="/student" element={
        <ProtectedRoute requiredRole="student">
          <StudentDataProvider>
            <StudentLayout />
          </StudentDataProvider>
        </ProtectedRoute>
      }>
        <Route index element={<StudentDashboard />} />
        <Route path="news" element={<StudentNews />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="rating" element={<StudentRating />} />
        <Route path="rating/:id" element={<StudentDetail />} />
        <Route path="my-books" element={<StudentMyBooks />} />
        <Route path="auction" element={<StudentAuction />} />
        <Route path="assessment" element={<StudentAssessment />} />
        <Route path="modals" element={<StudentModals />} />
      </Route>

      {/* Teacher Routes */}
      <Route path="/teacher" element={
        <ProtectedRoute requiredRole="teacher">
          <TeacherLayout />
        </ProtectedRoute>
      }>
        <Route index element={<TeacherDashboard />} />
        <Route path="news" element={<TeacherNews />} />
        <Route path="rating" element={<TeacherRating />} />
        <Route path="auction" element={<TeacherAuction />} />
        <Route path="assessment" element={<TeacherAssessment />} />
        <Route path="rules" element={<TeacherAssessmentRules />} />
        <Route path="students/:id" element={<StudentDetail />} />
        <Route path="modals" element={<TeacherModals />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute requiredRole="admin">
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<AdminDashboard />} />
        <Route path="news" element={<AdminNews />} />
        <Route path="courses" element={<AdminCourses />} />
        <Route path="groups" element={<AdminGroups />} />
        <Route path="students" element={<AdminStudents />} />
        <Route path="students/:id" element={<StudentDetail />} />
        <Route path="teachers" element={<AdminTeachers />} />
        <Route path="auction" element={<AdminAuction />} />
        <Route path="modals" element={<AdminModals />} />
      </Route>

      {/* Owner Routes */}
      <Route path="/owner" element={
        <ProtectedRoute requiredRole="owner">
          <OwnerLayout />
        </ProtectedRoute>
      }>
        <Route index element={<OwnerDashboard />} />
        <Route path="news" element={<OwnerNews />} />
        <Route path="admins" element={<OwnerAdmins />} />
        <Route path="courses" element={<OwnerCourses />} />
        <Route path="teachers" element={<OwnerTeachers />} />
        <Route path="groups" element={<OwnerGroups />} />
        <Route path="students" element={<OwnerStudents />} />
        <Route path="students/:id" element={<StudentDetail />} />
        <Route path="auction" element={<OwnerAuction />} />
        <Route path="assessment" element={<OwnerAssessment />} />
        <Route path="modals" element={<OwnerModals />} />
      </Route>

      {/* 404 - Not Found */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;