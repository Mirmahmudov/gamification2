const auctionItems = [
  {
    title: 'MacBook Air M2',
    category: 'Texnologiya',
    price: '50,000',
  },
  {
    title: 'iPad Pro 12.9"',
    category: 'Texnologiya',
    price: '35,000',
  },
  {
    title: 'iPhone 15 Pro',
    category: 'Texnologiya',
    price: '45,000',
  },
  {
    title: 'Samsung Galaxy Watch 6',
    category: 'Wearables',
    price: '12,000',
  },
  {
    title: 'Dasturlash Kitoblari To‘plami',
    category: 'Kitoblar',
    price: '1,500',
  },
  {
    title: 'Sony Headphones WH‑1000XM5',
    category: 'Audio',
    price: '10,000',
  },
  {
    title: 'iPad Mini',
    category: 'Texnologiya',
    price: '18,000',
  },
  {
    title: 'Webcam Logitech 4K',
    category: 'Aksesuarlar',
    price: '4,500',
  },
  {
    title: 'Powerbank 20000mAh',
    category: 'Aksesuarlar',
    price: '800',
  },
];

const StudentAuction = () => {
  return (
    <div className="space-y-5 md:space-y-7">
      {/* Header */}
      <header className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Auksion
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          Coinlaringizga ajoyib sovg‘alar sotib oling!
        </p>
      </header>

      {/* Big banner */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl p-5 md:p-7 shadow-sm">
        <div className="flex flex-col gap-4 md:gap-5">
          <div>
            <p className="text-xs md:text-sm opacity-90 mb-1">
              Fevral 2026 Mega Auksioni
            </p>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
              Fevral oyinging mega auksioni
            </h2>
            <p className="text-xs md:text-sm mt-2 text-orange-50">
              2026-02-28 · 15:00 — coinlaringizni ajoyib sovg‘alar va dasturlash uchun kerakli
              mahsulotlarga almashtiring.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 text-center text-xs md:text-sm">
            {[
              { label: 'Kun', value: '15' },
              { label: 'Soat', value: '8' },
              { label: 'Daqiqa', value: '45' },
              { label: 'Soniya', value: '23' },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white/10 rounded-xl py-2 md:py-3 px-2 flex flex-col gap-1"
              >
                <span className="text-lg md:text-2xl font-semibold">{item.value}</span>
                <span className="text-[11px] md:text-xs opacity-80">{item.label}</span>
              </div>
            ))}
          </div>

          <p className="text-[11px] md:text-xs text-orange-50">
            Offline auksion CODIAL ta‘lim markazida o‘tkaziladi. Belgilangan vaqtda markazga
            tashrif buyuring.
          </p>
        </div>
      </section>

      {/* Info card */}
      <section className="bg-white rounded-2xl border border-blue-100 p-4 md:p-5 shadow-sm flex gap-3">
        <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
          <span className="text-lg text-blue-600">ℹ️</span>
        </div>
        <div className="space-y-1">
          <h2 className="text-sm md:text-base font-semibold text-gray-900">
            Offline auksion
          </h2>
          <p className="text-xs md:text-sm text-gray-600">
            Auksion offline tarzda o‘tkaziladi. Ishtirok etish uchun belgilangangan vaqtda
            markazga tashrif buyuring.
          </p>
          <p className="text-[11px] md:text-xs text-blue-600 font-medium">
            Manzil: CODIAL Ta‘lim Markazi, Toshkent
          </p>
        </div>
      </section>

      {/* Products grid */}
      <section className="space-y-3 md:space-y-4">
        <h2 className="font-semibold text-gray-900 text-sm md:text-base">
          Auksion mahsulotlari
        </h2>
        <div className="grid gap-4 md:gap-5 md:grid-cols-2 xl:grid-cols-3">
          {auctionItems.map((item) => (
            <article
              key={item.title}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:-translate-y-0.5 hover:shadow-md transition"
            >
              <div className="h-28 md:h-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center text-white text-sm md:text-base font-medium">
                {item.title}
              </div>
              <div className="p-4 md:p-5 space-y-2 flex-1 flex flex-col">
                <div className="flex items-center justify-between text-[11px] md:text-xs mb-1">
                  <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 font-medium">
                    {item.category}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 font-medium">
                    Offline auksion
                  </span>
                </div>
                <p className="text-xs md:text-sm text-gray-600 flex-1">
                  Coinlaringizni ushbu mahsulot uchun sarflab, zamonaviy texnika va aksessuarlar
                  qo‘lga kiriting.
                </p>
                <div className="pt-2 flex items-center justify-between">
                  <div className="text-xs md:text-sm text-orange-500 font-semibold">
                    Boshlang‘ich narx:
                    <div className="text-lg md:text-xl text-orange-600 font-bold">
                      {item.price} <span className="text-sm align-middle">coin</span>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 rounded-full bg-blue-600 text-white text-xs md:text-sm font-medium hover:bg-blue-700 transition">
                    Stavka qilish
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Rules */}
      <section className="bg-white rounded-2xl border border-gray-100 p-4 md:p-5 shadow-sm">
        <h2 className="font-semibold text-gray-900 text-sm md:text-base mb-3">
          Auksion qoidalari
        </h2>
        <ul className="space-y-1.5 text-xs md:text-sm text-gray-600 list-disc list-inside">
          <li>Auksion har oyning oxirida o‘tkaziladi.</li>
          <li>Faqat yig‘ilgan coinlaringiz bilan ishtirok etishingiz mumkin.</li>
          <li>Auksion jarayoni ochiq va adolatli tarzda o‘tkaziladi.</li>
          <li>Yutgan mahsulotni auksion oxirida olasiz.</li>
          <li>Sarflangan coinlar qaytarilmaydi.</li>
        </ul>
      </section>
    </div>
  );
};

export default StudentAuction;