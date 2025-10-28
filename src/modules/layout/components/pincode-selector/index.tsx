"use client"

import { usePincode } from "@lib/context/pincode-context"
import { Button, Input } from "@medusajs/ui"
import { useState, useEffect } from "react"
import MapPin from "@modules/common/icons/map-pin"
import X from "@modules/common/icons/x"

export default function HeaderPincodeSelector() {
  const { pincode, setPincode } = usePincode()
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setInputValue(pincode || "")
  }, [pincode])

  const handleSave = () => {
    if (!inputValue || inputValue.length < 5) {
      setError("Please enter a valid pincode")
      return
    }

    setPincode(inputValue)
    setIsEditing(false)
    setError(null)
  }

  const handleClear = () => {
    setPincode(null)
    setInputValue("")
    setIsEditing(false)
    setError(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6)
    setInputValue(value)
    setError(null)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave()
    } else if (e.key === "Escape") {
      setIsEditing(false)
      setInputValue(pincode || "")
      setError(null)
    }
  }

  if (!isEditing && pincode) {
    return (
      <div className="flex items-center gap-x-2 text-sm">
        <MapPin size="16" />
        <button
          onClick={() => setIsEditing(true)}
          className="hover:text-ui-fg-base"
        >
          {pincode}
        </button>
        <button
          onClick={handleClear}
          className="hover:text-red-500"
          aria-label="Clear pincode"
        >
          <X size="12" />
        </button>
      </div>
    )
  }

  if (isEditing || !pincode) {
    return (
      <div className="flex flex-col gap-y-1">
        <div className="flex items-center gap-x-2">
          <MapPin size="16" />
          <Input
            type="text"
            placeholder="Pincode"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            className="w-24 h-8 text-sm"
            maxLength={6}
            autoFocus
          />
          <Button
            onClick={handleSave}
            variant="secondary"
            size="small"
            className="h-8 px-3 text-xs"
          >
            Save
          </Button>
          {pincode && (
            <button
              onClick={() => {
                setIsEditing(false)
                setInputValue(pincode)
                setError(null)
              }}
              className="text-xs hover:text-ui-fg-base"
            >
              Cancel
            </button>
          )}
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    )
  }

  return null
}
