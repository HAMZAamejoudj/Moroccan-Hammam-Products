import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isLocale, locales } from "@/lib/i18n/config";
import { preferredLocaleFromCookie } from "@/lib/i18n/localize-href";

const LOCALE_PREFIX = new RegExp(`^/(${locales.join("|")})(?=/$|/)`);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}`;
    return NextResponse.redirect(url);
  }

  const preferred = preferredLocaleFromCookie(request.cookies.get("site_locale")?.value);

  if (pathname === "/about") {
    const url = request.nextUrl.clone();
    url.pathname = `/${preferred}/about`;
    return NextResponse.redirect(url);
  }

  if (pathname === "/benefits") {
    const url = request.nextUrl.clone();
    url.pathname = `/${preferred}/benefits`;
    return NextResponse.redirect(url);
  }

  if (pathname === "/private-label") {
    const url = request.nextUrl.clone();
    url.pathname = `/${preferred}/private-label`;
    return NextResponse.redirect(url);
  }

  if (pathname === "/contact") {
    const url = request.nextUrl.clone();
    url.pathname = `/${preferred}/contact`;
    return NextResponse.redirect(url);
  }

  if (pathname === "/blog") {
    const url = request.nextUrl.clone();
    url.pathname = `/${preferred}/blog`;
    return NextResponse.redirect(url);
  }

  const legacyBlogPost = pathname.match(/^\/blog\/([^/]+)$/);
  if (legacyBlogPost) {
    const url = request.nextUrl.clone();
    url.pathname = `/${preferred}/blog/${legacyBlogPost[1]}`;
    return NextResponse.redirect(url);
  }

  const match = pathname.match(LOCALE_PREFIX);
  const response = NextResponse.next();

  if (match && isLocale(match[1])) {
    response.cookies.set("site_locale", match[1], {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
