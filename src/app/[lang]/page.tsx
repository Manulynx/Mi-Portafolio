import Image from "next/image";
import { notFound } from "next/navigation";
import { profile, tr, type Job, type Locale } from "@/content/profile";
import { dictionaries, fmtPeriod, hasLocale } from "@/content/ui";
import { Header } from "@/components/header";
import { ChatWidget, AskAiButton } from "@/components/chat-widget";
import { ContactForm } from "@/components/contact-form";
import { Gallery } from "@/components/gallery";
import { Card, Icon, Section, Tag } from "@/components/ui";

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
      <Header lang={lang} dict={d} />

      <main id="top" className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* HERO */}
        <section className="grid items-center gap-10 py-16 sm:py-24 md:grid-cols-[1fr_auto]">
          <div>
            <p className="mb-3 inline-flex items-center gap-1.5 font-mono text-xs text-muted">
              <Icon name="pin" className="size-3.5" /> {t(profile.location)}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{profile.name}</h1>
            <p className="mt-3 text-lg text-accent sm:text-xl">{t(profile.headline)}</p>
            <p className="mt-5 max-w-2xl leading-relaxed text-muted">{t(profile.tagline)}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <AskAiButton label={d.hero.askAi} />
              <a href="#contact" className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium hover:border-accent hover:text-accent">
                {d.hero.contact}
              </a>
              <a href={profile.cv[lang]} download className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium hover:border-accent hover:text-accent">
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
          <Image src={profile.photo} alt={profile.name} width={240} height={240} priority className="mx-auto size-44 rounded-full border border-border object-cover sm:size-60" />
        </section>

        {/* ABOUT */}
        <Section id="about" title={d.sections.about}>
          <div className="grid gap-10 md:grid-cols-[3fr_2fr]">
            <div className="space-y-4 leading-relaxed text-muted">
              {profile.about.map((p, i) => (
                <p key={i}>{t(p)}</p>
              ))}
              <p className="text-sm">{t(profile.languages)}</p>
            </div>
            <dl className="grid grid-cols-2 gap-3">
              {profile.stats.map((s) => (
                <Card key={s.value} className="flex flex-col p-4">
                  <dt className="text-xs leading-snug text-muted">{t(s.label)}</dt>
                  <dd className="order-first text-2xl font-semibold text-accent">{s.value}</dd>
                </Card>
              ))}
            </dl>
          </div>
        </Section>

        {/* RESEARCH */}
        <Section id="research" title={d.sections.research}>
          <div className="space-y-6">
            {profile.research.map((r) => (
              <Card key={r.id}>
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
                  <span>{r.funding}</span>·<span>{fmtPeriod(r.period, lang)}</span>
                  {r.current && <span className="rounded-full bg-accent-soft px-2 py-0.5 text-accent">{d.research.current}</span>}
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
        <Section id="publications" title={d.sections.publications}>
          <ol className="space-y-5">
            {profile.publications.map((p) => (
              <li key={p.title} className="border-b border-border pb-5 last:border-0">
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
                  <span>{p.year}</span>·<span>{pubType[p.type]}</span>·<span className="text-accent">{t(p.status)}</span>
                  {p.firstAuthor && p.type !== "poster" && <Tag>{d.pubs.firstAuthor}</Tag>}
                </div>
                <p className="mt-1.5 font-medium">{p.title}</p>
                <p className="mt-1 text-sm text-muted">
                  {p.authors} <em>{p.venue}</em>
                </p>
                {p.url && (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1 text-sm text-accent hover:underline">
                    {d.pubs.view} <Icon name="external" className="size-3.5" />
                  </a>
                )}
              </li>
            ))}
          </ol>
        </Section>

        {/* PROJECTS */}
        <Section id="projects" title={d.sections.projects}>
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
        <Section id="experience" title={d.sections.experience}>
          <div className="grid gap-12 md:grid-cols-2">
            <Timeline jobs={profile.experience} lang={lang} />
            <div>
              <h3 className="mb-6 text-lg font-semibold">{d.sections.teaching}</h3>
              <Timeline jobs={profile.teaching} lang={lang} />
            </div>
          </div>
        </Section>

        {/* SKILLS */}
        <Section id="skills" title={d.sections.skills}>
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
        <Section id="contact" title={d.sections.contact}>
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
        <div className="mx-auto flex max-w-5xl flex-wrap justify-between gap-2 px-4 py-8 text-xs text-muted sm:px-6">
          <p>© 2026 {profile.fullName}</p>
          <p>{d.footer.built}</p>
        </div>
      </footer>

      <ChatWidget lang={lang} dict={d.chat} />
    </>
  );
}
