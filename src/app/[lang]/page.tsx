import Image from "next/image";
import { notFound } from "next/navigation";
import { profile, tr, type Job, type Locale } from "@/content/profile";
import { dictionaries, fmtPeriod, hasLocale } from "@/content/ui";
import { Header } from "@/components/header";
import { ChatWidget, AskAiButton } from "@/components/chat-widget";
import { ContactForm } from "@/components/contact-form";
import { Gallery } from "@/components/gallery";
import { Badge, Card, Icon, Section, Tag, type Tone } from "@/components/ui";

/** Map a publication status (English label) to a badge tone. */
function statusTone(en: string): Tone {
  if (/^(accepted|published|poster presented|oral presentation)/i.test(en)) return "success";
  if (/^submitted/i.test(en)) return "pending";
  return "neutral";
}

function jsonLd(lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    alternateName: profile.name,
    url: `${profile.siteUrl}/${lang}`,
    image: `${profile.siteUrl}${profile.photo}`,
    jobTitle: profile.headline[lang],
    email: `mailto:${profile.email}`,
    affiliation: { "@type": "CollegeOrUniversity", name: "Universidad de Valparaíso" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Universidad de las Ciencias Informáticas" },
    knowsAbout: ["Natural Language Processing", "Neural Machine Translation", "Sign Language Translation", "Django", "Python", "PyTorch"],
    sameAs: [profile.links.github, profile.links.linkedin, profile.links.orcid],
  };
}

