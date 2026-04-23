/* =============================================
   ALFA DIGITAL — app.js
   Interactividad · Chatbot · Sesiones · UX
   ============================================= */

// ─── CONFIGURACIÓN ───────────────────────────────────────────
// Para usar la API de OpenAI real, reemplaza con tu API Key.
// Si no tienes key, el chatbot usa respuestas simuladas (modo offline).
const GROQ_API_KEY = "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"; // ← Pega tu API Key aquí (o deja vacío para modo simulado)

// ─── DATOS DE SESIONES ────────────────────────────────────────
const sessions = [
  {
    num: "Sesión 1",
    emoji: "🖥️",
    title: "Introducción y reconocimiento digital",
    objetivo: "Familiarizarse con el entorno digital y los dispositivos tecnológicos básicos.",
    inicio: "Se presenta el curso, los participantes y los objetivos. Se exploran las percepciones sobre la tecnología y se desmitifican los miedos más comunes al usar computadores o teléfonos inteligentes.",
    desarrollo: "Los participantes conocen las partes del computador (monitor, teclado, mouse, puerto USB), aprenden a encenderlo y apagarlo correctamente. Se introduce el concepto de sistema operativo y escritorio digital. Se practican acciones básicas: hacer clic, doble clic, arrastrar y minimizar ventanas.",
    cierre: "Se resuelven dudas, se repasan los conceptos vistos y cada participante comparte qué aprendió. Se entrega material de repaso visual (impreso o digital)."
  },
  {
    num: "Sesión 2",
    emoji: "⌨️",
    title: "Mecanografía y fraudes cibernéticos",
    objetivo: "Desarrollar habilidades básicas de escritura en el teclado y aprender a identificar fraudes digitales.",
    inicio: "Se repasan las partes del teclado. Se presenta una actividad lúdica de reconocimiento de teclas especiales: Enter, Espacio, Backspace, mayúsculas y números.",
    desarrollo: "Los participantes practican escritura con ejercicios guiados: escribir su nombre, una frase sencilla, y usar números. Se introduce el concepto de 'fraude cibernético' con ejemplos reales: mensajes falsos, llamadas de suplantación, premios falsos. Se enseña a identificar señales de alerta y cómo protegerse.",
    cierre: "Se realiza una actividad de identificación: ¿cuáles de estos mensajes son fraudes? Se refuerzan las buenas prácticas de seguridad digital."
  },
  {
    num: "Sesión 3",
    emoji: "🔍",
    title: "Herramientas de Google",
    objetivo: "Aprender a usar las herramientas básicas de Google: búsqueda, Gmail y Google Maps.",
    inicio: "Se presenta Google como motor de búsqueda. Los participantes exploran qué tipo de preguntas pueden hacerle a Google y cómo formular búsquedas efectivas.",
    desarrollo: "Práctica de búsqueda en Google: cómo buscar noticias, recetas, servicios de salud. Se presenta Gmail: cómo crear una cuenta, leer correos, escribir y enviar un mensaje. Se explora Google Maps: cómo buscar una dirección, calcular rutas y encontrar negocios cercanos.",
    cierre: "Cada participante envía un correo de práctica a un compañero del grupo. Se resuelven dudas y se refuerza el uso seguro de correos electrónicos."
  },
  {
    num: "Sesión 4",
    emoji: "📅",
    title: "Google Meet, Play Store y Calendario",
    objetivo: "Aprender a realizar videollamadas y gestionar aplicaciones y eventos básicos.",
    inicio: "Se presenta el concepto de videollamada y sus usos: hablar con familiares, citas médicas virtuales, reuniones. Se muestra qué es Google Meet y cómo acceder.",
    desarrollo: "Los participantes practican cómo unirse a una videollamada en Google Meet: activar cámara y micrófono, usar el chat, compartir pantalla básica. Se presenta la Play Store (Android) o App Store (iOS): cómo buscar e instalar aplicaciones seguras. Se introduce Google Calendario para agendar citas y recordatorios.",
    cierre: "Se agenda un evento de práctica en el calendario. Reflexión grupal: ¿qué aplicaciones podrían serles útiles en su vida diaria?"
  },
  {
    num: "Sesión 5",
    emoji: "🤖",
    title: "Inteligencia Artificial",
    objetivo: "Comprender qué es la inteligencia artificial y cómo utilizarla como herramienta de apoyo cotidiano.",
    inicio: "Se presenta la IA con ejemplos cotidianos: asistentes de voz (Siri, Alexa), recomendaciones de YouTube o Netflix, Google Translate. Se explora cómo la IA está presente en la vida diaria sin que nos demos cuenta.",
    desarrollo: "Introducción práctica a ChatGPT: qué es, cómo escribirle preguntas y leer sus respuestas. Los participantes practican hacer preguntas simples: recetas, consejos de salud, definiciones, traducción de palabras. Se exploran herramientas de IA para el adulto mayor: asistentes de voz, apps de memoria, traducción automática.",
    cierre: "Se reflexiona sobre los usos responsables de la IA: qué puede y qué no puede hacer. Se responden dudas y se entrega una guía de uso básico."
  },
  {
    num: "Sesión 6",
    emoji: "💻",
    title: "Herramientas de Microsoft",
    objetivo: "Familiarizarse con el entorno de Microsoft Office y sus aplicaciones más comunes.",
    inicio: "Se presenta Microsoft Office como suite de productividad. Los participantes identifican cuándo han visto o usado Word, Excel o PowerPoint en su vida cotidiana o laboral.",
    desarrollo: "Introducción a Microsoft Word: abrir un documento, escribir texto, cambiar tamaño de letra, guardar un archivo. Se presentan OneDrive y Outlook como herramientas de almacenamiento y correo empresarial. Práctica guiada: cada participante redacta una carta breve personal en Word.",
    cierre: "Se guarda y comparte el documento creado. Se presenta la diferencia entre Word (escritura), Excel (datos) y PowerPoint (presentaciones) de manera visual y sencilla."
  },
  {
    num: "Sesión 7",
    emoji: "📊",
    title: "PowerPoint y Excel",
    objetivo: "Crear presentaciones básicas en PowerPoint y manejar datos simples en Excel.",
    inicio: "Repaso general del curso. Se motiva a los participantes a reconocer todo lo que han aprendido. Se presenta qué son PowerPoint y Excel con ejemplos de la vida real: álbum de fotos digital, lista de gastos del hogar.",
    desarrollo: "En PowerPoint: los participantes crean una presentación de 3 diapositivas con fotos y texto. Aprenden a insertar imágenes, cambiar fondos y agregar textos. En Excel: se construye una tabla simple con gastos del hogar o lista de contactos. Se practican sumas automáticas con fórmulas básicas (=SUMA).",
    cierre: "Ceremonia de cierre del curso. Cada participante comparte su presentación de PowerPoint con el grupo. Se entregan certificados de participación y se celebra el aprendizaje logrado juntos."
  }
];

