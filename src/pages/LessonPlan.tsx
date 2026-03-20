import { useState } from "react";
import Icon from "@/components/ui/icon";

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface LessonStage {
  id: number;
  time: string;
  duration: string;
  name: string;
  nameEn: string;
  type: "org" | "warmup" | "main" | "game" | "practice" | "reflection" | "homework";
  teacher: string[];
  students: string[];
  method: string;
  materials?: string;
  note?: string;
  gameBlock?: GameBlock;
}

interface GameBlock {
  title: string;
  description: string;
  rules: string[];
  example?: string;
  tip?: string;
}

// ─── PALETTE ─────────────────────────────────────────────────────────────────

const TYPE_META: Record<string, { label: string; bg: string; border: string; text: string; dot: string; icon: string }> = {
  org:        { label: "Орг. момент",      bg: "bg-slate-50",   border: "border-slate-300", text: "text-slate-600",  dot: "bg-slate-400",   icon: "BookOpen" },
  warmup:     { label: "Речевая разминка", bg: "bg-orange-50",  border: "border-orange-300", text: "text-orange-700", dot: "bg-orange-400",  icon: "Flame" },
  main:       { label: "Введение темы",    bg: "bg-blue-50",    border: "border-blue-300",   text: "text-blue-700",   dot: "bg-blue-500",    icon: "Lightbulb" },
  game:       { label: "Игровой элемент",  bg: "bg-purple-50",  border: "border-purple-300", text: "text-purple-700", dot: "bg-purple-500",  icon: "Gamepad2" },
  practice:   { label: "Практика",         bg: "bg-green-50",   border: "border-green-300",  text: "text-green-700",  dot: "bg-green-500",   icon: "PenLine" },
  reflection: { label: "Рефлексия",        bg: "bg-pink-50",    border: "border-pink-300",   text: "text-pink-700",   dot: "bg-pink-400",    icon: "Heart" },
  homework:   { label: "Домашнее задание", bg: "bg-amber-50",   border: "border-amber-300",  text: "text-amber-700",  dot: "bg-amber-400",   icon: "Home" },
};

// ─── DATA ─────────────────────────────────────────────────────────────────────

const LESSON_META = {
  subject: "Английский язык",
  grade: "5 класс",
  topic: "My favourite season",
  topicRu: "Моё любимое время года",
  objectives: [
    "Ввести и закрепить лексику по теме «Seasons & Weather»",
    "Развить навык монологической речи по теме",
    "Практиковать грамматику: Present Simple для описания природы",
  ],
  upe: [
    { type: "Предметные", items: ["знают и употребляют 10 новых слов по теме", "составляют 3–4 предложения о любимом сезоне"] },
    { type: "Метапредметные", items: ["работают в парах и группах", "умеют оценивать работу одноклассников"] },
    { type: "Личностные", items: ["проявляют интерес к культуре и природе англоязычных стран"] },
  ],
  equipment: ["Интерактивная доска / проектор", "Карточки со словами (распечатать)", "Мяч (для игры «Hot potato»)", "Учебник: Spotlight 5, Unit 4"],
  duration: "45 минут",
  lessonType: "Урок открытия нового знания",
  author: "учитель английского языка",
};

