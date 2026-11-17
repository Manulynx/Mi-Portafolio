import { NextResponse, type NextRequest } from "next/server";
import { locales } from "@/content/ui";
import { preferredLocale } from "@/lib/locale";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request.headers.get("accept-language"))}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip API routes, Next internals and any file with an extension (images, PDFs, robots.txt…)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
