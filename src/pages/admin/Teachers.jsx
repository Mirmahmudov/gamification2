import { useMemo, useState } from 'react';
import {
  HiOutlineMagnifyingGlass,
  HiOutlineUserPlus,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineXMark,
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlineAcademicCap,
  HiOutlineLockClosed,
  HiOutlineUserGroup,
  HiOutlineCheckCircle,
} from 'react-icons/hi2';
import { RiCoinLine } from 'react-icons/ri';

const initialTeachers = [
  { id: 1, name: 'Otabek Tursunov', email: 'otabek@codial.uz', course: 'Backend', groups: 2, students: 10 },
  { id: 2, name: 'Asadbek Mahmudov', email: 'asadbek@codial.uz', course: 'Frontend', groups: 2, students: 8 },
  { id: 3, name: 'Shukurulloh Zaylobiddinov', email: 'shukurulloh@codial.uz', course: 'Kiberxavfsizlik', groups: 2, students: 7 },
  { id: 4, name: 'Shaxzodbek Baxtiyorov', email: 'shaxzodbek@codial.uz', course: 'Flutter', groups: 2, students: 7 },
  { id: 5, name: "Nodira Ro'ziyeva", email: 'nodira@codial.uz', course: 'Frontend', groups: 1, students: 3 },
  { id: 6, name: 'Sardor Alimov', email: 'sardor@codial.uz', course: 'Backend', groups: 1, students: 2 },
  { id: 7, name: 'Malika Rahimova', email: 'malika@codial.uz', course: 'Grafik Dizayn', groups: 0, students: 0 },
];

const courseColors = {
  Backend: 'bg-emerald-50 text-emerald-700',
  Frontend: 'bg-blue-50 text-blue-700',
  Kiberxavfsizlik: 'bg-indigo-50 text-indigo-700',
  Flutter: 'bg-violet-50 text-violet-700',
  'Grafik Dizayn': 'bg-pink-50 text-pink-700',
};

const avatarColors = [
  'from-blue-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-violet-500 to-purple-600',
  'from-rose-500 to-pink-600',
  'from-amber-500 to-orange-600',
];

const getAvatarColor = (id) => avatarColors[(id - 1) % avatarColors.length];

const emptyForm = { name: '', email: '', course: '', password: '' };

