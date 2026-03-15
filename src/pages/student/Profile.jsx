import { useState } from 'react';
import { useStudentData, formatLessonDays } from '../../contexts/StudentDataContext';
import {
  HiOutlineUser,
  HiOutlineUserGroup,
  HiOutlineTrophy,
  HiOutlineCheckCircle,
  HiOutlinePencilSquare,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineLockClosed,
  HiOutlineSparkles,
  HiOutlineAcademicCap,
  HiOutlineFire,
  HiOutlineXMark,
  HiOutlineCamera,
} from 'react-icons/hi2';
import { RiCoinLine } from 'react-icons/ri';
import { updateStudentProfileRequest } from '../../utils/api';
import { getAccessToken, getRefreshToken, setAccessToken } from '../../utils/auth';

const levels = [
  { name: 'Beginner', percent: 65, coins: 0 },
  { name: 'Junior', percent: 35, coins: 2000 },
  { name: 'Middle', percent: 12, coins: 5000 },
  { name: 'Senior', percent: 0, coins: 10000 },
  { name: 'Team Lead', percent: 0, coins: 20000 },
  { name: 'Software Engineer', percent: 0, coins: 35000 },
  { name: 'Principal Engineer', percent: 0, coins: 50000 },
  { name: 'Tech Guru', percent: 0, coins: 75000 },
  { name: 'Master', percent: 0, coins: 100000 },
];

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'];
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
};

