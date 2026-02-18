const newsItems = [
  {
    title: 'Fevral oyinging mega auksioni!',
    badge: 'Muhim',
    badgeColor: 'bg-orange-100 text-orange-700',
    excerpt:
      'Diqqat! Fevral oyinging eng katta auksioni 28-fevralda soat 15:00 da bo‘lib o‘tadi. MacBook Air M2, iPhone 15 Pro va boshqa ajoyib sovg‘alar coinlaringizni kutmoqda!',
    author: 'Robiya Anvarova',
    role: 'Admin',
    date: '2026-02-25 14:30',
  },
  {
    title: 'CODIAL platformasi ishga tushirildi!',
    badge: 'Muhim',
    badgeColor: 'bg-orange-100 text-orange-700',
    excerpt:
      'Hurmatli o‘quvchi va ustozlar! CODIAL gamifikatsiya platformasi ishga tushirildi. Endi darslaringiz yanada qiziqarli va samarali bo‘ladi.',
    author: 'Muhammadmin Naziraliyev',
    role: 'Ega',
    date: '2026-02-15 11:00',
  },
  {
    title: 'Leaderboardda yangi rekord!',
    badge: 'Yangilik',
    badgeColor: 'bg-sky-100 text-sky-700',
    excerpt:
      'Tabriklaymiz Hasanali Turdialiyev! U platformada birinchi marta 3000+ coin to‘plab, yangi rekord o‘rnatdi.',
    author: 'Dilyora Tursunova',
    role: 'Mentor',
    date: '2026-02-10 09:15',
  },
  {
    title: 'Dam olish kunlari e‘lon qilinadi',
    badge: 'E‘lon',
    badgeColor: 'bg-emerald-100 text-emerald-700',
    excerpt:
      'Navro‘z bayramiga tayyorgarlik ko‘rilmoqda. 19–22 mart kunlari dam olish kunlari sifatida belgilangan.',
    author: 'Robiya Anvarova',
    role: 'Admin',
    date: '2026-02-09 12:00',
  },
  {
    title: 'Yangi kurslar qo‘shildi',
    badge: 'Kurs',
    badgeColor: 'bg-violet-100 text-violet-700',
    excerpt:
      'Grafik dizayn va SMM & Marketing bo‘yicha yangi kurslar qo‘shildi. Qiziqqan o‘quvchilar administrator bilan bog‘lanishlari mumkin.',
    author: 'Ilhomjon Ibragimov',
    role: 'Admin',
    date: '2026-02-08 11:00',
  },
  {
    title: 'Kitob o‘qish coinlari oshirildi',
    badge: 'Kitoblar',
    badgeColor: 'bg-emerald-100 text-emerald-700',
    excerpt:
      'Endi kitob o‘qib, tahlil yozsangiz har bir kitob uchun olinadigan coin miqdori oshirildi. O‘qish uchun yanada ko‘proq motivatsiya!',
    author: 'Muhammadmin Naziraliyev',
    role: 'Ega',
    date: '2026-02-06 16:00',
  },
];

const StudentNews = () => {
  return (
    <div className="space-y-5 md:space-y-7">
      {/* Header */}
      <header className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Yangiliklar
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          Platformadagi so‘nggi yangiliklar va e‘lonlar
        </p>
      </header>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 md:p-4">
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-xl bg-gray-50 border border-gray-100">
          <span className="text-gray-400 text-lg">🔍</span>
          <input
            type="text"
            placeholder="Yangiliklar qidirish..."
            className="w-full bg-transparent text-sm md:text-base outline-none placeholder:text-gray-400 text-gray-900"
          />
        </div>
      </div>

      {/* News grid */}
      <section className="grid gap-4 md:gap-5 lg:grid-cols-2">
        {newsItems.map((item) => (
          <article
            key={item.title + item.date}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-5 flex flex-col gap-3 hover:-translate-y-0.5 hover:shadow-md transition"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1.5">
                <h2 className="font-semibold text-gray-900 text-sm md:text-base lg:text-lg">
                  {item.title}
                </h2>
                <p className="text-xs md:text-sm text-gray-600 line-clamp-3">
                  {item.excerpt}
                </p>
              </div>
              <span
                className={`text-[11px] md:text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${item.badgeColor}`}
              >
                {item.badge}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1 border-t border-gray-100 mt-1 pt-2.5">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="text-gray-400">✍️</span>
                <span>{item.author}</span>
                <span className="px-1.5 py-0.5 rounded-full bg-sky-50 text-sky-600 text-[11px] font-medium">
                  {item.role}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <span>📅</span>
                <span>{item.date}</span>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default StudentNews;