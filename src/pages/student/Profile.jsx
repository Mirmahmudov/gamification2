const levels = [
  { name: 'Beginner', percent: 65 },
  { name: 'Junior', percent: 35 },
  { name: 'Middle', percent: 12 },
  { name: 'Senior', percent: 0 },
  { name: 'Team Lead', percent: 0 },
  { name: 'Software Engineer', percent: 0 },
  { name: 'Principal Engineer', percent: 0 },
  { name: 'Tech Guru', percent: 0 },
  { name: 'Master', percent: 0 },
];

const StudentProfile = () => {
  return (
    <div className="space-y-5 md:space-y-7">
      <header className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Profil</h1>
        <p className="text-gray-500 text-sm md:text-base">
          Shaxsiy ma’lumotlaringiz va statistikangiz
        </p>
      </header>

      {/* Top profile card */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-4 md:p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center text-2xl">
              👨‍🎓
            </div>
            <div>
              <p className="font-semibold text-base md:text-lg">Hasanali Turdialiyev</p>
              <p className="text-xs md:text-sm text-blue-100">
                @hasanali · E’lon qilingan: Yanvar 2026
              </p>
              <p className="text-sm md:text-base font-bold mt-1">
                🪙 3,250
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {[
          { label: 'Coinlar', value: '3250', icon: '🪙' },
          { label: 'Guruhlar', value: '1', icon: '👥' },
          { label: 'O‘rin', value: '#1', icon: '🏅' },
          { label: 'Tugatdim', value: '3', icon: '✅' },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-lg">
              {item.icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{item.value}</p>
              <p className="text-[11px] text-gray-500">{item.label}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Bio */}
      <section className="bg-white rounded-2xl border border-gray-100 p-4 md:p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm md:text-base font-semibold text-gray-900">Bio</h2>
          <button className="text-xs md:text-sm font-medium text-blue-600 hover:text-blue-700 transition">
            Tahrirlash
          </button>
        </div>
        <p className="text-xs md:text-sm text-gray-600">
          Backend dasturlashni o‘rganaman.
        </p>
      </section>

      {/* Groups & recent activity */}
      <section className="grid gap-4 md:gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-2xl border border-gray-100 p-4 md:p-5 shadow-sm space-y-3">
          <h2 className="text-sm md:text-base font-semibold text-gray-900">Mening guruhlarim</h2>
          <div className="rounded-2xl border border-gray-100 p-4 bg-gray-50 flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">Backend 36</p>
              <p className="text-xs text-gray-500">Ustoz: Otabek Tursunov</p>
            </div>
            <span className="text-xs text-blue-600 font-medium">Dush–Chor–Juma</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-4 md:p-5 shadow-sm space-y-3">
          <h2 className="text-sm md:text-base font-semibold text-gray-900">So‘nggi faoliyat</h2>
          <div className="space-y-2">
            {[
              { title: 'Dars bahosi', date: '2026-02-10', coin: '+420' },
              { title: 'Yanvar oyi imtihoni', date: '2026-01-31', coin: '+525' },
              { title: 'Dars bahosi', date: '2026-02-07', coin: '+338' },
            ].map((a) => (
              <div
                key={a.title + a.date}
                className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-gray-50 transition"
              >
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-900">{a.title}</p>
                  <p className="text-[11px] text-gray-500">{a.date}</p>
                </div>
                <p className="text-xs md:text-sm font-semibold text-emerald-600">{a.coin}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current level */}
      <section className="bg-slate-900 text-white rounded-2xl p-4 md:p-5 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs text-slate-300">Sizning darajangiz</p>
            <p className="text-lg md:text-xl font-semibold">Beginner</p>
            <p className="text-[11px] text-slate-300">Level 1 / 10</p>
          </div>
          <span className="text-xs font-semibold bg-white/10 px-3 py-1.5 rounded-full">
            Level 1
          </span>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between text-[11px] text-slate-300 mb-1">
            <span>Keyingi daraja</span>
            <span>1550 coin qoldi</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-700 overflow-hidden">
            <div className="h-full w-2/3 bg-gradient-to-r from-yellow-300 to-lime-300" />
          </div>
        </div>
      </section>

      {/* Level map */}
      <section className="bg-white rounded-2xl border border-gray-100 p-4 md:p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm md:text-base font-semibold text-gray-900">Darajalar xaritasi</h2>
          <p className="text-xs text-gray-500">Keyingi darajalar bo‘yicha yo‘l xaritasi</p>
        </div>

        <div className="space-y-2">
          {levels.map((lvl) => (
            <div
              key={lvl.name}
              className="rounded-2xl border border-gray-100 bg-gray-50 p-3 md:p-4 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-lg">
                🔒
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-gray-900 truncate">{lvl.name}</p>
                  <p className="text-xs text-gray-500">{lvl.percent}%</p>
                </div>
                <div className="w-full h-2 rounded-full bg-white border border-gray-100 overflow-hidden mt-2">
                  <div className="h-full bg-blue-600" style={{ width: `${lvl.percent}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StudentProfile;