function Timeline({ jobs, lang }: { jobs: Job[]; lang: Locale }) {
  return (
    <ol className="relative space-y-8 border-l border-border pl-6">
      {jobs.map((j) => (
        <li key={`${j.org}-${j.period}`} className="relative">
          <span className="absolute top-1.5 -left-[29px] size-2.5 rounded-full bg-accent ring-4 ring-bg" aria-hidden="true" />
          <p className="font-mono text-xs text-muted">{fmtPeriod(j.period, lang)}</p>
          <h4 className="mt-1 font-medium">{tr(j.role, lang)}</h4>
          <p className="text-sm text-muted">
            {j.url ? (
              <a href={j.url} target="_blank" rel="noopener noreferrer" className="underline decoration-border underline-offset-4 hover:text-accent">
                {j.org}
              </a>
            ) : (
              j.org
            )}{" "}
            · {tr(j.place, lang)}
          </p>
          <ul className="mt-2 space-y-1 text-sm">
            {j.bullets.map((b, i) => (
              <li key={i}>{tr(b, lang)}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = dictionaries[lang];
  const t = (v: Parameters<typeof tr>[0]) => tr(v, lang);
  const pubType = { conference: d.pubs.conference, journal: d.pubs.journal, poster: d.pubs.poster };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(lang)) }} />
      <a href="#top" className="sr-only z-50 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-fg focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        {d.skip}
      </a>
      <Header lang={lang} dict={d} />

      <main id="top" tabIndex={-1} className="mx-auto max-w-5xl px-4 outline-none sm:px-6">
        {/* HERO */}
        <section className="relative grid items-center gap-8 py-12 sm:py-28 md:grid-cols-[1fr_auto] md:gap-10">
          <div className="hero-bg pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2" aria-hidden="true" />
          <div>
            <p className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/70 px-3 py-1 font-mono text-xs text-muted backdrop-blur">
              <Icon name="pin" className="size-3.5" /> {t(profile.location)}
            </p>
            <h1 className="text-[2.5rem] leading-[1.05] font-semibold tracking-tighter text-balance sm:text-6xl">{profile.name}</h1>
            <p className="mt-4 text-lg font-medium text-accent sm:text-xl">{t(profile.headline)}</p>
            <p className="mt-5 max-w-2xl leading-relaxed text-muted">{t(profile.tagline)}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <AskAiButton label={d.hero.askAi} />
              <a href="#contact" className="rounded-xl border border-border bg-surface px-5 py-2.5 transition-colors text-sm font-medium hover:border-accent hover:text-accent">
                {d.hero.contact}
              </a>
              <a href={profile.cv[lang]} download className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-2.5 transition-colors text-sm font-medium hover:border-accent hover:text-accent">
                <Icon name="download" className="size-4" /> {d.hero.cv}
              </a>
            </div>
            <div className="mt-6 flex gap-2 text-muted">
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="rounded-lg p-2 hover:bg-surface-2 hover:text-fg"><Icon name="github" /></a>
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rounded-lg p-2 hover:bg-surface-2 hover:text-fg"><Icon name="linkedin" /></a>
              <a href={profile.links.orcid} target="_blank" rel="noopener noreferrer" aria-label="ORCID" className="rounded-lg p-2 hover:bg-surface-2 hover:text-fg"><Icon name="orcid" /></a>
              <a href={`mailto:${profile.email}`} aria-label="Email" className="rounded-lg p-2 hover:bg-surface-2 hover:text-fg"><Icon name="mail" /></a>
            </div>
          </div>
          <div className="relative order-first mx-auto md:order-none">
            <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-accent/30 via-transparent to-accent/10 blur-xl" aria-hidden="true" />
            <Image src={profile.photo} alt={profile.name} width={240} height={240} priority className="relative size-32 rounded-full border-4 border-surface object-cover shadow-xl ring-1 ring-border sm:size-60" />
          </div>
        </section>

        {/* ABOUT */}
        <Section id="about" index="01" title={d.sections.about}>
          <div className="grid gap-10 md:grid-cols-[3fr_2fr]">
            <div className="space-y-4 leading-relaxed text-muted">
              {profile.about.map((p, i) => (
                <p key={i}>{t(p)}</p>
              ))}
              <p className="text-sm">{t(profile.languages)}</p>
            </div>
            <dl className="grid grid-cols-2 gap-3">
              {profile.stats.map((s) => (
                <Card key={s.label.es} className="flex flex-col p-5">
                  <dt className="text-xs leading-snug text-muted">{t(s.label)}</dt>
                  <dd className="order-first mb-1 text-3xl font-semibold tracking-tight text-fg tabular-nums">{s.value}</dd>
                </Card>
              ))}
            </dl>
          </div>
        </Section>

        {/* RESEARCH */}
        <Section id="research" index="02" title={d.sections.research}>
          <div className="space-y-6">
            {profile.research.map((r) => (
              <Card key={r.id}>
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
                  <span>{r.funding}</span>·<span>{fmtPeriod(r.period, lang)}</span>
                  {r.current && <Badge tone="success">{d.research.current}</Badge>}
                </div>
                <h3 className="mt-2 text-lg font-semibold">{t(r.title)}</h3>
                <p className="text-sm text-muted">
                  {t(r.role)} · {t(r.lead)}
                </p>
                <p className="mt-3 text-sm leading-relaxed">{t(r.summary)}</p>
                {r.highlights.length > 0 && (
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted marker:text-accent">
                    {r.highlights.map((h, i) => (
                      <li key={i}>{t(h)}</li>
                    ))}
                  </ul>
                )}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {r.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </Card>
            ))}
          </div>
          <h3 className="mt-10 mb-3 font-medium">{d.sections.interests}</h3>
          <ul className="grid gap-2 text-sm text-muted sm:grid-cols-2">
            {profile.interests.map((it, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-accent">→</span>
                {t(it)}
              </li>
            ))}
          </ul>
        </Section>

        {/* PUBLICATIONS */}
        <Section id="publications" index="03" title={d.sections.publications}>
          <ol className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
            {profile.publications.map((p) => (
              <li key={p.title} className="grid gap-x-6 gap-y-2 p-5 transition-colors hover:bg-surface-2/60 sm:grid-cols-[5rem_1fr] sm:p-6">
                <div className="font-mono text-xs text-muted">
                  <p className="text-base font-semibold text-fg">{p.year}</p>
                  <p>{pubType[p.type]}</p>
                </div>
                <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone={statusTone(p.status.en)}>{t(p.status)}</Badge>
                  {p.firstAuthor && p.type !== "poster" && <Tag>{d.pubs.firstAuthor}</Tag>}
                </div>
                <p className="mt-2 font-medium leading-snug text-balance">{p.title}</p>
                <p className="mt-1 text-sm text-muted">
                  {p.authors} <em>{p.venue}</em>
                </p>
                {p.url && (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1 text-sm text-accent hover:underline">
                    {d.pubs.view} <Icon name="external" className="size-3.5" />
                  </a>
                )}
                </div>
              </li>
            ))}
          </ol>
        </Section>

        {/* PROJECTS */}
        <Section id="projects" index="04" title={d.sections.projects}>
          <div className="grid gap-6 md:grid-cols-2">
            {profile.projects.map((p) => (
              <Card key={p.id} className="flex flex-col gap-4">
                {p.images.length > 0 && <Gallery images={p.images.map((img) => ({ src: img.src, alt: t(img.alt) }))} />}
                <div>
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
                    <span>{t(p.kind)}</span>·<span className="text-accent">{t(p.status)}</span>
                  </div>
                  <h3 className="mt-1.5 text-lg font-semibold">{t(p.name)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{t(p.summary)}</p>
                  {p.features.length > 0 && (
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm marker:text-accent">
                      {p.features.map((f, i) => (
                        <li key={i}>{t(f)}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </div>
                  {p.url && (
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
                      {d.projects.visit} <Icon name="external" className="size-3.5" />
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </Section>

        {/* EXPERIENCE + TEACHING */}
        <Section id="experience" index="05" title={d.sections.experience}>
          <div className="grid gap-12 md:grid-cols-2">
            <Timeline jobs={profile.experience} lang={lang} />
            <div>
              <h3 className="mb-6 text-lg font-semibold">{d.sections.teaching}</h3>
              <Timeline jobs={profile.teaching} lang={lang} />
            </div>
          </div>
        </Section>

        {/* SKILLS */}
        <Section id="skills" index="06" title={d.sections.skills}>
          <div className="grid gap-4 sm:grid-cols-2">
            {profile.skills.map((g) => (
              <Card key={g.name.es} className="p-5">
                <h3 className="mb-3 text-sm font-medium">{t(g.name)}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {g.items.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Section>

        {/* CONTACT */}
        <Section id="contact" index="07" title={d.sections.contact}>
          <div className="grid gap-10 md:grid-cols-[2fr_3fr]">
            <div className="space-y-4 text-sm">
              <p className="leading-relaxed text-muted">{d.contact.intro}</p>
              <a href={`mailto:${profile.email}`} className="flex items-center gap-2 hover:text-accent">
                <Icon name="mail" /> {profile.email}
              </a>
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent">
                <Icon name="linkedin" /> LinkedIn
              </a>
              <a href={profile.links.orcid} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent">
                <Icon name="orcid" /> ORCID {profile.orcid}
              </a>
              <a href={profile.cv[lang]} download className="flex items-center gap-2 hover:text-accent">
                <Icon name="download" /> {d.hero.cv} (PDF)
              </a>
            </div>
            <Card>
              <ContactForm dict={d.contact} />
            </Card>
          </div>
        </Section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 pt-8 pb-24 text-xs sm:pb-8 text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-sm font-medium text-fg">{profile.fullName}</p>
            <p className="mt-1">© 2026 · {d.footer.built}</p>
          </div>
          <div className="flex items-center gap-1">
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="rounded-lg p-2 hover:bg-surface-2 hover:text-fg"><Icon name="github" className="size-4" /></a>
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rounded-lg p-2 hover:bg-surface-2 hover:text-fg"><Icon name="linkedin" className="size-4" /></a>
            <a href={profile.links.orcid} target="_blank" rel="noopener noreferrer" aria-label="ORCID" className="rounded-lg p-2 hover:bg-surface-2 hover:text-fg"><Icon name="orcid" className="size-4" /></a>
            <a href="#top" className="ml-2 rounded-lg border border-border px-3 py-1.5 hover:border-accent hover:text-accent">{d.footer.top} ↑</a>
          </div>
        </div>
      </footer>

      <ChatWidget lang={lang} dict={d.chat} />
    </>
  );
}
