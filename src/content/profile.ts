/**
 * Single source of truth for the portfolio.
 *
 * Feeds the page, the JSON-LD metadata and the AI chat system prompt.
 * Every fact here comes from the CVs in the repo (CV_Manuel_Marin_*.pdf, CVs.pdf).
 * Do NOT add private data (RUT, birth date, home address, phone): this file is public
 * and is sent verbatim to the LLM provider.
 */

export type Locale = "es" | "en";
export type L = Record<Locale, string>;

/** Resolve a possibly-localized string. */
export const tr = (v: string | L, lang: Locale): string => (typeof v === "string" ? v : v[lang]);

export interface Link {
  label: L;
  href: string;
}

export interface ResearchProject {
  id: string;
  title: L;
  funding: string;
  role: L;
  period: string;
  lead: L;
  summary: L;
  highlights: L[];
  tags: string[];
  current: boolean;
}

export interface Publication {
  authors: string;
  title: string;
  venue: string;
  year: number;
  type: "conference" | "journal" | "poster";
  status: L;
  firstAuthor: boolean;
  url?: string;
}

export interface Job {
  org: string;
  role: L;
  period: string;
  place: L;
  bullets: L[];
  url?: string;
}

export interface Project {
  id: string;
  name: string | L;
  kind: L;
  summary: L;
  features: L[];
  stack: string[];
  images: { src: string; alt: L }[];
  url?: string;
  status: L;
}

