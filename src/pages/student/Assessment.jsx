import {
  HiOutlineAcademicCap,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineFire,
  HiOutlineBookOpen,
  HiOutlineSparkles,
  HiOutlineMicrophone,
  HiOutlineHome,
  HiOutlineCalendar,
  HiOutlineTrophy,
  HiOutlineInformationCircle,
  HiOutlineExclamationTriangle,
} from 'react-icons/hi2';
import { RiCoinLine } from 'react-icons/ri';

const coinRules = [
  {
    title: 'Vazifa',
    subtitle: 'Uyga vazifa baholash',
    value: '0–100',
    icon: HiOutlineHome,
    tone: 'from-blue-50 to-blue-100',
    valueTone: 'text-blue-600',
    iconColor: 'text-blue-600',
    bgIcon: 'bg-blue-100'
  },
  {
    title: 'Darsga qatnashdi',
    subtitle: 'Darsda qatnashganlik uchun',
    value: '+25',
    icon: HiOutlineCheckCircle,
    tone: 'from-emerald-50 to-emerald-100',
    valueTone: 'text-emerald-600',
    iconColor: 'text-emerald-600',
    bgIcon: 'bg-emerald-100'
  },
  {
    title: 'Vaqtida keldi',
    subtitle: 'Darsga kechikmaganlik uchun',
    value: '+25',
    icon: HiOutlineClock,
    tone: 'from-emerald-50 to-emerald-100',
    valueTone: 'text-emerald-600',
    iconColor: 'text-emerald-600',
    bgIcon: 'bg-emerald-100'
  },
  {
    title: 'Darsdagi faollik',
    subtitle: 'Darsda faol ishtirok etish',
    value: '+30',
    icon: HiOutlineFire,
    tone: 'from-orange-50 to-orange-100',
    valueTone: 'text-orange-600',
    iconColor: 'text-orange-600',
    bgIcon: 'bg-orange-100'
  },
  {
    title: `Soha bo'yicha o'rganish`,
    subtitle: `Qo'shimcha darslar va kurslar`,
    value: '+100',
    icon: HiOutlineAcademicCap,
    tone: 'from-violet-50 to-violet-100',
    valueTone: 'text-violet-600',
    iconColor: 'text-violet-600',
    bgIcon: 'bg-violet-100'
  },
  {

    title: `Kitob o'qish`,
    subtitle: `Dasturlash kitoblarini o'qish`,
    value: '+100',
    icon: HiOutlineBookOpen,
    tone: 'from-amber-50 to-amber-100',
    valueTone: 'text-amber-600',
    iconColor: 'text-amber-600',
    bgIcon: 'bg-amber-100'
  },
  {
    title: 'Tozalik',
    subtitle: 'Tartib va tozalikka rioya',
    value: '+25',
    icon: HiOutlineSparkles,
    tone: 'from-cyan-50 to-cyan-100',
    valueTone: 'text-cyan-700',
    iconColor: 'text-cyan-700',
    bgIcon: 'bg-cyan-100'
  },
  {
    title: 'Podcast tinglash',
    subtitle: `O'quv podcastlarini tinglash`,
    value: '+50',
    icon: HiOutlineMicrophone,
    tone: 'from-pink-50 to-pink-100',
    valueTone: 'text-pink-600',
    iconColor: 'text-pink-600',
    bgIcon: 'bg-pink-100'
  },
];

