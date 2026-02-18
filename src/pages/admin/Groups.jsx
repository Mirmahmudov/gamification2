import { useMemo, useState } from 'react';
import { HiOutlineUserGroup, HiOutlineEye, HiOutlinePencil, HiOutlineTrash, HiOutlineMagnifyingGlass } from 'react-icons/hi2';

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

const Groups = () => {
  const [groups] = useState(initialGroups);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;
    return groups.filter((g) =>
      `${g.name} ${g.teacher} ${g.course}`.toLowerCase().includes(q),
    );
  }, [groups, query]);

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
        <button className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow-sm hover:bg-blue-700 transition">
          <span>＋</span>
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
                      <button className="w-9 h-9 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-blue-600 flex items-center justify-center">
                        <HiOutlineEye className="w-4 h-4" />
                      </button>
                      <button className="w-9 h-9 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-blue-600 flex items-center justify-center">
                        <HiOutlinePencil className="w-4 h-4" />
                      </button>
                      <button className="w-9 h-9 rounded-xl border border-gray-200 bg-white hover:bg-red-50 text-red-600 flex items-center justify-center">
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
    </div>
  );
};

export default Groups;