const STAGES: LessonStage[] = [
  {
    id: 1,
    time: "0:00",
    duration: "3 мин",
    name: "Организационный момент",
    nameEn: "Greeting & Warm-Up",
    type: "org",
    teacher: [
      "Приветствует класс: «Good morning, everyone! How are you today?»",
      "Отмечает присутствующих, просит дежурного назвать дату и день недели.",
      "Объявляет тему урока, записывает на доске: «My favourite season».",
    ],
    students: [
      "Отвечают на приветствие: «Good morning! We are fine, thank you!»",
      "Дежурный называет дату: «Today is Monday, the 21st of March.»",
    ],
    method: "Фронтальная работа",
    materials: "Доска",
  },
  {
    id: 2,
    time: "0:03",
    duration: "5 мин",
    name: "Речевая разминка",
    nameEn: "Phonetic Warm-Up",
    type: "warmup",
    teacher: [
      "Показывает изображения четырёх сезонов, спрашивает: «What season is it?»",
      "Проводит фонетическую разминку — хором произносят слова: spring, summer, autumn, winter, sunny, rainy, cloudy, windy, hot, cold.",
      "Задаёт вопрос всему классу: «What's your favourite season? Why?» — собирает 3–4 быстрых ответа.",
    ],
    students: [
      "Называют сезоны по картинкам.",
      "Повторяют слова хором и индивидуально.",
      "Отвечают кратко: «My favourite season is summer because it's hot and sunny.»",
    ],
    method: "Хоровая и индивидуальная работа",
    materials: "Слайды / картинки на доске",
    note: "Быстрый темп! Не останавливаться на ошибках — только поправить хором.",
  },
  {
    id: 3,
    time: "0:08",
    duration: "10 мин",
    name: "Введение новой лексики",
    nameEn: "New Vocabulary",
    type: "main",
    teacher: [
      "Вводит 10 новых слов с переводом и картинками (см. таблицу ниже).",
      "Произносит каждое слово, класс повторяет. Использует жесты для закрепления.",
      "Просит учеников составить предложение с каждым словом устно.",
      "Пишет на доске: «In [season] it is [adj]. You can [verb].»",
    ],
    students: [
      "Записывают слова в словарь.",
      "Повторяют за учителем, составляют предложения.",
    ],
    method: "Объяснение + хоровое повторение",
    materials: "Карточки-слова, слайд с таблицей",
    note: "Слова: leaf, frost, sunshine, breeze, harvest, bloom, melt, fog, puddle, snowflake.",
    gameBlock: undefined,
  },
  {
    id: 4,
    time: "0:18",
    duration: "10 мин",
    name: "Игровой элемент — «Hot Potato»",
    nameEn: "Game: Hot Potato",
    type: "game",
    teacher: [
      "Объясняет правила игры.",
      "Включает музыку, пускает мяч по кругу.",
      "Останавливает музыку — ученик с мячом отвечает на вопрос с карточки.",
      "Ведёт счёт команд (можно разделить класс на 2 команды).",
    ],
    students: [
      "Передают мяч под музыку.",
      "Кто поймал мяч — отвечает на вопрос о временах года.",
      "Болельщики могут подсказать — но только по-английски!",
    ],
    method: "Игровая деятельность, работа в группах",
    materials: "Мяч, карточки с вопросами, музыкальное сопровождение",
    gameBlock: {
      title: "Hot Potato 🥔",
      description: "Класс стоит в кругу и передаёт мяч под музыку. Когда музыка останавливается — ученик с мячом достаёт карточку-вопрос и отвечает.",
      rules: [
        "Передавай мяч быстро — это «горячая картошка»!",
        "Нельзя держать мяч дольше 2 секунд.",
        "Ответил правильно — команда получает 1 очко.",
        "Если не знаешь — скажи «I need help» и другой ученик может помочь (0,5 очка).",
        "Нельзя отвечать по-русски — только по-английски!",
      ],
      example: "Вопросы на карточках: «Name 3 winter activities!», «What do you wear in autumn?», «Describe spring in 2 sentences.», «What is your favourite season? Why?»",
      tip: "Сыграйте 2–3 раунда. Победившая команда получает звёздочки на доске.",
    },
  },
  {
    id: 5,
    time: "0:28",
    duration: "8 мин",
    name: "Практика — мини-монолог",
    nameEn: "Speaking Practice",
    type: "practice",
    teacher: [
      "Раздаёт опорную схему для монолога (или пишет на доске).",
      "Показывает образец: «My favourite season is winter. In winter it is cold and snowy. I like to skate and make snowmen. Winter is magical!»",
      "Даёт 3 минуты на подготовку.",
      "Вызывает 3–4 ученика, слушает, мягко исправляет ошибки.",
    ],
    students: [
      "Готовят мини-монолог (3–5 предложений) по опорной схеме.",
      "Выступают перед классом.",
      "Оценивают друг друга по критериям: content / language / fluency (👍 / 👍👍 / 👍👍👍).",
    ],
    method: "Индивидуальная работа + взаимооценивание",
    materials: "Опорная схема на доске / раздаточный материал",
    note: "Схема монолога:\n1. My favourite season is _____.\n2. In _____ it is _____ and _____.\n3. I like to _____ in _____.\n4. _____ is my favourite because _____.",
  },
  {
    id: 6,
    time: "0:36",
    duration: "5 мин",
    name: "Рефлексия",
    nameEn: "Reflection",
    type: "reflection",
    teacher: [
      "Задаёт вопросы классу: «What new words did we learn? What was the most interesting activity?»",
      "Просит учеников оценить своё настроение на уроке с помощью «смайлов сезонов» — ☀️ отлично / 🌥 нормально / 🌧 трудно.",
      "Выставляет оценки активно работавшим ученикам, комментирует кратко.",
    ],
    students: [
      "Называют слова, которые запомнили.",
      "Показывают смайл-сезон рукой или на карточке.",
      "Слушают комментарии учителя.",
    ],
    method: "Фронтальная беседа",
    materials: "Карточки-смайлы (опционально)",
  },
  {
    id: 7,
    time: "0:41",
    duration: "4 мин",
    name: "Домашнее задание",
    nameEn: "Homework",
    type: "homework",
    teacher: [
      "Записывает домашнее задание на доске, объясняет.",
      "Прощается: «Have a great day! See you next lesson!»",
    ],
    students: [
      "Записывают домашнее задание в дневник.",
      "Прощаются: «Goodbye!»",
    ],
    method: "Инструктаж",
    note: "Д/З:\n1. Выучить 10 новых слов (словарь, стр. 48).\n2. Написать 5–6 предложений о любимом времени года.\n3. Нарисовать (по желанию) любимый сезон и подписать 5 слов.",
  },
];

