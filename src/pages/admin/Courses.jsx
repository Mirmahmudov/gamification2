import { useMemo, useState } from 'react';
import {
  HiOutlineAcademicCap,
  HiOutlineComputerDesktop,
  HiOutlineShieldCheck,
  HiOutlineDevicePhoneMobile,
  HiOutlinePaintBrush,
  HiOutlineMegaphone,
  HiOutlineBookOpen,
  HiOutlineCheckCircle,
  HiOutlineUserGroup,
  HiOutlineUserCircle,
  HiOutlineMagnifyingGlass,
  HiOutlineEye,
  HiOutlineXMark,
} from 'react-icons/hi2';

const initialCourses = [
  {
    id: 'backend',
    name: 'Backend',
    active: true,
    color: 'from-emerald-500 to-emerald-600',
    desc: 'Node.js, Python, Django, REST API va database boshqaruvi',
    stats: { students: 10, groups: 4, teachers: 2 },
    icon: HiOutlineAcademicCap,
  },
  {
    id: 'frontend',
    name: 'Frontend',
    active: true,
    color: 'from-blue-500 to-blue-600',
    desc: 'HTML, CSS, JavaScript, React va zamonaviy frontend texnologiyalari',
    stats: { students: 8, groups: 4, teachers: 2 },
    icon: HiOutlineComputerDesktop,
  },
  {
    id: 'cyber',
    name: 'Kiberxavfsizlik',
    active: true,
    color: 'from-sky-500 to-indigo-600',
    desc: 'Axborot xavfsizligi, tarmoq xavfsizligi, pentesting va etik xakerlik',
    stats: { students: 7, groups: 2, teachers: 1 },
    icon: HiOutlineShieldCheck,
  },
  {
    id: 'flutter',
    name: 'Flutter',
    active: true,
    color: 'from-violet-500 to-purple-600',
    desc: 'Cross-platform mobil ilovalar yaratish (iOS va Android)',
    stats: { students: 7, groups: 2, teachers: 1 },
    icon: HiOutlineDevicePhoneMobile,
  },
  {
    id: 'design',
    name: 'Grafik Dizayn',
    active: true,
    color: 'from-fuchsia-500 to-pink-600',
    desc: 'Figma, Adobe Photoshop, Illustrator va UI/UX dizayn',
    stats: { students: 0, groups: 0, teachers: 1 },
    icon: HiOutlinePaintBrush,
  },
  {
    id: 'smm',
    name: 'SMM & Marketing',
    active: false,
    color: 'from-orange-500 to-orange-600',
    desc: 'Ijtimoiy tarmoqlar marketingi, kontent yaratish va brendlash',
    stats: { students: 0, groups: 0, teachers: 0 },
    icon: HiOutlineMegaphone,
  },
];

