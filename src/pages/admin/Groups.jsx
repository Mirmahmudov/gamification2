import { useMemo, useState } from 'react';
import {
  HiOutlineUserGroup,
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineMagnifyingGlass,
  HiOutlineXMark,
  HiOutlineUserPlus,
} from 'react-icons/hi2';

const initialGroups = [
  { id: 1, name: 'Backend 36', date: '2025-09-01', teacher: 'Otabek Tursunov', course: 'Backend', schedule: 'Jadval A · Du–Ch–Ju', status: 'Faol', students: 6 },
  { id: 2, name: 'Backend 42', date: '2025-10-15', teacher: 'Otabek Tursunov', course: 'Backend', schedule: 'Jadval B · Se–Pa–Sh', status: 'Faol', students: 4 },
  { id: 3, name: 'Frontend 28', date: '2025-09-10', teacher: 'Asadbek Mahmudov', course: 'Frontend', schedule: 'Jadval A · Du–Ch–Ju', status: 'Faol', students: 5 },
  { id: 4, name: 'Frontend 31', date: '2025-11-01', teacher: 'Asadbek Mahmudov', course: 'Frontend', schedule: 'Jadval B · Se–Pa–Sh', status: 'Faol', students: 3 },
  { id: 5, name: 'Kiberxavfsizlik 05', date: '2025-09-20', teacher: 'Shukurulloh Zaylobiddinov', course: 'Kiberxavfsizlik', schedule: 'Jadval A · Du–Ch–Ju', status: 'Faol', students: 4 },
  { id: 6, name: 'Kiberxavfsizlik 08', date: '2025-10-25', teacher: 'Shukurulloh Zaylobiddinov', course: 'Kiberxavfsizlik', schedule: 'Jadval B · Se–Pa–Sh', status: 'Faol emas', students: 3 },
  { id: 7, name: 'Flutter 12', date: '2025-09-05', teacher: 'Shaxzodbek Baxtiyorov', course: 'Flutter', schedule: 'Jadval A · Du–Ch–Ju', status: 'Faol', students: 4 },
  { id: 8, name: 'Flutter 15', date: '2025-10-10', teacher: 'Shaxzodbek Baxtiyorov', course: 'Flutter', schedule: 'Jadval B · Se–Pa–Sh', status: 'Faol', students: 3 },
  { id: 9, name: 'Frontend 35', date: '2025-10-05', teacher: 'Nodira Ro‘ziyeva', course: 'Frontend', schedule: 'Jadval A · Du–Ch–Ju', status: 'Faol', students: 2 },
  { id: 10, name: 'Backend 45', date: '2026-01-20', teacher: 'Sardor Alimov', course: 'Backend', schedule: 'Jadval B · Se–Pa–Sh', status: 'Faol emas', students: 0 },
];

const statusTone = (status) =>
  status === 'Faol'
    ? 'bg-emerald-50 text-emerald-700'
    : 'bg-rose-50 text-rose-700';

const demoGroupStudents = {
  'Backend 36': [
    { id: 1, name: 'Hasanali Turdialiyev', email: 'hasanali@codial.uz', coins: 3250, rank: 1 },
    { id: 2, name: 'Muhammadmuso Alijonov', email: 'muhammadmuso@codial.uz', coins: 2950, rank: 2 },
    { id: 3, name: 'Mavluda Qurbanova', email: 'mavluda@codial.uz', coins: 2820, rank: 3 },
  ],
};

