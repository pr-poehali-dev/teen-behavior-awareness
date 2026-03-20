import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

// ─── TYPES ───────────────────────────────────────────────────────────────────

type Phase = "intro" | "warm-up" | "vocab" | "reading" | "game" | "speaking" | "outro";

interface VocabWord {
  word: string;
  translation: string;
  emoji: string;
  example: string;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface MatchPair {
  id: number;
  word: string;
  translation: string;
}

// ─── DATA ────────────────────────────────────────────────────────────────────

const VOCAB: VocabWord[] = [
  { word: "adventure", translation: "приключение", emoji: "🗺️", example: "Life is a great adventure." },
  { word: "discover", translation: "открывать/обнаруживать", emoji: "🔍", example: "We discover new things every day." },
  { word: "incredible", translation: "невероятный", emoji: "🤩", example: "The view was absolutely incredible." },
  { word: "journey", translation: "путешествие / путь", emoji: "✈️", example: "Every journey begins with a single step." },
  { word: "explore", translation: "исследовать", emoji: "🧭", example: "Let's explore the city together." },
  { word: "challenge", translation: "вызов / испытание", emoji: "💪", example: "Learning English is a fun challenge." },
];

const QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: "What does \"adventure\" mean?",
    options: ["Скучное занятие", "Приключение", "Домашнее задание", "Отдых"],
    correct: 1,
    explanation: "«Adventure» — это приключение, захватывающее событие!",
  },
  {
    id: 2,
    question: "Choose the correct sentence:",
    options: [
      "She discover a new planet.",
      "She discovers a new planet.",
      "She discovering a new planet.",
      "She discovered new planet.",
    ],
    correct: 1,
    explanation: "С «she/he/it» глагол получает окончание -s: discovers.",
  },
  {
    id: 3,
    question: "«Incredible» is closest in meaning to:",
    options: ["Ordinary", "Boring", "Amazing", "Simple"],
    correct: 2,
    explanation: "«Incredible» = amazing = невероятный, поразительный.",
  },
  {
    id: 4,
    question: "Fill in the blank: «Every ___ begins with a single step.»",
    options: ["adventure", "journey", "challenge", "discovery"],
    correct: 1,
    explanation: "«Every journey begins with a single step» — известная цитата Лао-цзы.",
  },
  {
    id: 5,
    question: "What does «explore» mean?",
    options: ["Объяснять", "Взрывать", "Исследовать", "Экспортировать"],
    correct: 2,
    explanation: "«Explore» — исследовать, изучать незнакомую территорию.",
  },
];

const MATCH_PAIRS: MatchPair[] = [
  { id: 1, word: "adventure", translation: "приключение" },
  { id: 2, word: "discover", translation: "открывать" },
  { id: 3, word: "journey", translation: "путешествие" },
  { id: 4, word: "explore", translation: "исследовать" },
  { id: 5, word: "challenge", translation: "испытание" },
  { id: 6, word: "incredible", translation: "невероятный" },
];

const PHASES: { id: Phase; label: string; icon: string; color: string }[] = [
  { id: "intro", label: "Вступление", icon: "BookOpen", color: "blue" },
  { id: "warm-up", label: "Разминка", icon: "Flame", color: "orange" },
  { id: "vocab", label: "Слова", icon: "Star", color: "yellow" },
  { id: "reading", label: "Текст", icon: "FileText", color: "green" },
  { id: "game", label: "Игра", icon: "Gamepad2", color: "purple" },
  { id: "speaking", label: "Говорим", icon: "MessageCircle", color: "pink" },
  { id: "outro", label: "Итог", icon: "Trophy", color: "amber" },
];

const PHASE_ORDER: Phase[] = ["intro", "warm-up", "vocab", "reading", "game", "speaking", "outro"];

