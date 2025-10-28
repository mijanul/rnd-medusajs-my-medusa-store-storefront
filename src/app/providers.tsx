"use client"

import { PincodeProvider } from "@lib/context/pincode-context"

export default function Providers({ children }: { children: React.ReactNode }) {
  return <PincodeProvider>{children}</PincodeProvider>
}
