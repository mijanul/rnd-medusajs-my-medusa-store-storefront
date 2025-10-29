import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import HeaderPincodeSelector from "@modules/layout/components/pincode-selector"
import { User, ShoppingBag } from "@medusajs/icons"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative mx-auto duration-200 bg-white/95 backdrop-blur-md border-b border-primary-100/50 shadow-sm">
        <nav className="content-container flex items-center justify-between w-full h-20 text-sm">
          {/* Left section - Menu */}
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full flex items-center">
              <SideMenu regions={regions} />
            </div>
          </div>

          {/* Center - Logo with gradient */}
          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-primary-600 via-accent-600 to-primary-500 bg-clip-text text-transparent hover:from-primary-700 hover:via-accent-700 hover:to-primary-600 transition-all duration-300 uppercase tracking-tight"
              data-testid="nav-store-link"
            >
              Medusa Store
            </LocalizedClientLink>
          </div>

          {/* Right section - Actions */}
          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <HeaderPincodeSelector />

              {/* Navigation Links with hover effects */}
              <LocalizedClientLink
                className="flex items-center gap-2 px-4 py-2 rounded-full text-gray-700 hover:text-primary-600 hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 transition-all duration-300 font-medium group"
                href="/store"
                data-testid="nav-store-link"
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Shop</span>
              </LocalizedClientLink>

              <LocalizedClientLink
                className="flex items-center gap-2 px-4 py-2 rounded-full text-gray-700 hover:text-accent-600 hover:bg-gradient-to-r hover:from-accent-50 hover:to-primary-50 transition-all duration-300 font-medium group"
                href="/account"
                data-testid="nav-account-link"
              >
                <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Account</span>
              </LocalizedClientLink>
            </div>

            <Suspense
              fallback={
                <LocalizedClientLink
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary-100 to-accent-100 hover:from-primary-200 hover:to-accent-200 text-gray-900 font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
