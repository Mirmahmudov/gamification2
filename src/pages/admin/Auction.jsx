import {
  HiOutlinePlusCircle,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineMapPin,
  HiOutlineShoppingBag,
  HiOutlineSparkles,
} from 'react-icons/hi2';
import { RiCoinLine, RiAuctionLine } from 'react-icons/ri';

const events = [
  {
    id: 1,
    title: 'Fevral 2026 Mega Auksioni',
    status: 'Kutilmoqda',
    date: '2026-02-28',
    time: '15:00',
    location: `CODIAL Ta'lim Markazi, Toshkent`,
    desc: `Fevral oyining eng yirik auksioni. Ajoyib sovg'alar va dasturchilar uchun zarur mahsulotlar!`,
    products: [
      { name: 'MacBook Air M2', minPrice: 50000 },
      { name: 'iPad Pro 12.9"', minPrice: 35000 },
      { name: 'iPhone 15 Pro', minPrice: 45000 },
      { name: 'Samsung Galaxy Watch 6', minPrice: 12000 },
      { name: `Dasturlash Kitoblari To'plami`, minPrice: 1500 },
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
    location: `CODIAL Ta'lim Markazi, Toshkent`,
    desc: `Yanvar oyining auksioni. O'quvchilar coinlarini sarflab ajoyib mukofotlarga ega bo'lishdi.`,
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
    location: `CODIAL Ta'lim Markazi, Toshkent`,
    desc: `Yangi yilga bag'ishlangan maxsus auksion.`,
    products: [],
  },
];

const AdminAuction = () => {
  return (
    <div className="space-y-5 md:space-y-6">
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
          <HiOutlinePlusCircle className="w-5 h-5" />
          <span>Auksion qo'shish</span>
        </button>
      </header>

      <div className="space-y-5">
        {events.map((e) => (
          <section
            key={e.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition"
          >
            {/* Header */}
            <div className={`p-5 ${e.status === 'Kutilmoqda' ? 'bg-gradient-to-r from-blue-50 to-indigo-50' : 'bg-gray-50'}`}>
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <RiAuctionLine className={`w-5 h-5 ${e.status === 'Kutilmoqda' ? 'text-blue-600' : 'text-gray-500'}`} />
                    <h2 className="text-base md:text-lg font-bold text-gray-900">
                      {e.title}
                    </h2>
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                        e.status === 'Kutilmoqda'
                          ? 'bg-blue-100 text-blue-700 border border-blue-200'
                          : 'bg-gray-100 text-gray-600 border border-gray-200'
                      }`}
                    >
                      {e.status === 'Kutilmoqda' && <HiOutlineSparkles className="w-3 h-3 mr-1" />}
                      {e.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{e.desc}</p>
                </div>

                <div className="flex items-center gap-2 self-start flex-shrink-0">
                  <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 hover:bg-gray-50 transition">
                    <HiOutlinePencilSquare className="w-4 h-4" />
                    <span className="hidden sm:inline">Tahrirlash</span>
                  </button>
                  <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-red-200 bg-red-50 text-sm text-red-600 hover:bg-red-100 transition">
                    <HiOutlineTrash className="w-4 h-4" />
                    <span className="hidden sm:inline">O'chirish</span>
                  </button>
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
                <div className="flex items-center gap-1.5">
                  <HiOutlineCalendar className="w-4 h-4" />
                  <span>{e.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <HiOutlineClock className="w-4 h-4" />
                  <span>{e.time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <HiOutlineMapPin className="w-4 h-4" />
                  <span>{e.location}</span>
                </div>
              </div>
            </div>

            {/* Products Section */}
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HiOutlineShoppingBag className="w-5 h-5 text-gray-600" />
                  <p className="text-sm font-semibold text-gray-900">
                    Mahsulotlar ({e.products.length})
                  </p>
                </div>
                <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-700 hover:bg-gray-100 transition">
                  <HiOutlinePlusCircle className="w-4 h-4" />
                  <span>Qo'shish</span>
                </button>
              </div>

              {e.products.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 py-12 text-sm text-gray-500 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                  <HiOutlineShoppingBag className="w-12 h-12 text-gray-300" />
                  <span>Mahsulotlar hali qo'shilmagan</span>
                </div>
              ) : (
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {e.products.map((p) => (
                    <article
                      key={p.name}
                      className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 p-4 hover:shadow-md hover:-translate-y-0.5 transition-all"
                    >
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <p className="text-sm font-semibold text-gray-900 line-clamp-2">
                          {p.name}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-gray-500">Boshlang'ich narx:</p>
                        <div className="flex items-center gap-1.5">
                          <RiCoinLine className="w-5 h-5 text-orange-500" />
                          <p className="text-lg font-bold text-gray-900">
                            {p.minPrice.toLocaleString('uz-UZ')}
                          </p>
                        </div>
                      </div>
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
