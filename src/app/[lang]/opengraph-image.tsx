import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { profile } from "@/content/profile";
import { hasLocale, locales } from "@/content/ui";

export const alt = `${profile.name} · ${profile.headline.es}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function OgImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = hasLocale(raw) ? raw : "es";
  const photo = await readFile(join(process.cwd(), "public", profile.photo));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;
  const topics = lang === "es"
    ? ["PLN · Traducción automática", "Lengua de Señas Chilena", "Python · Django · PyTorch"]
    : ["NLP · Machine translation", "Chilean Sign Language", "Python · Django · PyTorch"];

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", gap: 64, padding: "0 80px", background: "#0c0f12", color: "#e7ecef" }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ fontSize: 28, color: "#9aa5ae", display: "flex" }}>{profile.location[lang]}</div>
          <div style={{ fontSize: 76, fontWeight: 700, marginTop: 12, display: "flex" }}>{profile.name}</div>
          <div style={{ fontSize: 36, color: "#2dd4bf", marginTop: 8, display: "flex" }}>{profile.headline[lang]}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 40 }}>
            {topics.map((t) => (
              <div key={t} style={{ fontSize: 24, padding: "8px 18px", borderRadius: 999, border: "1px solid #26303a", color: "#9aa5ae", display: "flex" }}>
                {t}
              </div>
            ))}
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photoSrc} width={300} height={300} alt="" style={{ borderRadius: 999, objectFit: "cover", border: "4px solid #2dd4bf" }} />
      </div>
    ),
    size,
  );
}