const Modal = ({ open, title, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 px-4">
      <button
        aria-label="Close"
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 text-base">{title}</h3>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition flex items-center justify-center text-gray-500"
            >
              <HiOutlineXMark className="w-5 h-5" />
            </button>
          </div>
          <div className="p-5 max-h-[75vh] overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};

const AdminTeachers = () => {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [query, setQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return teachers;
    return teachers.filter((t) =>
      `${t.name} ${t.email} ${t.course}`.toLowerCase().includes(q),
    );
  }, [teachers, query]);

  const openAdd = () => {
    setEditingTeacher(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (t) => {
    setEditingTeacher(t);
    setForm({ name: t.name, email: t.email, course: t.course, password: '' });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingTeacher(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      if (editingTeacher) {
        setTeachers((prev) =>
          prev.map((t) =>
            t.id === editingTeacher.id
              ? { ...t, name: form.name, email: form.email, course: form.course }
              : t,
          ),
        );
      } else {
        const nextId = Math.max(...teachers.map((t) => t.id)) + 1;
        setTeachers((prev) => [
          ...prev,
          { id: nextId, name: form.name, email: form.email, course: form.course, groups: 0, students: 0 },
        ]);
      }
      setSaving(false);
      closeModal();
    }, 400);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Ustozni o'chirishni tasdiqlaysizmi?")) return;
    setTeachers((prev) => prev.filter((t) => t.id !== id));
  };

  const totalTeachers = teachers.length;
  const totalGroups = teachers.reduce((s, t) => s + t.groups, 0);
  const totalStudents = teachers.reduce((s, t) => s + t.students, 0);

  return (
    <div className="space-y-5 md:space-y-7">
      {/* Header */}
      <header className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Ustozlarni boshqarish</h1>
          <p className="text-gray-500 text-sm">Barcha ustozlar ro'yxati va boshqarish</p>
        </div>
        <button
          onClick={openAdd}
          className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow-sm hover:bg-blue-700 transition"
        >
          <HiOutlineUserPlus className="w-4 h-4" />
          <span>Ustoz qo'shish</span>
        </button>
      </header>

      {/* Stats */}
      <section className="grid gap-3 md:gap-4 grid-cols-3">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <HiOutlineUser className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-gray-500">Jami ustozlar</p>
            <p className="text-xl font-bold text-gray-900">{totalTeachers}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <HiOutlineUserGroup className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-gray-500">Jami guruhlar</p>
            <p className="text-xl font-bold text-emerald-600">{totalGroups}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600">
            <HiOutlineAcademicCap className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-gray-500">Jami o'quvchilar</p>
            <p className="text-xl font-bold text-violet-600">{totalStudents}</p>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 md:p-4">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 border border-gray-100">
          <HiOutlineMagnifyingGlass className="w-4 h-4 text-gray-400 shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ustoz qidirish (ism, email, kurs)..."
            className="w-full bg-transparent outline-none text-sm placeholder:text-gray-400 text-gray-900"
          />
        </div>
      </section>

      {/* Table */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[860px] w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                <th className="px-4 py-3">Ustoz</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Kurs</th>
                <th className="px-4 py-3">Guruhlar</th>
                <th className="px-4 py-3">O'quvchilar</th>
                <th className="px-4 py-3 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50/60 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${getAvatarColor(t.id)} text-white flex items-center justify-center text-sm font-bold shrink-0`}>
                        {t.name.split(' ').slice(0, 2).map((s) => s[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                        <p className="text-[11px] text-gray-400">Ustoz</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{t.email}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${courseColors[t.course] || 'bg-gray-50 text-gray-700'}`}>
                      {t.course}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-blue-50 text-blue-700">
                      <HiOutlineUserGroup className="w-3 h-3" /> {t.groups}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-emerald-50 text-emerald-700">
                      <HiOutlineUser className="w-3 h-3" /> {t.students}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(t)}
                        className="w-9 h-9 rounded-xl border border-gray-200 bg-white hover:bg-blue-50 hover:border-blue-200 transition text-blue-600 flex items-center justify-center"
                        title="Tahrirlash"
                      >
                        <HiOutlinePencilSquare className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(t.id)}
                        className="w-9 h-9 rounded-xl border border-gray-200 bg-white hover:bg-red-50 hover:border-red-200 transition text-red-500 flex items-center justify-center"
                        title="O'chirish"
                      >
                        <HiOutlineTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-sm text-gray-400">
                    Hech narsa topilmadi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Add / Edit Modal */}
      <Modal
        open={modalOpen}
        title={editingTeacher ? 'Ustozni tahrirlash' : "Ustoz qo'shish"}
        onClose={closeModal}
      >
        <form onSubmit={handleSave} className="space-y-4">
          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
              <HiOutlineUser className="w-3.5 h-3.5" /> Ism Familiya
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Otabek Tursunov"
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
              <HiOutlineEnvelope className="w-3.5 h-3.5" /> Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="ustoz@codial.uz"
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Course */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
              <HiOutlineAcademicCap className="w-3.5 h-3.5" /> Kurs
            </label>
            <select
              name="course"
              value={form.course}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="">Kursni tanlang</option>
              <option value="Backend">Backend</option>
              <option value="Frontend">Frontend</option>
              <option value="Kiberxavfsizlik">Kiberxavfsizlik</option>
              <option value="Flutter">Flutter</option>
              <option value="Grafik Dizayn">Grafik Dizayn</option>
            </select>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
              <HiOutlineLockClosed className="w-3.5 h-3.5" />
              {editingTeacher ? "Yangi parol (ixtiyoriy)" : "Parol"}
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required={!editingTeacher}
              placeholder={editingTeacher ? "O'zgartirmaslik uchun bo'sh qoldiring" : "Parol kiriting"}
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 shadow-sm transition disabled:opacity-60"
            >
              {saving ? (
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <HiOutlineCheckCircle className="w-4 h-4" />
              )}
              Saqlash
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminTeachers;
