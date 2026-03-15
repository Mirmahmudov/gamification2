import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HiOutlineUserGroup,
  HiOutlineEye,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineMagnifyingGlass,
  HiOutlineXMark,
  HiOutlinePlusCircle,
  HiOutlineUserMinus,
  HiOutlineTrophy,
  HiOutlineCheckCircle,
  HiOutlineUsers,
} from 'react-icons/hi2';
import { RiCoinLine } from 'react-icons/ri';

const initialGroups = [
  { id: 1, name: 'Backend 36', date: '2025-09-01', teacher: 'Otabek Tursunov', course: 'Backend', schedule: 'Du–Ch–Ju', status: 'Faol', students: 3 },
  { id: 2, name: 'Backend 42', date: '2025-10-15', teacher: 'Otabek Tursunov', course: 'Backend', schedule: 'Se–Pa–Sh', status: 'Faol', students: 4 },
  { id: 3, name: 'Frontend 28', date: '2025-09-10', teacher: 'Asadbek Mahmudov', course: 'Frontend', schedule: 'Du–Ch–Ju', status: 'Faol', students: 5 },
  { id: 4, name: 'Frontend 31', date: '2025-11-01', teacher: 'Asadbek Mahmudov', course: 'Frontend', schedule: 'Se–Pa–Sh', status: 'Faol', students: 3 },
  { id: 5, name: 'Kiberxavfsizlik 05', date: '2025-09-20', teacher: 'Shukurulloh Zaylobiddinov', course: 'Kiberxavfsizlik', schedule: 'Du–Ch–Ju', status: 'Faol', students: 4 },
  { id: 6, name: 'Flutter 12', date: '2025-09-05', teacher: 'Shaxzodbek Baxtiyorov', course: 'Flutter', schedule: 'Du–Ch–Ju', status: 'Faol emas', students: 2 },
];

const allStudents = [
  { id: 1, name: 'Hasanali Turdialiyev', email: 'hasanali@codial.uz', coins: 3250, rank: 1, groupId: 1 },
  { id: 2, name: 'Muhammadmuso Alijonov', email: 'muhammadmuso@codial.uz', coins: 2950, rank: 2, groupId: 1 },
  { id: 3, name: 'Mavluda Qurbanova', email: 'mavluda@codial.uz', coins: 2820, rank: 3, groupId: 1 },
  { id: 4, name: 'Jasur Nazarov', email: 'jasur@codial.uz', coins: 2100, rank: 1, groupId: 2 },
  { id: 5, name: 'Dilnoza Yusupova', email: 'dilnoza@codial.uz', coins: 1980, rank: 2, groupId: 2 },
  { id: 6, name: 'Bobur Karimov', email: 'bobur@codial.uz', coins: 1750, rank: 3, groupId: 3 },
  { id: 7, name: 'Sarvinoz Mirzayeva', email: 'sarvinoz@codial.uz', coins: 1600, rank: 4, groupId: 3 },
  { id: 8, name: 'Ulugbek Toshmatov', email: 'ulugbek@codial.uz', coins: 1400, rank: 5, groupId: 3 },
];

const courseColors = {
  Backend: 'bg-emerald-50 text-emerald-700',
  Frontend: 'bg-blue-50 text-blue-700',
  Kiberxavfsizlik: 'bg-indigo-50 text-indigo-700',
  Flutter: 'bg-violet-50 text-violet-700',
};

const rankColors = ['bg-amber-400 text-white', 'bg-gray-300 text-gray-700', 'bg-orange-400 text-white'];

