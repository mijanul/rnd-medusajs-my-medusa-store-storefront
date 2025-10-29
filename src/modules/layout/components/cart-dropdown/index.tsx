"use client"

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import { ShoppingBag, X } from "@medusajs/icons"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined
  )
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    open()

    const timer = setTimeout(close, 5000)

    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }

    open()
  }

  // Clean up the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()

  // open cart dropdown when modifying the cart items, but only if we're not on the cart page
  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, itemRef.current])

  return (
    <div
      className="h-full z-50"
      onMouseEnter={openAndCancel}
      onMouseLeave={close}
    >
      <Popover className="relative h-full">
        <PopoverButton className="h-full outline-none">
          <div className="relative flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-glow hover:shadow-xl">
            <ShoppingBag className="w-5 h-5" />
            <span>Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 text-xs font-bold bg-white text-primary-600 rounded-full border-2 border-primary-600 animate-pulse-slow">
                {totalItems}
              </span>
            )}
          </div>
        </PopoverButton>
        <Transition
          show={cartDropdownOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <PopoverPanel
            static
            className="hidden small:block absolute top-[calc(100%+8px)] right-0 bg-white rounded-2xl shadow-large border border-primary-200/50 w-[420px] text-gray-900 overflow-hidden"
            data-testid="nav-cart-dropdown"
          >
            <div className="p-6 flex items-center justify-between border-b border-primary-200 bg-gradient-to-r from-primary-50 via-accent-50 to-transparent">
              <h3 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                Shopping Cart
              </h3>
              <button
                onClick={close}
                className="p-2 hover:bg-white rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {cartState && cartState.items?.length ? (
              <>
                <div className="overflow-y-scroll max-h-[402px] px-6 py-4 grid grid-cols-1 gap-y-4 no-scrollbar">
                  {cartState.items
                    .sort((a, b) => {
                      return (a.created_at ?? "") > (b.created_at ?? "")
                        ? -1
                        : 1
                    })
                    .map((item) => (
                      <div
                        className="grid grid-cols-[100px_1fr] gap-x-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                        key={item.id}
                        data-testid="cart-item"
                      >
                        <LocalizedClientLink
                          href={`/products/${item.product_handle}`}
                          className="w-full"
                        >
                          <div className="rounded-lg overflow-hidden">
                            <Thumbnail
                              thumbnail={item.thumbnail}
                              images={item.variant?.product?.images}
                              size="square"
                            />
                          </div>
                        </LocalizedClientLink>
                        <div className="flex flex-col justify-between flex-1">
                          <div className="flex flex-col flex-1">
                            <div className="flex items-start justify-between">
                              <div className="flex flex-col overflow-ellipsis whitespace-nowrap mr-4 w-[180px]">
                                <h3 className="text-sm font-semibold overflow-hidden text-ellipsis text-gray-900">
                                  <LocalizedClientLink
                                    href={`/products/${item.product_handle}`}
                                    data-testid="product-link"
                                  >
                                    {item.title}
                                  </LocalizedClientLink>
                                </h3>
                                <LineItemOptions
                                  variant={item.variant}
                                  data-testid="cart-item-variant"
                                  data-value={item.variant}
                                />
                                <span
                                  data-testid="cart-item-quantity"
                                  data-value={item.quantity}
                                  className="text-xs text-gray-600 mt-1"
                                >
                                  Qty: {item.quantity}
                                </span>
                              </div>
                              <div className="flex justify-end items-start">
                                <LineItemPrice
                                  item={item}
                                  style="tight"
                                  currencyCode={cartState.currency_code}
                                />
                              </div>
                            </div>
                          </div>
                          <DeleteButton
                            id={item.id}
                            className="mt-2 text-xs text-red-600 hover:text-red-700 font-medium"
                            data-testid="cart-item-remove-button"
                          >
                            Remove
                          </DeleteButton>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="p-6 flex flex-col gap-y-4 border-t border-primary-200 bg-gradient-to-br from-primary-50/50 to-accent-50/30">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700 font-medium">
                      Subtotal{" "}
                      <span className="font-normal text-gray-500">
                        (excl. taxes)
                      </span>
                    </span>
                    <span
                      className="text-lg font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent"
                      data-testid="cart-subtotal"
                      data-value={subtotal}
                    >
                      {convertToLocale({
                        amount: subtotal,
                        currency_code: cartState.currency_code,
                      })}
                    </span>
                  </div>
                  <LocalizedClientLink href="/cart" passHref>
                    <Button
                      className="primary-btn w-full bg-gradient-to-r from-primary-600 via-accent-600 to-primary-500 hover:from-primary-700 hover:via-accent-700 hover:to-primary-600 text-white font-semibold py-3 rounded-xl shadow-glow hover:shadow-xl transition-all duration-500 hover:scale-105 active:scale-95"
                      size="large"
                      data-testid="go-to-cart-button"
                    >
                      View Cart & Checkout
                    </Button>
                  </LocalizedClientLink>
                </div>
              </>
            ) : (
              <div>
                <div className="flex py-16 px-6 flex-col gap-y-6 items-center justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full flex items-center justify-center animate-float">
                    <ShoppingBag className="w-10 h-10 text-primary-600" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Your cart is empty
                    </h3>
                    <p className="text-sm text-gray-600">
                      Start adding items to your cart
                    </p>
                  </div>
                  <div>
                    <LocalizedClientLink href="/store">
                      <Button
                        onClick={close}
                        className="px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white font-semibold rounded-xl shadow-glow hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
                      >
                        Explore Products
                      </Button>
                    </LocalizedClientLink>
                  </div>
                </div>
              </div>
            )}
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown
