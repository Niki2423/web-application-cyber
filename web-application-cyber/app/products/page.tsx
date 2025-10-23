import { ShoppingBag, Shield } from "lucide-react"
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
    description: "Premium noise-cancelling headphones with 30-hour battery life",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 299.99,
    image: "/smartwatch-lifestyle.png",
    description: "Fitness tracking and notifications on your wrist",
  },
  {
    id: 3,
    name: "Laptop Stand",
    price: 49.99,
    image: "/laptop-stand.png",
    description: "Ergonomic aluminum stand for better posture",
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    price: 149.99,
    image: "/mechanical-keyboard.png",
    description: "RGB backlit gaming keyboard with tactile switches",
  },
  {
    id: 5,
    name: "Wireless Mouse",
    price: 79.99,
    image: "/wireless-mouse.png",
    description: "Precision wireless mouse with ergonomic design",
  },
  {
    id: 6,
    name: "USB-C Hub",
    price: 89.99,
    image: "/usb-c-hub.png",
    description: "7-in-1 USB-C hub with HDMI and card readers",
  },
  {
    id: 7,
    name: "Webcam HD",
    price: 129.99,
    image: "/classic-webcam.png",
    description: "1080p HD webcam with auto-focus and noise reduction",
  },
  {
    id: 8,
    name: "Phone Stand",
    price: 24.99,
    image: "/phone-stand.jpg",
    description: "Adjustable phone stand for desk or bedside",
  },
]

export default function ProductsPage() {
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
              <Link href="/" className="text-sm font-medium hover:text-primary">
                Home
              </Link>
              <Link href="/products" className="text-sm font-medium text-primary">
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

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">All Products</h1>
            <p className="text-muted-foreground">Browse our complete collection of tech accessories</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
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