const Modal = ({ open, title, onClose, children, maxWidth = 'max-w-lg' }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 px-4">
      <button
        aria-label="Close"
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className={`relative w-full ${maxWidth}`}>
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
          <div className="p-5 max-h-[78vh] overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};

const emptyForm = { name: '', teacher: '', course: '', schedule: '', status: 'Faol' };

const Groups = () => {
  const [groups, setGroups] = useState(initialGroups);
  const [students, setStudents] = useState(allStudents);
  const [query, setQuery] = useState('');
  const [groupModalOpen, setGroupModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [studentsGroup, setStudentsGroup] = useState(null);
  const [studentsTab, setStudentsTab] = useState('list');
  const [studentsQuery, setStudentsQuery] = useState('');
  const [addQuery, setAddQuery] = useState('');
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;
    return groups.filter((g) =>
      `${g.name} ${g.teacher} ${g.course}`.toLowerCase().includes(q),
    );
  }, [groups, query]);

  const groupStudents = useMemo(() => {
    if (!studentsGroup) return [];
    return students.filter((s) => s.groupId === studentsGroup.id);
  }, [students, studentsGroup]);

  const filteredGroupStudents = useMemo(() => {
    const q = studentsQuery.trim().toLowerCase();
    if (!q) return groupStudents;
    return groupStudents.filter((s) =>
      `${s.name} ${s.email}`.toLowerCase().includes(q),
    );
  }, [groupStudents, studentsQuery]);

  const availableStudents = useMemo(() => {
    if (!studentsGroup) return [];
    const q = addQuery.trim().toLowerCase();
    const inGroup = new Set(groupStudents.map((s) => s.id));
    return students.filter((s) => {
      if (inGroup.has(s.id)) return false;
      if (!q) return true;
      return `${s.name} ${s.email}`.toLowerCase().includes(q);
    });
  }, [students, studentsGroup, groupStudents, addQuery]);

  const openAdd = () => {
    setEditingGroup(null);
    setForm(emptyForm);
    setGroupModalOpen(true);
  };

  const openEdit = (g) => {
    setEditingGroup(g);
    setForm({ name: g.name, teacher: g.teacher, course: g.course, schedule: g.schedule, status: g.status });
    setGroupModalOpen(true);
  };

  const closeGroupModal = () => {
    setGroupModalOpen(false);
    setEditingGroup(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingGroup) {
      setGroups((prev) => prev.map((g) => g.id === editingGroup.id ? { ...g, ...form } : g));
    } else {
      const nextId = Math.max(...groups.map((g) => g.id)) + 1;
      setGroups((prev) => [...prev, { id: nextId, ...form, date: new Date().toISOString().slice(0, 10), students: 0 }]);
    }
    closeGroupModal();
  };

  const handleDelete = (id) => {
    if (!window.confirm("Guruhni o'chirishni tasdiqlaysizmi?")) return;
    setGroups((prev) => prev.filter((g) => g.id !== id));
  };

  const openStudents = (g) => {
    setStudentsGroup(g);
    setStudentsTab('list');
    setStudentsQuery('');
    setAddQuery('');
  };

  const removeStudent = (studentId) => {
    setStudents((prev) => prev.map((s) => s.id === studentId ? { ...s, groupId: null } : s));
    setGroups((prev) => prev.map((g) => g.id === studentsGroup.id ? { ...g, students: g.students - 1 } : g));
  };

  const addStudentToGroup = (student) => {
    setStudents((prev) => prev.map((s) => s.id === student.id ? { ...s, groupId: studentsGroup.id } : s));
    setGroups((prev) => prev.map((g) => g.id === studentsGroup.id ? { ...g, students: g.students + 1 } : g));
  };

  const totalGroups = groups.length;
  const activeGroups = groups.filter((g) => g.status === 'Faol').length;
  const totalStudents = groups.reduce((s, g) => s + g.students, 0);

  return (
    <div className="space-y-5 md:space-y-7">
      {/* Header */}
      <header className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Guruhlarni boshqarish</h1>
          <p className="text-gray-500 text-sm">Barcha guruhlar ro'yxati va boshqarish</p>
        </div>
        <button
          onClick={openAdd}
          className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow-sm hover:bg-blue-700 transition"
        >
          <HiOutlinePlusCircle className="w-4 h-4" />
          <span>Guruh qo'shish</span>
        </button>
      </header>

      {/* Stats */}
      <section className="grid gap-3 md:gap-4 grid-cols-3">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <HiOutlineUserGroup className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-gray-500">Jami guruhlar</p>
            <p className="text-xl font-bold text-gray-900">{totalGroups}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <HiOutlineCheckCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-gray-500">Faol guruhlar</p>
            <p className="text-xl font-bold text-emerald-600">{activeGroups}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600">
            <HiOutlineUsers className="w-5 h-5" />
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
            placeholder="Guruh qidirish (nom, ustoz, kurs)..."
            className="w-full bg-transparent outline-none text-sm placeholder:text-gray-400 text-gray-900"
          />
        </div>
      </section>

      {/* Table */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                <th className="px-4 py-3">Guruh</th>
                <th className="px-4 py-3">Ustoz</th>
                <th className="px-4 py-3">Kurs</th>
                <th className="px-4 py-3">Jadval</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">O'quvchilar</th>
                <th className="px-4 py-3 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((g) => (
                <tr key={g.id} className="hover:bg-gray-50/60 transition">
                  <td className="px-4 py-3">
                    <p className="text-sm font-semibold text-gray-900">{g.name}</p>
                    <p className="text-[11px] text-gray-400">{g.date}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{g.teacher}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${courseColors[g.course] || 'bg-gray-50 text-gray-700'}`}>
                      {g.course}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center rounded-full bg-indigo-50 text-indigo-700 px-2.5 py-0.5 text-[11px] font-semibold">
                      {g.schedule}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${g.status === 'Faol' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-600'}`}>
                      {g.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-gray-100 text-gray-700">
                      <HiOutlineUsers className="w-3 h-3" /> {g.students}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openStudents(g)}
                        className="w-9 h-9 rounded-xl border border-gray-200 bg-white hover:bg-blue-50 hover:border-blue-200 transition text-blue-600 flex items-center justify-center"
                        title="O'quvchilar"
                      >
                        <HiOutlineEye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openEdit(g)}
                        className="w-9 h-9 rounded-xl border border-gray-200 bg-white hover:bg-blue-50 hover:border-blue-200 transition text-blue-600 flex items-center justify-center"
                        title="Tahrirlash"
                      >
                        <HiOutlinePencilSquare className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(g.id)}
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
                  <td colSpan={7} className="px-4 py-12 text-center text-sm text-gray-400">
                    Hech narsa topilmadi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Group add/edit modal */}
      <Modal
        open={groupModalOpen}
        title={editingGroup ? 'Guruhni tahrirlash' : "Guruh qo'shish"}
        onClose={closeGroupModal}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600">Guruh nomi *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleFormChange}
              required
              placeholder="Frontend 01"
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600">Ustoz *</label>
            <select
              name="teacher"
              value={form.teacher}
              onChange={handleFormChange}
              required
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="">Ustozni tanlang</option>
              <option>Otabek Tursunov</option>
              <option>Asadbek Mahmudov</option>
              <option>Shukurulloh Zaylobiddinov</option>
              <option>Shaxzodbek Baxtiyorov</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600">Kurs *</label>
            <select
              name="course"
              value={form.course}
              onChange={handleFormChange}
              required
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="">Kursni tanlang</option>
              <option>Backend</option>
              <option>Frontend</option>
              <option>Kiberxavfsizlik</option>
              <option>Flutter</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600">Jadval *</label>
            <select
              name="schedule"
              value={form.schedule}
              onChange={handleFormChange}
              required
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="">Jadvalni tanlang</option>
              <option value="Du–Ch–Ju">Du–Ch–Ju (Dushanba, Chorshanba, Juma)</option>
              <option value="Se–Pa–Sh">Se–Pa–Sh (Seshanba, Payshanba, Shanba)</option>
            </select>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5">
            <div>
              <p className="text-xs font-semibold text-gray-800">Guruh holati</p>
              <p className="text-[11px] text-gray-500">Faol / Faol emas</p>
            </div>
            <button
              type="button"
              onClick={() => setForm((prev) => ({ ...prev, status: prev.status === 'Faol' ? 'Faol emas' : 'Faol' }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${form.status === 'Faol' ? 'bg-emerald-500' : 'bg-gray-300'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition ${form.status === 'Faol' ? 'translate-x-5' : 'translate-x-1'}`} />
            </button>
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button type="button" onClick={closeGroupModal} className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
              Bekor qilish
            </button>
            <button type="submit" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 shadow-sm transition">
              <HiOutlineCheckCircle className="w-4 h-4" /> Saqlash
            </button>
          </div>
        </form>
      </Modal>

      {/* Students modal */}
      <Modal
        open={!!studentsGroup}
        title={studentsGroup ? `${studentsGroup.name} · O'quvchilar` : ''}
        onClose={() => setStudentsGroup(null)}
        maxWidth="max-w-2xl"
      >
        {studentsGroup && (
          <div className="space-y-4">
            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-gray-100 rounded-xl w-fit">
              <button
                onClick={() => setStudentsTab('list')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${studentsTab === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Guruhdagi o'quvchilar
              </button>
              <button
                onClick={() => setStudentsTab('add')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${studentsTab === 'add' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                O'quvchi qo'shish
              </button>
            </div>

            {studentsTab === 'list' && (
              <>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 border border-gray-100">
                  <HiOutlineMagnifyingGlass className="w-4 h-4 text-gray-400 shrink-0" />
                  <input
                    value={studentsQuery}
                    onChange={(e) => setStudentsQuery(e.target.value)}
                    placeholder="O'quvchi qidirish..."
                    className="w-full bg-transparent outline-none text-sm placeholder:text-gray-400 text-gray-900"
                  />
                </div>
                <div className="overflow-x-auto border border-gray-100 rounded-2xl">
                  <table className="min-w-[560px] w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                        <th className="px-4 py-2.5">O'quvchi</th>
                        <th className="px-4 py-2.5">Coinlar</th>
                        <th className="px-4 py-2.5">O'rin</th>
                        <th className="px-4 py-2.5 text-right">Amal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredGroupStudents.map((s) => (
                        <tr key={s.id} className="hover:bg-gray-50/60 transition">
                          <td className="px-4 py-2.5">
                            <button
                              className="text-left hover:underline"
                              onClick={() => navigate(`/admin/students/${s.id}`, { state: { student: s } })}
                            >
                              <p className="text-sm font-semibold text-gray-900">{s.name}</p>
                              <p className="text-[11px] text-gray-400">{s.email}</p>
                            </button>
                          </td>
                          <td className="px-4 py-2.5">
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 text-amber-600 px-2.5 py-0.5 text-[11px] font-semibold">
                              <RiCoinLine className="w-3 h-3" /> {s.coins.toLocaleString()}
                            </span>
                          </td>
                          <td className="px-4 py-2.5">
                            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${rankColors[s.rank - 1] || 'bg-gray-100 text-gray-600'}`}>
                              <HiOutlineTrophy className="w-3 h-3" /> #{s.rank}
                            </span>
                          </td>
                          <td className="px-4 py-2.5 text-right">
                            <button
                              onClick={() => removeStudent(s.id)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-red-200 bg-red-50 text-red-600 text-[11px] font-semibold hover:bg-red-100 transition"
                            >
                              <HiOutlineUserMinus className="w-3.5 h-3.5" /> Olib tashlash
                            </button>
                          </td>
                        </tr>
                      ))}
                      {filteredGroupStudents.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-4 py-8 text-center text-sm text-gray-400">
                            O'quvchilar topilmadi.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {studentsTab === 'add' && (
              <>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 border border-gray-100">
                  <HiOutlineMagnifyingGlass className="w-4 h-4 text-gray-400 shrink-0" />
                  <input
                    value={addQuery}
                    onChange={(e) => setAddQuery(e.target.value)}
                    placeholder="O'quvchi qidirish..."
                    className="w-full bg-transparent outline-none text-sm placeholder:text-gray-400 text-gray-900"
                  />
                </div>
                <div className="overflow-x-auto border border-gray-100 rounded-2xl">
                  <table className="min-w-[480px] w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                        <th className="px-4 py-2.5">O'quvchi</th>
                        <th className="px-4 py-2.5">Coinlar</th>
                        <th className="px-4 py-2.5 text-right">Amal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {availableStudents.map((s) => (
                        <tr key={s.id} className="hover:bg-gray-50/60 transition">
                          <td className="px-4 py-2.5">
                            <p className="text-sm font-semibold text-gray-900">{s.name}</p>
                            <p className="text-[11px] text-gray-400">{s.email}</p>
                          </td>
                          <td className="px-4 py-2.5">
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 text-amber-600 px-2.5 py-0.5 text-[11px] font-semibold">
                              <RiCoinLine className="w-3 h-3" /> {s.coins.toLocaleString()}
                            </span>
                          </td>
                          <td className="px-4 py-2.5 text-right">
                            <button
                              onClick={() => addStudentToGroup(s)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-blue-200 bg-blue-50 text-blue-600 text-[11px] font-semibold hover:bg-blue-100 transition"
                            >
                              <HiOutlinePlusCircle className="w-3.5 h-3.5" /> Qo'shish
                            </button>
                          </td>
                        </tr>
                      ))}
                      {availableStudents.length === 0 && (
                        <tr>
                          <td colSpan={3} className="px-4 py-8 text-center text-sm text-gray-400">
                            Qo'shish uchun o'quvchi topilmadi.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Groups;