const VOCAB_TABLE = [
  { word: "leaf", plural: "leaves", ru: "лист", season: "🍂 autumn" },
  { word: "frost", plural: "—", ru: "мороз", season: "❄️ winter" },
  { word: "sunshine", plural: "—", ru: "солнечный свет", season: "☀️ summer" },
  { word: "breeze", plural: "breezes", ru: "лёгкий ветерок", season: "🌸 spring" },
  { word: "harvest", plural: "—", ru: "урожай", season: "🍂 autumn" },
  { word: "bloom", plural: "blooms", ru: "цветение", season: "🌸 spring" },
  { word: "melt", plural: "—", ru: "таять", season: "🌸 spring" },
  { word: "fog", plural: "fogs", ru: "туман", season: "🍂 autumn" },
  { word: "puddle", plural: "puddles", ru: "лужа", season: "🌧 rain" },
  { word: "snowflake", plural: "snowflakes", ru: "снежинка", season: "❄️ winter" },
];

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function MetaCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 flex gap-3 items-start">
      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
        <Icon name={icon} size={15} className="text-blue-600" />
      </div>
      <div>
        <p className="text-xs text-slate-400 mb-0.5">{label}</p>
        <p className="font-semibold text-slate-700 text-sm leading-snug">{value}</p>
      </div>
    </div>
  );
}

