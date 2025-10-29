import { ArrowRight, Sparkles } from "@medusajs/icons"
import { Button } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50">
      {/* Background decoration - animated floating orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-primary-200/40 to-transparent rounded-full blur-3xl animate-float" />
        <div
          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-accent-200/30 to-transparent rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Badge - with pulse animation */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-300 text-primary-700 text-sm font-medium mb-8 animate-slideUp shadow-glow">
          <Sparkles className="w-4 h-4 animate-pulse-slow" />
          <span>New Collection Available Now</span>
        </div>

        {/* Main Heading - with scale animation */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight animate-scaleIn">
          Discover Your Perfect
          <span className="block mt-2 pb-2 bg-gradient-to-r from-primary-600 via-accent-500 to-primary-500 bg-clip-text text-transparent">
            Shopping Experience
          </span>
        </h1>

        {/* Subheading */}
        <p
          className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed animate-slideUp"
          style={{ animationDelay: "0.2s" }}
        >
          Browse our curated collection of premium products. Fast shipping, easy
          returns, and exceptional customer service. Your satisfaction is our
          priority.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slideUp"
          style={{ animationDelay: "0.4s" }}
        >
          <LocalizedClientLink href="/store">
            <Button
              size="large"
              className="primary-btn group px-8 py-4 text-lg font-semibold bg-gradient-to-r from-primary-600 via-primary-500 to-accent-600 hover:from-primary-700 hover:via-primary-600 hover:to-accent-700 shadow-glow hover:shadow-xl transition-all duration-500 hover:scale-105 active:scale-95 relative overflow-hidden"
            >
              Explore Collection
            </Button>
          </LocalizedClientLink>

          <LocalizedClientLink href="/collections">
            <Button
              size="large"
              variant="secondary"
              className="px-8 py-4 text-lg font-semibold bg-white hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 text-gray-900 border-2 border-primary-300 hover:border-primary-400 shadow-md hover:shadow-glow transition-all duration-500 hover:scale-105 active:scale-95"
            >
              View Categories
            </Button>
          </LocalizedClientLink>
        </div>

        {/* Features - staggered animation */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              title: "Free Shipping",
              desc: "On orders over ₹500",
              delay: "0.6s",
            },
            {
              title: "Easy Returns",
              desc: "30-day return policy",
              delay: "0.8s",
            },
            {
              title: "Secure Payment",
              desc: "100% secure checkout",
              delay: "1s",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="card-modern flex flex-col items-center p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-primary-200/50 shadow-soft hover:shadow-glow transition-all duration-500 animate-slideUp group"
              style={{ animationDelay: feature.delay }}
            >
              <h3 className="text-lg font-semibold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