const COLOR_MAP: Record<string, { bg: string; border: string; text: string; badge: string; btn: string }> = {
  blue:   { bg: "bg-blue-50",   border: "border-blue-200",   text: "text-blue-700",   badge: "bg-blue-100 text-blue-700",   btn: "bg-blue-600 hover:bg-blue-700" },
  orange: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700", badge: "bg-orange-100 text-orange-700", btn: "bg-orange-500 hover:bg-orange-600" },
  yellow: { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-700", badge: "bg-yellow-100 text-yellow-700", btn: "bg-yellow-500 hover:bg-yellow-600" },
  green:  { bg: "bg-green-50",  border: "border-green-200",  text: "text-green-700",  badge: "bg-green-100 text-green-700",  btn: "bg-green-600 hover:bg-green-700" },
  purple: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700", badge: "bg-purple-100 text-purple-700", btn: "bg-purple-600 hover:bg-purple-700" },
  pink:   { bg: "bg-pink-50",   border: "border-pink-200",   text: "text-pink-700",   badge: "bg-pink-100 text-pink-700",   btn: "bg-pink-500 hover:bg-pink-600" },
  amber:  { bg: "bg-amber-50",  border: "border-amber-200",  text: "text-amber-700",  badge: "bg-amber-100 text-amber-700",  btn: "bg-amber-500 hover:bg-amber-600" },
};

// ─── HELPER COMPONENTS ───────────────────────────────────────────────────────

function Timer({ seconds, onEnd }: { seconds: number; onEnd: () => void }) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    setLeft(seconds);
  }, [seconds]);
  useEffect(() => {
    if (left <= 0) { onEnd(); return; }
    const t = setTimeout(() => setLeft(l => l - 1), 1000);
    return () => clearTimeout(t);
  }, [left, onEnd]);
  const pct = (left / seconds) * 100;
  const color = left > 10 ? "bg-green-500" : left > 5 ? "bg-yellow-500" : "bg-red-500";
  return (
    <div className="flex items-center gap-3">
      <div className="w-32 h-2.5 bg-slate-200 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className={`font-mono font-bold text-sm ${left <= 5 ? "text-red-600" : "text-slate-600"}`}>{left}s</span>
    </div>
  );
}

function ScoreBadge({ score, total }: { score: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5 bg-amber-100 border border-amber-300 rounded-full px-3 py-1">
      <span className="text-amber-600">⭐</span>
      <span className="font-bold text-amber-700 text-sm">{score} / {total}</span>
    </div>
  );
}

// ─── PHASE COMPONENTS ────────────────────────────────────────────────────────

