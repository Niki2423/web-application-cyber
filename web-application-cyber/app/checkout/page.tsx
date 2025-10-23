"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ShoppingBag, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { VulnerabilityHint } from "@/components/vulnerability-hint"
import { useVulnerabilityMode } from "@/hooks/use-vulnerability-mode"

const products = [
  { id: 1, name: "Wireless Headphones", price: 199.99 },
  { id: 2, name: "Smart Watch", price: 299.99 },
  { id: 3, name: "Laptop Stand", price: 49.99 },
  { id: 4, name: "Mechanical Keyboard", price: 149.99 },
]

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const productId = searchParams.get("product")
  const product = products.find((p) => p.id === Number(productId))
  const { isEnabled } = useVulnerabilityMode()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVV: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // VULNERABILITY: Sensitive data logged to console
    console.log("Processing payment with data:", formData)

    // VULNERABILITY: Storing credit card info in localStorage
    localStorage.setItem(
      "lastPayment",
      JSON.stringify({
        ...formData,
        timestamp: new Date().toISOString(),
      }),
    )

    alert("Order placed successfully! (Data stored insecurely)")
  }

  // VULNERABILITY: Exposing API keys in client-side code
  const API_KEY = "sk_live_51234567890abcdefghijklmnop"
  const STRIPE_SECRET = "whsec_1234567890abcdefghijklmnop"

  useEffect(() => {
    // VULNERABILITY: Debug mode enabled in production
    if (typeof window !== "undefined") {
      ;(window as any).DEBUG_MODE = true
      ;(window as any).API_KEY = API_KEY
      console.log("[DEBUG] Checkout page loaded with API key:", API_KEY)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">SecureShop</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {product ? (
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>{product.name}</span>
                      <span className="font-semibold">${product.price}</span>
                    </div>
                    <div className="border-t pt-4 flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">${product.price}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No product selected</p>
                )}
              </CardContent>
            </Card>

            {/* Payment Form */}
            <Card className="relative">
              {isEnabled && (
                <>
                  <VulnerabilityHint
                    type="sensitive-data"
                    title="Sensitive Data Exposure"
                    description="Credit card data logged to console and stored in localStorage. API keys exposed in client-side code."
                    className="absolute -top-3 -right-3"
                  />
                  <VulnerabilityHint
                    type="misconfiguration"
                    title="Security Misconfiguration"
                    description="Debug mode enabled in production. Verbose logging exposes sensitive information."
                    className="absolute -bottom-3 -left-3"
                  />
                </>
              )}

              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Information
                </CardTitle>
                <CardDescription>Enter your payment details</CardDescription>
              </CardHeader>

              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      placeholder="123 Main St"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="New York"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        placeholder="10001"
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="4242 4242 4242 4242"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardExpiry">Expiry Date</Label>
                        <Input
                          id="cardExpiry"
                          placeholder="MM/YY"
                          value={formData.cardExpiry}
                          onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardCVV">CVV</Label>
                        <Input
                          id="cardCVV"
                          placeholder="123"
                          value={formData.cardCVV}
                          onChange={(e) => setFormData({ ...formData, cardCVV: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {isEnabled && (
                    <div className="p-3 bg-yellow-50 text-yellow-800 text-xs rounded">
                      ⚠️ Open browser console to see sensitive data being logged!
                    </div>
                  )}

                  <Button type="submit" className="w-full" size="lg">
                    Complete Purchase
                  </Button>
                </CardContent>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
