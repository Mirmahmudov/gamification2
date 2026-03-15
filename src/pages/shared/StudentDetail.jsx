import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  HiOutlineArrowLeft,
  HiOutlineEnvelope,
  HiOutlineUserGroup,
  HiOutlineTrophy,
  HiOutlineBookOpen,
  HiOutlineCalendar,
  HiOutlineCheckCircle,
  HiOutlineUser,
  HiOutlineMapPin,
} from 'react-icons/hi2';
import { RiCoinLine, RiMedalLine } from 'react-icons/ri';

const demoStudents = [
  {
    id: 1, name: 'Hasanali Turdialiyev', email: 'hasanali@codial.uz',
    group: 'Backend 36', coins: 3250, rank: 1,
    bio: 'Backend dasturlashga qiziquvchi, Python va Django bilan ishlaydi.',
    birthDate: '2005-03-14', joinDate: '2025-09-01', location: 'Toshkent',
    books: [
      { id: 1, title: 'The Art of Deception', author: 'Kevin Mitnick', status: 'Tugatdi', startDate: '2026-01-20', endDate: '2026-02-10', summary: "Mashhur xaker Kevin Mitnick tomonidan yozilgan ijtimoiy injiniring va xavfsizlik haqida kitob." },
    ],
  },
  { id: 2, name: 'Muhammadsodir Aljonov', email: 'muhammadsodir@codial.uz', group: 'Backend 36', coins: 2950, rank: 2, birthDate: '2004-07-22', joinDate: '2025-09-01', books: [] },
  { id: 3, name: 'Mavluda Qurbanova', email: 'mavluda@codial.uz', group: 'Backend 36', coins: 2820, rank: 3, birthDate: '2005-11-05', joinDate: '2025-09-01', books: [] },
  { id: 4, name: 'Aziza Karimova', email: 'aziza@codial.uz', group: 'Backend 36', coins: 2680, rank: 4, birthDate: '2006-01-18', joinDate: '2025-09-01', books: [] },
  { id: 5, name: 'Javohir Toshmatov', email: 'javohir@codial.uz', group: 'Backend 36', coins: 2450, rank: 5, birthDate: '2005-06-30', joinDate: '2025-09-01', books: [] },
  { id: 6, name: 'Bobur Rahimov', email: 'bobur@codial.uz', group: 'Backend 36', coins: 2180, rank: 6, birthDate: '2004-09-12', joinDate: '2025-09-01', books: [] },
  { id: 7, name: 'Dilnoza Ahmadova', email: 'dilnoza@codial.uz', group: 'Backend 42', coins: 3100, rank: 1, birthDate: '2005-04-25', joinDate: '2025-10-15', books: [] },
  { id: 8, name: 'Sardorbek Olimov', email: 'sardorbek@codial.uz', group: 'Backend 42', coins: 2890, rank: 2, birthDate: '2004-12-08', joinDate: '2025-10-15', books: [] },
];

const avatarColors = [
  ['#6366f1', '#8b5cf6'],
  ['#10b981', '#059669'],
  ['#f59e0b', '#f97316'],
  ['#ec4899', '#db2777'],
  ['#3b82f6', '#6366f1'],
  ['#14b8a6', '#0891b2'],
];

const getAvatarColors = (id) => avatarColors[((Number(id) || 1) - 1) % avatarColors.length];

const getInitials = (name = '') =>
  name.split(' ').filter(Boolean).slice(0, 2).map((p) => p[0]).join('').toUpperCase();

const rankLabel = (rank) => {
  const n = typeof rank === 'string' ? rank.replace('#', '') : rank;
  return `#${n}`;
};

const StatCard = ({ label, value, icon: Icon, from, to }) => (
  <div
    className="relative overflow-hidden rounded-2xl p-5 flex flex-col justify-between min-h-[110px]"
    style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
  >
    <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-20 bg-white" />
    <div className="absolute -right-2 -bottom-6 w-16 h-16 rounded-full opacity-10 bg-white" />
    <div className="relative">
      <p className="text-xs font-medium text-white/70 mb-1">{label}</p>
      <p className="text-3xl font-extrabold text-white tracking-tight">{value}</p>
    </div>
    <div className="relative self-end">
      <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
        <Icon className="w-5 h-5 text-white" />
      </div>
    </div>
  </div>
);

