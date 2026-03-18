import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const slides = [
  {
    id: 1,
    tag: "Введение",
    title: "Аутоагрессивное поведение подростков",
    subtitle: "Что важно знать каждому родителю",
    type: "hero",
    content: null,
  },
  {
    id: 2,
    tag: "Понимание",
    title: "Что такое аутоагрессия?",
    type: "definition",
    content: {
      definition:
        "Аутоагрессия — это направленные против себя действия, мысли или слова, которые причиняют физический или психологический вред самому подростку.",
      items: [
        {
          icon: "Scissors",
          label: "Самоповреждение",
          desc: "порезы, царапины, ожоги",
        },
        {
          icon: "Brain",
          label: "Самокритика",
          desc: "постоянное самообвинение и унижение себя",
        },
        {
          icon: "AlertTriangle",
          label: "Рискованное поведение",
          desc: "намеренное создание опасных ситуаций",
        },
        {
          icon: "Moon",
          label: "Отказ от заботы о себе",
          desc: "намеренное пренебрежение едой, сном",
        },
      ],
    },
  },
  {
    id: 3,
    tag: "Сигналы",
    title: "Признаки, которые нельзя игнорировать",
    type: "warning",
    content: {
      groups: [
        {
          label: "Физические признаки",
          color: "red",
          signs: [
            "Необъяснимые порезы, синяки или ожоги на теле",
            "Одежда с длинными рукавами даже в жару",
            "Частые «случайные» травмы",
          ],
        },
        {
          label: "Эмоциональные признаки",
          color: "amber",
          signs: [
            "Резкие перепады настроения, замкнутость",
            "Разговоры о бессмысленности жизни",
            "Раздача личных вещей",
          ],
        },
        {
          label: "Поведенческие признаки",
          color: "blue",
          signs: [
            "Уход из привычных компаний и увлечений",
            "Снижение успеваемости, пропуски",
            "Интерес к темам смерти и самоповреждений",
          ],
        },
      ],
    },
  },
  {
    id: 4,
    tag: "Причины",
    title: "Почему это происходит?",
    type: "causes",
    content: {
      intro:
        "Аутоагрессия — это не «блажь» и не желание привлечь внимание. Это способ справиться с невыносимой болью.",
      causes: [
        {
          icon: "HeartCrack",
          title: "Эмоциональная боль",
          desc: "Физическая боль отвлекает от невыносимой психологической — это временное «облегчение»",
        },
        {
          icon: "Users",
          title: "Конфликты в семье",
          desc: "Напряжённая атмосфера дома, развод, насилие, гиперконтроль или безразличие",
        },
        {
          icon: "GraduationCap",
          title: "Давление и стресс",
          desc: "Академические требования, буллинг, давление сверстников, соцсети",
        },
        {
          icon: "Puzzle",
          title: "Отсутствие навыков",
          desc: "Подросток не знает, как справляться со стрессом и выражать эмоции конструктивно",
        },
        {
          icon: "Zap",
          title: "Психические расстройства",
          desc: "Депрессия, тревожные расстройства, ПТСР требуют профессиональной помощи",
        },
        {
          icon: "Smartphone",
          title: "Влияние среды",
          desc: "Контент в интернете, «группы смерти», деструктивные сообщества",
        },
      ],
    },
  },
  {
    id: 5,
    tag: "Общение",
    title: "Как говорить с подростком",
    type: "communication",
    content: {
      dos: [
        "Слушайте без осуждения и советов — просто будьте рядом",
        "Спрашивайте прямо: «Ты думаешь о том, чтобы причинить себе вред?»",
        "Признавайте его чувства: «Я понимаю, тебе сейчас очень тяжело»",
        "Выражайте безусловную любовь независимо от ситуации",
        "Сохраняйте спокойствие — ваша паника усугубит ситуацию",
      ],
      donts: [
        "Не игнорируйте и не обесценивайте: «Ты придумываешь»",
        "Не угрожайте и не шантажируйте: «Пожалеешь об этом»",
        "Не обвиняйте: «Ты делаешь это назло мне»",
        "Не заставляйте немедленно «взять себя в руки»",
        "Не оставляйте наедине с проблемой после разговора",
      ],
    },
  },
  {
    id: 6,
    tag: "Профилактика",
    title: "Комплексные меры профилактики",
    type: "prevention",
    content: {
      pillars: [
        {
          num: "01",
          title: "Безопасная атмосфера дома",
          items: [
            "Регулярные семейные разговоры без телефонов",
            "Уважение к личным границам подростка",
            "Конструктивное разрешение конфликтов",
            "Признание достижений и поддержка при неудачах",
          ],
        },
        {
          num: "02",
          title: "Эмоциональный интеллект",
          items: [
            "Учите называть и принимать свои чувства",
            "Моделируйте здоровое выражение эмоций сами",
            "Разбирайте трудные ситуации вместе без обвинений",
            "Поддерживайте интерес к творчеству и спорту",
          ],
        },
        {
          num: "03",
          title: "Цифровая безопасность",
          items: [
            "Знайте, какие сообщества посещает ребёнок",
            "Установите совместные правила пользования интернетом",
            "Обсуждайте увиденный в сети контент",
            "Используйте родительский контроль для младших подростков",
          ],
        },
        {
          num: "04",
          title: "Социальная поддержка",
          items: [
            "Поддерживайте дружеские связи подростка",
            "Участвуйте в жизни школы, знайте классного руководителя",
            "Создайте сеть доверенных взрослых вокруг ребёнка",
            "Поощряйте участие в кружках и секциях",
          ],
        },
      ],
    },
  },
  {
    id: 7,
    tag: "Помощь",
    title: "Куда обратиться за помощью",
    type: "help",
    content: {
      urgent:
        "При непосредственной угрозе жизни — немедленно вызовите скорую помощь: 103",
      resources: [
        {
          icon: "Phone",
          title: "Телефон доверия для детей",
          detail: "8-800-2000-122 (бесплатно, круглосуточно)",
          tag: "Срочная помощь",
        },
        {
          icon: "UserCheck",
          title: "Детский психолог / психиатр",
          detail: "Обратитесь в поликлинику по месту жительства или в частную клинику",
          tag: "Специалист",
        },
        {
          icon: "School",
          title: "Школьный психолог",
          detail: "Первый шаг — поговорить со специалистом в школе",
          tag: "Доступно",
        },
        {
          icon: "Building2",
          title: "ППМС-центры",
          detail: "Психолого-педагогическая и медико-социальная помощь — бесплатно",
          tag: "Бесплатно",
        },
      ],
    },
  },
  {
    id: 8,
    tag: "Итог",
    title: "Главное — вы не одни",
    type: "closing",
    content: {
      messages: [
        {
          icon: "Heart",
          text: "Вовремя замеченная проблема — это уже половина решения",
        },
        {
          icon: "Shield",
          text: "Ваша любовь и поддержка — самый мощный защитный фактор",
        },
        {
          icon: "Handshake",
          text: "Профессиональная помощь — это сила, а не слабость",
        },
        {
          icon: "Sun",
          text: "С правильной поддержкой подростки преодолевают кризис",
        },
      ],
      footer:
        "Помните: обращение за помощью — это самое мужественное решение, которое вы можете принять для своего ребёнка.",
    },
  },
];