const Modal = ({ open, title, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Close modal overlay"
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="relative mx-auto mt-12 w-[92%] max-w-2xl">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 text-base md:text-lg">{title}</h3>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition flex items-center justify-center text-gray-500"
              aria-label="Close"
            >
              <HiOutlineXMark className="w-5 h-5" />
            </button>
          </div>
          <div className="p-5 md:p-6 max-h-[70vh] overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};

const StudentProfile = () => {
  const { fullName, user, point, groups, bio, image, createdAt, birthDate, loading, error, studentId, refreshData } = useStudentData();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    bio: '',
    birth_date: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-500 text-sm">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center max-w-md">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  const currentLevel = levels.find(l => l.percent > 0) || levels[0];
  const nextLevel = levels[levels.findIndex(l => l.name === currentLevel.name) + 1];

  const openEditModal = () => {
    const names = (fullName || '').split(' ');
    setForm({
      first_name: names[0] || '',
      last_name: names.slice(1).join(' ') || '',
      bio: bio || '',
      birth_date: birthDate || '',
      image: null,
    });
    setImagePreview(image);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setImagePreview(null);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setForm((prev) => ({ ...prev, image: file }));
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('first_name', form.first_name);
      formData.append('last_name', form.last_name);
      formData.append('bio', form.bio);
      if (form.birth_date) {
        formData.append('birth_date', form.birth_date);
      }
      if (form.image) {
        formData.append('image', form.image);
      }

      await updateStudentProfileRequest(studentId, formData, getAccessToken, getRefreshToken, setAccessToken);
      await refreshData();
      setIsEditModalOpen(false);
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-5 md:space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Profil</h1>
        <p className="text-gray-500 text-sm md:text-base">
          Shaxsiy ma'lumotlaringiz va statistikangiz
        </p>
      </header>

      {/* Profile Header Card */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white rounded-3xl p-6 md:p-8 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden border-2 border-white/20 shadow-xl">
              {image ? (
                <img src={image} alt={fullName} className="w-full h-full object-cover" />
              ) : (
                <HiOutlineUser className="w-10 h-10 md:w-12 md:h-12 text-white/80" />
              )}
            </div>
            <button
              onClick={openEditModal}
              className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center shadow-lg transition"
              aria-label="Profilni tahrirlash"
            >
              <HiOutlineCamera className="w-4 h-4 text-white" />
            </button>
          </div>

          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-bold mb-1">{fullName || user?.username}</h2>
            <div className="flex flex-wrap items-center gap-3 text-sm text-blue-100 mb-3">
              <span className="flex items-center gap-1">
                <HiOutlineUser className="w-4 h-4" />
                @{user?.username || ''}
              </span>
              <span className="flex items-center gap-1">
                <HiOutlineCalendar className="w-4 h-4" />
                {formatDate(createdAt) || '—'}
              </span>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20">
              <RiCoinLine className="w-5 h-5 text-yellow-300" />
              <span className="text-lg md:text-xl font-bold">{point?.toLocaleString?.() ?? point ?? 0}</span>
              <span className="text-sm text-blue-100">coinlar</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {[
          { label: 'Coinlar', value: (point ?? 0).toLocaleString(), icon: RiCoinLine, color: 'bg-yellow-50 text-yellow-600', bgIcon: 'bg-yellow-100' },
          { label: 'Guruhlar', value: String(groups?.length ?? 0), icon: HiOutlineUserGroup, color: 'bg-blue-50 text-blue-600', bgIcon: 'bg-blue-100' },
          { label: 'O\'rin', value: '#1', icon: HiOutlineTrophy, color: 'bg-orange-50 text-orange-600', bgIcon: 'bg-orange-100' },
          { label: 'Tugatdim', value: '3', icon: HiOutlineCheckCircle, color: 'bg-emerald-50 text-emerald-600', bgIcon: 'bg-emerald-100' },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
          >
            <div className={`w-11 h-11 rounded-xl ${item.bgIcon} flex items-center justify-center mb-3`}>
              <item.icon className={`w-6 h-6 ${item.color.split(' ')[1]}`} />
            </div>
            <p className="text-xl md:text-2xl font-bold text-gray-900 mb-0.5">{item.value}</p>
            <p className="text-xs text-gray-500">{item.label}</p>
          </div>
        ))}
      </section>

      {/* Bio Section */}
      <section className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base md:text-lg font-semibold text-gray-900 flex items-center gap-2">
            <HiOutlineAcademicCap className="w-5 h-5 text-blue-600" />
            Bio
          </h2>
          <button 
            onClick={openEditModal}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition px-3 py-1.5 rounded-lg hover:bg-blue-50"
          >
            <HiOutlinePencilSquare className="w-4 h-4" />
            Tahrirlash
          </button>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          {bio || 'Bio hali kiritilmagan. Profil ma\'lumotlaringizni to\'ldiring.'}
        </p>
      </section>

      {/* Groups & Activity Grid */}
      <section className="grid gap-5 lg:grid-cols-2">
        {/* Groups */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 shadow-sm">
          <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <HiOutlineUserGroup className="w-5 h-5 text-blue-600" />
            Mening guruhlarim
          </h2>
          {groups?.length ? (
            <div className="space-y-3">
              {groups.map((g) => (
                <div key={g.id} className="rounded-xl border border-gray-200 p-4 bg-gradient-to-br from-gray-50 to-white hover:shadow-sm transition">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm">{g.name}</h3>
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-lg whitespace-nowrap">
                      {formatLessonDays(g.lesson_days)}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <HiOutlineUser className="w-3.5 h-3.5" />
                      {g.mentor?.user?.username || '—'}
                    </span>
                    <span className="flex items-center gap-1">
                      <HiOutlineAcademicCap className="w-3.5 h-3.5" />
                      {g.course?.name || '—'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <HiOutlineUserGroup className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Guruhlar yo'q</p>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 shadow-sm">
          <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <HiOutlineFire className="w-5 h-5 text-orange-600" />
            So'nggi faoliyat
          </h2>
          <div className="space-y-2">
            {[
              { title: 'Dars bahosi', date: '2026-02-10', coin: '+420' },
              { title: 'Yanvar oyi imtihoni', date: '2026-01-31', coin: '+525' },
              { title: 'Dars bahosi', date: '2026-02-07', coin: '+338' },
            ].map((a) => (
              <div
                key={a.title + a.date}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition border border-transparent hover:border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <HiOutlineCheckCircle className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{a.title}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <HiOutlineClock className="w-3 h-3" />
                      {a.date}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-bold text-emerald-600">{a.coin}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Level Card */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-sm text-slate-400 mb-1">Sizning darajangiz</p>
              <h3 className="text-2xl md:text-3xl font-bold mb-1">{currentLevel.name}</h3>
              <p className="text-sm text-slate-400">Level {levels.findIndex(l => l.name === currentLevel.name) + 1} / {levels.length}</p>
            </div>
            <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <p className="text-xs text-slate-300">Level</p>
              <p className="text-xl font-bold">{levels.findIndex(l => l.name === currentLevel.name) + 1}</p>
            </div>
          </div>

          {nextLevel && (
            <div>
              <div className="flex items-center justify-between text-sm text-slate-300 mb-2">
                <span>Keyingi daraja: {nextLevel.name}</span>
                <span className="font-semibold">{nextLevel.coins - (point ?? 0)} coin qoldi</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-700/50 overflow-hidden backdrop-blur-sm">
                <div 
                  className="h-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-full transition-all duration-500"
                  style={{ width: `${currentLevel.percent}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Level Roadmap */}
      <section className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base md:text-lg font-semibold text-gray-900 flex items-center gap-2">
            <HiOutlineTrophy className="w-5 h-5 text-yellow-600" />
            Darajalar xaritasi
          </h2>
          <p className="text-xs text-gray-500">Keyingi darajalar</p>
        </div>

        <div className="space-y-3">
          {levels.map((lvl, idx) => {
            const isUnlocked = lvl.percent > 0;
            const isCurrent = lvl.name === currentLevel.name;
            
            return (
              <div
                key={lvl.name}
                className={`rounded-xl border p-4 transition-all ${
                  isCurrent 
                    ? 'border-blue-200 bg-blue-50' 
                    : isUnlocked 
                    ? 'border-emerald-200 bg-emerald-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${
                    isCurrent 
                      ? 'bg-blue-600 text-white' 
                      : isUnlocked 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-white border-2 border-gray-200 text-gray-400'
                  }`}>
                    {isUnlocked ? (
                      <HiOutlineCheckCircle className="w-6 h-6" />
                    ) : (
                      <HiOutlineLockClosed className="w-6 h-6" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">{lvl.name}</h3>
                        <p className="text-xs text-gray-500">{lvl.coins.toLocaleString()} coins kerak</p>
                      </div>
                      {isCurrent && (
                        <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-lg">
                          Joriy
                        </span>
                      )}
                      {isUnlocked && !isCurrent && (
                        <span className="text-xs font-semibold text-emerald-600">
                          {lvl.percent}%
                        </span>
                      )}
                    </div>
                    
                    <div className="w-full h-2 rounded-full bg-white border border-gray-200 overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${
                          isCurrent 
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                            : isUnlocked 
                            ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' 
                            : 'bg-gray-200'
                        }`}
                        style={{ width: `${lvl.percent}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Edit Profile Modal */}
      <Modal
        open={isEditModalOpen}
        onClose={closeEditModal}
        title="Profilni tahrirlash"
      >
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Image Upload */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Profil rasmi</label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-gray-200">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <HiOutlineUser className="w-10 h-10 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-1">PNG, JPG yoki JPEG (max. 5MB)</p>
              </div>
            </div>
          </div>

          {/* First Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Ism *</label>
            <input
              type="text"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              required
              placeholder="Ismingizni kiriting"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Last Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Familiya *</label>
            <input
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              required
              placeholder="Familiyangizni kiriting"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Birth Date */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Tug'ilgan sana</label>
            <input
              type="date"
              name="birth_date"
              value={form.birth_date}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Bio */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={4}
              placeholder="O'zingiz haqingizda qisqacha ma'lumot..."
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={closeEditModal}
              disabled={submitting}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 shadow-sm disabled:opacity-50 transition"
            >
              {submitting ? 'Saqlanmoqda...' : 'Saqlash'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default StudentProfile;