const Modal = ({ open, title, onClose, children, maxWidth = 'max-w-2xl' }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Close modal overlay"
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className={`relative mx-auto mt-10 w-[94%] ${maxWidth}`}>
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
          <div className="p-5 md:p-6 max-h-[75vh] overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};

const Groups = () => {
  const [groups, setGroups] = useState(initialGroups);
  const [query, setQuery] = useState('');
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);
  const [studentsModalGroup, setStudentsModalGroup] = useState(null);
  const [groupForm, setGroupForm] = useState({
    name: '',
    teacher: '',
    course: '',
    schedule: '',
    status: 'Faol',
  });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;
    return groups.filter((g) =>
      `${g.name} ${g.teacher} ${g.course}`.toLowerCase().includes(q),
    );
  }, [groups, query]);

  const openAddGroup = () => {
    setEditingGroup(null);
    setGroupForm({
      name: '',
      teacher: '',
      course: '',
      schedule: '',
      status: 'Faol',
    });
    setIsGroupModalOpen(true);
  };

  const openEditGroup = (group) => {
    setEditingGroup(group);
    setGroupForm({
      name: group.name,
      teacher: group.teacher,
      course: group.course,
      schedule: group.schedule,
      status: group.status,
    });
    setIsGroupModalOpen(true);
  };

  const closeGroupModal = () => {
    setIsGroupModalOpen(false);
  };

  const handleGroupFormChange = (e) => {
    const { name, value } = e.target;
    setGroupForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveGroup = (e) => {
    e.preventDefault();
    if (editingGroup) {
      setGroups((prev) =>
        prev.map((g) =>
          g.id === editingGroup.id ? { ...g, ...groupForm } : g,
        ),
      );
    } else {
      const nextId = Math.max(...groups.map((g) => g.id)) + 1;
      setGroups((prev) => [
        ...prev,
        {
          id: nextId,
          ...groupForm,
          students: 0,
        },
      ]);
    }
    setIsGroupModalOpen(false);
  };

  const handleDeleteGroup = (id) => {
    setGroups((prev) => prev.filter((g) => g.id !== id));
  };

  const openStudentsModal = (group) => {
    setStudentsModalGroup(group);
  };

  const closeStudentsModal = () => {
    setStudentsModalGroup(null);
  };

  return (
    <div className="space-y-5 md:space-y-7">
      <header className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Guruhlarni boshqarish
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            Barcha guruhlar ro‘yxati va boshqarish
          </p>
        </div>
        <button
          onClick={openAddGroup}
          className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow-sm hover:bg-blue-700 transition"
        >
          <HiOutlineUserPlus className="w-4 h-4" />
          <span>Guruh qo‘shish</span>
        </button>
      </header>

      {/* Filters */}
      <section className="grid gap-3 md:gap-4 md:grid-cols-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 md:p-4">
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-xl bg-gray-50 border border-gray-100">
            <span className="text-gray-400 text-lg">
              <HiOutlineMagnifyingGlass />
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Guruh qidirish..."
              className="w-full bg-transparent outline-none text-sm md:text-base placeholder:text-gray-400 text-gray-900"
            />
          </div>
        </div>
        {['Barcha ustozlar', 'Barcha kurslar', 'Barcha jadvallar'].map((label) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 md:p-4">
            <button className="w-full flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-100 text-xs md:text-sm text-gray-600">
              <span>{label}</span>
              <span className="text-gray-400">▾</span>
            </button>
          </div>
        ))}
      </section>

      {/* Table */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[960px] w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr className="text-left text-[11px] font-semibold text-gray-500">
                <th className="px-4 py-3">Guruh</th>
                <th className="px-4 py-3">Ustoz</th>
                <th className="px-4 py-3">Kurs</th>
                <th className="px-4 py-3">Jadval</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">O‘quvchilar</th>
                <th className="px-4 py-3 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((g) => (
                <tr key={g.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">
                    <div className="space-y-0.5">
                      <p className="text-sm font-semibold text-gray-900">{g.name}</p>
                      <p className="text-[11px] text-gray-500">{g.date}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{g.teacher}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{g.course}</td>
                  <td className="px-4 py-3 text-xs text-gray-700">
                    <span className="inline-flex items-center rounded-full bg-indigo-50 text-indigo-700 px-2 py-0.5 text-[11px] font-semibold">
                      {g.schedule.split('·')[0].trim()}
                    </span>
                    <span className="block text-[11px] text-gray-500 mt-0.5">
                      {g.schedule.split('·')[1]?.trim()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 font-semibold ${statusTone(g.status)}`}>
                      {g.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    <span className="inline-flex items-center gap-1 text-gray-700">
                      <HiOutlineUserGroup className="w-4 h-4" /> {g.students}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2 text-sm">
                      <button
                        type="button"
                        onClick={() => openStudentsModal(g)}
                        className="w-9 h-9 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-blue-600 flex items-center justify-center"
                      >
                        <HiOutlineEye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => openEditGroup(g)}
                        className="w-9 h-9 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-blue-600 flex items-center justify-center"
                      >
                        <HiOutlinePencil className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteGroup(g.id)}
                        className="w-9 h-9 rounded-xl border border-gray-200 bg-white hover:bg-red-50 text-red-600 flex items-center justify-center"
                      >
                        <HiOutlineTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Group create/edit modal */}
      <Modal
        open={isGroupModalOpen}
        onClose={closeGroupModal}
        title={editingGroup ? 'Guruhni tahrirlash' : 'Guruh qo‘shish'}
        maxWidth="max-w-lg"
      >
        <form className="space-y-4" onSubmit={handleSaveGroup}>
          <div className="space-y-1.5">
            <label className="text-xs md:text-sm font-medium text-gray-700">
              Guruh nomi *
            </label>
            <input
              type="text"
              name="name"
              value={groupForm.name}
              onChange={handleGroupFormChange}
              required
              placeholder="Frontend Dasturlash - 01"
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs md:text-sm font-medium text-gray-700">
              Ustoz *
            </label>
            <select
              name="teacher"
              value={groupForm.teacher}
              onChange={handleGroupFormChange}
              required
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Ustozni tanlang</option>
              <option value="Otabek Tursunov">Otabek Tursunov</option>
              <option value="Asadbek Mahmudov">Asadbek Mahmudov</option>
              <option value="Shukurulloh Zaylobiddinov">Shukurulloh Zaylobiddinov</option>
              <option value="Shaxzodbek Baxtiyorov">Shaxzodbek Baxtiyorov</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs md:text-sm font-medium text-gray-700">
              Dars jadvali *
            </label>
            <select
              name="schedule"
              value={groupForm.schedule}
              onChange={handleGroupFormChange}
              required
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Jadvalni tanlang</option>
              <option value="A · Du–Ch–Ju">A - Dushanba, Chorshanba, Juma</option>
              <option value="B · Se–Pa–Sh">B - Seshanba, Payshanba, Shanba</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs md:text-sm font-medium text-gray-700">
              Kurs nomi *
            </label>
            <select
              name="course"
              value={groupForm.course}
              onChange={handleGroupFormChange}
              required
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Kursni tanlang</option>
              <option value="Backend">Backend</option>
              <option value="Frontend">Frontend</option>
              <option value="Kiberxavfsizlik">Kiberxavfsizlik</option>
              <option value="Flutter">Flutter</option>
            </select>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-800">Guruh holati</p>
              <p className="text-[11px] text-gray-500">
                Faol holatda bo‘lsa, guruhlar ro‘yxatida ko‘rinadi.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setGroupForm((prev) => ({
                  ...prev,
                  status: prev.status === 'Faol' ? 'Faol emas' : 'Faol',
                }))
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                groupForm.status === 'Faol' ? 'bg-emerald-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition ${
                  groupForm.status === 'Faol' ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={closeGroupModal}
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

      {/* Group students modal */}
      <Modal
        open={!!studentsModalGroup}
        onClose={closeStudentsModal}
        title={
          studentsModalGroup
            ? `${studentsModalGroup.name} · Guruhdagi o‘quvchilar`
            : ''
        }
      >
        {studentsModalGroup && (
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <p className="text-xs md:text-sm text-gray-500">
                Jami o‘quvchilar: {studentsModalGroup.students}
              </p>
              <div className="flex gap-1 text-xs md:text-sm border-b border-gray-100 pb-1">
                <button className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-semibold">
                  Guruhdagi o‘quvchilar
                </button>
                <button className="px-3 py-1 rounded-full bg-gray-50 text-gray-500 font-medium">
                  O‘quvchi qo‘shish
                </button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-3">
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-xl bg-white border border-gray-100">
                <span className="text-gray-400 text-sm">
                  <HiOutlineMagnifyingGlass className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  placeholder="O‘quvchi qidirish..."
                  className="w-full bg-transparent text-xs md:text-sm outline-none placeholder:text-gray-400 text-gray-900"
                />
              </div>
            </div>

            <div className="overflow-x-auto border border-gray-100 rounded-2xl">
              <table className="min-w-[640px] w-full text-xs md:text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr className="text-left text-[11px] font-semibold text-gray-500">
                    <th className="px-4 py-2">O‘quvchi</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Coinlar</th>
                    <th className="px-4 py-2">O‘rin</th>
                    <th className="px-4 py-2 text-right">Amallar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {(demoGroupStudents[studentsModalGroup.name] || []).map((s) => (
                    <tr key={s.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-2 text-gray-900">{s.name}</td>
                      <td className="px-4 py-2 text-gray-600">{s.email}</td>
                      <td className="px-4 py-2 text-amber-600 font-semibold">
                        {s.coins.toLocaleString('uz-UZ')} coin
                      </td>
                      <td className="px-4 py-2 text-gray-700">#{s.rank}</td>
                      <td className="px-4 py-2">
                        <div className="flex items-center justify-end gap-2">
                          <button className="w-8 h-8 rounded-xl border border-gray-200 bg-white hover:bg-red-50 text-red-600 text-xs font-semibold">
                            Olib tashlash
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {(demoGroupStudents[studentsModalGroup.name] || []).length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-6 text-center text-xs md:text-sm text-gray-500"
                      >
                        Hozircha o‘quvchilar biriktirilmagan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Groups;