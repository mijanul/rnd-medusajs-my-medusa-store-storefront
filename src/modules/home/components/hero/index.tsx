import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"

const Hero = () => {
  return (
    <section className="h-[75vh] w-full flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-blue-100 border-b border-ui-border-base">
      <div className="max-w-2xl mx-auto text-center px-6 py-12 rounded-lg shadow-md bg-white/80 backdrop-blur-md">
        <Heading
          level="h1"
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
        >
          Welcome to Your Modern Store
        </Heading>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Discover the best products, seamless shopping, and fast delivery. Your
          one-stop shop for everything you love.
        </p>
        <a href="/store">
          <Button size="large" className="px-8 py-3 text-lg font-semibold">
            Start Shopping
          </Button>
        </a>
      </div>
    </section>
  )
}

export default Hero
