const StudentDashboard = () => {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <header className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Salom, Hasanali Turdialiyev! 👋
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          Bugungi natijalaringiz va rivojlanish ko‘rsatkichlari
        </p>
      </header>

      {/* Top cards */}
      <section className="grid gap-4 md:gap-6 md:grid-cols-3">
        {/* Level card */}
        <div className="md:col-span-1 bg-slate-900 text-white rounded-2xl p-5 md:p-6 shadow-sm">
          <p className="text-sm text-slate-200 mb-1">Sizning darajangiz</p>
          <h2 className="text-xl md:text-2xl font-semibold mb-2">Beginner</h2>
          <p className="text-xs text-slate-300 mb-4">Level 1</p>
          <div className="text-xs text-slate-300 mb-2">
            Keyingi daraja
          </div>
          <div className="w-full h-2 rounded-full bg-slate-700 overflow-hidden mb-1">
            <div className="h-full w-2/3 bg-gradient-to-r from-yellow-300 to-lime-300" />
          </div>
          <p className="text-[11px] text-slate-300">
            1550 coin qoldi
          </p>
        </div>

        {/* Coins card */}
        <div className="md:col-span-1 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white rounded-2xl p-5 md:p-6 shadow-sm">
          <p className="text-sm text-blue-100 mb-2">
            Jami Coinlaringiz
          </p>
          <p className="text-3xl md:text-4xl font-bold mb-2">
            3,250
          </p>
          <p className="text-xs text-blue-100">
            Keyingi level uchun 1550 coin kerak
          </p>
        </div>

        {/* Rank card */}
        <div className="md:col-span-1 bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-2">
            Sizning o‘rningiz
          </p>
          <p className="text-3xl md:text-4xl font-extrabold text-orange-500 leading-tight">
            #1
          </p>
          <p className="text-xs text-blue-600 font-medium mt-1">
            To‘liq reyting →
          </p>
        </div>
      </section>

      {/* Info bar */}
      <section className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] rounded-2xl px-5 py-4 md:px-6 md:py-4 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
            <span className="text-lg">🔔</span>
          </div>
          <div>
            <p className="text-sm md:text-base font-semibold">
              Yangi xabarlar!
            </p>
            <p className="text-xs md:text-sm text-blue-100">
              5 ta o‘qilmagan yangilik mavjud
            </p>
          </div>
        </div>
        <button className="self-start md:self-auto text-xs md:text-sm font-medium bg-white text-blue-600 px-4 py-2 rounded-full shadow-sm hover:bg-blue-50 transition">
          Ko‘rish
        </button>
      </section>

      {/* Stats row */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {[
          { label: 'Darslar', value: '12', icon: '🎯', color: 'bg-emerald-50 text-emerald-600' },
          { label: 'Kitoblar', value: '8', icon: '📚', color: 'bg-sky-50 text-sky-600' },
          { label: 'Faollik', value: '94%', icon: '🔥', color: 'bg-amber-50 text-amber-600' },
          { label: 'Guruhlar', value: '1', icon: '👥', color: 'bg-violet-50 text-violet-600' },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white rounded-2xl p-3 md:p-4 shadow-sm border border-gray-100 flex items-center gap-3"
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg ${item.color}`}>
              {item.icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{item.value}</p>
              <p className="text-[11px] text-gray-500">{item.label}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Middle grid: coin opportunities + rewards & groups */}
      <section className="grid gap-4 md:gap-6 lg:grid-cols-2">
        {/* Coin opportunities */}
        <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-gray-100 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 text-sm md:text-base">
              Coin topish imkoniyatlari
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { title: 'Vazifa topshirish', coins: '0–100 coin', color: 'from-sky-50 to-sky-100', text: 'text-sky-700' },
              { title: 'Faollik', coins: '+30 coin', color: 'from-amber-50 to-amber-100', text: 'text-amber-700' },
              { title: 'Kitob tahlili', coins: '+100 coin', color: 'from-emerald-50 to-emerald-100', text: 'text-emerald-700' },
              { title: 'Darsga qatnashish', coins: '+25 coin', color: 'from-violet-50 to-violet-100', text: 'text-violet-700' },
            ].map((item) => (
              <div
                key={item.title}
                className={`rounded-2xl bg-gradient-to-br ${item.color} p-3 border border-white shadow-sm`}
              >
                <p className="text-xs font-medium text-gray-700 mb-1">{item.title}</p>
                <p className={`text-xs font-semibold ${item.text}`}>{item.coins}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Rewards & groups */}
        <div className="space-y-4 md:space-y-5">
          {/* Latest rewards */}
          <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-gray-100">
            <h2 className="font-semibold text-gray-900 text-sm md:text-base mb-3">
              So‘nggi mukofotlar
            </h2>
            <div className="space-y-2.5">
              {[
                { title: 'Dars bahosi', date: '2026-02-10', coins: '+420' },
                { title: 'Yanvar oyi imtihoni', date: '2026-01-31', coins: '+525' },
                { title: 'Dars bahosi', date: '2026-02-07', coins: '+338' },
              ].map((item) => (
                <div
                  key={item.title + item.date}
                  className="flex items-center justify-between text-xs md:text-sm py-2 px-2.5 rounded-xl hover:bg-gray-50 transition"
                >
                  <div>
                    <p className="font-medium text-gray-900">{item.title}</p>
                    <p className="text-[11px] text-gray-500">{item.date}</p>
                  </div>
                  <p className="font-semibold text-emerald-500 text-sm">
                    {item.coins}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Groups */}
          <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-gray-100">
            <h2 className="font-semibold text-gray-900 text-sm md:text-base mb-3">
              Mening guruhlarim
            </h2>
            <div className="rounded-2xl border border-gray-100 p-3.5 md:p-4 flex flex-col gap-2 bg-gradient-to-br from-sky-50 to-sky-100">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-gray-900 text-sm md:text-base">
                  Backend 36
                </p>
                <span className="text-gray-400 text-lg">⋯</span>
              </div>
              <p className="text-xs text-gray-600">
                Ustoz: Otabek Tursunov
              </p>
              <p className="text-[11px] text-gray-500">
                Dush–Chor–Juma
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom quick actions */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[
          { label: 'Kitoblar', desc: '+100 coin', color: 'from-emerald-500 to-emerald-600', icon: '📚' },
          { label: 'Qoidalar', desc: 'Oqib chiqing', color: 'from-violet-500 to-violet-600', icon: '📘' },
          { label: 'Reyting', desc: '#1-o‘rin', color: 'from-amber-500 to-orange-500', icon: '🏆' },
          { label: 'Profil', desc: 'Ko‘rish', color: 'from-sky-500 to-blue-500', icon: '👤' },
        ].map((item) => (
          <button
            key={item.label}
            className={`flex items-center justify-between rounded-2xl px-4 py-3 md:px-5 md:py-4 text-left text-white bg-gradient-to-r ${item.color} shadow-sm hover:shadow-md hover:-translate-y-0.5 transition`}
          >
            <div>
              <p className="text-sm md:text-base font-semibold">{item.label}</p>
              <p className="text-xs md:text-[13px] opacity-90">{item.desc}</p>
            </div>
            <span className="text-2xl md:text-3xl opacity-95">
              {item.icon}
            </span>
          </button>
        ))}
      </section>
    </div>
  );
};

export default StudentDashboard;