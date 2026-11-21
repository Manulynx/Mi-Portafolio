# Portafolio · Manuel Marín

Sitio personal bilingüe (ES/EN): investigación en PLN / traducción automática a Lengua de Señas Chilena, publicaciones, proyectos de software, docencia y contacto. Incluye un chat de IA que responde preguntas sobre mi perfil.

**Stack:** Next.js 16 (App Router, TypeScript) · Tailwind CSS 4 · Vercel · Groq (LLM, plan gratuito) · Formspree (formulario, plan gratuito) · Vitest.

## Estructura

```
src/
├── content/profile.ts     ← ÚNICA fuente de verdad (página, JSON-LD y chat)
├── content/ui.ts          ← textos de interfaz ES/EN
├── app/[lang]/            ← layout + página por idioma (/es, /en)
├── app/api/chat/          ← proxy al LLM (la API key nunca llega al navegador)
├── app/api/contact/       ← validación + reenvío a Formspree
├── components/            ← header, chat, formulario, galería
├── lib/                   ← prompt del chat, validaciones, rate limit, locale
└── proxy.ts               ← redirige "/" según Accept-Language
public/cv/                 ← CVs publicados (ES/EN)
tests/                     ← tests unitarios
```

Para actualizar el contenido, edita **solo** `src/content/profile.ts`. No agregues datos privados (RUT, dirección, fecha de nacimiento, teléfono): ese archivo se envía al proveedor del LLM.

## Desarrollo local

```bash
npm install
cp .env.example .env.local   # y completa las variables
npm run dev                  # http://localhost:3000
npm test                     # tests unitarios
npm run lint && npm run build
```

## Variables de entorno

| Variable | Uso |
|---|---|
| `GROQ_API_KEY` | Key de [console.groq.com](https://console.groq.com) (plan Free, sin tarjeta → nunca genera cobros) |
| `GROQ_MODEL` | Opcional. Por defecto `openai/gpt-oss-120b`; si se agota la cuota, el chat usa `openai/gpt-oss-20b` |
| `FORMSPREE_FORM_ID` | ID del formulario de [formspree.io](https://formspree.io) |
| `NEXT_PUBLIC_SITE_URL` | Opcional. URL canónica (p. ej. dominio propio); en Vercel se usa la URL de producción automáticamente |

## Despliegue (Vercel, plan Hobby)

1. Importar el repo en [vercel.com/new](https://vercel.com/new).
2. Definir las variables de entorno anteriores en *Settings → Environment Variables*.
3. Cada push a `main` despliega a producción; cada rama/PR genera una preview.

## Límites conocidos

- Groq Free: ~8.000 tokens/min y 1.000 solicitudes/día por modelo. El prompt ocupa ~2.600 tokens, así que bajo ráfagas el chat puede pedir esperar; las respuestas a preguntas de un solo turno se cachean.
- El rate limit por IP es en memoria (por instancia serverless): frena el abuso casual, pero no es global.
- Las respuestas del chat son generadas por IA y pueden contener errores; el widget lo indica.
