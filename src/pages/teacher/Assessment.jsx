import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HiOutlineUserGroup,
  HiOutlineCalendar,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineFire,
  HiOutlineBookOpen,
  HiOutlineSparkles,
  HiOutlineMicrophone,
  HiOutlineAcademicCap,
  HiOutlineClipboardDocumentList,
  HiOutlineArrowPath,
} from 'react-icons/hi2';
import { RiCoinLine } from 'react-icons/ri';

const demoGroups = [
  { id: 1, name: 'Backend 36', days: 'Dushanba, Chorshanba, Juma' },
  { id: 2, name: 'Backend 42', days: 'Seshanba, Payshanba, Shanba' },
];

const demoStudents = [
  { id: 1, name: 'Asadbek Yusupov', group: 'Backend 36', avatarColor: 'bg-emerald-500' },
  { id: 2, name: 'Muhammadmuso Alijonov', group: 'Backend 36', avatarColor: 'bg-sky-500' },
  { id: 3, name: 'Mavluda Qurbanova', group: 'Backend 36', avatarColor: 'bg-pink-500' },
  { id: 4, name: 'Aziza Karimova', group: 'Backend 36', avatarColor: 'bg-indigo-500' },
  { id: 5, name: 'Javohir Toshmatov', group: 'Backend 36', avatarColor: 'bg-amber-500' },
  { id: 6, name: 'Bobur Rahimov', group: 'Backend 36', avatarColor: 'bg-slate-500' },
];

const factors = [
  { key: 'attendance', label: 'Qatnashdi', hint: '+25', Icon: HiOutlineCheckCircle, color: 'bg-emerald-50 text-emerald-700 border-emerald-200', activeColor: 'bg-emerald-500 text-white border-emerald-500', step: 25 },
  { key: 'onTime', label: 'Vaqtida', hint: '+25', Icon: HiOutlineClock, color: 'bg-sky-50 text-sky-700 border-sky-200', activeColor: 'bg-sky-500 text-white border-sky-500', step: 25 },
  { key: 'activity', label: 'Faollik', hint: '+30', Icon: HiOutlineFire, color: 'bg-amber-50 text-amber-700 border-amber-200', activeColor: 'bg-amber-500 text-white border-amber-500', step: 30 },
  { key: 'learning', label: "O'rganish", hint: '+100', Icon: HiOutlineAcademicCap, color: 'bg-violet-50 text-violet-700 border-violet-200', activeColor: 'bg-violet-500 text-white border-violet-500', step: 100 },
  { key: 'book', label: 'Kitob', hint: '+100', Icon: HiOutlineBookOpen, color: 'bg-indigo-50 text-indigo-700 border-indigo-200', activeColor: 'bg-indigo-500 text-white border-indigo-500', step: 100 },
  { key: 'clean', label: 'Tartib', hint: '+25', Icon: HiOutlineSparkles, color: 'bg-cyan-50 text-cyan-700 border-cyan-200', activeColor: 'bg-cyan-500 text-white border-cyan-500', step: 25 },
  { key: 'podcast', label: 'Podcast', hint: '+50', Icon: HiOutlineMicrophone, color: 'bg-pink-50 text-pink-700 border-pink-200', activeColor: 'bg-pink-500 text-white border-pink-500', step: 50 },
];

const createInitialRow = (student) => ({
  studentId: student.id,
  homework: 0,
  attendance: 0,
  onTime: 0,
  activity: 0,
  learning: 0,
  book: 0,
  clean: 0,
  podcast: 0,
  exam: 0,
});

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

const getInitials = (name) =>
  (name || '').split(' ').filter(Boolean).map(p => p[0]).join('').slice(0, 2).toUpperCase();