const SlideHero = ({ slide }: { slide: (typeof slides)[0] }) => (
  <div className="flex flex-col items-center justify-center h-full text-center px-8 relative">
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-5"
        style={{ background: "var(--accent)", filter: "blur(80px)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-5"
        style={{ background: "var(--accent)", filter: "blur(60px)" }}
      />
    </div>
    <div className="relative z-10 max-w-3xl">
      <div
        className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-8"
        style={{
          background: "rgba(56,178,172,0.15)",
          color: "var(--accent)",
          border: "1px solid rgba(56,178,172,0.3)",
        }}
      >
        Для родителей
      </div>
      <h1 className="font-display text-5xl md:text-6xl font-bold leading-tight mb-6" style={{ color: "var(--text-primary)" }}>
        {slide.title}
      </h1>
      <p className="text-xl md:text-2xl font-light" style={{ color: "var(--text-secondary)" }}>
        {slide.subtitle}
      </p>
      <div className="mt-12 flex items-center justify-center gap-3">
        <div className="w-12 h-0.5" style={{ background: "var(--accent)" }} />
        <span className="text-sm tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
          Комплексный подход
        </span>
        <div className="w-12 h-0.5" style={{ background: "var(--accent)" }} />
      </div>
    </div>
  </div>
);

const SlideDefinition = ({ slide }: { slide: (typeof slides)[0] }) => (
  <div className="flex flex-col h-full px-8 py-6 overflow-y-auto">
    <h2 className="font-display text-3xl md:text-4xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
      {slide.title}
    </h2>
    <div
      className="rounded-2xl p-6 mb-8 text-lg leading-relaxed border-l-4"
      style={{
        background: "var(--card-bg)",
        borderLeftColor: "var(--accent)",
        color: "var(--text-secondary)",
      }}
    >
      {slide.content?.definition}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {slide.content?.items?.map((item, i) => (
        <div
          key={i}
          className="flex items-start gap-4 p-5 rounded-xl"
          style={{ background: "var(--card-bg)" }}
        >
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(56,178,172,0.15)" }}
          >
            <Icon name={item.icon} size={18} style={{ color: "var(--accent)" }} />
          </div>
          <div>
            <p className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
              {item.label}
            </p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const colorMap: Record<string, string> = {
  red: "rgba(239,68,68,0.12)",
  amber: "rgba(245,158,11,0.12)",
  blue: "rgba(59,130,246,0.12)",
};
const borderMap: Record<string, string> = {
  red: "#ef4444",
  amber: "#f59e0b",
  blue: "#3b82f6",
};

const SlideWarning = ({ slide }: { slide: (typeof slides)[0] }) => (
  <div className="flex flex-col h-full px-8 py-6 overflow-y-auto">
    <h2 className="font-display text-3xl md:text-4xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
      {slide.title}
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 flex-1">
      {slide.content?.groups?.map((group, i) => (
        <div
          key={i}
          className="rounded-2xl p-5"
          style={{
            background: colorMap[group.color] || "var(--card-bg)",
            border: `1px solid ${borderMap[group.color] || "var(--border)"}`,
          }}
        >
          <h3
            className="font-bold text-base mb-4 pb-3 border-b"
            style={{
              color: borderMap[group.color],
              borderColor: `${borderMap[group.color]}40`,
            }}
          >
            {group.label}
          </h3>
          <ul className="space-y-3">
            {group.signs.map((sign, j) => (
              <li key={j} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: borderMap[group.color] }} />
                {sign}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

const SlideCauses = ({ slide }: { slide: (typeof slides)[0] }) => (
  <div className="flex flex-col h-full px-8 py-6 overflow-y-auto">
    <h2 className="font-display text-3xl md:text-4xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
      {slide.title}
    </h2>
    <p className="text-base mb-6 italic" style={{ color: "var(--accent)" }}>
      {slide.content?.intro}
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {slide.content?.causes?.map((cause, i) => (
        <div key={i} className="p-5 rounded-xl" style={{ background: "var(--card-bg)" }}>
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
            style={{ background: "rgba(56,178,172,0.15)" }}
          >
            <Icon name={cause.icon} size={18} style={{ color: "var(--accent)" }} />
          </div>
          <h3 className="font-semibold mb-2 text-sm" style={{ color: "var(--text-primary)" }}>
            {cause.title}
          </h3>
          <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
            {cause.desc}
          </p>
        </div>
      ))}
    </div>
  </div>
);

const SlideCommunication = ({ slide }: { slide: (typeof slides)[0] }) => (
  <div className="flex flex-col h-full px-8 py-6 overflow-y-auto">
    <h2 className="font-display text-3xl md:text-4xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
      {slide.title}
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
      <div className="rounded-2xl p-6" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)" }}>
        <div className="flex items-center gap-2 mb-4">
          <Icon name="CheckCircle" size={20} style={{ color: "#10b981" }} />
          <h3 className="font-bold text-base" style={{ color: "#10b981" }}>Делайте</h3>
        </div>
        <ul className="space-y-3">
          {slide.content?.dos?.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#10b981" }} />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl p-6" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)" }}>
        <div className="flex items-center gap-2 mb-4">
          <Icon name="XCircle" size={20} style={{ color: "#ef4444" }} />
          <h3 className="font-bold text-base" style={{ color: "#ef4444" }}>Не делайте</h3>
        </div>
        <ul className="space-y-3">
          {slide.content?.donts?.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#ef4444" }} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const SlidePrevention = ({ slide }: { slide: (typeof slides)[0] }) => (
  <div className="flex flex-col h-full px-8 py-6 overflow-y-auto">
    <h2 className="font-display text-3xl md:text-4xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
      {slide.title}
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {slide.content?.pillars?.map((pillar, i) => (
        <div key={i} className="p-5 rounded-xl" style={{ background: "var(--card-bg)" }}>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-display text-2xl font-black" style={{ color: "var(--accent)", opacity: 0.5 }}>
              {pillar.num}
            </span>
            <h3 className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
              {pillar.title}
            </h3>
          </div>
          <ul className="space-y-2">
            {pillar.items.map((item, j) => (
              <li key={j} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--accent)" }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

const SlideHelp = ({ slide }: { slide: (typeof slides)[0] }) => (
  <div className="flex flex-col h-full px-8 py-6 overflow-y-auto">
    <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
      {slide.title}
    </h2>
    <div
      className="flex items-center gap-3 rounded-xl px-5 py-4 mb-6"
      style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.4)" }}
    >
      <Icon name="AlertCircle" size={20} style={{ color: "#ef4444", flexShrink: 0 }} />
      <p className="text-sm font-semibold" style={{ color: "#ef4444" }}>
        {slide.content?.urgent}
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {slide.content?.resources?.map((res, i) => (
        <div key={i} className="flex items-start gap-4 p-5 rounded-xl" style={{ background: "var(--card-bg)" }}>
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(56,178,172,0.15)" }}
          >
            <Icon name={res.icon} size={18} style={{ color: "var(--accent)" }} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
                {res.title}
              </p>
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: "rgba(56,178,172,0.15)", color: "var(--accent)" }}
              >
                {res.tag}
              </span>
            </div>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              {res.detail}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SlideClosing = ({ slide }: { slide: (typeof slides)[0] }) => (
  <div className="flex flex-col items-center justify-center h-full px-8 text-center">
    <h2 className="font-display text-4xl md:text-5xl font-bold mb-10" style={{ color: "var(--text-primary)" }}>
      {slide.title}
    </h2>
    <div className="grid grid-cols-2 gap-4 mb-10 max-w-2xl w-full">
      {slide.content?.messages?.map((msg, i) => (
        <div
          key={i}
          className="flex flex-col items-center gap-3 p-5 rounded-2xl"
          style={{ background: "var(--card-bg)" }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: "rgba(56,178,172,0.15)" }}
          >
            <Icon name={msg.icon} size={22} style={{ color: "var(--accent)" }} />
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {msg.text}
          </p>
        </div>
      ))}
    </div>
    <div
      className="max-w-xl rounded-2xl px-6 py-4"
      style={{ background: "rgba(56,178,172,0.1)", border: "1px solid rgba(56,178,172,0.25)" }}
    >
      <p className="text-sm leading-relaxed italic" style={{ color: "var(--text-secondary)" }}>
        {slide.content?.footer}
      </p>
    </div>
  </div>
);

const renderSlide = (slide: (typeof slides)[0]) => {
  switch (slide.type) {
    case "hero": return <SlideHero slide={slide} />;
    case "definition": return <SlideDefinition slide={slide} />;
    case "warning": return <SlideWarning slide={slide} />;
    case "causes": return <SlideCauses slide={slide} />;
    case "communication": return <SlideCommunication slide={slide} />;
    case "prevention": return <SlidePrevention slide={slide} />;
    case "help": return <SlideHelp slide={slide} />;
    case "closing": return <SlideClosing slide={slide} />;
    default: return null;
  }
};

const Index = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const goTo = (idx: number) => {
    if (animating || idx === current || idx < 0 || idx >= slides.length) return;
    setDirection(idx > current ? "next" : "prev");
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goTo(current + 1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") goTo(current - 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, animating]);

  const slide = slides[current];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)", fontFamily: "'Golos Text', sans-serif" }}>
      {/* Header */}
      <header
        className="flex items-center justify-between px-8 py-4 border-b"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "var(--accent)" }}
          >
            <Icon name="Heart" size={16} style={{ color: "#fff" }} />
          </div>
          <span className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
            Профилактика аутоагрессии
          </span>
        </div>
        <div className="flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              title={s.tag}
              className="transition-all duration-200"
              style={{
                width: i === current ? "24px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background: i === current ? "var(--accent)" : "var(--border)",
              }}
            />
          ))}
        </div>
        <div className="flex items-center gap-1 text-sm" style={{ color: "var(--text-muted)" }}>
          <span className="font-bold" style={{ color: "var(--accent)" }}>{current + 1}</span>
          <span>/</span>
          <span>{slides.length}</span>
        </div>
      </header>

      {/* Slide */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Tag */}
        <div className="absolute top-5 left-8 z-10">
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            {slide.tag}
          </span>
        </div>

        {/* Content */}
        <div
          className="flex-1 flex flex-col pt-10 transition-all duration-300"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating
              ? `translateX(${direction === "next" ? "-40px" : "40px"})`
              : "translateX(0)",
          }}
        >
          {renderSlide(slide)}
        </div>
      </main>

      {/* Footer nav */}
      <footer
        className="flex items-center justify-between px-8 py-4 border-t"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        <button
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-30"
          style={{
            background: "var(--card-bg)",
            color: "var(--text-secondary)",
          }}
        >
          <Icon name="ChevronLeft" size={16} />
          Назад
        </button>

        {/* Nav pills */}
        <div className="hidden md:flex items-center gap-1">
          {slides.map((s, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
              style={{
                background: i === current ? "var(--accent)" : "transparent",
                color: i === current ? "#fff" : "var(--text-muted)",
              }}
            >
              {s.tag}
            </button>
          ))}
        </div>

        <button
          onClick={() => goTo(current + 1)}
          disabled={current === slides.length - 1}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-30"
          style={{
            background: "var(--accent)",
            color: "#fff",
          }}
        >
          Далее
          <Icon name="ChevronRight" size={16} />
        </button>
      </footer>
    </div>
  );
};

export default Index;
