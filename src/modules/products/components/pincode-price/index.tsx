"use client"

import { sdk } from "@lib/config"
import { usePincode } from "@lib/context/pincode-context"
import { Button, Input, Label } from "@medusajs/ui"
import { useState, useEffect } from "react"

type PincodePriceProps = {
  productId: string
  onPriceUpdate?: (data: any) => void
}

export default function PincodePrice({
  productId,
  onPriceUpdate,
}: PincodePriceProps) {
  const { pincode: globalPincode } = usePincode()
  const [pincode, setPincode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [priceData, setPriceData] = useState<any>(null)

  // Load global pincode when available
  useEffect(() => {
    if (globalPincode) {
      setPincode(globalPincode)
    }
  }, [globalPincode])

  // Auto-check price when global pincode is available
  useEffect(() => {
    if (globalPincode && productId) {
      handleCheckPrice(globalPincode)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalPincode, productId])

  const handleCheckPrice = async (pincodeToCheck?: string) => {
    const targetPincode = pincodeToCheck || pincode

    if (!targetPincode || targetPincode.length < 5) {
      setError("Please enter a valid pincode")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const data = await sdk.client.fetch<any>(
        `/store/products/${productId}/pincode-price`,
        {
          method: "GET",
          query: {
            pincode: targetPincode,
          },
          cache: "no-store",
        }
      )

      // Check if price data is available
      if (
        !data ||
        data.price === null ||
        data.price === undefined ||
        data.availability === false
      ) {
        setPriceData({ available: false })
        setError("Product not available for this pincode")
        onPriceUpdate?.(null)
      } else {
        setPriceData(data)
        setError(null)
        onPriceUpdate?.(data)
      }
    } catch (err) {
      console.error("Error fetching pincode price:", err)
      setPriceData({ available: false })
      setError("Product not available for this pincode")
      onPriceUpdate?.(null)
    } finally {
      setLoading(false)
    }
  }

  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6)
    setPincode(value)
    setError(null)
  }

  return (
    <div className="flex flex-col gap-y-4">
      {priceData && (
        <div
          className={`p-4 rounded-md ${
            priceData.available === false
              ? "bg-red-50 border border-red-200"
              : "bg-gray-50"
          }`}
        >
          <div className="text-sm">
            <p className="font-medium mb-2">Price for Pincode: {pincode}</p>

            {priceData.available === false ? (
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <p className="text-red-600 font-semibold">
                  Product not available for this pincode
                </p>
              </div>
            ) : (
              <>
                {priceData.price && (
                  <p className="text-lg font-semibold text-gray-900">
                    {priceData.price.toFixed(2)}
                  </p>
                )}
                {priceData.delivery_estimate && (
                  <p className="text-sm text-gray-600 mt-2">
                    Estimated Delivery: {priceData.delivery_estimate}
                  </p>
                )}
                {priceData.availability !== undefined && (
                  <p
                    className={`text-sm mt-1 ${
                      priceData.availability ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {priceData.availability
                      ? "Available for delivery"
                      : "Not available for this pincode"}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
