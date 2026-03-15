import { useNavigate } from 'react-router-dom';
import Leaderboard from '../../components/Leaderboard';
import { useStudentData } from '../../contexts/StudentDataContext';

const StudentRating = () => {
  const { fullName, point, groups } = useStudentData();
  const navigate = useNavigate();
  const groupName = groups?.[0]?.name;

  const demo = [
    { id: 'me', name: fullName || 'Siz', group: groupName, coins: point ?? 0, role: 'student' },
    { id: 2, name: 'Dilnoza Ahmadova', group: 'Backend 42', coins: 3100, role: 'student' },
    { id: 3, name: 'Muhammadsodir Aljonov', group: 'Backend 36', coins: 2950, role: 'student' },
    { id: 4, name: 'Sardorbek Olimov', group: 'Backend 42', coins: 2890, role: 'student' },
    { id: 5, name: 'Mavluda Quronova', group: 'Backend 36', coins: 2820, role: 'student' },
  ].filter(Boolean);

  const handleStudentClick = (u) => {
    const sorted = [...demo].sort((a, b) => b.coins - a.coins);
    const rank = sorted.findIndex(d => d.id === u.id) + 1;
    navigate(`/student/rating/${u.id}`, { state: { student: { ...u, rank } } });
  };

  return (
    <Leaderboard
      title="Reyting"
      subtitle="O'quvchilar coinlari bo'yicha umumiy jadval"
      items={demo}
      onStudentClick={handleStudentClick}
    />
  );
};

export default StudentRating;
