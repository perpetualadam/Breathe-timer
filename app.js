const translations = {
  en: {
    appTitle: "Breathing Timer",
    start: "Start",
    stop: "Stop",
    breatheIn: "Breathe In",
    hold: "Hold",
    breatheOut: "Breathe Out",
    ready: "Ready",
    cycle: "Cycle",
    language: "Language:"
  },
  es: {
    appTitle: "Temporizador de Respiración",
    start: "Iniciar",
    stop: "Detener",
    breatheIn: "Inhala",
    hold: "Mantén",
    breatheOut: "Exhala",
    ready: "Listo",
    cycle: "Ciclo",
    language: "Idioma:"
  },
  ar: {
    appTitle: "مؤقت التنفس",
    start: "ابدأ",
    stop: "إيقاف",
    breatheIn: "شهيق",
    hold: "احتفظ",
    breatheOut: "زفير",
    ready: "جاهز",
    cycle: "الدورة",
    language: "اللغة:"
  },
  fr: {
    appTitle: "Minuteur de respiration",
    start: "Démarrer",
    stop: "Arrêter",
    breatheIn: "Inspire",
    hold: "Retiens",
    breatheOut: "Expire",
    ready: "Prêt",
    cycle: "Cycle",
    language: "Langue :"
  },
  de: {
    appTitle: "Atem-Timer",
    start: "Start",
    stop: "Stopp",
    breatheIn: "Einatmen",
    hold: "Anhalten",
    breatheOut: "Ausatmen",
    ready: "Bereit",
    cycle: "Zyklus",
    language: "Sprache:"
  },
  hi: {
    appTitle: "सांस टाइमर",
    start: "प्रारंभ करें",
    stop: "रोकें",
    breatheIn: "साँस लें",
    hold: "रोकें",
    breatheOut: "साँस छोड़ें",
    ready: "तैयार",
    cycle: "चक्र",
    language: "भाषा:"
  },
  tr: {
    appTitle: "Nefes Zamanlayıcı",
    start: "Başlat",
    stop: "Durdur",
    breatheIn: "Nefes Al",
    hold: "Tut",
    breatheOut: "Nefes Ver",
    ready: "Hazır",
    cycle: "Döngü",
    language: "Dil:"
  },
  ru: {
    appTitle: "Таймер дыхания",
    start: "Старт",
    stop: "Стоп",
    breatheIn: "Вдох",
    hold: "Задержка",
    breatheOut: "Выдох",
    ready: "Готово",
    cycle: "Цикл",
    language: "Язык:"
  },
  af: {
    appTitle: "Asemhaling Tydhouer",
    start: "Begin",
    stop: "Stop",
    breatheIn: "Asem in",
    hold: "Hou asem",
    breatheOut: "Asem uit",
    ready: "Gereed",
    cycle: "Siklus",
    language: "Taal:"
  },
  pt: {
    appTitle: "Temporizador de Respiração",
    start: "Iniciar",
    stop: "Parar",
    breatheIn: "Inspire",
    hold: "Segure",
    breatheOut: "Expire",
    ready: "Pronto",
    cycle: "Ciclo",
    language: "Idioma:"
  },
  zh: {
    appTitle: "呼吸计时器",
    start: "开始",
    stop: "停止",
    breatheIn: "吸气",
    hold: "屏住呼吸",
    breatheOut: "呼气",
    ready: "准备好",
    cycle: "循环",
    language: "语言："
  }
};

