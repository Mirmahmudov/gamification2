import { useEffect, useMemo, useState } from 'react';
import { FiGrid, FiList } from 'react-icons/fi';
import {
  createBookRequest,
  deleteBookRequest,
  getBooksRequest,
  updateBookRequest,
} from '../../utils/api';
import { getAccessToken, getRefreshToken, setAccessToken } from '../../utils/auth';
import { useStudentData } from '../../contexts/StudentDataContext';
import {
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineXMark,
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

const statusColorByStatus = {
  'O‘qiyapman': 'bg-sky-50 text-sky-600',
  Tugatdim: 'bg-emerald-50 text-emerald-600',
};

const normalizeStatus = (statusRaw) => {
  const s = (statusRaw || '').toString().trim().toLowerCase();
  if (s.includes("o'qiyapman") || s.includes('o‘qiyapman') || s.includes('oqiyapman')) return 'O‘qiyapman';
  if (s.includes('tugat')) return 'Tugatdim';
  if (!statusRaw) return 'O‘qiyapman';
  return statusRaw;
};

const toApiStatus = (uiStatus) => {
  if (uiStatus === 'O‘qiyapman') return "O'qiyapman";
  // Backendda status qiymati "Tugatim" (shunaqa yozilgan)
  if (uiStatus === 'Tugatdim') return 'Tugatim';
  return uiStatus || "O'qiyapman";
};

const buildBookFormData = ({ title, author, description, start_date, end_date, status, student, book_photo_file }) => {
  const fd = new FormData();
  fd.append('title', title ?? '');
  fd.append('author', author ?? '');
  fd.append('description', description ?? '');
  fd.append('start_date', start_date ?? '');
  if (end_date) fd.append('end_date', end_date);
  fd.append('status', status ?? '');
  fd.append('student', String(student ?? ''));
  if (book_photo_file instanceof File) {
    fd.append('book_photo', book_photo_file);
  }
  return fd;
};

const normalizeBook = (apiBook) => {
  const status = normalizeStatus(apiBook?.status);
  return {
    id: apiBook?.id,
    title: apiBook?.title || '—',
    author: apiBook?.author || '—',
    status,
    statusColor: statusColorByStatus[status] || 'bg-gray-50 text-gray-600',
    start: apiBook?.start_date || '—',
    end: apiBook?.end_date || null,
    cover: apiBook?.book_photo || '',
    summary: apiBook?.description || '',
    student: apiBook?.student ?? null,
  };
};

const StudentMyBooks = () => {
  const { student } = useStudentData();
  const studentId = student?.id ?? null;

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [activeFilter, setActiveFilter] = useState('all'); // all | reading | finished
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [mode, setMode] = useState('edit'); // edit | create
  const [formError, setFormError] = useState('');
  const [formValues, setFormValues] = useState({
    title: '',
    author: '',
    start_date: '',
    end_date: '',
    status: 'O‘qiyapman',
    description: '',
  });
  const [photoFile, setPhotoFile] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getBooksRequest(getAccessToken, getRefreshToken, setAccessToken);
        const apiList = Array.isArray(data) ? data : [];
        const scoped = studentId ? apiList.filter((b) => b?.student === studentId) : apiList;
        const next = scoped.map(normalizeBook);
        if (!cancelled) setBooks(next);
      } catch (err) {
        if (!cancelled) setError(err?.message || "Kitoblarni yuklab bo'lmadi.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [studentId]);

  const openCreateModal = () => {
    setMode('create');
    setEditingBook(null);
    setFormError('');
    setPhotoFile(null);
    setFormValues({
      title: '',
      author: '',
      start_date: '',
      end_date: '',
      status: 'O‘qiyapman',
      description: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (book) => {
    setMode('edit');
    setEditingBook(book);
    setFormError('');
    setPhotoFile(null);
    setFormValues({
      title: book?.title || '',
      author: book?.author || '',
      start_date: book?.start && book.start !== '—' ? book.start : '',
      end_date: book?.end || '',
      status: book?.status || 'O‘qiyapman',
      description: book?.summary || '',
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;
    setIsModalOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (mode === 'edit' && !editingBook?.id) return;
    if (!studentId) {
      setFormError('Student topilmadi. Qayta login qiling.');
      return;
    }

    setSaving(true);
    setFormError('');
    try {
      const fd = buildBookFormData({
        title: formValues.title?.trim(),
        author: formValues.author?.trim(),
        description: formValues.description?.trim(),
        start_date: formValues.start_date,
        end_date: formValues.end_date || '',
        status: toApiStatus(formValues.status),
        student: studentId,
        book_photo_file: photoFile,
      });

      if (mode === 'edit') {
        const updated = await updateBookRequest(
          editingBook.id,
          fd,
          getAccessToken,
          getRefreshToken,
          setAccessToken
        );
        const normalized = normalizeBook(updated);
        setBooks((prev) => prev.map((b) => (b.id === editingBook.id ? normalized : b)));
      } else {
        const created = await createBookRequest(
          fd,
          getAccessToken,
          getRefreshToken,
          setAccessToken
        );
        const normalized = normalizeBook(created);
        setBooks((prev) => [normalized, ...prev]);
      }

      setIsModalOpen(false);
    } catch (err) {
      setFormError(err?.message || "Saqlab bo'lmadi.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (book) => {
    if (!book?.id) return;
    const ok = window.confirm(`"${book.title}" kitobini o‘chirmoqchimisiz?`);
    if (!ok) return;

    setSaving(true);
    setError('');
    try {
      await deleteBookRequest(book.id, getAccessToken, getRefreshToken, setAccessToken);
      setBooks((prev) => prev.filter((b) => b.id !== book.id));
    } catch (err) {
      setError(err?.message || "O‘chirishda xatolik bo‘ldi.");
    } finally {
      setSaving(false);
    }
  };

  const { total, finished, reading } = useMemo(() => {
    const totalCount = books.length;
    const finishedCount = books.filter((b) => b.status === 'Tugatdim').length;
    const readingCount = books.filter((b) => b.status === 'O‘qiyapman').length;
    return { total: totalCount, finished: finishedCount, reading: readingCount };
  }, [books]);

  const filteredBooks = useMemo(() => {
    if (activeFilter === 'reading') return books.filter((b) => b.status === 'O‘qiyapman');
    if (activeFilter === 'finished') return books.filter((b) => b.status === 'Tugatdim');
    return books;
  }, [activeFilter, books]);

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
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-full border text-xs md:text-sm transition ${
              activeFilter === 'all'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            Hammasi ({total})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('reading')}
            className={`px-3 py-1.5 rounded-full border text-xs md:text-sm transition ${
              activeFilter === 'reading'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            O‘qiyapman ({reading})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('finished')}
            className={`px-3 py-1.5 rounded-full border text-xs md:text-sm transition ${
              activeFilter === 'finished'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            Tugatdim ({finished})
          </button>
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

      {loading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <p className="text-gray-500">Yuklanmoqda...</p>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <p className="text-red-500">{error}</p>
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
          <p className="font-semibold text-gray-900">Kitoblar topilmadi</p>
          <p className="text-sm text-gray-500 mt-1">
            Filtrni o‘zgartiring yoki keyinroq qayta urinib ko‘ring.
          </p>
        </div>
      ) : null}

      {/* Books */}
      {!loading && !error && filteredBooks.length > 0 && viewMode === 'grid' ? (
        <section className="grid gap-4 lg:grid-cols-2">
          {filteredBooks.map((book) => (
            <article
              key={book.id ?? `${book.title}-${book.start}`}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-5 flex flex-col gap-3 hover:-translate-y-0.5 hover:shadow-md transition"
            >
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-100">
                  {book.cover ? (
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                      Rasm yo‘q
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1 min-w-0">
                      <h2 className="font-semibold text-gray-900 text-sm md:text-base lg:text-lg truncate">
                        {book.title}
                      </h2>
                      <p className="text-xs md:text-sm text-gray-500 truncate">Muallif: {book.author}</p>
                    </div>
                    <span
                      className={`text-[11px] md:text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${book.statusColor}`}
                    >
                      {book.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] md:text-xs text-gray-500 mt-2">
                    <span>Boshlangan: {book.start}</span>
                    {book.end && <span>Tugallangan: {book.end}</span>}
                  </div>
                </div>
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
                    disabled={saving}
                    onClick={() => openEditModal(book)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-sky-50 text-sky-700 font-medium hover:bg-sky-100 transition disabled:opacity-60"
                  >
                    <HiOutlinePencilSquare className="text-sm" />
                    <span>Tahrirlash</span>
                  </button>
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => handleDelete(book)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-50 text-red-700 font-medium hover:bg-red-100 transition disabled:opacity-60"
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
        !loading && !error && filteredBooks.length > 0 && (
        <section className="space-y-4">
          {filteredBooks.map((book) => (
            <article
              key={book.id ?? `${book.title}-${book.start}`}
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
                      disabled={saving}
                      onClick={() => openEditModal(book)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-sky-50 text-sky-700 font-medium hover:bg-sky-100 transition disabled:opacity-60"
                    >
                      <HiOutlinePencilSquare className="text-sm" />
                      <span>Tahrirlash</span>
                    </button>
                    <button
                      type="button"
                      disabled={saving}
                      onClick={() => handleDelete(book)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-50 text-red-700 font-medium hover:bg-red-100 transition disabled:opacity-60"
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
        )
      )}

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        title={mode === 'create' ? "Yangi kitob qo'shish" : 'Kitobni tahrirlash'}
      >
        <form className="space-y-4" onSubmit={handleSave}>
          {formError && (
            <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
              {formError}
            </p>
          )}

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
                name="start_date"
                value={formValues.start_date}
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
                name="end_date"
                value={formValues.end_date}
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
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs md:text-sm font-medium text-gray-700">
                Muqova (file)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {mode === 'edit' && editingBook?.cover && !photoFile && (
                <p className="text-[11px] text-gray-500">
                  Hozirgi rasm saqlanadi (almashtirish uchun file tanlang).
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs md:text-sm font-medium text-gray-700">Xulosa *</label>
            <textarea
              name="description"
              value={formValues.description}
              onChange={handleFormChange}
              required
              rows={4}
              placeholder="Kitob haqida qisqacha xulosa yozing..."
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={closeModal}
              disabled={saving}
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 shadow-sm disabled:opacity-70"
            >
              {saving ? 'Saqlanmoqda...' : 'Saqlash'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Add button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={openCreateModal}
          disabled={saving || loading}
          className="inline-flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-full bg-blue-600 text-white text-sm md:text-base font-semibold shadow-sm hover:bg-blue-700 hover:shadow-md transition disabled:opacity-70"
        >
          <span>＋</span>
          <span>Yangi kitob qo‘shish</span>
        </button>
      </div>
    </div>
  );
};

export default StudentMyBooks;