function Badge({ children, tone = 'bg-gray-100 text-gray-700' }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${tone}`}>
      {children}
    </span>
  );
}

function Modal({ open, title, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Close modal overlay"
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="relative mx-auto mt-16 w-[92%] max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition flex items-center justify-center text-gray-500"
              aria-label="Close"
            >
              <HiOutlineXMark className="w-5 h-5" />
            </button>
          </div>
          <div className="p-5">{children}</div>
        </div>
      </div>
    </div>
  );
}

const AdminCourses = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  const stats = useMemo(() => {
    const total = courses.length;
    const active = courses.filter((c) => c.active).length;
    const teachers = courses.reduce((s, c) => s + c.stats.teachers, 0);
    const students = courses.reduce((s, c) => s + c.stats.students, 0);
    return { total, active, teachers, students };
  }, [courses]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return courses;
    return courses.filter((c) => c.name.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q));
  }, [courses, query]);

  const handleOpen = (course) => setSelected(course);
  const handleClose = () => setSelected(null);

  const handleSaveSelected = () => {
    if (!selected) return;
    setCourses((prev) => prev.map((c) => (c.id === selected.id ? selected : c)));
    handleClose();
  };

  return (
    <div className="space-y-5 md:space-y-7">
      <header className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Kurslar Boshqaruvi
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          Barcha kurslar va yo‘nalishlar
        </p>
      </header>

      {/* Top stats */}
      <section className="grid gap-3 md:gap-4 md:grid-cols-4">
        {[
          { label: 'Jami Kurslar', value: stats.total, icon: HiOutlineBookOpen, tone: 'bg-blue-50 text-blue-600' },
          { label: 'Faol Kurslar', value: stats.active, icon: HiOutlineCheckCircle, tone: 'bg-emerald-50 text-emerald-600' },
          { label: 'O‘qituvchilar', value: stats.teachers, icon: HiOutlineUserCircle, tone: 'bg-violet-50 text-violet-600' },
          { label: 'O‘quvchilar', value: stats.students, icon: HiOutlineUserGroup, tone: 'bg-amber-50 text-amber-600' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${s.tone || 'bg-gray-50 text-gray-600'}`}>
              <s.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{s.value}</p>
              <p className="text-[11px] text-gray-500">{s.label}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Search */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 md:p-4">
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-xl bg-gray-50 border border-gray-100">
          <span className="text-gray-400 text-lg">
            <HiOutlineMagnifyingGlass />
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Kurs qidirish..."
            className="w-full bg-transparent outline-none text-sm md:text-base placeholder:text-gray-400 text-gray-900"
          />
        </div>
      </section>

      {/* Courses grid */}
      <section className="grid gap-4 md:gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((c) => (
          <article
            key={c.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:-translate-y-0.5 hover:shadow-md transition"
          >
            <div className={`p-4 md:p-5 text-white bg-gradient-to-r ${c.color}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center text-2xl">
                    <c.icon />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-base truncate">{c.name}</p>
                    <div className="mt-1">
                      {c.active ? (
                        <Badge tone="bg-white/15 text-white">● Faol</Badge>
                      ) : (
                        <Badge tone="bg-white/15 text-white">○ Nofaol</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 md:p-5 space-y-4">
              <p className="text-xs md:text-sm text-gray-600">{c.desc}</p>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-2xl bg-gray-50 border border-gray-100 py-2">
                  <p className="text-sm font-semibold text-gray-900">{c.stats.teachers}</p>
                  <p className="text-[11px] text-gray-500">O‘qituvchi</p>
                </div>
                <div className="rounded-2xl bg-gray-50 border border-gray-100 py-2">
                  <p className="text-sm font-semibold text-gray-900">{c.stats.groups}</p>
                  <p className="text-[11px] text-gray-500">Guruh</p>
                </div>
                <div className="rounded-2xl bg-gray-50 border border-gray-100 py-2">
                  <p className="text-sm font-semibold text-gray-900">{c.stats.students}</p>
                  <p className="text-[11px] text-gray-500">O‘quvchi</p>
                </div>
              </div>

              <button
                onClick={() => handleOpen(c)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-semibold text-gray-800 hover:bg-gray-100 transition"
              >
                <HiOutlineEye className="w-4 h-4" />
                <span>Ko‘rish</span>
              </button>
            </div>
          </article>
        ))}
      </section>

      <Modal open={!!selected} title="Kurs Ma’lumotlari" onClose={handleClose}>
        {selected && (
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">Kurs Nomi</label>
              <input
                value={selected.name}
                onChange={(e) => setSelected({ ...selected, name: e.target.value })}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">Tavsif</label>
              <textarea
                rows={3}
                value={selected.desc}
                onChange={(e) => setSelected({ ...selected, desc: e.target.value })}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-400 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Belgi</label>
                <input
                  value={selected.icon}
                  onChange={(e) => setSelected({ ...selected, icon: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-400"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Holat</label>
                <button
                  onClick={() => setSelected({ ...selected, active: !selected.active })}
                  className={`w-full rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                    selected.active
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                      : 'border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100'
                  }`}
                >
                  {selected.active ? 'Faol' : 'Nofaol'}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={handleClose}
                className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleSaveSelected}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
              >
                Yopish
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminCourses;