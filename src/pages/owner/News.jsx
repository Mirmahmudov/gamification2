import { useState, useEffect } from 'react';
import {
  HiOutlinePlusCircle,
  HiOutlineXMark,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineNewspaper,
  HiOutlinePhoto,
} from 'react-icons/hi2';
import { getNewsRequest, createNewsRequest, updateNewsRequest, deleteNewsRequest } from '../../utils/api';
import { getAccessToken, getRefreshToken, setAccessToken } from '../../utils/auth';

const Modal = ({ open, title, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 px-4">
      <button
        aria-label="Close"
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg z-10">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 text-base">{title}</h3>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl hover:bg-gray-100 flex items-center justify-center text-gray-500 transition"
            >
              <HiOutlineXMark className="w-5 h-5" />
            </button>
          </div>
          <div className="p-5 max-h-[70vh] overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const d = new Date(dateString);
  return d.toLocaleDateString('uz-UZ', { year: 'numeric', month: '2-digit', day: '2-digit' });
};

const OwnerNews = () => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', image: null });
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getNewsRequest(getAccessToken, getRefreshToken, setAccessToken);
      setNews(data);
      setFilteredNews(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNews(); }, []);

  useEffect(() => {
    const q = searchQuery.trim().toLowerCase();
    setFilteredNews(
      q ? news.filter(i => i.title.toLowerCase().includes(q) || i.description.toLowerCase().includes(q)) : news
    );
  }, [searchQuery, news]);

  const openAddModal = () => {
    setEditingItem(null);
    setForm({ title: '', description: '', image: null });
    setImagePreview(null);
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setForm({ title: item.title, description: item.description, image: null });
    setImagePreview(item.image || null);
    setFormError('');
    setIsModalOpen(true);
  };

  const closeModal = () => { setIsModalOpen(false); setFormError(''); };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files?.[0]) {
      setForm(p => ({ ...p, image: files[0] }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(files[0]);
    } else {
      setForm(p => ({ ...p, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      setFormError('Sarlavha va matn majburiy.');
      return;
    }
    setSubmitting(true);
    setFormError('');
    try {
      const fd = new FormData();
      fd.append('title', form.title.trim());
      fd.append('description', form.description.trim());
      if (form.image) fd.append('image', form.image);

      if (editingItem) {
        await updateNewsRequest(editingItem.id, fd, getAccessToken, getRefreshToken, setAccessToken);
      } else {
        await createNewsRequest(fd, getAccessToken, getRefreshToken, setAccessToken);
      }
      await fetchNews();
      closeModal();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yangilikni o\'chirishni tasdiqlaysizmi?')) return;
    try {
      await deleteNewsRequest(id, getAccessToken, getRefreshToken, setAccessToken);
      await fetchNews();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-5 md:space-y-6">
      {/* Header */}
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Yangiliklar</h1>
          <p className="text-gray-500 text-sm">Platformadagi yangiliklar va e'lonlarni boshqarish</p>
        </div>
        <button
          onClick={openAddModal}
          className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition shadow-sm"
        >
          <HiOutlinePlusCircle className="w-5 h-5" />
          Yangilik qo'shish
        </button>
      </header>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200">
          <span className="text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Yangiliklar qidirish..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* States */}
      {loading && (
        <div className="flex justify-center py-12">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center text-sm text-red-600">{error}</div>
      )}
      {!loading && !error && filteredNews.length === 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-10 text-center">
          <HiOutlineNewspaper className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">{searchQuery ? 'Hech narsa topilmadi' : 'Yangiliklar yo\'q'}</p>
        </div>
      )}

      {/* News Grid */}
      {!loading && !error && filteredNews.length > 0 && (
        <section className="grid gap-4 lg:grid-cols-2">
          {filteredNews.map(item => (
            <article
              key={item.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              {item.image && (
                <div className="w-full h-44 overflow-hidden bg-gray-100">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-4 space-y-3">
                <div>
                  <h2 className="font-semibold text-gray-900 text-sm md:text-base mb-1">{item.title}</h2>
                  <p className="text-xs text-gray-600 line-clamp-2">{item.description}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-xs text-gray-400">📅 {formatDate(item.created_at)}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(item)}
                      className="w-8 h-8 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-200 text-blue-600 flex items-center justify-center transition"
                      aria-label="Tahrirlash"
                    >
                      <HiOutlinePencilSquare className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="w-8 h-8 rounded-lg border border-gray-200 hover:bg-red-50 hover:border-red-200 text-red-500 flex items-center justify-center transition"
                      aria-label="O'chirish"
                    >
                      <HiOutlineTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}

      {/* Modal */}
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        title={editingItem ? 'Yangilikni tahrirlash' : 'Yangilik qo\'shish'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {formError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600">{formError}</div>
          )}

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Sarlavha *</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="Yangilik sarlavhasi"
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Matn *</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Yangilik matni..."
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
              <HiOutlinePhoto className="w-4 h-4" />
              Rasm {editingItem && '(ixtiyoriy)'}
            </label>
            {imagePreview && (
              <div className="w-full h-36 rounded-xl overflow-hidden bg-gray-100 mb-2">
                <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
              </div>
            )}
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={closeModal}
              disabled={submitting}
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 transition shadow-sm"
            >
              {submitting ? 'Saqlanmoqda...' : editingItem ? 'Saqlash' : 'Qo\'shish'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default OwnerNews;
