import {
  HiOutlineUserGroup,
  HiOutlineUsers,
  HiOutlineSparkles,
  HiOutlineCurrencyDollar,
  HiOutlineCalendarDays,
  HiOutlineArrowTrendingUp,
} from 'react-icons/hi2';

const groups = [
  {
    name: 'Backend 36',
    schedule: 'Dushanba–Chorshanba–Juma',
    totalCoins: 16330,
    avgCoins: 2722,
    students: 6,
  },
  {
    name: 'Backend 42',
    schedule: 'Seshanba–Payshanba–Shanba',
    totalCoins: 11060,
    avgCoins: 2765,
    students: 4,
  },
];

const topStudents = [
  { rank: 1, name: 'Hasanali Turdialiyev', group: 'Backend 36', coins: 3250 },
  { rank: 2, name: 'Dilnoza Ahmadova', group: 'Backend 42', coins: 3100 },
  { rank: 3, name: 'Muhammadsodir Aljonov', group: 'Backend 36', coins: 2950 },
  { rank: 4, name: 'Sardorbek Olimov', group: 'Backend 42', coins: 2890 },
  { rank: 5, name: 'Mavluda Quronova', group: 'Backend 36', coins: 2820 },
];

const TeacherDashboard = () => {
  const totalGroups = groups.length;
  const totalStudents = groups.reduce((s, g) => s + g.students, 0);
  const totalCoins = groups.reduce((s, g) => s + g.totalCoins, 0);
  const avgCoins = Math.round(groups.reduce((s, g) => s + g.avgCoins, 0) / Math.max(1, groups.length));

  return (
    <div className="space-y-5 md:space-y-7">
      <header className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Salom, Otabek Tursunov! 👋
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          Guruhlaringiz va o‘quvchilaringiz statistikasi
        </p>
      </header>

      {/* Top stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[
          {
            label: 'Guruhlar',
            value: totalGroups,
            icon: HiOutlineUserGroup,
            tone: 'from-sky-50 to-sky-100 text-sky-700',
          },
          {
            label: 'O‘quvchilar',
            value: totalStudents,
            icon: HiOutlineUsers,
            tone: 'from-emerald-50 to-emerald-100 text-emerald-700',
          },
          {
            label: 'O‘rtacha coin',
            value: avgCoins,
            icon: HiOutlineArrowTrendingUp,
            tone: 'from-amber-50 to-amber-100 text-amber-800',
          },
          {
            label: 'Jami coinlar',
            value: totalCoins,
            icon: HiOutlineCurrencyDollar,
            tone: 'from-violet-50 to-violet-100 text-violet-800',
          },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-gray-100 shadow-sm p-4 bg-white overflow-hidden relative"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${s.tone} opacity-60`} />
            <div className="relative flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white/80 border border-white/70 flex items-center justify-center">
                <s.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-extrabold text-gray-900 tabular-nums">
                  {Number(s.value).toLocaleString()}
                </p>
                <p className="text-[11px] md:text-xs text-gray-600 font-semibold">{s.label}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Groups */}
      <section className="space-y-3">
        <h2 className="text-sm md:text-base font-semibold text-gray-900">
          Mening guruhlarim
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {groups.map((g) => (
            <div
              key={g.name}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-5 hover:-translate-y-0.5 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-base font-semibold text-gray-900">{g.name}</p>
                  <p className="text-xs text-gray-500 mt-1 inline-flex items-center gap-1">
                    <HiOutlineCalendarDays className="w-4 h-4" />
                    <span>{g.schedule}</span>
                  </p>
                </div>
                <span className="text-xs font-semibold bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                  {g.students} ta
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4 text-xs md:text-sm">
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-3">
                  <p className="text-[11px] text-gray-500 mb-1">Jami coinlar</p>
                  <p className="font-semibold text-gray-900">{g.totalCoins}</p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-3">
                  <p className="text-[11px] text-gray-500 mb-1">O‘rtacha</p>
                  <p className="font-semibold text-gray-900">{g.avgCoins}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                <div className="flex -space-x-1">
                  {Array.from({ length: Math.min(5, g.students) }).map((_, i) => (
                    <span
                      key={i}
                      className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center text-[11px] border-2 border-white"
                    >
                      {i + 1}
                    </span>
                  ))}
                </div>
                <button className="text-blue-600 font-semibold hover:text-blue-700 transition inline-flex items-center gap-1">
                  <HiOutlineSparkles className="w-4 h-4" />
                  <span>Ko‘rish</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top students */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-5">
        <h2 className="text-sm md:text-base font-semibold text-gray-900 mb-3">
          Top o‘quvchilar
        </h2>

        <div className="space-y-2">
          {topStudents.map((s) => (
            <div
              key={s.rank}
              className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    s.rank === 1
                      ? 'bg-amber-100 text-amber-700'
                      : s.rank === 2
                        ? 'bg-gray-100 text-gray-700'
                        : s.rank === 3
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  #{s.rank}
                </span>
                <div className="min-w-0">
                  <p className="text-xs md:text-sm font-semibold text-gray-900 truncate">
                    {s.name}
                  </p>
                  <p className="text-[11px] text-gray-500">{s.group}</p>
                </div>
              </div>
              <div className="text-xs md:text-sm font-semibold text-gray-900">
                {s.coins} <span className="text-[11px] text-gray-500 font-medium">coin</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TeacherDashboard;