// ─── RESPUESTAS SIMULADAS (modo offline) ─────────────────────
const smartResponses = [
  {
    keys: ["hola", "buenas", "saludos", "hey"],
    resp: "¡Hola! 😊 Es un gusto saludarte. Estoy aquí para ayudarte con cualquier duda sobre tecnología. ¿Qué quieres aprender hoy?"
  },
  {
    keys: ["internet", "qué es internet", "web"],
    resp: "Internet es como una gran red mundial que conecta millones de computadores, teléfonos y tablets 🌐. Es como una autopista invisible que nos permite comunicarnos, buscar información, ver videos y mucho más. Para conectarte, necesitas un dispositivo y un proveedor de internet (como Claro, Tigo o ETB en Colombia)."
  },
  {
    keys: ["google", "buscar", "buscador"],
    resp: "Google es el buscador más popular del mundo 🔍. Para usarlo, solo escribe en la barra de búsqueda lo que quieres saber — por ejemplo: 'farmacias cerca de mí' o 'receta de ajiaco'. Google también ofrece Gmail (correo), Maps (mapas), Drive (guardar archivos) y YouTube (videos). ¡Todo gratis!"
  },
  {
    keys: ["fraude", "estafa", "seguridad", "robo", "peligro"],
    resp: "¡Muy buena pregunta! 🛡️ Los fraudes digitales más comunes son:\n• Mensajes falsos que dicen que ganaste un premio\n• Llamadas de personas que dicen ser del banco\n• Correos con links sospechosos\n\nRegla de oro: NUNCA compartas tu contraseña, número de tarjeta o código de seguridad con nadie por teléfono o mensaje. Si algo parece muy bueno para ser verdad, ¡probablemente lo es!"
  },
  {
    keys: ["excel", "hoja de calculo", "tabla"],
    resp: "Excel es un programa de Microsoft para organizar información en tablas 📊. Es como un cuaderno cuadriculado digital. Puedes usarlo para:\n• Llevar cuentas del hogar\n• Hacer listas de contactos\n• Calcular gastos automáticamente\n\nLa fórmula más útil para empezar es =SUMA(A1:A5) que suma varios números automáticamente."
  },
  {
    keys: ["inteligencia artificial", "ia", "chatgpt", "robot"],
    resp: "La inteligencia artificial (IA) es tecnología que imita la capacidad de pensar de los humanos 🤖. Ya la usas sin darte cuenta: cuando YouTube te recomienda videos, cuando el teléfono corrige tu escritura o cuando Google Maps te da la mejor ruta. ChatGPT es una IA que puedes usar para hacer preguntas, obtener recetas, traducir textos y mucho más."
  },
  {
    keys: ["correo", "email", "gmail", "mensaje"],
    resp: "El correo electrónico (email) es como una carta digital ✉️. Con Gmail (de Google) puedes:\n• Enviar mensajes a familiares y amigos\n• Recibir facturas y documentos\n• Comunicarte con médicos o instituciones\n\nPara crear una cuenta en Gmail, visita gmail.com y haz clic en 'Crear cuenta'. ¡Es gratis y muy fácil!"
  },
  {
    keys: ["videollamada", "video", "meet", "llamada", "zoom"],
    resp: "Las videollamadas te permiten ver y hablar con personas en tiempo real, sin importar dónde estén 📱. Google Meet es muy fácil de usar: solo necesitas el enlace de la reunión y hacer clic para unirte. WhatsApp también tiene videollamadas gratis. ¡Es perfecto para hablar con la familia!"
  },
  {
    keys: ["powerpoint", "presentacion", "diapositivas"],
    resp: "PowerPoint es el programa de Microsoft para crear presentaciones con diapositivas 📽️. Puedes agregar texto, fotos, colores y hasta música. Es muy útil para hacer:\n• Un álbum de fotos familiar digital\n• Una presentación para un evento\n• Un portafolio de tus hobbies\n\n¡En la Sesión 7 del curso aprendemos a usarlo paso a paso!"
  },
  {
    keys: ["ayuda", "no entiendo", "no sé", "como"],
    resp: "¡No te preocupes! Aprender tecnología toma su tiempo y está perfectamente bien tener dudas 💪. Te recomiendo explorar las 7 sesiones del curso — están diseñadas especialmente para ir de lo más básico a lo más avanzado. ¿Sobre qué tema específico necesitas ayuda?"
  }
];

