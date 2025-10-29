import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"
import { Github } from "@medusajs/icons"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="border-t border-primary-200/50 w-full bg-gradient-to-b from-white via-primary-50/20 to-accent-50/30">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-12 xsmall:flex-row items-start justify-between py-16">
          {/* Brand Section */}
          <div className="flex flex-col gap-y-4 max-w-xs">
            <LocalizedClientLink
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-primary-600 via-accent-600 to-primary-500 bg-clip-text text-transparent uppercase tracking-tight"
            >
              Medusa Store
            </LocalizedClientLink>
            <p className="text-sm text-gray-600 leading-relaxed">
              Your trusted destination for quality products. Fast shipping, easy
              returns, and exceptional service.
            </p>
            {/* Social Links */}
            <div className="flex gap-3 mt-4">
              <a
                href="https://github.com/medusajs"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-accent-100 hover:from-primary-200 hover:to-accent-200 flex items-center justify-center text-primary-600 hover:text-primary-700 transition-all duration-300 hover:scale-110"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-accent-100 hover:from-primary-200 hover:to-accent-200 flex items-center justify-center text-accent-600 hover:text-accent-700 transition-all duration-300 hover:scale-110"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-accent-100 hover:from-primary-200 hover:to-accent-200 flex items-center justify-center text-primary-600 hover:text-primary-700 transition-all duration-300 hover:scale-110"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                  <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4z" />
                  <circle cx="18.406" cy="5.594" r="1.44" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-accent-100 hover:from-primary-200 hover:to-accent-200 flex items-center justify-center text-accent-600 hover:text-accent-700 transition-all duration-300 hover:scale-110"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div className="text-sm gap-12 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-4">
                <span className="text-base font-semibold text-gray-900">
                  Categories
                </span>
                <ul
                  className="grid grid-cols-1 gap-3"
                  data-testid="footer-categories"
                >
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null

                    return (
                      <li
                        className="flex flex-col gap-2 text-gray-600"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className={clx(
                            "hover:text-primary-600 transition-colors duration-300",
                            children && "font-medium"
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-2 text-sm">
                            {children &&
                              children.map((child) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="hover:text-primary-600 transition-colors duration-300"
                                    href={`/categories/${child.handle}`}
                                    data-testid="category-link"
                                  >
                                    {child.name}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-4">
                <span className="text-base font-semibold text-gray-900">
                  Collections
                </span>
                <ul
                  className={clx("grid grid-cols-1 gap-3 text-gray-600", {
                    "grid-cols-2": (collections?.length || 0) > 3,
                  })}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-accent-600 transition-colors duration-300"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-y-4">
              <span className="text-base font-semibold text-gray-900">
                Company
              </span>
              <ul className="grid grid-cols-1 gap-y-3 text-gray-600">
                <li>
                  <LocalizedClientLink
                    href="/about"
                    className="hover:text-accent-600 transition-colors duration-300"
                  >
                    About Us
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/contact"
                    className="hover:text-accent-600 transition-colors duration-300"
                  >
                    Contact
                  </LocalizedClientLink>
                </li>
                <li>
                  <a
                    href="https://docs.medusajs.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-accent-600 transition-colors duration-300"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/medusajs"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-accent-600 transition-colors duration-300"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row w-full py-6 border-t border-primary-200/50 justify-between items-center text-gray-600 text-sm gap-4">
          <Text className="text-sm">
            © {new Date().getFullYear()} Medusa Store. All rights reserved.
          </Text>
          <div className="flex gap-4">
            <LocalizedClientLink
              href="/privacy"
              className="hover:text-primary-600 transition-colors duration-300"
            >
              Privacy Policy
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/terms"
              className="hover:text-accent-600 transition-colors duration-300"
            >
              Terms of Service
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </footer>
  )
}
