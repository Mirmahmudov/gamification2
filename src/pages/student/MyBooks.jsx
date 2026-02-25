import { useState } from 'react';
import {
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlinePlusCircle,
  HiOutlineXMark,
} from 'react-icons/hi2';
import { FiGrid, FiList } from 'react-icons/fi';

const Modal = ({ open, title, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Close modal overlay"
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="relative mx-auto mt-12 w-[92%] max-w-lg">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 text-sm md:text-base">{title}</h3>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition flex items-center justify-center text-gray-500"
              aria-label="Close"
            >
              <HiOutlineXMark className="w-5 h-5" />
            </button>
          </div>
          <div className="p-5 md:p-6 max-h-[70vh] overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};

const initialBooks = [
  {
    title: 'Inson qidiruvi',
    author: 'Viktor Frankl',
    status: 'Tugatdim',
    statusColor: 'bg-emerald-50 text-emerald-600',
    start: '2026-01-05',
    end: '2026-01-25',
    cover:
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&auto=format&fit=crop&q=80',
    summary:
      "Yozuvchi o'zining konslager tajribasidan kelib chiqqan holda, insonning ma'noga bo'lgan ehtiyojini va hayotdagi maqsadini topishning muhimligini tushuntiradi.",
  },
  {
    title: 'Atom odatlar',
    author: 'James Clear',
    status: 'Tugatdim',
    statusColor: 'bg-emerald-50 text-emerald-600',
    start: '2026-01-28',
    end: '2026-02-08',
    cover:
      'https://images.unsplash.com/photo-1544937950-fa07a98d237f?w=400&auto=format&fit=crop&q=80',
    summary:
      "Kichik o'zgarishlar qanday qilib katta natijalarga olib kelishini tushuntiruvchi amaliy qo'llanma.",
  },
  {
    title: 'Clean Code',
    author: 'Robert C. Martin',
    status: 'O‘qiyapman',
    statusColor: 'bg-sky-50 text-sky-600',
    start: '2026-02-09',
    end: null,
    cover:
      'https://images.unsplash.com/photo-1528208079124-0f0a448f7c39?w=400&auto=format&fit=crop&q=80',
    summary:
      "Dasturchilar uchun toza, o'qilishi oson va qo'llab-quvvatlanadigan kod yozish bo'yicha amaliy qo'llanma.",
  },
];

const statusColorByStatus = {
  'O‘qiyapman': 'bg-sky-50 text-sky-600',
  Tugatdim: 'bg-emerald-50 text-emerald-600',
  "Rejalashtirmoqdaman": 'bg-violet-50 text-violet-600',
};

const StudentMyBooks = () => {
  const [books, setBooks] = useState(initialBooks);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formValues, setFormValues] = useState({
    title: '',
    author: '',
    start: '',
    end: '',
    status: 'O‘qiyapman',
    cover: '',
    summary: '',
  });

  const total = books.length;
  const finished = books.filter((b) => b.status === 'Tugatdim').length;
  const reading = books.filter((b) => b.status === 'O‘qiyapman').length;

  const openAddModal = () => {
    setEditingIndex(null);
    setFormValues({
      title: '',
      author: '',
      start: '',
      end: '',
      status: 'O‘qiyapman',
      cover: '',
      summary: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (book, index) => {
    setEditingIndex(index);
    setFormValues({
      title: book.title,
      author: book.author,
      start: book.start,
      end: book.end || '',
      status: book.status,
      cover: book.cover || '',
      summary: book.summary || '',
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveBook = (e) => {
    e.preventDefault();

    const statusColor = statusColorByStatus[formValues.status] || 'bg-sky-50 text-sky-600';
    const payload = {
      ...formValues,
      end: formValues.end || null,
      statusColor,
    };

    if (editingIndex === null) {
      setBooks((prev) => [...prev, payload]);
    } else {
      setBooks((prev) => prev.map((b, idx) => (idx === editingIndex ? payload : b)));
    }

    setIsModalOpen(false);
  };

  const handleDelete = (index) => {
    setBooks((prev) => prev.filter((_, idx) => idx !== index));
  };

  return (
    <div className="space-y-5 md:space-y-7">
      {/* Header */}
      <header className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Kitoblarim
          </h1>
        <p className="text-gray-500 text-sm md:text-base">
          O‘qigan kitoblaringiz va jarayondagilar
        </p>
      </header>

      {/* Top stats */}
      <section className="grid gap-3 md:gap-4 md:grid-cols-3">
        <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-2xl p-4 md:p-5 shadow-sm">
          <p className="text-xs md:text-sm opacity-90 mb-1">Jami kitoblar</p>
          <p className="text-2xl md:text-3xl font-bold">{total}</p>
        </div>
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-2xl p-4 md:p-5 shadow-sm">
          <p className="text-xs md:text-sm opacity-90 mb-1">O‘qib tugatdim</p>
          <p className="text-2xl md:text-3xl font-bold">{finished}</p>
        </div>
        <div className="bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-2xl p-4 md:p-5 shadow-sm">
          <p className="text-xs md:text-sm opacity-90 mb-1">O‘qiyapman</p>
          <p className="text-2xl md:text-3xl font-bold">{reading}</p>
        </div>
      </section>

      {/* Filter row */}
      <section className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2 text-xs md:text-sm">
          {[
            `Hammasi (${total})`,
            `O‘qiyapman (${reading})`,
            `Tugatdim (${finished})`,
          ].map((label, idx) => (
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
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`w-9 h-9 rounded-xl border flex items-center justify-center shadow-sm transition ${
              viewMode === 'grid'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <FiGrid />
          </button>
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className={`w-9 h-9 rounded-xl border flex items-center justify-center shadow-sm transition ${
              viewMode === 'list'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <FiList />
          </button>
        </div>
      </section>

      {/* Books */}
      {viewMode === 'grid' ? (
        <section className="grid gap-4 lg:grid-cols-2">
          {books.map((book, index) => (
            <article
              key={book.title + book.start}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-5 flex flex-col gap-3 hover:-translate-y-0.5 hover:shadow-md transition"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1">
                  <h2 className="font-semibold text-gray-900 text-sm md:text-base lg:text-lg">
                    {book.title}
                  </h2>
                  <p className="text-xs md:text-sm text-gray-500">Muallif: {book.author}</p>
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
                  {book.summary ||
                    "Bu yerga kitob bo‘yicha qisqa fikrlaringiz yoziladi. Toza, tushunarli va samarali tarzda qayd eting."}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div className="flex flex-wrap gap-2 text-[11px] md:text-xs">
                  <button
                    type="button"
                    onClick={() => openEditModal(book, index)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-sky-50 text-sky-600 font-medium hover:bg-sky-100 transition"
                  >
                    <HiOutlinePencilSquare className="text-sm" />
                    <span>Tahrirlash</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(index)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-50 text-red-600 font-medium hover:bg-red-100 transition"
                  >
                    <HiOutlineTrash className="text-sm" />
                    <span>O‘chirish</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className="space-y-4">
          {books.map((book, index) => (
            <article
              key={book.title + book.start}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-5 flex flex-col gap-3 hover:-translate-y-0.5 hover:shadow-md transition md:flex-row"
            >
              <div className="w-full md:w-40 lg:w-44 h-40 md:h-32 rounded-2xl bg-gray-100 overflow-hidden flex-shrink-0">
                {book.cover ? (
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                    Rasm yo‘q
                  </div>
                )}
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-1">
                    <h2 className="font-semibold text-gray-900 text-sm md:text-base lg:text-lg">
                      {book.title}
                    </h2>
                    <p className="text-xs md:text-sm text-gray-500">Muallif: {book.author}</p>
                    <div className="flex flex-wrap gap-3 text-[11px] md:text-xs text-gray-500">
                      <span>Boshlangan: {book.start}</span>
                      {book.end && <span>Tugallangan: {book.end}</span>}
                    </div>
                  </div>
                  <span
                    className={`text-[11px] md:text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${book.statusColor}`}
                  >
                    {book.status}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-gray-600 line-clamp-3">
                  {book.summary ||
                    "Bu yerga kitob bo‘yicha qisqa fikrlaringiz yoziladi. Toza, tushunarli va samarali tarzda qayd eting."}
                </p>
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="flex flex-wrap gap-2 text-[11px] md:text-xs">
                    <button
                      type="button"
                      onClick={() => openEditModal(book, index)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-sky-50 text-sky-600 font-medium hover:bg-sky-100 transition"
                    >
                      <HiOutlinePencilSquare className="text-sm" />
                      <span>Tahrirlash</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(index)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-50 text-red-600 font-medium hover:bg-red-100 transition"
                    >
                      <HiOutlineTrash className="text-sm" />
                      <span>O‘chirish</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}

      {/* Add button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-full bg-blue-600 text-white text-sm md:text-base font-semibold shadow-sm hover:bg-blue-700 hover:shadow-md transition"
        >
          <HiOutlinePlusCircle className="text-lg" />
          <span>Yangi kitob qo‘shish</span>
        </button>
      </div>

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        title={editingIndex === null ? 'Yangi kitob qo‘shish' : 'Kitobni tahrirlash'}
      >
        <form className="space-y-4" onSubmit={handleSaveBook}>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs md:text-sm font-medium text-gray-700">
                Kitob nomi *
              </label>
              <input
                type="text"
                name="title"
                value={formValues.title}
                onChange={handleFormChange}
                required
                placeholder="Kitob nomini kiriting"
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs md:text-sm font-medium text-gray-700">
                Muallif *
              </label>
              <input
                type="text"
                name="author"
                value={formValues.author}
                onChange={handleFormChange}
                required
                placeholder="Muallif nomini kiriting"
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs md:text-sm font-medium text-gray-700">
                Boshlangan sana *
              </label>
              <input
                type="date"
                name="start"
                value={formValues.start}
                onChange={handleFormChange}
                required
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs md:text-sm font-medium text-gray-700">
                Tugallangan sana
              </label>
              <input
                type="date"
                name="end"
                value={formValues.end}
                onChange={handleFormChange}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs md:text-sm font-medium text-gray-700">Holat *</label>
              <select
                name="status"
                value={formValues.status}
                onChange={handleFormChange}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="O‘qiyapman">O‘qiyapman</option>
                <option value="Tugatdim">Tugatdim</option>
                <option value="Rejalashtirmoqdaman">Rejalashtirmoqdaman</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs md:text-sm font-medium text-gray-700">
                Muqova URL
              </label>
              <input
                type="url"
                name="cover"
                value={formValues.cover}
                onChange={handleFormChange}
                placeholder="https://example.com/image.jpg"
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-[11px] text-gray-400">
                Bo‘sh qoldirilsa, standart rasm qo‘llaniladi.
              </p>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs md:text-sm font-medium text-gray-700">Xulosa *</label>
            <textarea
              name="summary"
              value={formValues.summary}
              onChange={handleFormChange}
              required
              rows={3}
              placeholder="Kitob haqida qisqacha xulosa yozing..."
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={closeModal}
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 shadow-sm"
            >
              Saqlash
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default StudentMyBooks;