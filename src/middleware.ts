import { NextRequest, NextResponse } from "next/server"

const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || "in"

/**
 * Middleware to set the default country code cookie.
 * Modified to use a fixed default country code without fetching regions.
 */
export async function middleware(request: NextRequest) {
  // check if the url is a static asset
  if (request.nextUrl.pathname.includes(".")) {
    return NextResponse.next()
  }

  let response = NextResponse.next()

  let cacheIdCookie = request.cookies.get("_medusa_cache_id")
  let countryCodeCookie = request.cookies.get("_medusa_country_code")

  let cacheId = cacheIdCookie?.value || crypto.randomUUID()

  // Use the default region (India)
  const countryCode = DEFAULT_REGION

  // Set cache ID and country code cookies
  if (!cacheIdCookie) {
    response.cookies.set("_medusa_cache_id", cacheId, {
      maxAge: 60 * 60 * 24,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    })
  }

  if (!countryCodeCookie || countryCodeCookie.value !== countryCode) {
    response.cookies.set("_medusa_country_code", countryCode, {
      maxAge: 60 * 60 * 24,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    })
  }

  return response
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|assets|png|svg|jpg|jpeg|gif|webp).*)",
  ],
}
