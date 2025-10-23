"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ShoppingBag, Eye, EyeOff, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { VulnerabilityHint } from "@/components/vulnerability-hint"
import { useVulnerabilityMode } from "@/hooks/use-vulnerability-mode"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [attempts, setAttempts] = useState(0)
  const router = useRouter()
  const { isEnabled } = useVulnerabilityMode()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // VULNERABILITY: No rate limiting on login attempts (Brute Force)
    setAttempts((prev) => prev + 1)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (email === "admin@secureshop.com" && password === "admin123") {
      // VULNERABILITY: Storing sensitive data in localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          email,
          role: "admin",
          sessionToken: "token_" + Date.now(), // Predictable session token
        }),
      )
      localStorage.setItem("isAdmin", "true")
      router.push("/admin")
    } else if (email === "user@secureshop.com" && password === "user123") {
      localStorage.setItem(
        "user",
        JSON.stringify({
          email,
          role: "user",
          sessionToken: "token_" + Date.now(),
        }),
      )
      router.push("/")
    } else {
      // VULNERABILITY: Verbose error messages reveal information
      setError("Invalid credentials. User not found in database.")
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
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
              <Link href="/products" className="text-sm font-medium hover:text-primary">
                Products
              </Link>
              <Link href="/login" className="text-sm font-medium text-primary">
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

      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md relative">
          {isEnabled && (
            <>
              <VulnerabilityHint
                type="brute-force"
                title="Brute Force Vulnerability"
                description="No rate limiting on login attempts. Attackers can try unlimited password combinations."
                className="absolute -top-3 -right-3"
              />
              <VulnerabilityHint
                type="sensitive-data"
                title="Sensitive Data Exposure"
                description="User credentials stored in localStorage (client-side). Session tokens are predictable."
                className="absolute -bottom-3 -left-3"
              />
              <VulnerabilityHint
                type="misconfiguration"
                title="Security Misconfiguration"
                description="Verbose error messages reveal system information. Weak default credentials (admin/admin123)."
                className="absolute top-1/2 -right-3 -translate-y-1/2"
              />
            </>
          )}

          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
            {isEnabled && (
              <div className="mt-2 p-2 bg-muted rounded text-xs text-muted-foreground space-y-1">
                <div>💡 Admin: admin@secureshop.com / admin123</div>
                <div>💡 User: user@secureshop.com / user123</div>
              </div>
            )}
          </CardHeader>

          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && <div className="p-3 bg-destructive/10 text-destructive text-sm rounded">{error}</div>}

              {isEnabled && attempts > 0 && (
                <div className="p-2 bg-yellow-50 text-yellow-800 text-xs rounded">
                  Login attempts: {attempts} (No rate limiting active!)
                </div>
              )}
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full">
                Sign In
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                Don't have an account?{" "}
                <Link href="/register" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