export interface SkillGroup {
  name: L;
  items: string[];
}

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const profile = {
  siteUrl: SITE_URL,
  name: "Manuel Marín",
  fullName: "Manuel Ernesto Marín Castillo",
  photo: "/img/manuel.jpg",
  headline: {
    es: "Ingeniero de software · Investigador en PLN",
    en: "Software engineer · NLP researcher",
  } satisfies L,
  tagline: {
    es: "Doctorando en Ingeniería Informática Aplicada en la Universidad de Valparaíso. Investigo traducción automática de español a glosas de Lengua de Señas Chilena y he llevado aplicaciones web a producción para clientes reales.",
    en: "PhD student in Applied Computer Engineering at Universidad de Valparaíso. I research machine translation from Spanish to Chilean Sign Language glosses, and I have shipped production web applications for real clients.",
  } satisfies L,
  location: { es: "Valparaíso, Chile", en: "Valparaíso, Chile" } satisfies L,
  email: "manuelmkt.marin1@gmail.com",
  orcid: "0009-0004-0867-7216",
  links: {
    github: "https://github.com/Manulynx",
    linkedin: "https://www.linkedin.com/in/manuel-marin-castillo-0b205237a/",
    orcid: "https://orcid.org/0009-0004-0867-7216",
    studio: "https://mcdevstudio.online/",
  },
  cv: {
    es: "/cv/cv-manuel-marin-es.pdf",
    en: "/cv/cv-manuel-marin-en.pdf",
  } satisfies L,
  languages: {
    es: "Español (nativo) · Inglés (B1)",
    en: "Spanish (native) · English (B1)",
  } satisfies L,

  about: [
    {
      es: "Soy Ingeniero en Ciencias Informáticas (UCI, Cuba, 2024) y actualmente curso el Doctorado en Ingeniería Informática Aplicada en la Universidad de Valparaíso, donde trabajo como personal técnico de investigación en el proyecto FONDECYT 1250344.",
      en: "I hold a Computer Science Engineering degree (UCI, Cuba, 2024) and I am currently a PhD student in Applied Computer Engineering at Universidad de Valparaíso, where I work as research technical staff on FONDECYT project 1250344.",
    },
    {
      es: "Mi línea de investigación es la traducción automática a Lengua de Señas Chilena (LSCh): construcción de corpus paralelos español–glosa, fine-tuning de modelos seq2seq (T5, mT5) y evaluación reproducible.",
      en: "My research line is machine translation into Chilean Sign Language (LSCh): building Spanish–gloss parallel corpora, fine-tuning seq2seq models (T5, mT5) and reproducible evaluation.",
    },
    {
      es: "Antes fundé y dirigí M&C Dev Studio: un equipo de 3 personas, 7 proyectos entregados a clientes y 4 en producción, desde el levantamiento de requisitos hasta el despliegue y el soporte.",
      en: "Before that I founded and led M&C Dev Studio: a 3-person team, 7 client projects delivered and 4 in production, from requirements gathering to deployment and support.",
    },
  ] satisfies L[],

  stats: [
    { value: "5", label: { es: "publicaciones y ponencias aceptadas", en: "accepted papers & talks" } },
    { value: "7", label: { es: "proyectos web entregados", en: "web projects delivered" } },
    { value: "48.036", label: { es: "parches de imágenes médicas procesados", en: "medical image patches processed" } },
    { value: "3", label: { es: "tesis de pregrado tutoradas", en: "undergraduate theses supervised" } },
  ] satisfies { value: string; label: L }[],

  research: [
    {
      id: "fondecyt-1250344",
      title: {
        es: "Traducción automática de español a Lengua de Señas Chilena",
        en: "Machine translation from Spanish to Chilean Sign Language",
      },
      funding: "FONDECYT Regular N° 1250344",
      role: { es: "Personal técnico de investigación · IA y PLN", en: "Research technical staff · AI & NLP" },
      period: "06/2026 – presente",
      lead: { es: "Investigadora responsable: Dra. Ana Aguilera Faraco", en: "Principal investigator: Dr. Ana Aguilera Faraco" },
      summary: {
        es: "“A Translation System Based on a Hybrid Neural Machine Applied to Sign Language Production”. Construyo el corpus paralelo Chilean2Sign y entreno modelos texto→glosa.",
        en: "“A Translation System Based on a Hybrid Neural Machine Applied to Sign Language Production”. I build the Chilean2Sign parallel corpus and train text-to-gloss models.",
      },
      highlights: [
        {
          es: "Corpus paralelo español–glosa Chilean2Sign construido a partir de anotaciones ELAN: exportación por scripts, normalización y control de calidad.",
          en: "Chilean2Sign Spanish–gloss parallel corpus built from ELAN annotations: script-based export, normalization and quality checks.",
        },
        {
          es: "Fine-tuning de T5/mT5 en el clúster HPC Patagón, con evaluación comparada frente a corpus LSM (México) y PHOENIX-2014-T (Alemania).",
          en: "T5/mT5 fine-tuning on the Patagón HPC cluster, evaluated against LSM (Mexico) and PHOENIX-2014-T (Germany) corpora.",
        },
        {
          es: "Particiones sin fuga de datos entre validación y prueba; protocolo aprobado por el Comité de Ética Científica UV.",
          en: "Leakage-free validation/test splits; protocol approved by the UV Scientific Ethics Committee.",
        },
        {
          es: "Resultados: dos artículos como primer autor presentados en ponencia oral en JCC 2026 (actas por publicarse) y artículo de datos sobre el corpus en preparación para Data in Brief.",
          en: "Outcomes: two first-author papers presented orally at JCC 2026 (proceedings forthcoming) and a data paper on the corpus in preparation for Data in Brief.",
        },
      ],
      tags: ["NMT", "T5", "mT5", "Hugging Face", "ELAN", "HPC"],
      current: true,
    },
    {
      id: "cidi-20",
      title: {
        es: "Modelado de la evolución histopatológica con modelos de difusión",
        en: "Modeling histopathological evolution with diffusion models",
      },
      funding: "Proyecto CIDI N° 20 · Centro MEDING",
      role: { es: "Personal técnico de investigación · Visión por computador", en: "Research technical staff · Computer vision" },
      period: "05/2026 – 07/2026",
      lead: { es: "Director: Dr. Rodrigo Salas Fuentes", en: "Director: Dr. Rodrigo Salas Fuentes" },
      summary: {
        es: "Pipeline completo sobre TCGA-BRCA y entrenamiento de un modelo de campo de deriva sobre embeddings PixCell.",
        en: "End-to-end pipeline on TCGA-BRCA and training of a drifting-field model on PixCell embeddings.",
      },
      highlights: [
        {
          es: "Curación de 29 pacientes vía GDC API y generación de 48.036 parches histopatológicos con control de calidad.",
          en: "Curation of 29 patients via the GDC API and generation of 48,036 quality-checked histopathology patches.",
        },
        {
          es: "Modelo de campo de deriva (Drifting Models) sobre embeddings PixCell (ViT-B/16) en HDF5, con baseline ResNet-50, entrenado en PyTorch con 3 GPUs.",
          en: "Drifting Models trained in PyTorch on 3 GPUs over PixCell (ViT-B/16) embeddings stored in HDF5, with a ResNet-50 baseline.",
        },
        {
          es: "Entrega en plazo de los cuatro productos comprometidos: repositorio reproducible, dataset, informe técnico y visualizaciones (UMAP, curvas ROC).",
          en: "All four committed deliverables on time: reproducible repository, dataset, technical report and visualizations (UMAP, ROC curves).",
        },
      ],
      tags: ["PyTorch", "Multi-GPU", "ViT", "ResNet-50", "HDF5"],
      current: false,
    },
    {
      id: "tesis-uci",
      title: {
        es: "Clasificación de anomalías en radiografías con aprendizaje profundo",
        en: "Deep learning classification of abnormalities in X-ray images",
      },
      funding: "Tesis de pregrado · UCI",
      role: { es: "Autor de la tesis", en: "Thesis author" },
      period: "2024",
      lead: { es: "Tutor: Mag. David Alonso Díaz", en: "Advisor: David Alonso Díaz, MSc" },
      summary: {
        es: "Herramienta de apoyo docente para clasificar anomalías en imágenes radiográficas.",
        en: "Teaching-support tool for classifying abnormalities in radiographic images.",
      },
      highlights: [],
      tags: ["Deep learning", "Computer vision"],
      current: false,
    },
  ] satisfies ResearchProject[],

  interests: [
    { es: "Procesamiento de lenguaje natural y traducción automática de lenguas de señas", en: "Natural language processing and sign language machine translation" },
    { es: "Construcción y evaluación de corpus para lenguas de señas", en: "Building and evaluating sign language corpora" },
    { es: "Tecnologías de accesibilidad para la comunidad sorda", en: "Accessibility technology for the Deaf community" },
    { es: "Aprendizaje automático y ciencia de datos", en: "Machine learning and data science" },
  ] satisfies L[],

  publications: [
    {
      authors: "Marín Castillo, M. E., & Aguilera, A.",
      title: "Evaluating Text-to-Gloss Sign Language Translation Across Chilean, Mexican, and German Corpora",
      venue: "JCC 2026, Talca, Chile",
      year: 2026,
      type: "conference",
      status: { es: "Ponencia oral presentada · actas por publicarse", en: "Oral presentation delivered · proceedings forthcoming" },
      firstAuthor: true,
    },
    {
      authors: "Marín Castillo, M. E., Oramas Romero, D., & Alonso Díaz, D.",
      title: "Comparative Evaluation of Large Language Model Assistants for Python Data Science Tasks",
      venue: "JCC 2026, Talca, Chile",
      year: 2026,
      type: "conference",
      status: { es: "Ponencia oral presentada · actas por publicarse", en: "Oral presentation delivered · proceedings forthcoming" },
      firstAuthor: true,
    },
    {
      authors: "Oramas Romero, D., Vargas, H., Marín Castillo, M. E., Cechinel, C., & Muñoz, R.",
      title: "Learning Analytics for Competency Assessment in LMS: A Systematic Mapping Study",
      venue: "TICXED, JCC 2026, Talca, Chile",
      year: 2026,
      type: "conference",
      status: { es: "Aceptado", en: "Accepted" },
      firstAuthor: false,
    },
    {
      authors: "Oramas Romero, D., Marín Castillo, M. E., Alonso Díaz, D., & Merced Len, S.",
      title: "Percepción estudiantil sobre el uso de sistemas conversacionales en la Licenciatura en Cultura Física",
      venue: "Acción, 21",
      year: 2025,
      type: "journal",
      status: { es: "Publicado", en: "Published" },
      firstAuthor: false,
      url: "https://accion.uccfd.cu/index.php/accion/article/view/22",
    },
    {
      authors: "Marín Castillo, M. E.",
      title: "Derivación y evaluación de principios de diseño para una plataforma móvil de aprendizaje personalizado y orientación laboral dirigida a jóvenes vulnerables",
      venue: "IV Congreso CINVIE, Valparaíso, Chile",
      year: 2026,
      type: "poster",
      status: { es: "Póster presentado", en: "Poster presented" },
      firstAuthor: true,
    },
  ] satisfies Publication[],

  experience: [
    {
      org: "Universidad de Valparaíso",
      role: { es: "Personal técnico de investigación (FONDECYT 1250344 · CIDI N° 20)", en: "Research technical staff (FONDECYT 1250344 · CIDI No. 20)" },
      period: "05/2026 – presente",
      place: { es: "Valparaíso, Chile", en: "Valparaíso, Chile" },
      bullets: [
        { es: "PLN y traducción automática a LSCh; visión por computador sobre imágenes médicas. Detalle en Investigación.", en: "NLP and machine translation into LSCh; computer vision on medical images. Details under Research." },
      ],
    },
    {
      org: "M&C Dev Studio",
      role: { es: "Fundador y desarrollador líder", en: "Founder & lead developer" },
      period: "01/2025 – 04/2026",
      place: { es: "La Habana, Cuba", en: "Havana, Cuba" },
      url: "https://mcdevstudio.online/",
      bullets: [
        { es: "Dirección de un equipo de 3 personas; 7 proyectos para clientes, 4 desplegados en producción.", en: "Led a 3-person team; 7 client projects, 4 deployed to production." },
        { es: "Ciclo completo: levantamiento de requisitos, modelado de datos, desarrollo, despliegue, soporte y mantenimiento.", en: "Full cycle: requirements, data modeling, development, deployment, support and maintenance." },
        { es: "Sistemas de gestión (acopio, remesas y pagos), tienda en línea y catálogos web; uno integrado con un ERP con módulo de comisiones y portal de afiliados.", en: "Management systems (inventory/collection, remittances and payments), an online store and web catalogs; one integrated with an ERP with commissions and an affiliate portal." },
      ],
    },
    {
      org: "Universidad de las Ciencias Informáticas (UCI)",
      role: { es: "Desarrollador full stack", en: "Full stack developer" },
      period: "2023 – 2024",
      place: { es: "La Habana, Cuba", en: "Havana, Cuba" },
      bullets: [
        { es: "Sitio web para la gestión del menú del comedor universitario y capacitación del equipo.", en: "University cafeteria menu management website; trained team members." },
      ],
    },
  ] satisfies Job[],

  teaching: [
    {
      org: "Universidad de Valparaíso",
      role: { es: "Ayudante de Bases de Datos 3", en: "Database Systems III teaching assistant" },
      period: "09/2026 – presente",
      place: { es: "Valparaíso, Chile", en: "Valparaíso, Chile" },
      bullets: [{ es: "Corrección de evaluaciones y retroalimentación a 14 estudiantes de pregrado.", en: "Grading and feedback for 14 undergraduate students." }],
    },
    {
      org: "Universidad de las Ciencias Informáticas (UCI)",
      role: { es: "Profesor de Introducción a la Programación", en: "Introduction to Programming lecturer" },
      period: "09/2024 – 04/2026",
      place: { es: "La Habana, Cuba", en: "Havana, Cuba" },
      bullets: [
        { es: "4 semestres; diseño de material, ejercicios y proyectos orientados al pensamiento algorítmico.", en: "4 semesters; designed materials, exercises and projects focused on algorithmic thinking." },
        { es: "Apoyo a la gestión de la Maestría en Gestión de Proyectos.", en: "Supported the administration of the Project Management master's program." },
      ],
    },
    {
      org: "Universidad de las Ciencias Informáticas (UCI)",
      role: { es: "Ayudante de Estructura de Datos 1", en: "Data Structures I teaching assistant" },
      period: "09/2022 – 02/2023",
      place: { es: "La Habana, Cuba", en: "Havana, Cuba" },
      bullets: [{ es: "Clases prácticas para 2 grupos de más de 30 estudiantes.", en: "Lab sessions for 2 groups of 30+ students." }],
    },
    {
      org: "UCI · Universidad de Granma",
      role: { es: "Tutor de 3 trabajos de diploma", en: "Supervisor of 3 undergraduate theses" },
      period: "2024 – 2026",
      place: { es: "Cuba", en: "Cuba" },
      bullets: [
        { es: "Recomendación con redes neuronales de grafos, portal web de memoria histórica deportiva y sistema de gestión de inventario.", en: "Graph neural network recommendations, a sports heritage web portal and an inventory management system." },
      ],
    },
  ] satisfies Job[],

  projects: [
    {
      id: "kitaluro",
      name: "Kitaluro",
      kind: { es: "Tienda en línea", en: "Online store" },
      summary: {
        es: "Tienda en línea en producción, con diseño limpio enfocado en la experiencia de usuario y la conversión.",
        en: "Online store in production, with a clean design focused on user experience and conversion.",
      },
      features: [
        { es: "Catálogo de productos con categorías", en: "Product catalog with categories" },
        { es: "Panel de administración en Django", en: "Django admin panel" },
      ],
      stack: ["Python", "Django", "JavaScript"],
      images: [{ src: "/img/kitaluro-inicio.png", alt: { es: "Página de inicio de Kitaluro", en: "Kitaluro home page" } }],
      url: "https://www.kitaluro.com/",
      status: { es: "En producción", en: "In production" },
    },
    {
      id: "likehome",
      name: "LikeHome",
      kind: { es: "E-commerce y gestión de pedidos", en: "E-commerce & order management" },
      summary: {
        es: "Plataforma que centraliza inventario, pedidos, clientes e indicadores comerciales para gestores.",
        en: "Platform that centralizes inventory, orders, customers and business indicators for managers.",
      },
      features: [
        { es: "Inventario con seguimiento de existencias", en: "Inventory with stock tracking" },
        { es: "Carrito y procesamiento de pedidos", en: "Cart and order processing" },
        { es: "Control de acceso por roles", en: "Role-based access control" },
        { es: "Panel de estadísticas mensuales", en: "Monthly analytics dashboard" },
        { es: "Generación de PDFs de facturas y ofertas", en: "PDF generation for invoices and quotes" },
      ],
      stack: ["Python", "Django", "SQL", "REST API"],
      images: [
        { src: "/img/carrito-pc.png", alt: { es: "Carrito de compras en escritorio", en: "Shopping cart on desktop" } },
        { src: "/img/inicio-admin-like-home.png", alt: { es: "Panel de administración", en: "Admin dashboard" } },
        { src: "/img/inventario-like-home.png", alt: { es: "Gestión de inventario", en: "Inventory management" } },
        { src: "/img/estadisticas-pc.png", alt: { es: "Estadísticas de ventas", en: "Sales statistics" } },
      ],
      url: "https://ricardo397.pythonanywhere.com/",
      status: { es: "En producción", en: "In production" },
    },
    {
      id: "eglis",
      name: "Eglis S.A.",
      kind: { es: "Fintech · remesas y pagos", en: "Fintech · remittances & payments" },
      summary: {
        es: "Aplicación web de gestión de remesas y pagos para gestores, con análisis de datos comerciales e indicadores para la toma de decisiones.",
        en: "Remittance and payment management web app for agents, with business analytics and decision-making indicators.",
      },
      features: [
        { es: "Autenticación y autorización", en: "Authentication and authorization" },
        { es: "Registro y validación de transacciones", en: "Transaction recording and validation" },
        { es: "Dashboard administrativo con indicadores", en: "Admin dashboard with indicators" },
        { es: "Interfaz adaptable a móvil y escritorio", en: "Responsive mobile and desktop UI" },
      ],
      stack: ["Python", "Django", "JavaScript"],
      images: [
        { src: "/img/inicio-eglis.png", alt: { es: "Inicio de Eglis", en: "Eglis home" } },
        { src: "/img/eglis-formrem.png", alt: { es: "Formulario de remesas", en: "Remittance form" } },
        { src: "/img/eglis-formenv.png", alt: { es: "Formulario de envío", en: "Transfer form" } },
      ],
      status: { es: "Entregado al cliente", en: "Delivered to client" },
    },
    {
      id: "acopio",
      name: { es: "Sistema de acopio", en: "Collection management system" },
      kind: { es: "Sistema de gestión", en: "Management system" },
      summary: {
        es: "Sistema de gestión con modelado relacional y lógica de negocio para inventario, mercancía, arrendatarios, inmuebles, movimientos y ventas.",
        en: "Management system with relational modeling and business logic for inventory, goods, tenants, properties, transactions and sales.",
      },
      features: [],
      stack: ["Python", "Django", "SQL"],
      images: [],
      status: { es: "Entregado al cliente", en: "Delivered to client" },
    },
    {
      id: "coimpre",
      name: "Coimpre",
      kind: { es: "Catálogo empresarial", en: "Business catalog" },
      summary: {
        es: "Catálogo dinámico para una empresa de materiales de construcción, con categorías y panel para gestionar productos y precios.",
        en: "Dynamic catalog for a construction materials company, with categories and a panel to manage products and prices.",
      },
      features: [
        { es: "Gestión de productos, categorías y precios", en: "Product, category and price management" },
        { es: "Despliegue en PythonAnywhere", en: "Deployed on PythonAnywhere" },
      ],
      stack: ["Python", "Django", "Bootstrap", "SQLite"],
      images: [
        { src: "/img/inicio-de-coimpre.png", alt: { es: "Inicio de Coimpre", en: "Coimpre home" } },
        { src: "/img/catalogo-de-productos-coimpre.png", alt: { es: "Catálogo de productos", en: "Product catalog" } },
      ],
      status: { es: "Entregado al cliente", en: "Delivered to client" },
    },
    {
      id: "n3storg",
      name: "N3storg Touch",
      kind: { es: "Catálogo estático", en: "Static catalog" },
      summary: {
        es: "Catálogo de servicios de masajes estático y responsive, desplegado sin servidor en Cloudflare Pages.",
        en: "Static, responsive massage services catalog deployed serverless on Cloudflare Pages.",
      },
      features: [],
      stack: ["HTML", "CSS", "JavaScript"],
      images: [
        { src: "/img/catalogo-nestor-hero-section.png", alt: { es: "Portada del catálogo", en: "Catalog hero" } },
        { src: "/img/catalogo-nestor-main-section.png", alt: { es: "Sección de servicios", en: "Services section" } },
      ],
      status: { es: "Entregado al cliente", en: "Delivered to client" },
      url: "https://n3storg-touch-catalogo-de-masajes.pages.dev/",
    },
  ] satisfies Project[],

  skills: [
    { name: { es: "PLN y aprendizaje automático", en: "NLP & machine learning" }, items: ["PyTorch", "Hugging Face Transformers", "T5 / mT5", "Multi-GPU & HPC", "HDF5", "ELAN"] },
    { name: { es: "Backend", en: "Backend" }, items: ["Python", "Django", "FastAPI", "SQLModel", "PydanticAI", "Node.js", "Express", "REST APIs"] },
    { name: { es: "Frontend", en: "Frontend" }, items: ["TypeScript", "JavaScript", "React", "Next.js", "Tailwind CSS", "HTML/CSS"] },
    { name: { es: "Datos y herramientas", en: "Data & tools" }, items: ["PostgreSQL", "MySQL", "SQLite", "Git", "Linux", "conda", "LaTeX", "Scrum"] },
  ] satisfies SkillGroup[],
};

export type Profile = typeof profile;
