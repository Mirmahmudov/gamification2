import { useMemo, useState } from 'react';
import {
  HiOutlineMagnifyingGlass,
  HiOutlineTrophy,
  HiOutlineUser,
  HiOutlineFunnel,
  HiOutlineSparkles,
} from 'react-icons/hi2';
import { RiCoinLine, RiMedalLine } from 'react-icons/ri';

const trophyTone = (rank) => {
  if (rank === 1) return 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-lg';
  if (rank === 2) return 'bg-gradient-to-br from-gray-300 to-gray-400 text-white shadow-md';
  if (rank === 3) return 'bg-gradient-to-br from-orange-400 to-orange-500 text-white shadow-md';
  return 'bg-gray-100 text-gray-700';
};

const rankBadgeColor = (rank) => {
  if (rank === 1) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  if (rank === 2) return 'bg-gray-100 text-gray-700 border-gray-200';
  if (rank === 3) return 'bg-orange-100 text-orange-700 border-orange-200';
  return 'bg-gray-50 text-gray-600 border-gray-200';
};

const medal = (rank) => {
  if (rank === 1) return <HiOutlineTrophy className="w-5 h-5" />;
  if (rank === 2) return <RiMedalLine className="w-5 h-5" />;
  if (rank === 3) return <RiMedalLine className="w-5 h-5" />;
  return <span className="text-sm font-bold">{rank}</span>;
};

const initials = (name) =>
  (name || '')
    .split(' ')
    .filter(Boolean)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

const normalizeRoleLabel = (role) => {
  const r = (role || '').toLowerCase();
  if (r === 'student') return 'Student';
  if (r === 'teacher') return 'Ustoz';
  if (r === 'admin') return 'Admin';
  if (r === 'owner') return 'Ega';
  return role || '—';
};

const Leaderboard = ({ title = 'Reyting', subtitle, items = [], onStudentClick }) => {
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const roles = useMemo(() => {
    const s = new Set(items.map((i) => i.role).filter(Boolean));
    return Array.from(s);
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items
      .filter((i) => (roleFilter === 'all' ? true : i.role === roleFilter))
      .filter((i) => {
        if (!q) return true;
        return (
          (i.name || '').toLowerCase().includes(q) ||
          (i.group || '').toLowerCase().includes(q)
        );
      })
      .sort((a, b) => (b.coins ?? 0) - (a.coins ?? 0));
  }, [items, query, roleFilter]);

  const top3 = filtered.slice(0, 3);

  return (
    <div className="space-y-5 md:space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-gray-500 text-sm md:text-base">{subtitle}</p>}
      </header>

      {/* Top 3 Podium */}
      <section className="grid gap-4 md:grid-cols-3">
        {top3.map((u, idx) => {
          const rank = idx + 1;
          return (
            <div
              key={u.id ?? `${u.name}-${rank}`}
              onClick={() => onStudentClick?.(u)}
              className={`bg-white rounded-2xl border-2 ${
                rank === 1 ? 'border-yellow-200' : rank === 2 ? 'border-gray-200' : 'border-orange-200'
              } shadow-lg p-5 hover:-translate-y-1 transition-all duration-200 relative overflow-hidden ${onStudentClick ? 'cursor-pointer' : ''}`}
            >
              {rank === 1 && (
                <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
              )}
              
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${trophyTone(rank)}`}>
                    {medal(rank)}
                  </div>
                  {rank === 1 && (
                    <HiOutlineSparkles className="w-6 h-6 text-yellow-500" />
                  )}
                </div>
                
                <div className="space-y-2">
                  <p className="text-base md:text-lg font-bold text-gray-900 truncate">{u.name}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {u.group || normalizeRoleLabel(u.role)}
                  </p>
                  
                  <div className="flex items-center gap-2 pt-2">
                    <RiCoinLine className="w-5 h-5 text-orange-500" />
                    <span className="text-xl font-extrabold text-gray-900 tabular-nums">
                      {Number(u.coins ?? 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Search and Filter */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-5">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition">
            <HiOutlineMagnifyingGlass className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ism yoki guruh bo'yicha qidirish..."
              className="w-full bg-transparent outline-none text-sm text-gray-900 placeholder:text-gray-400"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <HiOutlineFunnel className="w-5 h-5 text-gray-400" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition cursor-pointer"
            >
              <option value="all">Barchasi</option>
              {roles.map((r) => (
                <option key={r} value={r}>
                  {normalizeRoleLabel(r)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Leaderboard List */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-100">
          {filtered.map((u, idx) => {
            const rank = idx + 1;
            const isTop3 = rank <= 3;
            
            return (
              <div
                key={u.id ?? `${u.name}-${rank}`}
                onClick={() => onStudentClick?.(u)}
                className={`flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition ${
                  isTop3 ? 'bg-gradient-to-r from-gray-50 to-transparent' : ''
                } ${onStudentClick ? 'cursor-pointer' : ''}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold border-2 ${rankBadgeColor(rank)}`}>
                  {rank <= 3 ? medal(rank) : rank}
                </div>
                
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-md">
                  {initials(u.name)}
                </div>
                
                <div className="min-w-0 flex-1">
                  <p className="text-sm md:text-base font-semibold text-gray-900 truncate">{u.name}</p>
                  <p className="text-xs text-gray-500 truncate flex items-center gap-1">
                    <HiOutlineUser className="w-3 h-3" />
                    {u.group || normalizeRoleLabel(u.role)}
                  </p>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-1.5 justify-end">
                    <RiCoinLine className="w-4 h-4 text-orange-500" />
                    <span className="text-base md:text-lg font-extrabold text-gray-900 tabular-nums">
                      {Number(u.coins ?? 0).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">coinlar</p>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="px-5 py-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-3">
                <HiOutlineMagnifyingGlass className="w-8 h-8 text-gray-400" />
              </div>
              <p className="font-semibold text-gray-900 mb-1">Natija topilmadi</p>
              <p className="text-sm text-gray-500">Qidiruv yoki filtrni o'zgartiring.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Leaderboard;
