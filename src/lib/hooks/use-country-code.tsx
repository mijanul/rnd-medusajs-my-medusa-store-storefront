"use client"

import { useEffect, useState } from "react"

/**
 * Hook to get the country code from cookies or use default
 */
export function useCountryCode(): string {
  const [countryCode, setCountryCode] = useState<string>(
    process.env.NEXT_PUBLIC_DEFAULT_REGION || "in"
  )

  useEffect(() => {
    // Get country code from cookie
    const cookies = document.cookie.split(";")
    const countryCodeCookie = cookies.find((c) =>
      c.trim().startsWith("_medusa_country_code=")
    )
    if (countryCodeCookie) {
      const value = countryCodeCookie.split("=")[1]
      setCountryCode(value)
    }
  }, [])

  return countryCode
}
