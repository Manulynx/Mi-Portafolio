import { notFound } from "next/navigation";

/** Catch-all so unknown paths under /es or /en render the localized not-found page. */
export default function CatchAll() {
  notFound();
}
