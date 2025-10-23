import { ShoppingBag, Shield, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { VulnerabilityToggle } from "@/components/vulnerability-toggle"

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 199.99,
    image: "/wireless-headphones.png",
    description: "Premium noise-cancelling headphones",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 299.99,
    image: "/smartwatch-lifestyle.png",
    description: "Fitness tracking and notifications",
  },
  {
    id: 3,
    name: "Laptop Stand",
    price: 49.99,
    image: "/laptop-stand.png",
    description: "Ergonomic aluminum stand",
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    price: 149.99,
    image: "/mechanical-keyboard.png",
    description: "RGB backlit gaming keyboard",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <ShoppingBag className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">SecureShop</span>
            </Link>

            <nav className="flex items-center gap-4">
              <Link href="/" className="text-sm font-medium text-primary">
                Home
              </Link>
              <Link href="/products" className="text-sm font-medium hover:text-primary">
                Products
              </Link>
              <Link href="/login" className="text-sm font-medium hover:text-primary">
                Login
              </Link>
              <Link href="/admin" className="text-sm font-medium hover:text-primary flex items-center gap-1">
                <Shield className="h-4 w-4" />
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Vulnerability Toggle */}
      <VulnerabilityToggle />

      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance">Premium Tech Accessories</h1>
          <p className="text-lg md:text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto text-pretty">
            Shop the latest gadgets and accessories for your digital lifestyle
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </section>

      {/* Educational Banner */}
      <div className="bg-yellow-50 border-y border-yellow-200 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 text-sm text-yellow-800">
            <AlertTriangle className="h-4 w-4" />
            <span className="font-medium">Educational Lab:</span>
            <span>This site contains intentional security vulnerabilities for learning purposes</span>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <CardHeader className="p-0">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                  <p className="text-2xl font-bold mt-4 text-primary">${product.price}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full" asChild>
                    <Link href={`/checkout?product=${product.id}`}>Buy Now</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 SecureShop - Educational Cybersecurity Lab</p>
          <p className="mt-2">This is a demonstration site with intentional vulnerabilities</p>
        </div>
      </footer>
    </div>
  )
}
