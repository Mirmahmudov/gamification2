import { useNavigate } from 'react-router-dom';
import { useStudentData, formatLessonDays } from '../../contexts/StudentDataContext';
import {
  HiOutlineAcademicCap,
  HiOutlineBookOpen,
  HiOutlineFire,
  HiOutlineUserGroup,
  HiOutlineTrophy,
  HiOutlineUser,
  HiOutlineClipboardDocumentList,
  HiOutlineSparkles,
  HiOutlineBell,
  HiOutlineArrowRight,
  HiOutlineChartBar,
  HiOutlineCheckCircle,
  HiOutlineClock,
} from 'react-icons/hi2';
import { RiCoinLine } from 'react-icons/ri';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { fullName, user, point, groups, loading, error } = useStudentData();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-500 text-sm">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center max-w-md">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-7">
      {/* Header */}
      <header className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Salom, {fullName || user?.username || 'Student'}! 👋
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          Bugungi natijalaringiz va rivojlanish ko'rsatkichlari
        </p>
      </header>

      {/* Top Stats Cards */}
      <section className="grid gap-4 md:gap-5 md:grid-cols-3">
        {/* Level Card */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <HiOutlineSparkles className="w-5 h-5 text-yellow-400" />
              <p className="text-sm text-slate-300">Sizning darajangiz</p>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-1">Beginner</h2>
            <p className="text-sm text-slate-400 mb-4">Level 1</p>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Keyingi daraja</span>
                <span className="font-semibold">1550 coin qoldi</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-700/50 overflow-hidden">
                <div className="h-full w-2/3 bg-gradient-to-r from-yellow-400 to-lime-400 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Coins Card */}
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <RiCoinLine className="w-6 h-6 text-yellow-300" />
              <p className="text-sm text-blue-100">Jami Coinlaringiz</p>
            </div>
            <p className="text-4xl md:text-5xl font-bold mb-2">
              {(point ?? 0).toLocaleString()}
            </p>
            <p className="text-xs text-blue-100">
              Keyingi level uchun 1550 coin kerak
            </p>
          </div>
        </div>

        {/* Rank Card */}
        <button
          onClick={() => navigate('/student/leaderboard')}
          className="bg-white rounded-3xl p-6 shadow-lg border-2 border-orange-100 hover:border-orange-200 hover:shadow-xl transition-all hover:-translate-y-1 text-left group"
        >
          <div className="flex items-center gap-2 mb-3">
            <HiOutlineTrophy className="w-6 h-6 text-orange-500" />
            <p className="text-sm text-gray-500">Sizning o'rningiz</p>
          </div>
          <p className="text-4xl md:text-5xl font-extrabold text-orange-500 mb-2">
            #1
          </p>
          <div className="flex items-center gap-1 text-sm text-blue-600 font-medium group-hover:gap-2 transition-all">
            <span>To'liq reyting</span>
            <HiOutlineArrowRight className="w-4 h-4" />
          </div>
        </button>
      </section>

      {/* Notification Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl px-5 py-4 md:px-6 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
            <HiOutlineBell className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm md:text-base font-semibold">
              Yangi xabarlar!
            </p>
            <p className="text-xs md:text-sm text-blue-100">
              5 ta o'qilmagan yangilik mavjud
            </p>
          </div>
        </div>
        <button 
          onClick={() => navigate('/student/news')}
          className="self-start md:self-auto text-sm font-semibold bg-white text-blue-600 px-5 py-2.5 rounded-xl shadow-sm hover:bg-blue-50 transition flex items-center gap-2"
        >
          <span>Ko'rish</span>
          <HiOutlineArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {[
          { label: 'Darslar', value: '12', icon: HiOutlineAcademicCap, color: 'bg-emerald-50 text-emerald-600', bgIcon: 'bg-emerald-100' },
          { label: 'Kitoblar', value: '8', icon: HiOutlineBookOpen, color: 'bg-sky-50 text-sky-600', bgIcon: 'bg-sky-100' },
          { label: 'Faollik', value: '94%', icon: HiOutlineFire, color: 'bg-amber-50 text-amber-600', bgIcon: 'bg-amber-100' },
          { label: 'Guruhlar', value: String(groups?.length ?? 0), icon: HiOutlineUserGroup, color: 'bg-violet-50 text-violet-600', bgIcon: 'bg-violet-100' },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-0.5"
          >
            <div className={`w-11 h-11 rounded-xl ${item.bgIcon} flex items-center justify-center mb-3`}>
              <item.icon className={`w-6 h-6 ${item.color.split(' ')[1]}`} />
            </div>
            <p className="text-xl md:text-2xl font-bold text-gray-900 mb-0.5">{item.value}</p>
            <p className="text-xs text-gray-500">{item.label}</p>
          </div>
        ))}
      </section>

      {/* Main Content Grid */}
      <section className="grid gap-5 lg:grid-cols-2">
        {/* Coin Opportunities */}
        <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <RiCoinLine className="w-5 h-5 text-orange-500" />
            <h2 className="font-semibold text-gray-900 text-base md:text-lg">
              Coin topish imkoniyatlari
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { title: 'Vazifa topshirish', coins: '0–100', icon: HiOutlineClipboardDocumentList, color: 'from-sky-50 to-sky-100', text: 'text-sky-700', iconColor: 'text-sky-600', bgIcon: 'bg-sky-100' },
              { title: 'Faollik', coins: '+30', icon: HiOutlineFire, color: 'from-amber-50 to-amber-100', text: 'text-amber-700', iconColor: 'text-amber-600', bgIcon: 'bg-amber-100' },
              { title: 'Kitob tahlili', coins: '+100', icon: HiOutlineBookOpen, color: 'from-emerald-50 to-emerald-100', text: 'text-emerald-700', iconColor: 'text-emerald-600', bgIcon: 'bg-emerald-100' },
              { title: 'Darsga qatnashish', coins: '+25', icon: HiOutlineCheckCircle, color: 'from-violet-50 to-violet-100', text: 'text-violet-700', iconColor: 'text-violet-600', bgIcon: 'bg-violet-100' },
            ].map((item) => (
              <div
                key={item.title}
                className={`rounded-xl bg-gradient-to-br ${item.color} p-4 border border-white shadow-sm hover:shadow-md transition`}
              >
                <div className={`w-9 h-9 rounded-lg ${item.bgIcon} flex items-center justify-center mb-2`}>
                  <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                </div>
                <p className="text-xs font-medium text-gray-700 mb-1">{item.title}</p>
                <p className={`text-sm font-bold ${item.text}`}>{item.coins} coin</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity & Groups */}
        <div className="space-y-5">
          {/* Recent Rewards */}
          <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <HiOutlineChartBar className="w-5 h-5 text-emerald-600" />
              <h2 className="font-semibold text-gray-900 text-base md:text-lg">
                So'nggi mukofotlar
              </h2>
            </div>
            <div className="space-y-2">
              {[
                { title: 'Dars bahosi', date: '2026-02-10', coins: '+420' },
                { title: 'Yanvar oyi imtihoni', date: '2026-01-31', coins: '+525' },
                { title: 'Dars bahosi', date: '2026-02-07', coins: '+338' },
              ].map((item) => (
                <div
                  key={item.title + item.date}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition border border-transparent hover:border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                      <HiOutlineCheckCircle className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.title}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <HiOutlineClock className="w-3 h-3" />
                        {item.date}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-emerald-600">
                    {item.coins}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Groups */}
          <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <HiOutlineUserGroup className="w-5 h-5 text-blue-600" />
              <h2 className="font-semibold text-gray-900 text-base md:text-lg">
                Mening guruhlarim
              </h2>
            </div>
            {groups?.length ? (
              <div className="space-y-3">
                {groups.map((g) => (
                  <div key={g.id} className="rounded-xl border border-blue-100 p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 hover:shadow-sm transition">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900 text-sm">{g.name}</h3>
                      <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-lg">
                        {formatLessonDays(g.lesson_days)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 flex items-center gap-1">
                      <HiOutlineUser className="w-3 h-3" />
                      Ustoz: {g.mentor?.user?.username || '—'}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <HiOutlineUserGroup className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Guruhlar yo'q</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[
          { label: 'Kitoblar', desc: '+100 coin', path: '/student/books', icon: HiOutlineBookOpen, color: 'from-emerald-500 to-emerald-600' },
          { label: 'Qoidalar', desc: 'O\'qib chiqing', path: '/student/rules', icon: HiOutlineClipboardDocumentList, color: 'from-violet-500 to-violet-600' },
          { label: 'Reyting', desc: '#1-o\'rin', path: '/student/leaderboard', icon: HiOutlineTrophy, color: 'from-amber-500 to-orange-500' },
          { label: 'Profil', desc: 'Ko\'rish', path: '/student/profile', icon: HiOutlineUser, color: 'from-sky-500 to-blue-500' },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={`flex items-center justify-between rounded-2xl px-5 py-4 text-left text-white bg-gradient-to-r ${item.color} shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all group`}
          >
            <div>
              <p className="text-base font-semibold mb-0.5">{item.label}</p>
              <p className="text-xs opacity-90">{item.desc}</p>
            </div>
            <item.icon className="w-7 h-7 opacity-90 group-hover:scale-110 transition-transform" />
          </button>
        ))}
      </section>
    </div>
  );
};

export default StudentDashboard;
