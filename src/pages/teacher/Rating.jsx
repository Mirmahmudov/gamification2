import { useNavigate } from 'react-router-dom';
import Leaderboard from '../../components/Leaderboard';

const TeacherRating = () => {
  const navigate = useNavigate();

  const demo = [
    { id: 1, name: 'Hasanali Turdialiyev', group: 'Backend 36', coins: 3250, role: 'student' },
    { id: 2, name: 'Dilnoza Ahmadova', group: 'Backend 42', coins: 3100, role: 'student' },
    { id: 3, name: 'Muhammadsodir Aljonov', group: 'Backend 36', coins: 2950, role: 'student' },
    { id: 4, name: 'Sardorbek Olimov', group: 'Backend 42', coins: 2890, role: 'student' },
    { id: 5, name: 'Mavluda Quronova', group: 'Backend 36', coins: 2820, role: 'student' },
    { id: 6, name: 'Otabek Tursunov', group: null, coins: 0, role: 'teacher' },
  ];

  const handleStudentClick = (u) => {
    if (u.role !== 'student') return;
    const sorted = [...demo].filter(d => d.role === 'student').sort((a, b) => b.coins - a.coins);
    const rank = sorted.findIndex(d => d.id === u.id) + 1;
    navigate(`/teacher/students/${u.id}`, { state: { student: { ...u, rank } } });
  };

  return (
    <Leaderboard
      title="Reyting"
      subtitle="Guruhlaringiz kesimidagi top o'quvchilar"
      items={demo}
      onStudentClick={handleStudentClick}
    />
  );
};

export default TeacherRating;
