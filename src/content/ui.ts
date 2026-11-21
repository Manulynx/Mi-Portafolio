import type { Locale } from "./profile";

export const locales = ["es", "en"] as const satisfies readonly Locale[];
export const defaultLocale: Locale = "es";

export const hasLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);

/** Periods in profile.ts are written in Spanish ("presente"); localize on render. */
export const fmtPeriod = (period: string, lang: Locale) =>
  lang === "en" ? period.replace("presente", "present") : period;

const es = {
  nav: { about: "Sobre mí", research: "Investigación", publications: "Publicaciones", projects: "Proyectos", experience: "Experiencia", contact: "Contacto" },
  hero: { askAi: "Pregúntale a mi IA", contact: "Contactar", cv: "Descargar CV" },
  sections: {
    about: "Sobre mí",
    research: "Investigación",
    interests: "Líneas de interés",
    publications: "Publicaciones y ponencias",
    projects: "Proyectos de software",
    experience: "Experiencia",
    teaching: "Docencia",
    skills: "Stack",
    contact: "Contacto",
  },
  research: { current: "En curso" },
  pubs: { firstAuthor: "Primer autor", conference: "Congreso", journal: "Revista", poster: "Póster", view: "Ver artículo" },
  projects: { visit: "Ver sitio", noImage: "Sin capturas públicas" },
  contact: {
    intro: "¿Una colaboración, una oferta o una pregunta sobre mi investigación? Escríbeme y te responderé por email.",
    name: "Nombre",
    email: "Email",
    message: "Mensaje",
    send: "Enviar mensaje",
    sending: "Enviando…",
    ok: "¡Mensaje enviado! Te responderé pronto.",
    error: "No se pudo enviar. Inténtalo de nuevo o escríbeme directamente por email.",
    invalid: "Revisa los campos: nombre, un email válido y un mensaje de al menos 10 caracteres.",
  },
  chat: {
    title: "Pregúntale a la IA de Manuel",
    disclaimer: "Respuestas generadas por IA a partir de su CV público. Pueden contener errores: para algo importante, usa el formulario.",
    placeholder: "Ej.: ¿En qué consiste su investigación?",
    send: "Enviar",
    open: "Abrir chat",
    close: "Cerrar chat",
    suggestions: ["¿Qué investiga Manuel?", "¿Qué proyectos web ha hecho?", "¿Con qué tecnologías trabaja?"],
    error: "No pude responder ahora. Prueba de nuevo en un momento o usa el formulario de contacto.",
    limited: "Se alcanzó el límite de preguntas por ahora. Puedes escribirle directamente con el formulario de contacto.",
  },
  theme: { toggle: "Cambiar tema" },
  lang: { switch: "English", label: "Cambiar idioma" },
  footer: { built: "Hecho con Next.js · desplegado en Vercel", top: "Volver arriba" },
  skip: "Saltar al contenido",
};

export type Dict = typeof es;

const en: Dict = {
  nav: { about: "About", research: "Research", publications: "Publications", projects: "Projects", experience: "Experience", contact: "Contact" },
  hero: { askAi: "Ask my AI", contact: "Get in touch", cv: "Download CV" },
  sections: {
    about: "About me",
    research: "Research",
    interests: "Research interests",
    publications: "Publications & talks",
    projects: "Software projects",
    experience: "Experience",
    teaching: "Teaching",
    skills: "Stack",
    contact: "Contact",
  },
  research: { current: "Ongoing" },
  pubs: { firstAuthor: "First author", conference: "Conference", journal: "Journal", poster: "Poster", view: "View article" },
  projects: { visit: "Visit site", noImage: "No public screenshots" },
  contact: {
    intro: "A collaboration, a job offer or a question about my research? Write to me and I'll reply by email.",
    name: "Name",
    email: "Email",
    message: "Message",
    send: "Send message",
    sending: "Sending…",
    ok: "Message sent! I'll get back to you soon.",
    error: "Could not send. Please try again or email me directly.",
    invalid: "Please check the fields: name, a valid email and a message of at least 10 characters.",
  },
  chat: {
    title: "Ask Manuel's AI",
    disclaimer: "AI-generated answers based on his public CV. They may contain mistakes: for anything important, use the contact form.",
    placeholder: "e.g. What is his research about?",
    send: "Send",
    open: "Open chat",
    close: "Close chat",
    suggestions: ["What does Manuel research?", "What web projects has he built?", "Which technologies does he use?"],
    error: "I couldn't answer right now. Try again in a moment or use the contact form.",
    limited: "The question limit has been reached for now. You can reach him directly through the contact form.",
  },
  theme: { toggle: "Toggle theme" },
  lang: { switch: "Español", label: "Change language" },
  footer: { built: "Built with Next.js · deployed on Vercel", top: "Back to top" },
  skip: "Skip to content",
};

export const dictionaries: Record<Locale, Dict> = { es, en };