function IntroPhase({ onNext }: { onNext: () => void }) {
  return (
    <div className="space-y-6">
      <div className="text-center py-6">
        <div className="text-6xl mb-4">🌍</div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Around the World</h2>
        <p className="text-slate-500 text-lg">Open English Lesson · Grade 5–7</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: "🎯", title: "Цель урока", desc: "Научиться рассказывать о путешествиях и приключениях на английском" },
          { icon: "📚", title: "Что будем делать", desc: "Слова, текст, игра на совпадение и живое общение" },
          { icon: "🏆", title: "Заработай очки", desc: "За каждый правильный ответ — звезда. Кто наберёт больше?" },
        ].map((c, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 text-center">
            <div className="text-3xl mb-3">{c.icon}</div>
            <h3 className="font-bold text-slate-700 mb-1">{c.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
        <h3 className="font-bold text-blue-700 mb-3 flex items-center gap-2">
          <Icon name="Info" size={16} /> Classroom rules — Правила класса
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { en: "Speak English", ru: "Говорим на English", emoji: "🗣️" },
            { en: "Respect others", ru: "Уважаем друг друга", emoji: "🤝" },
            { en: "Have fun!", ru: "Получаем удовольствие", emoji: "😄" },
            { en: "Be curious", ru: "Задаём вопросы", emoji: "🤔" },
          ].map((r, i) => (
            <div key={i} className="bg-white rounded-xl p-3 text-center border border-blue-100">
              <div className="text-2xl mb-1">{r.emoji}</div>
              <div className="font-semibold text-blue-700 text-xs">{r.en}</div>
              <div className="text-slate-400 text-xs">{r.ru}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <button onClick={onNext} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl transition-colors text-lg">
          Let's start! 🚀
        </button>
      </div>
    </div>
  );
}

function WarmUpPhase({ onNext, onScore }: { onNext: () => void; onScore: (n: number) => void }) {
  const [current, setCurrent] = useState(0);
  const [done, setDone] = useState<number[]>([]);
  const [revealed, setRevealed] = useState(false);

  const items = [
    { q: "How are you today?", a: "I'm great / fine / tired / excited, thank you!" },
    { q: "What's your favourite season?", a: "My favourite season is summer / winter / spring / autumn." },
    { q: "Have you ever been abroad?", a: "Yes, I've been to... / No, but I'd love to go to..." },
    { q: "Name 3 countries in Europe!", a: "France, Germany, Italy, Spain, Portugal…" },
    { q: "What transport do you use to travel?", a: "Plane ✈️, train 🚂, car 🚗, ship 🚢..." },
  ];

  function next() {
    if (!done.includes(current)) {
      onScore(1);
      setDone(d => [...d, current]);
    }
    setRevealed(false);
    if (current < items.length - 1) {
      setCurrent(c => c + 1);
    } else {
      onNext();
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">🔥 Warm-Up — Разминка</h2>
        <span className="text-sm text-slate-400">{current + 1} / {items.length}</span>
      </div>

      <p className="text-slate-500">Отвечайте на вопросы по очереди — не думайте слишком долго!</p>

      <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-8 text-center min-h-[180px] flex flex-col items-center justify-center">
        <p className="text-2xl font-bold text-orange-800 mb-4">"{items[current].q}"</p>
        {revealed ? (
          <div className="bg-white rounded-xl px-5 py-3 border border-orange-200">
            <p className="text-sm text-slate-600 italic">{items[current].a}</p>
          </div>
        ) : (
          <button onClick={() => setRevealed(true)} className="text-sm text-orange-500 underline">
            Показать пример ответа
          </button>
        )}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-1.5">
          {items.map((_, i) => (
            <div key={i} className={`w-2.5 h-2.5 rounded-full ${done.includes(i) ? "bg-orange-500" : i === current ? "bg-orange-300 ring-2 ring-orange-400" : "bg-slate-200"}`} />
          ))}
        </div>
        <button onClick={next} className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors">
          {current < items.length - 1 ? "Next question →" : "Finish warm-up ✓"}
        </button>
      </div>
    </div>
  );
}

function VocabPhase({ onNext, onScore }: { onNext: () => void; onScore: (n: number) => void }) {
  const [flipped, setFlipped] = useState<number[]>([]);
  const [learned, setLearned] = useState<number[]>([]);

  function flip(i: number) {
    setFlipped(f => f.includes(i) ? f.filter(x => x !== i) : [...f, i]);
  }

  function markLearned(i: number) {
    if (!learned.includes(i)) {
      setLearned(l => [...l, i]);
      onScore(1);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">⭐ New Words — Новые слова</h2>
        <span className="text-sm text-slate-500">{learned.length}/{VOCAB.length} выучено</span>
      </div>
      <p className="text-slate-500 text-sm">Кликни по карточке — увидишь перевод и пример. Нажми «Got it!» когда запомнишь.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {VOCAB.map((v, i) => {
          const isFlipped = flipped.includes(i);
          const isDone = learned.includes(i);
          return (
            <div
              key={i}
              onClick={() => flip(i)}
              className={`relative cursor-pointer rounded-2xl border-2 p-5 transition-all select-none min-h-[140px] flex flex-col justify-between
                ${isDone ? "border-green-400 bg-green-50" : isFlipped ? "border-yellow-400 bg-yellow-50" : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"}`}
            >
              {isDone && (
                <div className="absolute top-3 right-3">
                  <Icon name="CheckCircle" size={18} className="text-green-500" />
                </div>
              )}
              <div>
                <div className="text-3xl mb-2">{v.emoji}</div>
                <div className="font-bold text-slate-800 text-lg">{v.word}</div>
                {isFlipped && (
                  <div className="mt-2 space-y-1">
                    <div className="text-yellow-700 font-semibold text-sm">{v.translation}</div>
                    <div className="text-slate-500 text-xs italic">"{v.example}"</div>
                  </div>
                )}
              </div>
              {isFlipped && !isDone && (
                <button
                  onClick={e => { e.stopPropagation(); markLearned(i); }}
                  className="mt-3 self-start bg-green-500 hover:bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                >
                  Got it! ✓
                </button>
              )}
              {!isFlipped && (
                <p className="text-xs text-slate-400 mt-2">Tap to reveal</p>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={learned.length < 3}
          className="bg-yellow-500 hover:bg-yellow-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold px-6 py-2.5 rounded-xl transition-colors"
        >
          {learned.length < 3 ? `Выучи ещё ${3 - learned.length} слова` : "Continue →"}
        </button>
      </div>
    </div>
  );
}

function ReadingPhase({ onNext, onScore }: { onNext: () => void; onScore: (n: number) => void }) {
  const [answered, setAnswered] = useState<Record<number, number>>({});
  const [showText, setShowText] = useState(true);

  const questions = [
    { q: "Where did Maya grow up?", options: ["In a big city", "In a small village", "Near the ocean", "Abroad"], correct: 1 },
    { q: "What was Maya's dream?", options: ["To become a pilot", "To explore the world", "To learn languages", "To build a ship"], correct: 1 },
    { q: "How many countries did she visit?", options: ["Five", "Ten", "Fifteen", "Twenty"], correct: 2 },
  ];

  function answer(qi: number, ai: number) {
    if (answered[qi] !== undefined) return;
    setAnswered(prev => ({ ...prev, [qi]: ai }));
    if (ai === questions[qi].correct) onScore(2);
  }

  const allDone = Object.keys(answered).length === questions.length;

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-slate-800">📖 Reading — Читаем текст</h2>

      <div className="flex gap-3">
        <button onClick={() => setShowText(true)} className={`text-sm px-4 py-2 rounded-lg font-semibold transition-colors ${showText ? "bg-green-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
          📄 Text
        </button>
        <button onClick={() => setShowText(false)} className={`text-sm px-4 py-2 rounded-lg font-semibold transition-colors ${!showText ? "bg-green-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
          ❓ Questions
        </button>
      </div>

      {showText && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-slate-700 mb-4 text-lg">🗺️ Maya's Big Adventure</h3>
          <div className="text-slate-700 leading-8 space-y-3 text-sm md:text-base">
            <p>
              Maya grew up in a <span className="bg-yellow-100 px-1 rounded font-semibold">small village</span> far from the city.
              As a child, she loved looking at maps and dreaming about faraway places.
              Her biggest dream was to <span className="bg-yellow-100 px-1 rounded font-semibold">explore the world</span>.
            </p>
            <p>
              When Maya turned eighteen, she saved her money and bought a plane ticket.
              Her first <span className="bg-yellow-100 px-1 rounded font-semibold">journey</span> took her to France, where she
              <span className="bg-yellow-100 px-1 rounded font-semibold"> discovered</span> amazing art, delicious food, and new friends.
            </p>
            <p>
              Over the years, Maya visited <span className="bg-yellow-100 px-1 rounded font-semibold">fifteen countries</span>.
              Every place was an <span className="bg-yellow-100 px-1 rounded font-semibold">incredible adventure</span>. She faced many
              <span className="bg-yellow-100 px-1 rounded font-semibold"> challenges</span>, but she never gave up.
            </p>
            <p className="italic text-slate-500">
              "The world is a book," Maya often said, "and those who do not travel read only one page."
            </p>
          </div>
        </div>
      )}

      {!showText && (
        <div className="space-y-4">
          {questions.map((q, qi) => (
            <div key={qi} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <p className="font-semibold text-slate-700 mb-3">{qi + 1}. {q.q}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options.map((opt, ai) => {
                  const sel = answered[qi];
                  const isSelected = sel === ai;
                  const isCorrect = ai === q.correct;
                  let style = "border-slate-200 bg-slate-50 hover:bg-slate-100 cursor-pointer";
                  if (sel !== undefined) {
                    if (isCorrect) style = "border-green-400 bg-green-50 cursor-default";
                    else if (isSelected) style = "border-red-400 bg-red-50 cursor-default";
                    else style = "border-slate-200 bg-slate-50 cursor-default opacity-60";
                  }
                  return (
                    <button key={ai} onClick={() => answer(qi, ai)}
                      className={`text-left border-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${style}`}>
                      <span className="mr-2">{["A", "B", "C", "D"][ai]}.</span>{opt}
                      {sel !== undefined && isCorrect && <span className="ml-2 text-green-600">✓</span>}
                      {isSelected && !isCorrect && <span className="ml-2 text-red-500">✗</span>}
                    </button>
                  );
                })}
              </div>
              {answered[qi] !== undefined && (
                <p className="mt-2 text-xs text-slate-500">
                  {answered[qi] === q.correct ? "✅ Correct! +2 stars" : `❌ The correct answer is: ${q.options[q.correct]}`}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-end">
        <button onClick={onNext} disabled={!allDone && !showText}
          className="bg-green-600 hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold px-6 py-2.5 rounded-xl transition-colors">
          Next activity →
        </button>
      </div>
    </div>
  );
}

function GamePhase({ onNext, onScore }: { onNext: () => void; onScore: (n: number) => void }) {
  const [tab, setTab] = useState<"quiz" | "match">("quiz");

  // QUIZ state
  const [qIndex, setQIndex] = useState(0);
  const [qSelected, setQSelected] = useState<number | null>(null);
  const [qScore, setQScore] = useState(0);
  const [qDone, setQDone] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  function selectAnswer(i: number) {
    if (qSelected !== null) return;
    setQSelected(i);
    if (i === QUIZ[qIndex].correct) {
      setQScore(s => s + 1);
      onScore(2);
    }
  }

  function nextQuestion() {
    if (qIndex < QUIZ.length - 1) {
      setQIndex(qi => qi + 1);
      setQSelected(null);
      setTimerKey(k => k + 1);
    } else {
      setQDone(true);
    }
  }

  // MATCH state
  const shuffledWords = useRef([...MATCH_PAIRS].sort(() => Math.random() - 0.5));
  const shuffledTrans = useRef([...MATCH_PAIRS].sort(() => Math.random() - 0.5));
  const [selectedWord, setSelectedWord] = useState<number | null>(null);
  const [selectedTrans, setSelectedTrans] = useState<number | null>(null);
  const [matched, setMatched] = useState<number[]>([]);
  const [wrong, setWrong] = useState<[number | null, number | null]>([null, null]);

  useEffect(() => {
    if (selectedWord !== null && selectedTrans !== null) {
      const wPair = shuffledWords.current[selectedWord];
      const tPair = shuffledTrans.current[selectedTrans];
      if (wPair.id === tPair.id) {
        setMatched(m => [...m, wPair.id]);
        onScore(1);
        setSelectedWord(null);
        setSelectedTrans(null);
      } else {
        setWrong([selectedWord, selectedTrans]);
        setTimeout(() => {
          setSelectedWord(null);
          setSelectedTrans(null);
          setWrong([null, null]);
        }, 900);
      }
    }
  }, [selectedWord, selectedTrans, onScore]);

  const matchDone = matched.length === MATCH_PAIRS.length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">🎮 Games — Играем!</h2>
        <div className="flex gap-2">
          {(["quiz", "match"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`text-sm px-4 py-2 rounded-lg font-semibold transition-colors ${tab === t ? "bg-purple-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
              {t === "quiz" ? "🧠 Quiz" : "🔗 Match"}
            </button>
          ))}
        </div>
      </div>

      {/* QUIZ */}
      {tab === "quiz" && (
        <div className="space-y-4">
          {!qDone ? (
            <>
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>Question {qIndex + 1} of {QUIZ.length}</span>
                <Timer key={timerKey} seconds={20} onEnd={() => { if (qSelected === null) setQSelected(-1); }} />
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5 mb-1">
                <div className="bg-purple-500 h-1.5 rounded-full transition-all" style={{ width: `${((qIndex) / QUIZ.length) * 100}%` }} />
              </div>
              <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-6">
                <p className="text-lg font-bold text-purple-800 mb-4">{QUIZ[qIndex].question}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {QUIZ[qIndex].options.map((opt, i) => {
                    let style = "border-purple-200 bg-white hover:bg-purple-50 cursor-pointer";
                    if (qSelected !== null) {
                      if (i === QUIZ[qIndex].correct) style = "border-green-400 bg-green-50 cursor-default";
                      else if (i === qSelected) style = "border-red-400 bg-red-50 cursor-default";
                      else style = "border-slate-200 bg-slate-50 cursor-default opacity-50";
                    }
                    return (
                      <button key={i} onClick={() => selectAnswer(i)}
                        className={`text-left border-2 rounded-xl px-4 py-3 text-sm font-medium transition-all ${style}`}>
                        <span className="font-bold mr-2 text-purple-400">{["A", "B", "C", "D"][i]}</span>{opt}
                      </button>
                    );
                  })}
                </div>
                {qSelected !== null && (
                  <div className={`mt-4 p-3 rounded-xl text-sm ${qSelected === QUIZ[qIndex].correct ? "bg-green-100 text-green-700" : "bg-red-50 text-red-700"}`}>
                    {qSelected === QUIZ[qIndex].correct ? "✅ Correct! " : "❌ Not quite. "}{QUIZ[qIndex].explanation}
                  </div>
                )}
              </div>
              {qSelected !== null && (
                <div className="flex justify-end">
                  <button onClick={nextQuestion} className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-2.5 rounded-xl transition-colors">
                    {qIndex < QUIZ.length - 1 ? "Next →" : "Finish quiz ✓"}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-10 bg-purple-50 rounded-2xl border border-purple-200">
              <div className="text-5xl mb-4">{qScore >= 4 ? "🏆" : qScore >= 2 ? "🥈" : "💪"}</div>
              <h3 className="text-2xl font-bold text-purple-700 mb-2">Quiz complete!</h3>
              <p className="text-slate-500">You got <span className="font-bold text-purple-700">{qScore}/{QUIZ.length}</span> correct</p>
              <p className="text-sm text-slate-400 mt-1">+{qScore * 2} stars earned</p>
            </div>
          )}
        </div>
      )}

      {/* MATCH */}
      {tab === "match" && (
        <div className="space-y-4">
          <p className="text-sm text-slate-500">Свяжи английское слово с переводом. Кликни слово, потом — перевод.</p>
          {matchDone ? (
            <div className="text-center py-10 bg-green-50 rounded-2xl border border-green-200">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-green-700">Perfect match!</h3>
              <p className="text-sm text-slate-400 mt-1">+{MATCH_PAIRS.length} stars earned</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center mb-2">English</p>
                {shuffledWords.current.map((p, i) => {
                  const isMatched = matched.includes(p.id);
                  const isSelected = selectedWord === i;
                  const isWrong = wrong[0] === i;
                  return (
                    <button key={p.id} disabled={isMatched}
                      onClick={() => !isMatched && setSelectedWord(i)}
                      className={`w-full px-4 py-3 rounded-xl font-semibold text-sm border-2 transition-all
                        ${isMatched ? "border-green-300 bg-green-100 text-green-600 opacity-70 cursor-default" :
                          isWrong ? "border-red-400 bg-red-50 text-red-600" :
                          isSelected ? "border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-300" :
                          "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50 cursor-pointer"}`}>
                      {p.word}
                    </button>
                  );
                })}
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center mb-2">Перевод</p>
                {shuffledTrans.current.map((p, i) => {
                  const isMatched = matched.includes(p.id);
                  const isSelected = selectedTrans === i;
                  const isWrong = wrong[1] === i;
                  return (
                    <button key={p.id} disabled={isMatched}
                      onClick={() => !isMatched && setSelectedTrans(i)}
                      className={`w-full px-4 py-3 rounded-xl font-semibold text-sm border-2 transition-all
                        ${isMatched ? "border-green-300 bg-green-100 text-green-600 opacity-70 cursor-default" :
                          isWrong ? "border-red-400 bg-red-50 text-red-600" :
                          isSelected ? "border-green-500 bg-green-50 text-green-700 ring-2 ring-green-300" :
                          "border-slate-200 bg-white hover:border-green-300 hover:bg-green-50 cursor-pointer"}`}>
                      {p.translation}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-end">
        <button onClick={onNext} className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-2.5 rounded-xl transition-colors">
          Next →
        </button>
      </div>
    </div>
  );
}

function SpeakingPhase({ onNext, onScore }: { onNext: () => void; onScore: (n: number) => void }) {
  const [done, setDone] = useState<number[]>([]);

  const tasks = [
    {
      title: "Describe a place",
      prompt: 'Talk about a place you\'d love to visit. Use the words: "incredible", "explore", "journey".',
      starter: '"I would love to visit... because it is incredible. I want to explore..."',
      emoji: "🗺️",
    },
    {
      title: "Interview a partner",
      prompt: "Ask your partner 3 questions about their dream travel destination.",
      starter: '"Where would you go? Why? What would you do there?"',
      emoji: "🎤",
    },
    {
      title: "Mini story",
      prompt: "Create a 3-sentence story using: adventure, discover, challenge.",
      starter: '"One day I had an adventure... I discovered... It was a real challenge..."',
      emoji: "📝",
    },
  ];

  function markDone(i: number) {
    if (!done.includes(i)) {
      setDone(d => [...d, i]);
      onScore(2);
    }
  }

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-slate-800">💬 Speaking — Говорим!</h2>
      <p className="text-slate-500 text-sm">Выполните задания по парам или группам. Учитель ставит оценку — нажмите «Done» после выступления.</p>

      <div className="space-y-4">
        {tasks.map((t, i) => {
          const isDone = done.includes(i);
          return (
            <div key={i} className={`rounded-2xl border-2 p-5 transition-all ${isDone ? "border-green-400 bg-green-50" : "border-slate-200 bg-white"}`}>
              <div className="flex items-start gap-3">
                <span className="text-3xl">{t.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-slate-700">{t.title}</h3>
                    {isDone && <span className="text-green-600 text-sm font-semibold">✓ Done +2⭐</span>}
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{t.prompt}</p>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                    <p className="text-xs text-slate-400 mb-1">Starter phrase:</p>
                    <p className="text-sm text-slate-600 italic">{t.starter}</p>
                  </div>
                  {!isDone && (
                    <button onClick={() => markDone(i)}
                      className="mt-3 bg-pink-500 hover:bg-pink-600 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">
                      Done! ✓
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end">
        <button onClick={onNext} disabled={done.length === 0}
          className="bg-pink-500 hover:bg-pink-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold px-6 py-2.5 rounded-xl transition-colors">
          Finish lesson →
        </button>
      </div>
    </div>
  );
}

function OutroPhase({ score }: { score: number }) {
  const max = 5 + 6 + 6 + 10 + 6 + 6; // rough max
  const pct = Math.min(100, Math.round((score / max) * 100));
  const level = pct >= 80 ? { title: "Explorer 🗺️", color: "text-amber-600", bg: "bg-amber-50 border-amber-200" }
    : pct >= 50 ? { title: "Traveller ✈️", color: "text-blue-600", bg: "bg-blue-50 border-blue-200" }
    : { title: "Adventurer 🌱", color: "text-green-600", bg: "bg-green-50 border-green-200" };

  return (
    <div className="space-y-6 text-center">
      <div className="py-6">
        <div className="text-6xl mb-4">🏆</div>
        <h2 className="text-3xl font-bold text-slate-800 mb-1">Lesson Complete!</h2>
        <p className="text-slate-500">Congratulations — you finished the lesson!</p>
      </div>

      <div className={`rounded-2xl border-2 p-6 inline-block mx-auto ${level.bg}`}>
        <p className="text-sm text-slate-500 mb-1">Your title:</p>
        <p className={`text-2xl font-bold ${level.color}`}>{level.title}</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 max-w-sm mx-auto">
        <p className="text-sm text-slate-400 mb-2">Total stars earned</p>
        <p className="text-5xl font-bold text-amber-500">⭐ {score}</p>
        <div className="mt-3 w-full bg-slate-100 rounded-full h-3">
          <div className="bg-amber-400 h-3 rounded-full transition-all" style={{ width: `${pct}%` }} />
        </div>
        <p className="text-xs text-slate-400 mt-1">{pct}% of max score</p>
      </div>

      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 text-left max-w-lg mx-auto">
        <h3 className="font-bold text-slate-700 mb-3">📚 Words we learned today:</h3>
        <div className="flex flex-wrap gap-2">
          {VOCAB.map(v => (
            <span key={v.word} className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm">
              <span className="mr-1">{v.emoji}</span>
              <span className="font-semibold text-slate-700">{v.word}</span>
              <span className="text-slate-400 ml-1 text-xs">— {v.translation}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 max-w-lg mx-auto text-left">
        <h3 className="font-bold text-blue-700 mb-2">🏠 Homework</h3>
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="flex gap-2"><span>1.</span><span>Write 5 sentences using today's vocabulary words.</span></li>
          <li className="flex gap-2"><span>2.</span><span>Find a photo of a place you'd like to visit and prepare a 1-minute description in English.</span></li>
          <li className="flex gap-2"><span>3.</span><span>Read the text about Maya again and retell it to a family member.</span></li>
        </ul>
      </div>

      <p className="text-slate-400 text-sm">See you next lesson! Keep exploring! 🌍</p>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function EnglishLesson() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [score, setScore] = useState(0);

  const currentIdx = PHASE_ORDER.indexOf(phase);

  function addScore(n: number) {
    setScore(s => s + n);
  }

  function nextPhase() {
    const next = PHASE_ORDER[currentIdx + 1];
    if (next) setPhase(next);
  }

  const currentMeta = PHASES.find(p => p.id === phase)!;
  const c = COLOR_MAP[currentMeta.color];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* HEADER */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Icon name="Globe" size={16} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-slate-800 text-sm leading-tight">Around the World</p>
              <p className="text-xs text-slate-400">Open English Lesson</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ScoreBadge score={score} total={39} />
          </div>
        </div>

        {/* PHASE STEPPER */}
        <div className="max-w-4xl mx-auto px-4 pb-3">
          <div className="flex gap-1 overflow-x-auto hide-scrollbar">
            {PHASES.map((p, i) => {
              const isDone = i < currentIdx;
              const isActive = p.id === phase;
              const pc = COLOR_MAP[p.color];
              return (
                <div key={p.id} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all shrink-0
                  ${isActive ? `${pc.badge} ring-1 ring-offset-0` :
                    isDone ? "bg-slate-100 text-slate-500" :
                    "text-slate-300"}`}>
                  {isDone ? <Icon name="CheckCircle" size={12} /> : <Icon name={p.icon} size={12} />}
                  {p.label}
                </div>
              );
            })}
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className={`rounded-2xl border-2 ${c.border} ${c.bg} p-1 shadow-sm`}>
          <div className="bg-white rounded-xl p-5 md:p-7">
            {phase === "intro" && <IntroPhase onNext={nextPhase} />}
            {phase === "warm-up" && <WarmUpPhase onNext={nextPhase} onScore={addScore} />}
            {phase === "vocab" && <VocabPhase onNext={nextPhase} onScore={addScore} />}
            {phase === "reading" && <ReadingPhase onNext={nextPhase} onScore={addScore} />}
            {phase === "game" && <GamePhase onNext={nextPhase} onScore={addScore} />}
            {phase === "speaking" && <SpeakingPhase onNext={nextPhase} onScore={addScore} />}
            {phase === "outro" && <OutroPhase score={score} />}
          </div>
        </div>
      </main>
    </div>
  );
}
