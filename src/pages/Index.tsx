import { useState } from "react";
import Icon from "@/components/ui/icon";

interface FormItem { icon: string; label: string; desc: string }
interface StatItem { value: string; label: string; color: string }
interface CategoryItem { icon: string; title: string; color: string; items: string[] }
interface GroupItem { icon: string; label: string; color: string; signs: string[] }
interface PillarItem { num: string; icon: string; title: string; color: string; items: string[] }
interface StepItem { icon: string; title: string; desc: string; step?: number; color?: string }
interface HotlineItem { name: string; number: string; note: string }
interface SpecialistItem { icon: string; title: string; desc: string }
interface MessageItem { icon: string; text: string }

interface SlideData {
  id: number;
  tag: string;
  title: string;
  type: string;
  subtitle?: string;
  definition?: string;
  forms?: FormItem[];
  note?: string;
  stats?: StatItem[];
  message?: string;
  intro?: string;
  categories?: CategoryItem[];
  groups?: GroupItem[];
  dos?: string[];
  donts?: string[];
  pillars?: PillarItem[];
  steps?: StepItem[];
  signs?: string[];
  dont?: string[];
  urgent?: string;
  hotlines?: HotlineItem[];
  specialists?: SpecialistItem[];
  messages?: MessageItem[];
  footer?: string;
}