function getSmartResponse(msg) {
  const lower = msg.toLowerCase();
  for (const item of smartResponses) {
    if (item.keys.some(k => lower.includes(k))) return item.resp;
  }
  return `Gracias por tu pregunta sobre "${msg}" 😊. Este es un tema interesante. Te recomiendo explorarlo en las sesiones del curso, donde encontrarás información detallada. Si tienes más preguntas sobre Google, internet, Excel, seguridad digital o inteligencia artificial, ¡con gusto te ayudo!`;
}

// ─── LOADER ───────────────────────────────────────────────────
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("hidden");
  }, 1200);
});

// ─── NAVBAR SCROLL ────────────────────────────────────────────
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
  // Active link
  const sections = ["inicio", "sesiones", "recursos", "chatbot"];
  let current = "inicio";
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 100) current = id;
  });
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
  // Back to top
  document.getElementById("back-top").classList.toggle("visible", window.scrollY > 400);
});

// ─── HAMBURGER MENU ──────────────────────────────────────────
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});
document.querySelectorAll(".mobile-link").forEach(l => {
  l.addEventListener("click", () => mobileMenu.classList.remove("open"));
});

// ─── DARK MODE ────────────────────────────────────────────────
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
let isDark = localStorage.getItem("theme") === "dark";

function applyTheme() {
  document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  themeIcon.textContent = isDark ? "☀️" : "🌙";
}
applyTheme();

themeToggle.addEventListener("click", () => {
  isDark = !isDark;
  localStorage.setItem("theme", isDark ? "dark" : "light");
  applyTheme();
});

// ─── BACK TO TOP ─────────────────────────────────────────────
document.getElementById("back-top").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ─── SCROLL REVEAL ───────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// ─── RENDER SESSIONS ─────────────────────────────────────────
const container = document.getElementById("sessions-container");

sessions.forEach((s, i) => {
  const card = document.createElement("div");
  card.className = "session-card";
  card.style.animationDelay = `${i * 0.1}s`;
  card.innerHTML = `
    <div class="session-num">${s.num}</div>
    <div class="session-emoji">${s.emoji}</div>
    <h3 class="session-title">${s.title}</h3>
    <p class="session-obj">${s.objetivo}</p>
    <button class="session-expand-btn" data-idx="${i}">
      Ver detalle
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
    </button>
  `;
  container.appendChild(card);
});

// Observe cards
document.querySelectorAll(".session-card").forEach(el => {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.style.opacity = "1"; obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  obs.observe(el);
});

