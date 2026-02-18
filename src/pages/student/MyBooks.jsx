const books = [
  {
    title: 'Inson qidiruvi',
    author: 'Viktor Frankl',
    status: 'Tugatdim',
    statusColor: 'bg-emerald-50 text-emerald-600',
    start: '2026-01-05',
    end: '2026-01-25',
  },
  {
    title: 'Atom odatlar',
    author: 'James Clear',
    status: 'Tugatdim',
    statusColor: 'bg-emerald-50 text-emerald-600',
    start: '2026-01-28',
    end: '2026-02-08',
  },
  {
    title: 'Clean Code',
    author: 'Robert C. Martin',
    status: 'O‘qiyapman',
    statusColor: 'bg-sky-50 text-sky-600',
    start: '2026-02-09',
    end: null,
  },
];

const StudentMyBooks = () => {
  return (
    <div className="space-y-5 md:space-y-7">
      {/* Header */}
      <header className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Kitoblarim 📚
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          O‘qigan kitoblaringiz va jarayondagilar
        </p>
      </header>

      {/* Top stats */}
      <section className="grid gap-3 md:gap-4 md:grid-cols-3">
        <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-2xl p-4 md:p-5 shadow-sm">
          <p className="text-xs md:text-sm opacity-90 mb-1">Jami kitoblar</p>
          <p className="text-2xl md:text-3xl font-bold">3</p>
        </div>
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-2xl p-4 md:p-5 shadow-sm">
          <p className="text-xs md:text-sm opacity-90 mb-1">O‘qib tugatdim</p>
          <p className="text-2xl md:text-3xl font-bold">2</p>
        </div>
        <div className="bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-2xl p-4 md:p-5 shadow-sm">
          <p className="text-xs md:text-sm opacity-90 mb-1">O‘qiyapman</p>
          <p className="text-2xl md:text-3xl font-bold">1</p>
        </div>
      </section>

      {/* Filter row */}
      <section className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2 text-xs md:text-sm">
          {['Hammasi (3)', 'O‘qiyapman (1)', 'Tugatdim (2)'].map((label, idx) => (
            <button
              key={label}
              className={`px-3 py-1.5 rounded-full border text-xs md:text-sm ${
                idx === 0
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              } transition`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-gray-500 text-xs md:text-sm">
          <button className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-sm">
            ⬜
          </button>
          <button className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
            ⬛
          </button>
        </div>
      </section>

      {/* Books grid */}
      <section className="grid gap-4 lg:grid-cols-2">
        {books.map((book) => (
          <article
            key={book.title}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-5 flex flex-col gap-3 hover:-translate-y-0.5 hover:shadow-md transition"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-1">
                <h2 className="font-semibold text-gray-900 text-sm md:text-base lg:text-lg">
                  {book.title}
                </h2>
                <p className="text-xs md:text-sm text-gray-500">
                  Muallif: {book.author}
                </p>
              </div>
              <span
                className={`text-[11px] md:text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${book.statusColor}`}
              >
                {book.status}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-[11px] md:text-xs text-gray-500">
              <span>Boshlangan: {book.start}</span>
              {book.end && <span>Tugallangan: {book.end}</span>}
            </div>

            <div className="text-xs md:text-sm text-gray-600 bg-gray-50 rounded-xl p-3">
              <p className="font-medium mb-1">Xulosa:</p>
              <p className="leading-relaxed">
                Bu yerga kitob bo‘yicha qisqa fikrlaringiz yoziladi. Toza, tushunarli va samarali
                tarzda qayd eting.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <div className="flex flex-wrap gap-2 text-[11px] md:text-xs">
                <button className="px-3 py-1.5 rounded-full bg-sky-50 text-sky-600 font-medium hover:bg-sky-100 transition">
                  Tahrirlash
                </button>
                <button className="px-3 py-1.5 rounded-full bg-red-50 text-red-600 font-medium hover:bg-red-100 transition">
                  O‘chirish
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Add button */}
      <div className="flex justify-end">
        <button className="inline-flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-full bg-blue-600 text-white text-sm md:text-base font-semibold shadow-sm hover:bg-blue-700 hover:shadow-md transition">
          <span className="text-lg">＋</span>
          <span>Yangi kitob qo‘shish</span>
        </button>
      </div>
    </div>
  );
};

export default StudentMyBooks;