function StageCard({ stage, isOpen, onToggle }: { stage: LessonStage; isOpen: boolean; onToggle: () => void }) {
  const meta = TYPE_META[stage.type];
  return (
    <div className={`rounded-2xl border-2 transition-all ${meta.border} ${isOpen ? meta.bg : "bg-white"} overflow-hidden`}>
      {/* HEADER */}
      <button
        onClick={onToggle}
        className="w-full text-left px-5 py-4 flex items-center gap-4 hover:opacity-80 transition-opacity"
      >
        <div className="shrink-0 flex flex-col items-center gap-1 w-12">
          <span className="text-xs font-bold text-slate-400 font-mono">{stage.time}</span>
          <div className={`w-2 h-2 rounded-full ${meta.dot}`} />
          <span className="text-xs text-slate-300">{stage.duration}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border ${meta.border} ${meta.bg} ${meta.text}`}>
              <Icon name={meta.icon} size={11} />
              {meta.label}
            </span>
          </div>
          <h3 className="font-bold text-slate-800 mt-1">{stage.name}</h3>
          <p className="text-xs text-slate-400 italic">{stage.nameEn}</p>
        </div>
        <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={18} className="text-slate-400 shrink-0" />
      </button>

      {/* BODY */}
      {isOpen && (
        <div className="px-5 pb-5 border-t border-dashed border-slate-200 pt-4 space-y-4">

          {/* GAME BLOCK */}
          {stage.gameBlock && (
            <div className="bg-purple-900 rounded-xl p-5 text-white">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🎮</span>
                <h4 className="font-bold text-lg">{stage.gameBlock.title}</h4>
              </div>
              <p className="text-purple-200 text-sm mb-4 leading-relaxed">{stage.gameBlock.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">Правила игры</p>
                  <ul className="space-y-1.5">
                    {stage.gameBlock.rules.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-purple-100">
                        <span className="text-purple-400 font-bold shrink-0">{i + 1}.</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-3">
                  {stage.gameBlock.example && (
                    <div className="bg-purple-800 rounded-lg p-3">
                      <p className="text-xs font-bold text-purple-300 mb-1">Примеры вопросов</p>
                      <p className="text-xs text-purple-200 leading-relaxed">{stage.gameBlock.example}</p>
                    </div>
                  )}
                  {stage.gameBlock.tip && (
                    <div className="bg-amber-500/20 border border-amber-400/30 rounded-lg p-3 flex gap-2">
                      <span className="text-amber-300 shrink-0">💡</span>
                      <p className="text-xs text-amber-200">{stage.gameBlock.tip}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* TEACHER */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Icon name="User" size={11} /> Действия учителя
              </p>
              <ul className="space-y-2">
                {stage.teacher.map((t, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <Icon name="ChevronRight" size={13} className="text-blue-400 mt-0.5 shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            {/* STUDENTS */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Icon name="Users" size={11} /> Деятельность учащихся
              </p>
              <ul className="space-y-2">
                {stage.students.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <Icon name="ChevronRight" size={13} className="text-green-400 mt-0.5 shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* FOOTER META */}
          <div className="flex flex-wrap gap-3 pt-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Icon name="Layers" size={12} /> <span className="font-medium">Метод:</span> {stage.method}
            </div>
            {stage.materials && (
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Icon name="Paperclip" size={12} /> <span className="font-medium">Материалы:</span> {stage.materials}
              </div>
            )}
          </div>

          {stage.note && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-2">
              <Icon name="StickyNote" size={14} className="text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800 leading-relaxed whitespace-pre-line">{stage.note}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────────

export default function LessonPlan() {
  const [openStages, setOpenStages] = useState<number[]>([1]);
  const [tab, setTab] = useState<"plan" | "vocab" | "info">("plan");

  function toggleStage(id: number) {
    setOpenStages(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  function expandAll() {
    setOpenStages(STAGES.map(s => s.id));
  }

  function collapseAll() {
    setOpenStages([]);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                <Icon name="BookOpen" size={18} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-slate-800 leading-tight">Конспект урока</p>
                <p className="text-xs text-slate-400">{LESSON_META.subject} · {LESSON_META.grade}</p>
              </div>
            </div>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded-xl transition-colors print:hidden"
            >
              <Icon name="Printer" size={15} /> Распечатать
            </button>
          </div>

          {/* TABS */}
          <div className="flex gap-1 mt-3 print:hidden">
            {([
              { id: "plan", label: "📋 Ход урока" },
              { id: "vocab", label: "📖 Словарь" },
              { id: "info", label: "ℹ️ Паспорт урока" },
            ] as const).map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`text-sm px-4 py-1.5 rounded-lg font-semibold transition-colors ${tab === t.id ? "bg-blue-600 text-white" : "text-slate-500 hover:bg-slate-100"}`}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">

        {/* HERO */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-blue-200 text-sm font-semibold uppercase tracking-wider mb-1">Тема урока</p>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">{LESSON_META.topic}</h1>
              <p className="text-blue-200 text-lg">{LESSON_META.topicRu}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="bg-white/20 backdrop-blur rounded-full px-3 py-1 text-sm font-semibold">{LESSON_META.grade}</span>
              <span className="bg-white/20 backdrop-blur rounded-full px-3 py-1 text-sm font-semibold">{LESSON_META.duration}</span>
              <span className="bg-white/20 backdrop-blur rounded-full px-3 py-1 text-sm font-semibold">{LESSON_META.lessonType}</span>
            </div>
          </div>
          <div className="flex gap-6 mt-5 pt-5 border-t border-white/20">
            {[
              { icon: "Clock", label: "Длительность", val: LESSON_META.duration },
              { icon: "Layers", label: "Этапов урока", val: `${STAGES.length}` },
              { icon: "Gamepad2", label: "Игровых блоков", val: "1" },
              { icon: "BookMarked", label: "Новых слов", val: "10" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <Icon name={s.icon} size={16} className="text-blue-300 mx-auto mb-1" />
                <p className="text-lg font-bold">{s.val}</p>
                <p className="text-xs text-blue-200">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── TAB: PLAN ─── */}
        {tab === "plan" && (
          <div className="space-y-4">
            {/* Timeline summary */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 overflow-x-auto">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Структура урока (45 мин)</p>
              <div className="flex gap-1 min-w-[400px]">
                {STAGES.map(s => {
                  const meta = TYPE_META[s.type];
                  const mins = parseInt(s.duration);
                  const pct = (mins / 45) * 100;
                  return (
                    <button key={s.id} onClick={() => { setOpenStages(p => p.includes(s.id) ? p : [...p, s.id]); }}
                      style={{ width: `${pct}%` }}
                      title={`${s.name} (${s.duration})`}
                      className={`h-10 rounded-lg border-2 ${meta.border} ${meta.bg} flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity min-w-[24px]`}>
                      <Icon name={meta.icon} size={12} className={meta.text} />
                    </button>
                  );
                })}
              </div>
              <div className="flex gap-3 flex-wrap mt-3">
                {Object.entries(TYPE_META).filter(([k]) => STAGES.some(s => s.type === k)).map(([, m]) => (
                  <div key={m.label} className="flex items-center gap-1.5 text-xs text-slate-500">
                    <div className={`w-2.5 h-2.5 rounded-full ${m.dot}`} />
                    {m.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 print:hidden">
              <button onClick={expandAll} className="text-xs text-blue-600 hover:underline">Развернуть все</button>
              <span className="text-slate-300">|</span>
              <button onClick={collapseAll} className="text-xs text-slate-400 hover:underline">Свернуть все</button>
            </div>

            {STAGES.map(s => (
              <StageCard key={s.id} stage={s} isOpen={openStages.includes(s.id)} onToggle={() => toggleStage(s.id)} />
            ))}
          </div>
        )}

        {/* ─── TAB: VOCAB ─── */}
        {tab === "vocab" && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100">
                <h2 className="font-bold text-slate-800">Новые слова урока</h2>
                <p className="text-sm text-slate-400 mt-0.5">10 слов по теме «Seasons & Weather» · Spotlight 5, Unit 4</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wider">
                      <th className="text-left px-5 py-3 font-semibold">Слово</th>
                      <th className="text-left px-5 py-3 font-semibold">Форма мн.ч.</th>
                      <th className="text-left px-5 py-3 font-semibold">Перевод</th>
                      <th className="text-left px-5 py-3 font-semibold">Сезон</th>
                    </tr>
                  </thead>
                  <tbody>
                    {VOCAB_TABLE.map((v, i) => (
                      <tr key={i} className={`border-t border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                        <td className="px-5 py-3 font-bold text-blue-700">{v.word}</td>
                        <td className="px-5 py-3 text-slate-500 italic">{v.plural}</td>
                        <td className="px-5 py-3 text-slate-700">{v.ru}</td>
                        <td className="px-5 py-3 text-slate-500">{v.season}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Опорная схема монолога */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
              <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Icon name="AlignLeft" size={16} className="text-blue-500" /> Опорная схема монолога
              </h2>
              <div className="space-y-2">
                {[
                  { n: 1, template: "My favourite season is _____.", hint: "winter / spring / summer / autumn" },
                  { n: 2, template: "In _____ it is _____ and _____.", hint: "season + 2 прилагательных" },
                  { n: 3, template: "I like to _____ in _____.", hint: "skate, swim, read, walk…" },
                  { n: 4, template: "_____ is my favourite because _____.", hint: "причина на английском" },
                  { n: 5, template: "The weather in _____ is usually _____.", hint: "описание погоды" },
                ].map(r => (
                  <div key={r.n} className="flex gap-4 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                    <span className="text-blue-300 font-bold w-5 shrink-0">{r.n}.</span>
                    <div>
                      <p className="font-semibold text-slate-700">{r.template}</p>
                      <p className="text-xs text-slate-400 mt-0.5">Подсказка: {r.hint}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Карточки вопросов для игры */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
              <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Icon name="Gamepad2" size={16} className="text-purple-500" /> Карточки вопросов для «Hot Potato»
              </h2>
              <p className="text-xs text-slate-400 mb-4">Распечатайте и разрежьте — по одному вопросу на карточку.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Name 3 winter activities!",
                  "What do you wear in autumn?",
                  "Describe spring in 2 sentences.",
                  "What is your favourite season? Why?",
                  "What's the weather like in summer?",
                  "Name 2 words connected with winter.",
                  "What can you see in autumn in the park?",
                  "Translate: «мороз», «снежинка», «лужа».",
                  "Make a sentence with the word «sunshine».",
                  "What do people harvest in autumn?",
                  "What animals sleep in winter?",
                  "Describe today's weather in English.",
                ].map((q, i) => (
                  <div key={i} className="border-2 border-dashed border-purple-200 bg-purple-50 rounded-xl p-3 text-sm font-semibold text-purple-800 text-center">
                    {q}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB: INFO ─── */}
        {tab === "info" && (
          <div className="space-y-4">
            {/* Meta grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <MetaCard icon="BookOpen" label="Предмет" value={LESSON_META.subject} />
              <MetaCard icon="GraduationCap" label="Класс" value={LESSON_META.grade} />
              <MetaCard icon="Clock" label="Продолжительность" value={LESSON_META.duration} />
              <MetaCard icon="Tag" label="Тип урока" value={LESSON_META.lessonType} />
              <MetaCard icon="BookMarked" label="Учебник" value="Spotlight 5, Unit 4" />
              <MetaCard icon="User" label="Учитель" value={LESSON_META.author} />
            </div>

            {/* Цели */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
              <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Icon name="Target" size={16} className="text-blue-500" /> Цели и задачи урока
              </h2>
              <ul className="space-y-2">
                {LESSON_META.objectives.map((o, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                    <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-blue-600 font-bold text-xs">{i + 1}</span>
                    </div>
                    {o}
                  </li>
                ))}
              </ul>
            </div>

            {/* УУД */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
              <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Icon name="Award" size={16} className="text-green-500" /> Планируемые результаты (УУД)
              </h2>
              <div className="space-y-4">
                {LESSON_META.upe.map((u, i) => (
                  <div key={i}>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">{u.type}</p>
                    <ul className="space-y-1.5">
                      {u.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-slate-700">
                          <Icon name="Check" size={13} className="text-green-500 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Оборудование */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
              <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Icon name="Package" size={16} className="text-amber-500" /> Оборудование и материалы
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {LESSON_META.equipment.map((e, i) => (
                  <div key={i} className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-xl px-4 py-2.5 text-sm text-amber-800">
                    <Icon name="CheckSquare" size={14} className="text-amber-400 shrink-0" />
                    {e}
                  </div>
                ))}
              </div>
            </div>

            {/* Технологическая карта (сводная таблица) */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100">
                <h2 className="font-bold text-slate-800">Технологическая карта урока</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 uppercase tracking-wider">
                      <th className="text-left px-4 py-3 font-semibold">Этап</th>
                      <th className="text-left px-4 py-3 font-semibold">Время</th>
                      <th className="text-left px-4 py-3 font-semibold">Длительность</th>
                      <th className="text-left px-4 py-3 font-semibold">Метод</th>
                    </tr>
                  </thead>
                  <tbody>
                    {STAGES.map((s, i) => {
                      const meta = TYPE_META[s.type];
                      return (
                        <tr key={s.id} className={`border-t border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full shrink-0 ${meta.dot}`} />
                              <span className="font-semibold text-slate-700">{s.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-slate-500 font-mono">{s.time}</td>
                          <td className="px-4 py-3 text-slate-500">{s.duration}</td>
                          <td className="px-4 py-3 text-slate-500">{s.method}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      <style>{`
        @media print {
          header { position: static !important; }
          .print\\:hidden { display: none !important; }
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