const InfoRow = ({ icon: Icon, label, value, color = 'text-blue-500' }) => (
  <div className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
    <div className={`w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 ${color}`}>
      <Icon className="w-4 h-4" />
    </div>
    <div className="min-w-0">
      <p className="text-[11px] text-gray-400 font-medium">{label}</p>
      <p className="text-sm font-semibold text-gray-800 truncate">{value}</p>
    </div>
  </div>
);

const StudentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const stateStudent = location.state?.student;
  const student = stateStudent || demoStudents.find((s) => String(s.id) === String(id));

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
        <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center">
          <HiOutlineUser className="w-10 h-10 text-gray-300" />
        </div>
        <p className="text-gray-500 font-medium">O'quvchi topilmadi</p>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
        >
          <HiOutlineArrowLeft className="w-4 h-4" /> Orqaga
        </button>
      </div>
    );
  }

  const coins = student.totalCoins ?? student.coins ?? 0;
  const books = student.books ?? [];
  const [c1, c2] = getAvatarColors(student.id);

  return (
    <div className="max-w-5xl mx-auto space-y-5 pb-8">

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition font-medium group"
      >
        <HiOutlineArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        Orqaga
      </button>

      {/* Hero card */}
      <div
        className="relative rounded-3xl overflow-hidden p-6 md:p-8"
        style={{ background: `linear-gradient(135deg, #1d4ed8 0%, #4f46e5 50%, #7c3aed 100%)` }}
      >
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4" />

        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Avatar */}
          {student.avatar ? (
            <img
              src={student.avatar}
              alt={student.name}
              className="w-24 h-24 rounded-2xl object-cover border-4 border-white/20 shadow-xl shrink-0"
            />
          ) : (
            <div
              className="w-24 h-24 rounded-2xl border-4 border-white/20 shadow-xl flex items-center justify-center text-3xl font-black text-white shrink-0"
              style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
            >
              {getInitials(student.name)}
            </div>
          )}

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-2xl md:text-3xl font-black text-white">{student.name}</h1>
              {student.rank && (
                <span className="inline-flex items-center gap-1 bg-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  <RiMedalLine className="w-3.5 h-3.5" /> {rankLabel(student.rank)}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-3 mt-2">
              {student.email && (
                <span className="flex items-center gap-1.5 text-white/70 text-sm">
                  <HiOutlineEnvelope className="w-3.5 h-3.5 shrink-0" />
                  {student.email}
                </span>
              )}
              {student.group && (
                <span className="flex items-center gap-1.5 text-white/70 text-sm">
                  <HiOutlineUserGroup className="w-3.5 h-3.5 shrink-0" />
                  {student.group}
                </span>
              )}
              {student.location && (
                <span className="flex items-center gap-1.5 text-white/70 text-sm">
                  <HiOutlineMapPin className="w-3.5 h-3.5 shrink-0" />
                  {student.location}
                </span>
              )}
            </div>

            {student.bio && (
              <p className="mt-3 text-white/60 text-sm leading-relaxed max-w-md">{student.bio}</p>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        <StatCard
          label="Jami Coinlar"
          value={coins.toLocaleString()}
          icon={RiCoinLine}
          from="#f97316"
          to="#ea580c"
        />
        <StatCard
          label="Reyting"
          value={rankLabel(student.rank ?? '—')}
          icon={HiOutlineTrophy}
          from="#9333ea"
          to="#7c3aed"
        />
        <StatCard
          label="O'qigan Kitoblar"
          value={books.length}
          icon={HiOutlineBookOpen}
          from="#10b981"
          to="#059669"
        />
      </div>

      {/* Two column layout */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Personal info */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center">
              <HiOutlineUser className="w-3.5 h-3.5 text-blue-500" />
            </span>
            Shaxsiy ma'lumotlar
          </h2>
          <div>
            {student.email && <InfoRow icon={HiOutlineEnvelope} label="Email" value={student.email} color="text-blue-500" />}
            {student.group && <InfoRow icon={HiOutlineUserGroup} label="Guruh" value={student.group} color="text-indigo-500" />}
            {student.birthDate && <InfoRow icon={HiOutlineCalendar} label="Tug'ilgan sana" value={student.birthDate} color="text-rose-500" />}
            {student.joinDate && <InfoRow icon={HiOutlineCheckCircle} label="Qo'shilgan sana" value={student.joinDate} color="text-emerald-500" />}
            {student.location && <InfoRow icon={HiOutlineMapPin} label="Joylashuv" value={student.location} color="text-amber-500" />}
          </div>
        </div>

        {/* Activity summary */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-50 flex items-center justify-center">
              <RiCoinLine className="w-3.5 h-3.5 text-amber-500" />
            </span>
            Faollik
          </h2>
          <div className="space-y-3">
            {/* Coin progress bar */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-gray-500 font-medium">Coinlar</span>
                <span className="text-xs font-bold text-orange-600">{coins.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-orange-400 to-orange-500 transition-all"
                  style={{ width: `${Math.min(100, (coins / 5000) * 100)}%` }}
                />
              </div>
            </div>
            {/* Books progress */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-gray-500 font-medium">Kitoblar</span>
                <span className="text-xs font-bold text-emerald-600">{books.length} ta</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all"
                  style={{ width: `${Math.min(100, books.length * 20)}%` }}
                />
              </div>
            </div>
            {/* Rank badge */}
            <div className="mt-4 flex items-center gap-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl px-4 py-3 border border-purple-100">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-sm">
                <HiOutlineTrophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[11px] text-gray-500">Guruh reytingi</p>
                <p className="text-lg font-black text-purple-700">{rankLabel(student.rank ?? '—')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Books */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-emerald-50 flex items-center justify-center">
            <HiOutlineBookOpen className="w-3.5 h-3.5 text-emerald-500" />
          </span>
          Kitoblari
          <span className="ml-auto text-xs font-semibold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
            {books.length} ta
          </span>
        </h2>

        {books.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center">
              <HiOutlineBookOpen className="w-7 h-7 text-gray-300" />
            </div>
            <p className="text-sm text-gray-400">Hozircha kitob ma'lumotlari yo'q</p>
          </div>
        ) : (
          <div className="space-y-3">
            {books.map((book) => (
              <div key={book.id} className="group relative bg-gray-50 hover:bg-blue-50/40 rounded-2xl border border-gray-100 hover:border-blue-100 p-4 transition-all">
                <div className="flex items-start gap-4">
                  {/* Book cover */}
                  {book.cover ? (
                    <img src={book.cover} alt={book.title} className="w-14 h-20 rounded-xl object-cover shrink-0 shadow-sm" />
                  ) : (
                    <div className="w-14 h-20 rounded-xl bg-gradient-to-br from-indigo-100 to-blue-200 flex items-center justify-center shrink-0 shadow-sm">
                      <HiOutlineBookOpen className="w-6 h-6 text-indigo-400" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-bold text-gray-900">{book.title}</p>
                        {book.author && (
                          <p className="text-xs text-gray-500 mt-0.5">Muallif: {book.author}</p>
                        )}
                      </div>
                      {book.status && (
                        <span className={`shrink-0 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                          book.status === 'Tugatdi'
                            ? 'bg-emerald-100 text-emerald-700'
                            : book.status === "O'qiyapti"
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          <HiOutlineCheckCircle className="w-3 h-3" />
                          {book.status}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-3 mt-2">
                      {book.startDate && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-gray-400 bg-white rounded-lg px-2 py-1 border border-gray-100">
                          <HiOutlineCalendar className="w-3 h-3" /> Boshlangan: {book.startDate}
                        </span>
                      )}
                      {book.endDate && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-gray-400 bg-white rounded-lg px-2 py-1 border border-gray-100">
                          <HiOutlineCalendar className="w-3 h-3" /> Tugallangan: {book.endDate}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {book.summary && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-1">Xulosa</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{book.summary}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDetail;