document.addEventListener("DOMContentLoaded", () => {
  let currentLang = "en";
  let cycle = 1;
  let maxCycles = 12;
  let running = false;
  let timerId = null;

  const startBtn = document.getElementById("start-btn");
  const stopBtn = document.getElementById("stop-btn");
  const phaseText = document.getElementById("phase-text");
  const timerDisplay = document.getElementById("timer-display");
  const cycleCounter = document.getElementById("cycle-counter");
  const langSelect = document.getElementById("lang-select");
  const appTitle = document.getElementById("app-title");
  const languageLabel = document.getElementById("language-label");
  const bellSound = document.getElementById("bell-sound");
  const circle = document.getElementById("animation-circle");

  // Check for saved language on load
  const savedLang = localStorage.getItem("breathingLang");
  if (savedLang && translations[savedLang]) {
    currentLang = savedLang;
    langSelect.value = savedLang;
    updateLanguage(currentLang);
    updateDirection(currentLang);
  } else {
    updateLanguage(currentLang);
    updateDirection(currentLang);
  }

  langSelect.addEventListener("change", () => {
    currentLang = langSelect.value;
    localStorage.setItem("breathingLang", currentLang);
    console.log("Selected language:", currentLang);
    updateLanguage(currentLang);
    updateDirection(currentLang);
  });

  startBtn.addEventListener("click", () => {
    running = true;
    cycle = 1;
    startBtn.disabled = true;
    stopBtn.disabled = false;
    runCycle();
  });

  stopBtn.addEventListener("click", () => {
    running = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    phaseText.textContent = translations[currentLang].ready;
    timerDisplay.textContent = "0.0";
    clearTimeout(timerId);
    circle.className = "";
  });

  function runCycle() {
    if (!running || cycle > maxCycles) {
      stopBreathing();
      return;
    }

    cycleCounter.textContent =
      translations[currentLang].cycle + ": " + cycle + " / " + maxCycles;

    breatheIn(() => {
      hold(() => {
        breatheOut(() => {
          cycle++;
          runCycle();
        });
      });
    });
  }

  function breatheIn(callback) {
    playBell();
    vibrate();
    phaseText.textContent = translations[currentLang].breatheIn;
    animateCircle("grow");
    countdown(4, callback);
  }

  function hold(callback) {
    playBell();
    vibrate();
    phaseText.textContent = translations[currentLang].hold;
    circle.className = "hold";
    countdown(7, callback);
  }

  function breatheOut(callback) {
    playBell();
    vibrate();
    phaseText.textContent = translations[currentLang].breatheOut;
    animateCircle("shrink");
    countdown(8, callback);
  }

  function countdown(seconds, callback) {
    let remaining = seconds;
    timerDisplay.textContent = remaining.toFixed(1);
    timerId = setInterval(() => {
      remaining -= 0.1;
      if (remaining <= 0) {
        clearInterval(timerId);
        timerDisplay.textContent = "0.0";
        callback();
      } else {
        timerDisplay.textContent = remaining.toFixed(1);
      }
    }, 100);
  }

  function animateCircle(animationClass) {
    circle.className = animationClass;
  }

  function playBell() {
    bellSound.currentTime = 0;
    bellSound.play().catch((e) => {
      console.log("Playback error:", e);
      alert("Playback error: " + e.message);
    });
  }

  function vibrate() {
    if (navigator.vibrate) {
      console.log("Attempting vibration...");
      navigator.vibrate(300);
    } else {
      console.log("Vibration not supported.");
    }
  }

  function stopBreathing() {
    running = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    phaseText.textContent = translations[currentLang].ready;
    timerDisplay.textContent = "0.0";
    circle.className = "";
  }

  function updateLanguage(lang) {
    if (!translations[lang]) {
      console.log("No translation found for:", lang);
      lang = "en";
    }

    appTitle.textContent = translations[lang].appTitle;
    startBtn.textContent = translations[lang].start;
    stopBtn.textContent = translations[lang].stop;
    phaseText.textContent = translations[lang].ready;
    languageLabel.textContent = translations[lang].language;
    cycleCounter.textContent =
      translations[lang].cycle + ": " + cycle + " / " + maxCycles;
  }

  function updateDirection(lang) {
    if (lang === "ar") {
      document.documentElement.lang = "ar";
      document.body.dir = "rtl";
    } else {