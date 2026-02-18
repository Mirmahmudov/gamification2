import { useMemo, useState } from 'react';

const initialTeachers = [
  { id: 1, name: 'Otabek Tursunov', email: 'otabek@codial.uz', course: 'Backend', groups: 2, students: 10 },
  { id: 2, name: 'Asadbek Mahmudov', email: 'asadbek@codial.uz', course: 'Frontend', groups: 2, students: 8 },
  { id: 3, name: 'Shukurulloh Zaylobiddinov', email: 'shukurulloh@codial.uz', course: 'Kiberxavfsizlik', groups: 2, students: 7 },
  { id: 4, name: 'Shaxzodbek Baxtiyorov', email: 'shaxzodbek@codial.uz', course: 'Flutter', groups: 2, students: 7 },
  { id: 5, name: 'Nodira Ro‘ziyeva', email: 'nodira@codial.uz', course: 'Frontend', groups: 1, students: 0 },
  { id: 6, name: 'Sardor Alimov', email: 'sardor@codial.uz', course: 'Backend', groups: 1, students: 0 },
  { id: 7, name: 'Malika Rahimova', email: 'malika@codial.uz', course: 'Grafik Dizayn', groups: 0, students: 0 },
];

function CourseBadge({ course }) {
  const tone =
    course === 'Backend'
      ? 'bg-emerald-50 text-emerald-700'
      : course === 'Frontend'
        ? 'bg-blue-50 text-blue-700'
        : course === 'Kiberxavfsizlik'
          ? 'bg-indigo-50 text-indigo-700'
          : course === 'Flutter'
            ? 'bg-violet-50 text-violet-700'
            : 'bg-gray-50 text-gray-700';

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${tone}`}>
      <span className="text-[10px]">●</span> {course}
    </span>
  );
}

function CountBadge({ value, tone = 'bg-gray-50 text-gray-700' }) {
  return (
    <span className={`inline-flex items-center justify-center min-w-8 rounded-full px-2 py-0.5 text-[11px] font-semibold ${tone}`}>
      {value}
    </span>
  );
}

const AdminTeachers = () => {
  const [teachers] = useState(initialTeachers);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return teachers;
    return teachers.filter((t) =>
      `${t.name} ${t.email} ${t.course}`.toLowerCase().includes(q),
    );
  }, [teachers, query]);

  const totalTeachers = teachers.length;
  const activeTeachers = teachers.length; // demo
  const avgGroups = Math.round(teachers.reduce((s, t) => s + t.groups, 0) / Math.max(1, teachers.length));

  return (
    <div className="space-y-5 md:space-y-7">
      <header className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Ustozlarni boshqarish
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            Barcha ustozlar ro‘yxati va boshqarish
          </p>
        </div>

        <button className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow-sm hover:bg-blue-700 transition">
          <span>＋</span>
          <span>Ustoz qo‘shish</span>
        </button>
      </header>

      {/* Search */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 md:p-4">
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-xl bg-gray-50 border border-gray-100">
          <span className="text-gray-400 text-lg">🔍</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ustoz qidirish (ism, email, kurs)..."
            className="w-full bg-transparent outline-none text-sm md:text-base placeholder:text-gray-400 text-gray-900"
          />
        </div>
      </section>

      {/* Table */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr className="text-left text-[11px] font-semibold text-gray-500">
                <th className="px-4 py-3">Ustoz</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Kurs</th>
                <th className="px-4 py-3">Guruhlar soni</th>
                <th className="px-4 py-3">O‘quvchilar soni</th>
                <th className="px-4 py-3 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center text-sm font-semibold">
                        {t.name.split(' ').slice(0, 2).map((s) => s[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                        <p className="text-[11px] text-gray-500">Ustoz</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{t.email}</td>
                  <td className="px-4 py-3">
                    <CourseBadge course={t.course} />
                  </td>
                  <td className="px-4 py-3">
                    <CountBadge value={t.groups} tone="bg-blue-50 text-blue-700" />
                  </td>
                  <td className="px-4 py-3">
                    <CountBadge value={t.students} tone="bg-emerald-50 text-emerald-700" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="w-9 h-9 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition text-blue-600"
                        aria-label="Edit"
                        title="Tahrirlash"
                      >
                        ✎
                      </button>
                      <button
                        className="w-9 h-9 rounded-xl border border-gray-200 bg-white hover:bg-red-50 transition text-red-600"
                        aria-label="Delete"
                        title="O‘chirish"
                      >
                        🗑
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-sm text-gray-500">
                    Hech narsa topilmadi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Bottom stats */}
      <section className="grid gap-3 md:gap-4 md:grid-cols-3">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <p className="text-[11px] text-gray-500 mb-1">Jami ustozlar</p>
          <p className="text-xl font-bold text-gray-900">{totalTeachers}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <p className="text-[11px] text-gray-500 mb-1">Faol ustozlar</p>
          <p className="text-xl font-bold text-emerald-600">{activeTeachers}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <p className="text-[11px] text-gray-500 mb-1">O‘rtacha guruhlar</p>
          <p className="text-xl font-bold text-gray-900">{avgGroups}</p>
        </div>
      </section>
    </div>
  );
};

export default AdminTeachers;