// ─── SESSION MODAL ───────────────────────────────────────────
const modal = document.getElementById("session-modal");
const modalContent = document.getElementById("modal-content");
const modalClose = document.getElementById("modal-close");

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".session-expand-btn");
  if (!btn) return;
  const s = sessions[parseInt(btn.dataset.idx)];
  modalContent.innerHTML = `
    <div class="session-num">${s.num} · ${s.emoji}</div>
    <h2 class="modal-title">${s.title}</h2>
    <p class="modal-subtitle">Duración estimada: 90 minutos</p>
    <div class="modal-divider"></div>
    <div class="modal-section">
      <h4>🎯 Objetivo de aprendizaje</h4>
      <p>${s.objetivo}</p>
    </div>
    <div class="modal-section">
      <h4>🟢 Inicio</h4>
      <p>${s.inicio}</p>
    </div>
    <div class="modal-section">
      <h4>📖 Desarrollo</h4>
      <p>${s.desarrollo}</p>
    </div>
    <div class="modal-section">
      <h4>✅ Cierre</h4>
      <p>${s.cierre}</p>
    </div>
  `;
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
});

function closeModal() {
  modal.classList.add("hidden");
  document.body.style.overflow = "";
}
modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

// ─── CHATBOT ─────────────────────────────────────────────────
const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");
const chatSend = document.getElementById("chat-send");
const chatClear = document.getElementById("chat-clear");
let conversationHistory = [];

function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addMessage(content, role) {
  const div = document.createElement("div");
  div.className = `msg ${role === "user" ? "user-msg" : "bot-msg"}`;
  div.innerHTML = `
    <div class="msg-avatar">${role === "user" ? "👴" : "🤖"}</div>
    <div class="msg-bubble">${content.replace(/\n/g, "<br/>")}</div>
  `;
  chatMessages.appendChild(div);
  scrollToBottom();
}

function showTyping() {
  const div = document.createElement("div");
  div.className = "msg bot-msg";
  div.id = "typing-indicator";
  div.innerHTML = `
    <div class="msg-avatar">🤖</div>
    <div class="msg-bubble typing-bubble">
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
    </div>
  `;
  chatMessages.appendChild(div);
  scrollToBottom();
}

function removeTyping() {
  const el = document.getElementById("typing-indicator");
  if (el) el.remove();
}

async function sendMessage() {
  const msg = chatInput.value.trim();
  if (!msg) return;

  chatInput.value = "";
  chatSend.disabled = true;
  addMessage(msg, "user");
  conversationHistory.push({ role: "user", content: msg });
  showTyping();

  try {
    let reply;

    if (GROQ_API_KEY) {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          max_tokens: 400,
          messages: [
            {
              role: "system",
              content: `Eres un asistente educativo amigable y paciente que ayuda a adultos mayores a aprender tecnología de forma simple y clara. Responde siempre en español, usando un lenguaje sencillo, cálido y sin tecnicismos. Usa emojis ocasionalmente. Puedes ayudar con: internet, Google, Gmail, Excel, PowerPoint, seguridad digital, inteligencia artificial y videollamadas.`
            },
            ...conversationHistory
          ]
        })
      });

      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      reply = data.choices[0].message.content;
      conversationHistory.push({ role: "assistant", content: reply });

    } else {
      // ── MODO SIMULADO ─────────────────────────────────
      await new Promise(r => setTimeout(r, 1200 + Math.random() * 800));
      reply = getSmartResponse(msg);
    }

    removeTyping();
    addMessage(reply, "bot");

  } catch (err) {
    removeTyping();
    addMessage("Lo siento, tuve un problema al conectarme 😔. Por favor intenta de nuevo en unos momentos.", "bot");
    console.error("Chat error:", err);
  }

  chatSend.disabled = false;
  chatInput.focus();
}

chatSend.addEventListener("click", sendMessage);
chatInput.addEventListener("keydown", e => {
  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
});

// Suggestion chips
document.querySelectorAll(".suggestion-chip").forEach(chip => {
  chip.addEventListener("click", () => {
    chatInput.value = chip.dataset.q;
    sendMessage();
  });
});

// Clear chat
chatClear.addEventListener("click", () => {
  conversationHistory = [];
  chatMessages.innerHTML = `
    <div class="msg bot-msg">
      <div class="msg-avatar">🤖</div>
      <div class="msg-bubble">Chat reiniciado. ¡Hola de nuevo! ¿En qué puedo ayudarte hoy? 😊</div>
    </div>
  `;
});

// ─── SMOOTH SCROLL para nav links ────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const offset = 72;
      window.scrollTo({ top: target.offsetTop - offset, behavior: "smooth" });
    }
  });
});
