import { useState } from 'react';
import {
  HiOutlinePlusCircle,
  HiOutlineXMark,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineEyeSlash,
} from 'react-icons/hi2';

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

const initialNewsItems = [
  {
    title: 'CODIAL platformasi ishga tushirildi!',
    badge: 'Muhim',
    badgeColor: 'bg-orange-100 text-orange-700',
    excerpt:
      'Hurmatli o‘quvchi va ustozlar! CODIAL gamifikatsiya platformasi ishga tushirildi. Endi darslaringiz yanada qiziqarli va samarali bo‘ladi.',
    author: 'Muhammadmin Naziraliyev',
    role: 'Ega',
    date: '2026-02-15 11:00',
    isImportant: true,
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
    isImportant: false,
  },
];

const OwnerNews = () => {
  const [news, setNews] = useState(initialNewsItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState({
    title: '',
    body: '',
    imageUrl: '',
    isImportant: false,
  });

  const openModal = () => {
    setEditingIndex(null);
    setForm({
      title: '',
      body: '',
      imageUrl: '',
      isImportant: false,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (index) => {
    const item = news[index];
    setEditingIndex(index);
    setForm({
      title: item.title,
      body: item.excerpt,
      imageUrl: item.imageUrl || '',
      isImportant: !!item.isImportant,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      '0'
    )}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(
      2,
      '0'
    )}:${String(now.getMinutes()).padStart(2, '0')}`;

    const badge = form.isImportant ? 'Muhim' : 'Yangilik';
    const badgeColor = form.isImportant
      ? 'bg-orange-100 text-orange-700'
      : 'bg-sky-100 text-sky-700';

    const newItem = {
      title: form.title,
      badge,
      badgeColor,
      excerpt: form.body,
      author: 'Ega',
      role: 'Ega',
      date: formattedDate,
      isImportant: form.isImportant,
      imageUrl: form.imageUrl || '',
    };

    if (editingIndex === null) {
      setNews((prev) => [newItem, ...prev]);
    } else {
      setNews((prev) => prev.map((n, idx) => (idx === editingIndex ? newItem : n)));
    }

    setIsModalOpen(false);
  };

  const handleDelete = (index) => {
    setNews((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleUnpin = (index) => {
    setNews((prev) =>
      prev.map((item, idx) =>
        idx === index
          ? {
              ...item,
              isImportant: false,
              badge: 'Yangilik',
              badgeColor: 'bg-sky-100 text-sky-700',
            }
          : item,
      ),
    );
  };

  return (
    <div className="space-y-5 md:space-y-7">
      {/* Header */}
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Yangiliklar</h1>
          <p className="text-gray-500 text-sm md:text-base">
            Platformadagi yangiliklar va e‘lonlarni boshqarish
          </p>
        </div>
        <button
          type="button"
          onClick={openModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow-sm hover:bg-blue-700"
        >
          <HiOutlinePlusCircle className="text-lg" />
          <span>Yangilik qo‘shish</span>
        </button>
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
        {news.map((item, index) => (
          <article
            key={item.title + item.date}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-5 flex flex-col gap-3 hover:-translate-y-0.5 hover:shadow-md transition"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1.5">
                <h2 className="font-semibold text-gray-900 text-sm md:text-base lg:text-lg">
                  {item.title}
                </h2>
                <p className="text-xs md:text-sm text-gray-600 line-clamp-3">{item.excerpt}</p>
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
                <span className="px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-medium">
                  {item.role}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <span>📅</span>
                <span>{item.date}</span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
              <button
                type="button"
                onClick={() => handleUnpin(index)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 text-orange-700 text-[11px] font-semibold hover:bg-orange-100"
              >
                <HiOutlineEyeSlash className="w-4 h-4" />
                <span>Olib tashlash</span>
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openEditModal(index)}
                  className="w-9 h-9 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-blue-600 flex items-center justify-center"
                  aria-label="Tahrirlash"
                >
                  <HiOutlinePencilSquare className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(index)}
                  className="w-9 h-9 rounded-xl border border-gray-200 bg-white hover:bg-red-50 text-red-600 flex items-center justify-center"
                  aria-label="O‘chirish"
                >
                  <HiOutlineTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        title={editingIndex === null ? 'Yangilik qo‘shish' : 'Yangilikni tahrirlash'}
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <label className="text-xs md:text-sm font-medium text-gray-700">
              Sarlavha *
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="Yangilik sarlavhasini kiriting"
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs md:text-sm font-medium text-gray-700">Matn *</label>
            <textarea
              name="body"
              value={form.body}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Yangilik matnini kiriting..."
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs md:text-sm font-medium text-gray-700">
              Rasm URL (ixtiyoriy)
            </label>
            <input
              type="url"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-start gap-2 rounded-xl border border-amber-100 bg-amber-50 px-3 py-2.5">
            <input
              id="isImportant-owner"
              type="checkbox"
              name="isImportant"
              checked={form.isImportant}
              onChange={handleChange}
              className="mt-0.5 h-4 w-4 rounded border-amber-300 text-amber-600 focus:ring-amber-500"
            />
            <label
              htmlFor="isImportant-owner"
              className="text-xs md:text-sm text-amber-800 cursor-pointer"
            >
              Muhim yangilik sifatida belgilash (tepada ko‘rinadi)
            </label>
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
              {editingIndex === null ? 'Qo‘shish' : 'Saqlash'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default OwnerNews;