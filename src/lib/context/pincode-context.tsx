"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface PincodeContext {
  pincode: string | null
  setPincode: (pincode: string | null) => void
  isValidPincode: boolean
}

const PincodeContext = createContext<PincodeContext | null>(null)

interface PincodeProviderProps {
  children?: React.ReactNode
}

const PINCODE_STORAGE_KEY = "user-pincode"

export const PincodeProvider = ({ children }: PincodeProviderProps) => {
  const [pincode, setPincodeState] = useState<string | null>(null)

  // Load pincode from localStorage on mount
  useEffect(() => {
    const storedPincode = localStorage.getItem(PINCODE_STORAGE_KEY)
    if (storedPincode) {
      setPincodeState(storedPincode)
    }
  }, [])

  const setPincode = (newPincode: string | null) => {
    setPincodeState(newPincode)
    if (newPincode) {
      localStorage.setItem(PINCODE_STORAGE_KEY, newPincode)
    } else {
      localStorage.removeItem(PINCODE_STORAGE_KEY)
    }
  }

  const isValidPincode = Boolean(pincode && pincode.length >= 5)

  return (
    <PincodeContext.Provider
      value={{
        pincode,
        setPincode,
        isValidPincode,
      }}
    >
      {children}
    </PincodeContext.Provider>
  )
}

export const usePincode = () => {
  const context = useContext(PincodeContext)
  if (context === null) {
    throw new Error("usePincode must be used within a PincodeProvider")
  }
  return context
}