const slides: SlideData[] = [
  {
    id: 1,
    tag: "Введение",
    title: "Профилактика аутоагрессивного поведения подростков",
    subtitle: "Комплексное руководство для родителей",
    type: "hero",
  },
  {
    id: 2,
    tag: "Понимание",
    title: "Что такое аутоагрессия?",
    type: "definition",
    definition:
      "Аутоагрессия — это поведение, при котором подросток намеренно причиняет вред самому себе — физически или психологически — как способ справиться с невыносимой внутренней болью.",
    forms: [
      { icon: "Slash", label: "Самоповреждение", desc: "порезы, ожоги, удары по себе" },
      { icon: "Brain", label: "Психологическое", desc: "постоянное самообвинение, самоунижение" },
      { icon: "Cigarette", label: "Косвенное", desc: "алкоголь, наркотики, расстройства питания" },
      { icon: "MessageSquareX", label: "Вербальное", desc: "«я ничтожество», «лучше бы меня не было»" },
    ],
    note: "Важно: аутоагрессия — это не желание умереть и не манипуляция. Это сигнал о нестерпимой боли, с которой подросток не умеет справляться иначе.",
  },
  {
    id: 3,
    tag: "Масштаб",
    title: "Почему это важно знать каждому родителю",
    type: "stats",
    stats: [
      { value: "каждый 5-й", label: "подросток имеет мысли о самоповреждении", color: "red" },
      { value: "12–17 лет", label: "пиковый возраст риска", color: "orange" },
      { value: "70%", label: "случаев остаются незамеченными взрослыми", color: "amber" },
      { value: "3×", label: "чаще встречается у девочек", color: "blue" },
    ],
    message: "Большинство подростков тщательно скрывают своё состояние. Именно поэтому внимательность и открытость родителей критически важны.",
  },
  {
    id: 4,
    tag: "Причины",
    title: "Факторы риска: почему это происходит",
    type: "causes",
    intro: "Аутоагрессия — не слабость характера и не попытка манипуляции. Это следствие совокупности факторов.",
    categories: [
      {
        icon: "HeartCrack",
        title: "Эмоциональные",
        color: "rose",
        items: ["Хроническое ощущение пустоты", "Трудности с выражением чувств", "Тревога и депрессия", "Перфекционизм и страх неудачи"],
      },
      {
        icon: "Users",
        title: "Социальные",
        color: "blue",
        items: ["Буллинг и кибербуллинг", "Разрывы в отношениях", "Изоляция от сверстников", "Давление и высокие ожидания"],
      },
      {
        icon: "Home",
        title: "Семейные",
        color: "green",
        items: ["Конфликты и насилие в семье", "Развод или потеря близкого", "Чрезмерный контроль или безразличие", "Психические расстройства у родителей"],
      },
      {
        icon: "Smartphone",
        title: "Цифровая среда",
        color: "purple",
        items: ["«Группы смерти» в соцсетях", "Деструктивный контент", "Кибербуллинг", "Сравнение себя с «идеальными» образами"],
      },
    ],
  },
  {
    id: 5,
    tag: "Сигналы",
    title: "Тревожные признаки: что замечать",
    type: "warning",
    groups: [
      {
        icon: "Eye",
        label: "Физические",
        color: "red",
        signs: ["Необъяснимые порезы, синяки, ожоги", "Закрытая одежда в жаркую погоду", "Скрытые острые предметы", "Частые «случайные» травмы"],
      },
      {
        icon: "Activity",
        label: "Поведенческие",
        color: "amber",
        signs: ["Резкая замкнутость, уход в себя", "Отказ от прежних увлечений", "Нарушения сна и аппетита", "Раздача личных вещей"],
      },
      {
        icon: "MessageCircle",
        label: "Словесные",
        color: "blue",
        signs: ["«Всем лучше без меня»", "Разговоры о смерти", "«Я ничтожество, я не нужен»", "Прощание с близкими"],
      },
      {
        icon: "Smartphone",
        label: "Онлайн",
        color: "purple",
        signs: ["Подписки на деструктивный контент", "Скрытность в телефоне", "Тёмные аватары и статусы", "Резкий перепад в активности"],
      },
    ],
  },
  {
    id: 6,
    tag: "Общение",
    title: "Как говорить с подростком",
    type: "communication",
    dos: [
      "Слушайте без осуждения — просто присутствуйте рядом",
      "Спрашивайте прямо: «Ты думаешь о том, чтобы причинить себе вред?»",
      "Признавайте чувства: «Я слышу, тебе сейчас очень тяжело»",
      "Выражайте безусловную любовь, независимо от ситуации",
      "Сохраняйте спокойствие — ваша реакция определяет всё",
    ],
    donts: [
      "Не обесценивайте: «Ты придумываешь», «У других хуже»",
      "Не угрожайте и не ставьте ультиматумы",
      "Не обвиняйте: «Ты делаешь это назло нам»",
      "Не заставляйте «взять себя в руки» немедленно",
      "Не обещайте хранить тайну о самоповреждении",
    ],
  },
  {
    id: 7,
    tag: "Профилактика",
    title: "Комплексные меры профилактики",
    type: "prevention",
    pillars: [
      {
        num: "01",
        icon: "MessageCircleHeart",
        title: "Открытый диалог в семье",
        color: "blue",
        items: [
          "Регулярные разговоры без телефонов за ужином",
          "Интерес к жизни без допроса",
          "Признание права на любые чувства",
          "Обсуждение сложных тем — смерти, боли, страхов",
        ],
      },
      {
        num: "02",
        icon: "Shield",
        title: "Эмоциональная безопасность дома",
        color: "green",
        items: [
          "Снижение уровня критики и давления",
          "Принятие без условий — «ты ценен просто так»",
          "Конструктивное решение конфликтов",
          "Признание ошибок самими родителями",
        ],
      },
      {
        num: "03",
        icon: "BookOpen",
        title: "Развитие эмоционального интеллекта",
        color: "rose",
        items: [
          "Учите называть и принимать свои чувства",
          "Моделируйте здоровое выражение эмоций",
          "Техники дыхания и релаксации",
          "Творчество и спорт как выход для стресса",
        ],
      },
      {
        num: "04",
        icon: "Network",
        title: "Социальные связи и ресурсы",
        color: "purple",
        items: [
          "Поддерживайте дружеские связи подростка",
          "Создайте круг доверенных взрослых вокруг ребёнка",
          "Поощряйте участие в кружках и секциях",
          "Волонтёрство и помощь другим укрепляют самооценку",
        ],
      },
    ],
  },
  {
    id: 8,
    tag: "Цифровая безопасность",
    title: "Профилактика в цифровой среде",
    type: "digital",
    steps: [
      { icon: "Search", title: "Знайте цифровую жизнь ребёнка", desc: "Интересуйтесь, какие приложения, каналы и сообщества посещает подросток. Не через слежку, а через живой разговор." },
      { icon: "Shield", title: "Установите совместные правила", desc: "Обсудите и зафиксируйте правила использования интернета — время, типы контента, открытость общения." },
      { icon: "MessageSquare", title: "Обсуждайте контент вместе", desc: "Когда ребёнок видит пугающее или деструктивное — он должен знать, что может прийти к вам." },
      { icon: "Lock", title: "Используйте родительский контроль", desc: "Для младших подростков — ограничения по контенту и времени. Для старших — договорённости вместо запретов." },
    ],
    signs: [
      "Подписки на паблики с темами боли, смерти, самоповреждения",
      "Резкое изменение онлайн-активности",
      "Скрытность в телефоне, смена паролей",
      "Тёмные аватары, депрессивные статусы",
    ],
  },
  {
    id: 9,
    tag: "Кризис",
    title: "Что делать, если вы обнаружили признаки",
    type: "crisis",
    steps: [
      { step: 1, icon: "Hand", color: "blue", title: "Сохраняйте спокойствие", desc: "Ваша реакция определяет, откроется ли ребёнок. Не кричите, не паникуйте, не угрожайте наказанием — даже если внутри страшно." },
      { step: 2, icon: "MessageCircleHeart", color: "green", title: "Поговорите открыто", desc: "Спросите напрямую: «Я вижу, что тебе очень плохо. Ты причиняешь себе вред?» Прямой разговор снижает риск, а не провоцирует его." },
      { step: 3, icon: "HeartHandshake", color: "rose", title: "Слушайте без осуждения", desc: "Скажите: «Я здесь, я тебя люблю, мы вместе разберёмся». Не пытайтесь сразу решить проблему — сначала быть рядом." },
      { step: 4, icon: "UserCheck", color: "purple", title: "Обратитесь к специалисту", desc: "Немедленно свяжитесь с детским психологом или психиатром. Это не слабость — это самое ответственное решение родителя." },
    ],
    dont: [
      "Не игнорируйте и не преуменьшайте",
      "Не обещайте молчать",
      "Не стыдите и не обвиняйте",
      "Не оставляйте в одиночестве в кризис",
    ],
  },
  {
    id: 10,
    tag: "Помощь",
    title: "Куда обратиться за помощью",
    type: "resources",
    urgent: "При непосредственной угрозе жизни — немедленно вызывайте скорую помощь: 103",
    hotlines: [
      { name: "Телефон доверия для детей и подростков", number: "8-800-2000-122", note: "бесплатно, круглосуточно" },
      { name: "Экстренная психологическая помощь", number: "8-499-216-50-50", note: "Москва, бесплатно" },
      { name: "Единый телефон доверия", number: "8-800-2000-345", note: "бесплатно" },
    ],
    specialists: [
      { icon: "UserCheck", title: "Детский психолог / психиатр", desc: "Обратитесь в поликлинику или частную клинику" },
      { icon: "School", title: "Школьный психолог", desc: "Первый доступный шаг помощи" },
      { icon: "Building2", title: "ППМС-центры", desc: "Бесплатная психолого-педагогическая помощь" },
      { icon: "Globe", title: "Онлайн-психологи", desc: "pomoschryadom.ru — помощь онлайн" },
    ],
  },
  {
    id: 11,
    tag: "Итог",
    title: "Главное — вы не одни",
    type: "closing",
    messages: [
      { icon: "Eye", text: "Будьте внимательны к любым изменениям в поведении подростка" },
      { icon: "MessageCircleHeart", text: "Создавайте безопасное пространство для открытого разговора" },
      { icon: "Heart", text: "Принимайте чувства ребёнка, не обесценивая и не осуждая их" },
      { icon: "Shield", text: "Снижайте стресс и давление в семейной среде" },
      { icon: "UserCheck", text: "Не бойтесь обращаться к специалистам — это сила, не слабость" },
      { icon: "HeartHandshake", text: "Ваша безусловная любовь — самый мощный защитный фактор" },
    ],
    footer: "Любовь, принятие и открытый диалог — это самая эффективная профилактика аутоагрессии.",
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  red: { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", dot: "bg-red-400" },
  orange: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700", dot: "bg-orange-400" },
  amber: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", dot: "bg-amber-400" },
  blue: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", dot: "bg-blue-400" },
  green: { bg: "bg-green-50", border: "border-green-200", text: "text-green-700", dot: "bg-green-400" },
  rose: { bg: "bg-rose-50", border: "border-rose-200", text: "text-rose-700", dot: "bg-rose-400" },
  purple: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700", dot: "bg-purple-400" },
};

const iconColor: Record<string, string> = {
  red: "text-red-500", orange: "text-orange-500", amber: "text-amber-500",
  blue: "text-blue-500", green: "text-green-500", rose: "text-rose-500", purple: "text-purple-500",
};

export default function Index() {
  const [current, setCurrent] = useState(0);
  const slide: SlideData = slides[current];
  const total = slides.length;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
          <Icon name="BookOpen" size={16} className="text-blue-500" />
          <span className="hidden sm:inline">Профилактика аутоагрессивного поведения подростков</span>
          <span className="sm:hidden">Профилактика аутоагрессии</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
            {current + 1} / {total}
          </span>
        </div>
      </header>

      {/* Progress */}
      <div className="h-1 bg-slate-200">
        <div
          className="h-full bg-blue-500 transition-all duration-400"
          style={{ width: `${((current + 1) / total) * 100}%` }}
        />
      </div>

      {/* Slide */}
      <main className="flex-1 flex items-start justify-center px-4 py-8 overflow-auto">
        <div className="w-full max-w-4xl">

          {/* HERO */}
          {slide.type === "hero" && (
            <div className="min-h-[520px] bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 rounded-2xl p-10 md:p-14 flex flex-col justify-between text-white shadow-xl">
              <div>
                <span className="inline-block bg-white/15 text-blue-100 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-8 border border-white/20">
                  Для родителей и педагогов
                </span>
                <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5">{slide.title}</h1>
                <p className="text-blue-200 text-xl mb-3">{slide.subtitle}</p>
                <div className="flex items-center gap-3 mt-8">
                  <div className="w-10 h-px bg-blue-400" />
                  <span className="text-blue-300 text-sm tracking-widest uppercase">Комплексный подход</span>
                  <div className="w-10 h-px bg-blue-400" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-blue-300 text-sm mt-8">
                <Icon name="ChevronRight" size={16} />
                <span>Нажмите «Далее» для начала</span>
              </div>
            </div>
          )}

          {/* DEFINITION */}
          {slide.type === "definition" && (
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-slate-100">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">{slide.title}</h2>
              <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-5 mb-8">
                <p className="text-slate-700 text-base leading-relaxed">{slide.definition}</p>
              </div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Формы проявления</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {slide.forms?.map((f: FormItem, i: number) => (
                  <div key={i} className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100 hover:border-blue-200 transition-colors">
                    <Icon name={f.icon} size={26} className="text-blue-500 mx-auto mb-2" />
                    <div className="font-semibold text-slate-700 text-sm mb-1">{f.label}</div>
                    <div className="text-slate-500 text-xs leading-snug">{f.desc}</div>
                  </div>
                ))}
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                <Icon name="Info" size={18} className="text-amber-500 mt-0.5 shrink-0" />
                <p className="text-amber-800 text-sm leading-relaxed">{slide.note}</p>
              </div>
            </div>
          )}

          {/* STATS */}
          {slide.type === "stats" && (
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-slate-100">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8">{slide.title}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {slide.stats?.map((s: StatItem, i: number) => {
                  const c = colorMap[s.color];
                  return (
                    <div key={i} className={`rounded-xl p-5 border text-center ${c.bg} ${c.border}`}>
                      <div className={`text-2xl font-bold mb-2 ${c.text}`}>{s.value}</div>
                      <div className={`text-xs leading-snug ${c.text} opacity-80`}>{s.label}</div>
                    </div>
                  );
                })}
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex gap-3">
                <Icon name="AlertTriangle" size={20} className="text-slate-500 mt-0.5 shrink-0" />
                <p className="text-slate-700 text-sm leading-relaxed">{slide.message}</p>
              </div>
            </div>
          )}

          {/* CAUSES */}
          {slide.type === "causes" && (
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-slate-100">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">{slide.title}</h2>
              <p className="text-slate-500 text-sm italic mb-6">{slide.intro}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {slide.categories?.map((cat: CategoryItem, i: number) => {
                  const c = colorMap[cat.color];
                  return (
                    <div key={i} className={`rounded-xl p-5 border ${c.bg} ${c.border}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <Icon name={cat.icon} size={18} className={iconColor[cat.color]} />
                        <h3 className={`font-semibold text-sm ${c.text}`}>{cat.title}</h3>
                      </div>
                      <ul className="space-y-1.5">
                        {cat.items.map((item: string, j: number) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${c.dot}`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* WARNING */}
          {slide.type === "warning" && (
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-slate-100">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">{slide.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {slide.groups?.map((g: GroupItem, i: number) => {
                  const c = colorMap[g.color];
                  return (
                    <div key={i} className={`rounded-xl p-5 border ${c.bg} ${c.border}`}>
                      <div className={`flex items-center gap-2 mb-3 ${c.text}`}>
                        <Icon name={g.icon} size={18} />
                        <h3 className="font-semibold text-sm">{g.label}</h3>
                      </div>
                      <ul className="space-y-2">
                        {g.signs.map((s: string, j: number) => (
                          <li key={j} className={`flex items-start gap-2 text-sm ${c.text} opacity-90`}>
                            <Icon name="ChevronRight" size={13} className="mt-0.5 shrink-0" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* COMMUNICATION */}
          {slide.type === "communication" && (
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-slate-100">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">{slide.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-xl p-6 bg-green-50 border border-green-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Icon name="CheckCircle" size={20} className="text-green-600" />
                    <h3 className="font-bold text-green-700">Делайте</h3>
                  </div>
                  <ul className="space-y-3">
                    {slide.dos?.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                        <Icon name="Check" size={14} className="text-green-500 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl p-6 bg-red-50 border border-red-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Icon name="XCircle" size={20} className="text-red-600" />
                    <h3 className="font-bold text-red-700">Не делайте</h3>
                  </div>
                  <ul className="space-y-3">
                    {slide.donts?.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                        <Icon name="X" size={14} className="text-red-500 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* PREVENTION */}
          {slide.type === "prevention" && (
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-slate-100">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">{slide.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {slide.pillars?.map((p: PillarItem, i: number) => {
                  const c = colorMap[p.color];
                  return (
                    <div key={i} className={`rounded-xl p-5 border ${c.bg} ${c.border}`}>
                      <div className="flex items-start gap-3 mb-4">
                        <span className="text-3xl font-bold text-slate-200 leading-none select-none">{p.num}</span>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <Icon name={p.icon} size={16} className={iconColor[p.color]} />
                            <h3 className={`font-semibold text-sm ${c.text}`}>{p.title}</h3>
                          </div>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {p.items.map((item: string, j: number) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                            <Icon name="Check" size={13} className={`${iconColor[p.color]} mt-0.5 shrink-0`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* DIGITAL */}
          {slide.type === "digital" && (
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-slate-100">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">{slide.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {slide.steps?.map((s: StepItem, i: number) => (
                  <div key={i} className="flex gap-4 bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                      <Icon name={s.icon} size={17} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-700 text-sm mb-1">{s.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="AlertTriangle" size={16} className="text-orange-500" />
                  <h3 className="font-semibold text-orange-700 text-sm">Цифровые сигналы тревоги</h3>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {slide.signs?.map((s: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-orange-800">
                      <Icon name="ChevronRight" size={13} className="text-orange-400 mt-0.5 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* CRISIS */}
          {slide.type === "crisis" && (
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-slate-100">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">{slide.title}</h2>
              <div className="space-y-3 mb-6">
                {slide.steps?.map((s: StepItem, i: number) => {
                  const c = colorMap[s.color ?? ""];
                  return (
                    <div key={i} className={`flex gap-4 rounded-xl p-4 border ${c.bg} ${c.border}`}>
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border-2 bg-white ${c.border}`}>
                        <span className={`font-bold text-sm ${c.text}`}>{s.step}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Icon name={s.icon} size={15} className={iconColor[s.color]} />
                          <h3 className={`font-semibold text-sm ${c.text}`}>{s.title}</h3>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="XCircle" size={16} className="text-red-500" />
                  <h3 className="font-semibold text-red-700 text-sm">Чего категорически НЕ делать</h3>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {slide.dont?.map((d: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-red-700">
                      <Icon name="X" size={13} className="text-red-400 mt-0.5 shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* RESOURCES */}
          {slide.type === "resources" && (
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-slate-100">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">{slide.title}</h2>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3 mb-6">
                <Icon name="AlertTriangle" size={18} className="text-red-500 shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm font-medium">{slide.urgent}</p>
              </div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Icon name="Phone" size={14} /> Телефоны доверия
              </h3>
              <div className="space-y-3 mb-6">
                {slide.hotlines?.map((h: HotlineItem, i: number) => (
                  <div key={i} className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl p-4">
                    <div>
                      <div className="font-semibold text-slate-700 text-sm">{h.name}</div>
                      <div className="text-xs text-slate-500">{h.note}</div>
                    </div>
                    <div className="font-bold text-green-700 text-base whitespace-nowrap">{h.number}</div>
                  </div>
                ))}
              </div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Icon name="Users" size={14} /> Специалисты
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {slide.specialists?.map((sp: SpecialistItem, i: number) => (
                  <div key={i} className="flex gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4">
                    <Icon name={sp.icon} size={18} className="text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-700 text-sm">{sp.title}</div>
                      <div className="text-xs text-slate-500">{sp.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CLOSING */}
          {slide.type === "closing" && (
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 md:p-12 text-white shadow-xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-8">{slide.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {slide.messages?.map((m: MessageItem, i: number) => (
                  <div key={i} className="flex items-start gap-3 bg-white/10 rounded-xl p-4 hover:bg-white/15 transition-colors">
                    <Icon name={m.icon} size={18} className="text-blue-300 shrink-0 mt-0.5" />
                    <span className="text-slate-200 text-sm leading-relaxed">{m.text}</span>
                  </div>
                ))}
              </div>
              <div className="bg-blue-600/30 border border-blue-400/30 rounded-xl p-6 text-center">
                <Icon name="Heart" size={28} className="text-blue-300 mx-auto mb-3" />
                <p className="text-white font-semibold text-base leading-relaxed">{slide.footer}</p>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="bg-white border-t border-slate-200 px-6 py-4 sticky bottom-0">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <Icon name="ChevronLeft" size={16} />
            Назад
          </button>

          <div className="flex gap-1.5 flex-wrap justify-center">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-200 ${i === current ? "bg-blue-500 w-6" : "bg-slate-300 hover:bg-slate-400 w-2"}`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrent((c) => Math.min(total - 1, c + 1))}
            disabled={current === total - 1}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Далее
            <Icon name="ChevronRight" size={16} />
          </button>
        </div>
      </footer>
    </div>
  );
}