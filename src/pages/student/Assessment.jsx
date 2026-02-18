const coinRules = [
  { title: 'Vazifa', subtitle: 'Uyga vazifa baholash', value: '0–100', tone: 'from-blue-50 to-blue-100', valueTone: 'text-blue-600' },
  { title: 'Darsga qatnashdi', subtitle: 'Darsda qatnashganlik uchun', value: '+25', tone: 'from-emerald-50 to-emerald-100', valueTone: 'text-emerald-600' },
  { title: 'Vaqtida keldi', subtitle: 'Darsga kechikmaganlik uchun', value: '+25', tone: 'from-emerald-50 to-emerald-100', valueTone: 'text-emerald-600' },
  { title: 'Darsdagi faollik', subtitle: 'Darsda faol ishtirok etish', value: '+30', tone: 'from-emerald-50 to-emerald-100', valueTone: 'text-emerald-600' },
  { title: 'Soha bo‘yicha o‘rganish', subtitle: 'Qo‘shimcha darslar va kurslar', value: '+100', tone: 'from-violet-50 to-violet-100', valueTone: 'text-violet-600' },
  { title: 'Kitob o‘qish', subtitle: 'Dasturlash kitoblarini o‘qish', value: '+100', tone: 'from-orange-50 to-orange-100', valueTone: 'text-orange-600' },
  { title: 'Tozalik', subtitle: 'Tartib va tozalikka rioya', value: '+25', tone: 'from-cyan-50 to-cyan-100', valueTone: 'text-cyan-700' },
  { title: 'Podcast tinglash', subtitle: 'O‘quv podcastlarini tinglash', value: '+50', tone: 'from-pink-50 to-pink-100', valueTone: 'text-pink-600' },
];

const StudentAssessment = () => {
  return (
    <div className="space-y-5 md:space-y-7">
      <header className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Baholash Nizomi
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          Coin tizimi qanday ishlaydi va qoidalar
        </p>
      </header>

      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-4 md:p-5 shadow-sm flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
          <span className="text-lg">🌀</span>
        </div>
        <div className="space-y-1">
          <h2 className="font-semibold text-sm md:text-base">
            Coin Tizimi
          </h2>
          <p className="text-xs md:text-sm text-blue-100 leading-relaxed">
            CODIAL platformasida coin tizimi orqali sizning faolligingiz va yutuqlaringiz baholanadi.
            Yig‘ilgan coinlaringizni oy oxiridagi auksionlarda qimmatli sovg‘alarga almashtira olasiz.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm md:text-base font-semibold text-gray-900">
          Har bir darsda olish mumkin bo‘lgan coinlar
        </h2>

        <div className="grid md:grid-cols-2 gap-3 md:gap-4">
          {coinRules.map((rule) => (
            <div
              key={rule.title}
              className={`rounded-2xl p-4 border border-gray-100 bg-gradient-to-br ${rule.tone} flex items-center justify-between gap-3 hover:-translate-y-0.5 hover:shadow-sm transition`}
            >
              <div className="space-y-0.5">
                <p className="text-sm font-semibold text-gray-900">{rule.title}</p>
                <p className="text-[11px] md:text-xs text-gray-600">{rule.subtitle}</p>
              </div>
              <div className={`text-sm md:text-base font-bold ${rule.valueTone}`}>
                {rule.value}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-amber-50 to-amber-100 p-4 flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-sm font-semibold text-gray-900">Oylik imtihon</p>
            <p className="text-[11px] md:text-xs text-gray-600">Har oy oxirida o‘tkaziladigan imtihon bahosi</p>
          </div>
          <div className="text-sm md:text-base font-bold text-amber-700">0–500 coin</div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 space-y-2">
          <div className="flex items-center justify-between text-xs md:text-sm">
            <p className="font-semibold text-gray-900">Maksimal har darsda</p>
            <p className="font-bold text-emerald-700">455 coin</p>
          </div>
          <div className="flex items-center justify-between text-xs md:text-sm">
            <p className="font-semibold text-gray-900">Oylik potensial</p>
            <p className="font-bold text-emerald-700">5960 coin</p>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-gray-100 p-4 md:p-5 shadow-sm space-y-4">
        <h2 className="text-sm md:text-base font-semibold text-gray-900">
          Dars jadvali
        </h2>

        <div className="space-y-3">
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <p className="text-xs font-semibold text-blue-700 mb-1">Variant A</p>
            <p className="text-xs md:text-sm text-blue-700">Dushanba · Chorshanba · Juma</p>
          </div>

          <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4">
            <p className="text-xs font-semibold text-orange-700 mb-1">Variant B</p>
            <p className="text-xs md:text-sm text-orange-700">Seshanba · Payshanba · Shanba</p>
          </div>
        </div>

        <p className="text-[11px] md:text-xs text-gray-500">
          Baholash faqat dars kunlarida amalga oshiriladi va o‘sha kun tugagach tahrirlash mumkin emas.
        </p>
      </section>

      <section className="bg-white rounded-2xl border border-gray-100 p-4 md:p-5 shadow-sm space-y-3">
        <h2 className="text-sm md:text-base font-semibold text-gray-900">
          Muhim qoidalar
        </h2>
        <ul className="space-y-2 text-xs md:text-sm text-gray-600">
          {[
            'Har bir mukofot turi darsda faqat bir marta beriladi',
            'Imtihon bahosi oyiga bir marta qo‘shiladi',
            'Baholash faqat dars kunlari amalga oshiriladi',
            'Kun tugagach baholar qo‘shiladi va o‘zgartirib bo‘lmaydi',
            'Yig‘ilgan coinlarni auksionlarda ishlatish mumkin',
            'Reyting har kuni yangilanadi',
          ].map((rule) => (
            <li key={rule} className="flex items-start gap-2">
              <span className="mt-0.5 text-emerald-500">✔</span>
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-red-600 text-white rounded-2xl p-4 md:p-5 shadow-sm">
        <p className="text-sm md:text-base font-semibold mb-1">Maqsadingiz nimada?</p>
        <p className="text-xs md:text-sm text-red-100">
          Ko‘proq coin yig‘ing, reyting jadvalida yuqori o‘rinlarda chiqing va oy oxiridagi auksionlarda
          ajoyib sovg‘alarni yutib oling! Har bir darsda faol qatnashing, vazifalaringizni sifatli bajaring va
          kitob o‘qishni unutmang.
        </p>
      </section>
    </div>
  );
};

export default StudentAssessment;