const TeacherAssessment = () => {
  const [selectedGroupId, setSelectedGroupId] = useState(demoGroups[0]?.id ?? null);
  const [date] = useState(() => new Date());
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [rows, setRows] = useState(() => demoStudents.map(createInitialRow));
  const navigate = useNavigate();

  const selectedGroup = useMemo(
    () => demoGroups.find(g => g.id === selectedGroupId) ?? demoGroups[0],
    [selectedGroupId]
  );

  const todayName = useMemo(() => {
    const names = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'];
    return names[date.getDay()] ?? '';
  }, [date]);

  const formattedDate = useMemo(() =>
    `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`,
    [date]
  );

  const handleChange = (studentId, field, value, { min = 0, max = 500 } = {}) => {
    setRows(prev => prev.map(r =>
      r.studentId === studentId ? { ...r, [field]: clamp(Number(value) || 0, min, max) } : r
    ));
  };

  const toggleFactor = (studentId, key) => {
    const step = factors.find(f => f.key === key)?.step ?? 0;
    setRows(prev => prev.map(r =>
      r.studentId === studentId ? { ...r, [key]: (r[key] || 0) === step ? 0 : step } : r
    ));
  };

  const applyFactorToAll = (key) => {
    const step = factors.find(f => f.key === key)?.step ?? 0;
    setRows(prev => prev.map(r => ({ ...r, [key]: (r[key] || 0) === step ? 0 : step })));
  };

  const applyMaxToStudent = (studentId) => {
    setRows(prev => prev.map(r =>
      r.studentId === studentId
        ? { ...r, homework: 100, attendance: 25, onTime: 25, activity: 30, learning: 100, book: 100, clean: 25, podcast: 50 }
        : r
    ));
  };

  const getTotal = (row) =>
    (row.homework || 0) + (row.attendance || 0) + (row.onTime || 0) +
    (row.activity || 0) + (row.learning || 0) + (row.book || 0) +
    (row.clean || 0) + (row.podcast || 0) + (row.exam || 0);

  const handleSave = async () => {
    setSaving(true);
    setSaveMessage('');
    try {
      await new Promise(r => setTimeout(r, 800));
      setSaveMessage('Baholar muvaffaqiyatli saqlandi.');
      setTimeout(() => setSaveMessage(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4 md:space-y-5">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="space-y-0.5">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Baholash</h1>
          <p className="text-gray-500 text-sm">O'quvchilarni baholash va coin berish</p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="self-start inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow-sm hover:bg-blue-700 transition disabled:opacity-60"
        >
          {saving
            ? <HiOutlineArrowPath className="w-4 h-4 animate-spin" />
            : <HiOutlineClipboardDocumentList className="w-4 h-4" />
          }
          {saving ? 'Saqlanmoqda...' : 'Saqlash'}
        </button>
      </header>

      {/* Group & Date selector */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="grid md:grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1">
              <HiOutlineUserGroup className="w-3.5 h-3.5" /> Guruh
            </p>
            <select
              value={selectedGroupId ?? ''}
              onChange={e => setSelectedGroupId(Number(e.target.value))}
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            >
              {demoGroups.map(g => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1">
              <HiOutlineCalendar className="w-3.5 h-3.5" /> Bugun
            </p>
            <div className="rounded-xl border border-gray-200 px-3 py-2 bg-gray-50 flex items-center justify-between">
              <span className="font-medium">{todayName}</span>
              <span className="text-gray-400 text-xs">{formattedDate}</span>
            </div>
          </div>
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1">
              <HiOutlineClock className="w-3.5 h-3.5" /> Dars kunlari
            </p>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800 font-medium">
              {selectedGroup?.days}
            </div>
          </div>
        </div>
      </section>

      {/* Quick apply all */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Barchaga qo'llash</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setRows(prev => prev.map(r => ({ ...r, homework: 100 })))}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition"
          >
            <HiOutlineClipboardDocumentList className="w-3.5 h-3.5" />
            Vazifa 100
          </button>
          {factors.map(f => (
            <button
              key={f.key}
              type="button"
              onClick={() => applyFactorToAll(f.key)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${f.color}`}
            >
              <f.Icon className="w-3.5 h-3.5" />
              {f.label} {f.hint}
            </button>
          ))}
        </div>
      </section>

      {/* Table */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="sticky left-0 z-10 bg-gray-50 px-4 py-3 text-left font-semibold text-gray-600 min-w-[160px]">
                  O'quvchi
                </th>
                <th className="px-2 py-3 text-center font-semibold text-gray-600 whitespace-nowrap min-w-[80px]">
                  <div className="flex flex-col items-center gap-0.5">
                    <HiOutlineClipboardDocumentList className="w-4 h-4 text-blue-500" />
                    <span>Vazifa</span>
                  </div>
                </th>
                {factors.map(f => (
                  <th key={f.key} className="px-2 py-3 text-center font-semibold text-gray-600 whitespace-nowrap min-w-[70px]">
                    <div className="flex flex-col items-center gap-0.5">
                      <f.Icon className="w-4 h-4 text-gray-500" />
                      <span>{f.label}</span>
                    </div>
                  </th>
                ))}
                <th className="px-2 py-3 text-center font-semibold text-gray-600 whitespace-nowrap min-w-[80px]">
                  <div className="flex flex-col items-center gap-0.5">
                    <HiOutlineAcademicCap className="w-4 h-4 text-amber-500" />
                    <span>Imtihon</span>
                  </div>
                </th>
                <th className="px-3 py-3 text-center font-semibold text-gray-600 whitespace-nowrap min-w-[70px]">
                  <div className="flex flex-col items-center gap-0.5">
                    <RiCoinLine className="w-4 h-4 text-orange-500" />
                    <span>Jami</span>
                  </div>
                </th>
                <th className="px-3 py-3 text-center font-semibold text-gray-600 whitespace-nowrap min-w-[90px]">
                  Amal
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {demoStudents.map((student) => {
                const row = rows.find(r => r.studentId === student.id) || createInitialRow(student);
                const total = getTotal(row);
                return (
                  <tr key={student.id} className="hover:bg-gray-50/60 transition">
                    {/* Student */}
                    <td className="sticky left-0 z-10 bg-white px-4 py-3 hover:bg-gray-50/60">
                      <button
                        className="flex items-center gap-2.5 text-left"
                        onClick={() => navigate(`/teacher/students/${student.id}`, { state: { student: { ...student, coins: getTotal(rows.find(r => r.studentId === student.id) || createInitialRow(student)), rank: student.id } } })}
                      >
                        <div className={`w-8 h-8 rounded-full ${student.avatarColor} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}>
                          {getInitials(student.name)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-gray-900 truncate max-w-[110px] hover:underline">{student.name}</p>
                          <p className="text-[10px] text-gray-400 truncate">{student.group}</p>
                        </div>
                      </button>
                    </td>

                    {/* Homework */}
                    <td className="px-2 py-3 text-center">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={row.homework || 0}
                        onChange={e => handleChange(student.id, 'homework', e.target.value, { min: 0, max: 100 })}
                        className="w-16 px-2 py-1.5 rounded-lg border border-gray-200 text-center text-xs font-semibold outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </td>

                    {/* Factor toggles */}
                    {factors.map(f => (
                      <td key={f.key} className="px-2 py-3 text-center">
                        <button
                          type="button"
                          onClick={() => toggleFactor(student.id, f.key)}
                          className={`w-12 h-8 rounded-lg text-xs font-bold border transition ${
                            (row[f.key] || 0) === f.step ? f.activeColor : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          {(row[f.key] || 0) === f.step ? `+${f.step}` : '—'}
                        </button>
                      </td>
                    ))}

                    {/* Exam */}
                    <td className="px-2 py-3 text-center">
                      <input
                        type="number"
                        min="0"
                        max="500"
                        value={row.exam || 0}
                        onChange={e => handleChange(student.id, 'exam', e.target.value, { min: 0, max: 500 })}
                        className="w-16 px-2 py-1.5 rounded-lg border border-gray-200 text-center text-xs font-semibold outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </td>

                    {/* Total */}
                    <td className="px-3 py-3 text-center">
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200">
                        <RiCoinLine className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-xs font-bold text-emerald-700">{total}</span>
                      </div>
                    </td>

                    {/* Action */}
                    <td className="px-3 py-3 text-center">
                      <button
                        type="button"
                        onClick={() => applyMaxToStudent(student.id)}
                        className="px-2.5 py-1.5 rounded-lg bg-blue-600 text-white text-[10px] font-semibold hover:bg-blue-700 transition whitespace-nowrap"
                        title="Barcha bo'limlarni maksimal baholash"
                      >
                        To'liq
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Save message */}
      {saveMessage && (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-sm text-emerald-700">
          <HiOutlineCheckCircle className="w-5 h-5 flex-shrink-0" />
          {saveMessage}
        </div>
      )}
    </div>
  );
};

export default TeacherAssessment;