const StudentAssessment = () => {
  return (
    <div className="space-y-5 md:space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Baholash Nizomi
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          Coin tizimi qanday ishlaydi va qoidalar
        </p>
      </header>

      {/* Info Card */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0 border border-white/20">
            <RiCoinLine className="w-6 h-6 text-yellow-300" />
          </div>
          <div className="space-y-2">
            <h2 className="font-bold text-lg md:text-xl">
              Coin Tizimi
            </h2>
            <p className="text-sm md:text-base text-blue-100 leading-relaxed">
              CODIAL platformasida coin tizimi orqali sizning faolligingiz va yutuqlaringiz baholanadi.
              Yig'ilgan coinlaringizni oy oxiridagi auksionlarda qimmatli sovg'alarga almashtira olasiz.
            </p>
          </div>
        </div>
      </section>

      {/* Coin Rules */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <HiOutlineTrophy className="w-5 h-5 text-yellow-600" />
          <h2 className="text-base md:text-lg font-semibold text-gray-900">
            Har bir darsda olish mumkin bo'lgan coinlar
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          {coinRules.map((rule) => (
            <div
              key={rule.title}
              className={`rounded-xl p-4 border border-gray-100 bg-gradient-to-br ${rule.tone} hover:shadow-md transition-all`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`w-10 h-10 rounded-lg ${rule.bgIcon} flex items-center justify-center flex-shrink-0`}>
                    <rule.icon className={`w-5 h-5 ${rule.iconColor}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{rule.title}</p>
                    <p className="text-xs text-gray-600 truncate">{rule.subtitle}</p>
                  </div>
                </div>
                <div className={`text-base font-bold ${rule.valueTone} whitespace-nowrap`}>
                  {rule.value}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Monthly Exam */}
        <div className="rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-amber-200 flex items-center justify-center flex-shrink-0">
                <HiOutlineAcademicCap className="w-5 h-5 text-amber-700" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900">Oylik imtihon</p>
                <p className="text-xs text-gray-600 truncate">Har oy oxirida imtihon</p>
              </div>
            </div>
            <div className="text-base font-bold text-amber-700">0–500</div>
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HiOutlineCheckCircle className="w-4 h-4 text-emerald-600" />
              <p className="text-sm font-semibold text-gray-900">Maksimal har darsda</p>
            </div>
            <p className="text-base font-bold text-emerald-700">455</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HiOutlineCalendar className="w-4 h-4 text-emerald-600" />
              <p className="text-sm font-semibold text-gray-900">Oylik potensial</p>
            </div>
            <p className="text-base font-bold text-emerald-700">5960</p>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <HiOutlineCalendar className="w-5 h-5 text-blue-600" />
          <h2 className="text-base md:text-lg font-semibold text-gray-900">
            Dars jadvali
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <div className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">A</span>
              </div>
              <p className="text-sm font-bold text-blue-900">Variant A</p>
            </div>
            <p className="text-xs text-blue-700">Dush · Chor · Juma</p>
          </div>

          <div className="rounded-xl border border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-orange-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">B</span>
              </div>
              <p className="text-sm font-bold text-orange-900">Variant B</p>
            </div>
            <p className="text-xs text-orange-700">Sesh · Pay · Shan</p>
          </div>
        </div>

        <div className="flex items-start gap-2 p-3 rounded-xl bg-blue-50 border border-blue-100">
          <HiOutlineInformationCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-blue-700">
            Baholash faqat dars kunlarida amalga oshiriladi.
          </p>
        </div>
      </section>

      {/* Rules */}
      <section className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <HiOutlineExclamationTriangle className="w-5 h-5 text-amber-600" />
          <h2 className="text-base md:text-lg font-semibold text-gray-900">
            Muhim qoidalar
          </h2>
        </div>
        <ul className="space-y-3">
          {[
            'Har bir mukofot turi darsda faqat bir marta beriladi',
            `Imtihon bahosi oyiga bir marta qo'shiladi`,
            'Baholash faqat dars kunlari amalga oshiriladi',
            `Kun tugagach baholar qo'shiladi va o'zgartirib bo'lmayd`,
            `Yig'ilgan coinlarni auksionlarda ishlatish mumkin`,
            'Reyting har kuni yangilanadi',
          ].map((rule) => (
            <li key={rule} className="flex items-start gap-3 text-sm text-gray-700">
              <HiOutlineCheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Motivation Card */}
      <section className="bg-gradient-to-br from-red-600 via-red-700 to-rose-700 text-white rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0 border border-white/20">
            <HiOutlineFire className="w-6 h-6 text-yellow-300" />
          </div>
          <div className="space-y-2">
            <p className="text-lg md:text-xl font-bold">Maqsadingiz nimada?</p>
            <p className="text-sm md:text-base text-red-100 leading-relaxed">
              Ko'proq coin yig'ing, reyting jadvalida yuqori o'rinlarda chiqing va oy oxiridagi auksionlarda
              ajoyib sovg'alarni yutib oling! Har bir darsda faol qatnashing, vazifalaringizni sifatli bajaring va
              kitob o'qishni unutmang.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentAssessment;
