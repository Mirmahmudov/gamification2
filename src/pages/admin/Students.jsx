import { useMemo, useState } from 'react';
import {
  HiOutlineMagnifyingGlass,
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineTrophy,
} from 'react-icons/hi2';

const initialStudents = [
  { id: 1, name: 'Hasanali Turdialiyev', email: 'hasanali@codial.uz', group: 'Backend 36', coins: 3250, rank: '#1' },
  { id: 2, name: 'Muhammadsodir Aljonov', email: 'muhammadsodir@codial.uz', group: 'Backend 36', coins: 2950, rank: '#2' },
  { id: 3, name: 'Mavluda Qurbanova', email: 'mavluda@codial.uz', group: 'Backend 36', coins: 2820, rank: '#3' },
  { id: 4, name: 'Aziza Karimova', email: 'aziza@codial.uz', group: 'Backend 36', coins: 2680, rank: '#4' },
  { id: 5, name: 'Javohir Toshmatov', email: 'javohir@codial.uz', group: 'Backend 36', coins: 2450, rank: '#5' },
  { id: 6, name: 'Bobur Rahimov', email: 'bobur@codial.uz', group: 'Backend 36', coins: 2180, rank: '#6' },
  { id: 7, name: 'Dilnoza Ahmadova', email: 'dilnoza@codial.uz', group: 'Backend 42', coins: 3100, rank: '#1' },
  { id: 8, name: 'Sardorbek Olimov', email: 'sardorbek@codial.uz', group: 'Backend 42', coins: 2890, rank: '#2' },
  { id: 9, name: 'Zarina Nabiyeva', email: 'zarina@codial.uz', group: 'Backend 42', coins: 2650, rank: '#3' },
  { id: 10, name: 'Farhod Yusupov', email: 'farhod@codial.uz', group: 'Backend 42', coins: 2420, rank: '#4' },
  { id: 11, name: 'Malika Yusupova', email: 'malika@codial.uz', group: 'Frontend 28', coins: 3350, rank: '#1' },
  { id: 12, name: 'Otabek Salimov', email: 'otabek@codial.uz', group: 'Frontend 28', coins: 3120, rank: '#2' },
];

const AdminStudents = () => {
  const [students] = useState(initialStudents);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return students;
    return students.filter((s) =>
      `${s.name} ${s.email} ${s.group}`.toLowerCase().includes(q),
    );
  }, [students, query]);

  return (
    <div className="space-y-5 md:space-y-7">
      <header className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            O‘quvchilarni boshqarish
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            Barcha o‘quvchilar ro‘yxati va statistika
          </p>
        </div>
        <button className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow-sm hover:bg-blue-700 transition">
          <span>＋</span>
          <span>O‘quvchi qo‘shish</span>
        </button>
      </header>

      {/* Filters */}
      <section className="grid gap-3 md:gap-4 md:grid-cols-3">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 md:p-4">
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-xl bg-gray-50 border border-gray-100">
            <span className="text-gray-400 text-lg">
              <HiOutlineMagnifyingGlass />
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="O‘quvchi qidirish..."
              className="w-full bg-transparent outline-none text-sm md:text-base placeholder:text-gray-400 text-gray-900"
            />
          </div>
        </div>
        {['Barcha ustozlar', 'Barcha guruhlar'].map((label) => (
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
                <th className="px-4 py-3">O‘quvchi</th>
                <th className="px-4 py-3">Guruh</th>
                <th className="px-4 py-3">Coinlar</th>
                <th className="px-4 py-3">O‘rin</th>
                <th className="px-4 py-3 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center text-sm font-semibold">
                        {s.name.split(' ').slice(0, 2).map((p) => p[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{s.name}</p>
                        <p className="text-[11px] text-gray-500">{s.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    <span className="inline-flex items-center rounded-full bg-blue-50 text-blue-700 px-2 py-0.5 text-[11px] font-semibold">
                      {s.group}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-amber-600 font-semibold">
                    {s.coins.toLocaleString('uz-UZ')} coin
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 text-orange-700 px-2 py-0.5 text-[11px] font-semibold">
                      <HiOutlineTrophy className="w-3.5 h-3.5" /> {s.rank}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button className="w-9 h-9 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-green-600 flex items-center justify-center">
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

export default AdminStudents;