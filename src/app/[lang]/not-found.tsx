import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-xl flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="text-2xl font-semibold">Página no encontrada · Page not found</h1>
      <div className="flex gap-3 text-sm">
        <Link href="/es" className="rounded-xl border border-border px-4 py-2 hover:border-accent hover:text-accent">Ir al inicio</Link>
        <Link href="/en" className="rounded-xl border border-border px-4 py-2 hover:border-accent hover:text-accent">Go home</Link>
      </div>
    </main>
  );
}
