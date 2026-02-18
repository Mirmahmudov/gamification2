const events = [
  {
    id: 1,
    title: 'Fevral 2026 Mega Auksioni',
    status: 'Kutilmoqda',
    date: '2026-02-28',
    time: '15:00',
    location: 'CODIAL Ta’lim Markazi, Toshkent',
    desc: 'Fevral oyinging eng yirik auksioni. Ajoyib sovg‘alar va dasturchilar uchun zarur mahsulotlar!',
    products: [
      { name: 'MacBook Air M2', minPrice: 50000 },
      { name: 'iPad Pro 12.9"', minPrice: 35000 },
      { name: 'iPhone 15 Pro', minPrice: 45000 },
      { name: 'Samsung Galaxy Watch 6', minPrice: 12000 },
      { name: 'Dasturlash Kitoblari To‘plami', minPrice: 1500 },
      { name: 'Sony Headphones WH‑1000XM5', minPrice: 10000 },
      { name: 'iPad Mini', minPrice: 18000 },
      { name: 'Webcam Logitech 4K', minPrice: 4500 },
      { name: 'Powerbank 20000mAh', minPrice: 800 },
    ],
  },
  {
    id: 2,
    title: 'Yanvar 2026 Auksioni',
    status: 'Yakunlangan',
    date: '2026-01-31',
    time: '14:00',
    location: 'CODIAL Ta’lim Markazi, Toshkent',
    desc: 'Yanvar oyinging auksioni. O‘quvchilar o‘z coinlarini sarflab ajoyib mukofotlarga ega bo‘lishdi.',
    products: [
      { name: 'Gaming Monitor 27"', minPrice: 32000 },
      { name: 'Bluetooth Speaker JBL', minPrice: 3000 },
      { name: 'USB Hub 7 Port', minPrice: 600 },
    ],
  },
  {
    id: 3,
    title: 'Dekabr 2025 Yangi Yil Auksioni',
    status: 'Yakunlangan',
    date: '2025-12-25',
    time: '16:00',
    location: 'CODIAL Ta’lim Markazi, Toshkent',
    desc: 'Yangi yilga bag‘ishlangan maxsus auksion. Talabalar ko‘plab qiziqarli sovg‘alarni qo‘lga kiritishdi.',
    products: [],
  },
];

const AdminAuction = () => {
  return (
    <div className="space-y-5 md:space-y-7">
      <header className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Auktsionlar
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            Auksion eventlarini boshqarish
          </p>
        </div>
        <button className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow-sm hover:bg-blue-700 transition">
          <span>＋</span>
          <span>Auksion qo‘shish</span>
        </button>
      </header>

      <div className="space-y-5 md:space-y-6">
        {events.map((e) => (
          <section
            key={e.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-5 space-y-4"
          >
            {/* Header row */}
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm md:text-base font-semibold text-gray-900">
                    {e.title}
                  </h2>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      e.status === 'Kutilmoqda'
                        ? 'bg-blue-50 text-blue-700'
                        : 'bg-gray-50 text-gray-600'
                    }`}
                  >
                    {e.status}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-gray-600">{e.desc}</p>
              </div>

              <div className="flex items-center gap-2 self-start">
                <button className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-gray-200 bg-white text-xs md:text-sm text-gray-700 hover:bg-gray-50">
                  ✎ Tahrirlash
                </button>
                <button className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-red-200 bg-red-50 text-xs md:text-sm text-red-600 hover:bg-red-100">
                  🗑 O‘chirish
                </button>
              </div>
            </div>

            {/* Meta row */}
            <div className="flex flex-wrap gap-3 text-[11px] md:text-xs text-gray-500">
              <div className="flex items-center gap-1">
                📅 <span>{e.date}</span>
              </div>
              <div className="flex items-center gap-1">
                ⏰ <span>{e.time}</span>
              </div>
              <div className="flex items-center gap-1">
                📍 <span>{e.location}</span>
              </div>
            </div>

            {/* Products */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs md:text-sm font-semibold text-gray-900">
                  Mahsulotlar ({e.products.length})
                </p>
                <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-gray-200 bg-gray-50 text-[11px] md:text-xs text-gray-700 hover:bg-gray-100">
                  ＋ Mahsulot qo‘shish
                </button>
              </div>

              {e.products.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 py-8 text-xs md:text-sm text-gray-500 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  <span className="text-2xl">📦</span>
                  <span>Mahsulotlar hali qo‘shilmagan</span>
                </div>
              ) : (
                <div className="grid gap-3 md:gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {e.products.map((p) => (
                    <article
                      key={p.name}
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 md:p-4 flex flex-col gap-2 hover:-translate-y-0.5 hover:shadow-md transition"
                    >
                      <p className="text-xs md:text-sm font-semibold text-gray-900">
                        {p.name}
                      </p>
                      <p className="text-[11px] text-gray-500">Boshlang‘ich narx:</p>
                      <p className="text-sm md:text-base font-bold text-orange-600">
                        {p.minPrice.toLocaleString('uz-UZ')} <span className="text-xs">coin</span>
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default AdminAuction;