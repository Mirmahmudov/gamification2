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

import { useEffect, useMemo, useState } from 'react';

const pad2 = (n) => String(n).padStart(2, '0');

const getTimeParts = (targetMs) => {
  const now = Date.now();
  const diff = Math.max(0, targetMs - now);
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { diff, days, hours, minutes, seconds };
};

const FlipUnit = ({ label, value }) => {
  const [prev, setPrev] = useState(value);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (value === prev) return;
    setFlip(true);
    const t = setTimeout(() => {
      setFlip(false);
      setPrev(value);
    }, 220);
    return () => clearTimeout(t);
  }, [value, prev]);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/10 border border-white/15 px-3 py-3 md:py-4 text-center">
      <div className="text-[10px] md:text-xs uppercase tracking-wider opacity-80">{label}</div>
      <div
        className={`mt-1 text-2xl md:text-3xl font-extrabold tabular-nums transition-transform duration-200 ${
          flip ? '-translate-y-1 scale-[1.03]' : 'translate-y-0 scale-100'
        }`}
      >
        {value}
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-white/15" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.18),transparent_55%),radial-gradient(circle_at_80%_90%,rgba(255,255,255,0.12),transparent_55%)]" />
    </div>
  );
};

const AuctionCountdown = ({ targetISO }) => {
  const targetMs = useMemo(() => new Date(targetISO).getTime(), [targetISO]);
  const [parts, setParts] = useState(() => getTimeParts(targetMs));

  useEffect(() => {
    const id = setInterval(() => {
      setParts(getTimeParts(targetMs));
    }, 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  const ended = parts.diff === 0;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
      <FlipUnit label="Kun" value={String(parts.days)} />
      <FlipUnit label="Soat" value={pad2(parts.hours)} />
      <FlipUnit label="Daqiqa" value={pad2(parts.minutes)} />
      <FlipUnit label="Soniya" value={pad2(parts.seconds)} />
      {ended && (
        <div className="sm:col-span-4 mt-1 text-center text-[11px] md:text-xs text-orange-50">
          Auksion boshlandi!
        </div>
      )}
    </div>
  );
};

const StudentAuction = () => {
  const targetISO = '2026-02-28T15:00:00';
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
      <section className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl p-5 md:p-7 shadow-sm">
        <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/15 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-24 w-80 h-80 rounded-full bg-black/10 blur-2xl" />
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

          <AuctionCountdown targetISO={targetISO} />

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