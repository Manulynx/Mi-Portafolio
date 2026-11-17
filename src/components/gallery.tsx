import Image from "next/image";

/** Horizontal scroll-snap gallery; no JS carousel dependency. */
export function Gallery({ images, priority = false }: { images: { src: string; alt: string }[]; priority?: boolean }) {
  return (
    <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto rounded-xl pb-2" tabIndex={0} aria-label="Screenshots">
      {images.map((img, i) => (
        <div key={img.src} className="relative aspect-[16/10] w-[85%] shrink-0 snap-start overflow-hidden rounded-xl border border-border bg-surface-2 sm:w-[70%]">
          <Image src={img.src} alt={img.alt} fill sizes="(min-width: 768px) 420px, 85vw" className="object-cover object-top" priority={priority && i === 0} />
        </div>
      ))}
    </div>
  );
}
