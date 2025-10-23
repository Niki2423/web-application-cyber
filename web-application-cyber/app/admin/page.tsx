"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ShoppingBag, Users, DollarSign, Package, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { VulnerabilityHint } from "@/components/vulnerability-hint"
import { useVulnerabilityMode } from "@/hooks/use-vulnerability-mode"

export default function AdminPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const { isEnabled } = useVulnerabilityMode()

  useEffect(() => {
    // VULNERABILITY: Client-side authentication check only
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsed = JSON.parse(userData)
      setUser(parsed)

      // VULNERABILITY: No server-side validation of admin role
      if (parsed.role !== "admin") {
        // Weak check - can be bypassed by modifying localStorage
        console.warn("Non-admin user accessing admin panel")
      }
    } else {
      router.push("/login")
    }
  }, [router])

  // VULNERABILITY: Exposing sensitive configuration in client code
  const DATABASE_URL = "postgresql://admin:password123@db.secureshop.com:5432/production"
  const ADMIN_API_KEY = "admin_key_1234567890"

  // VULNERABILITY: Debug endpoints exposed
  const debugEndpoints = {
    users: "/api/debug/users",
    orders: "/api/debug/orders",
    config: "/api/debug/config",
  }

  const stats = [
    { title: "Total Users", value: "1,234", icon: Users, change: "+12%" },
    { title: "Revenue", value: "$45,678", icon: DollarSign, change: "+8%" },
    { title: "Orders", value: "567", icon: Package, change: "+23%" },
  ]

  // VULNERABILITY: Sensitive customer data displayed without proper access control
  const recentOrders = [
    { id: 1, customer: "john.doe@email.com", amount: 199.99, card: "**** **** **** 4242" },
    { id: 2, customer: "jane.smith@email.com", amount: 299.99, card: "**** **** **** 5555" },
    { id: 3, customer: "bob.wilson@email.com", amount: 149.99, card: "**** **** **** 6789" },
  ]

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <ShoppingBag className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">SecureShop Admin</span>
            </Link>
            <div className="flex items-center gap-4">
              <nav className="flex items-center gap-4">
                <Link href="/" className="text-sm font-medium hover:text-primary">
                  Home
                </Link>
                <Link href="/products" className="text-sm font-medium hover:text-primary">
                  Products
                </Link>
                <Link href="/admin" className="text-sm font-medium text-primary">
                  Admin
                </Link>
              </nav>
              <span className="text-sm text-muted-foreground">Logged in as: {user.email}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  localStorage.removeItem("user")
                  router.push("/")
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Warning Banner */}
        {user.role !== "admin" && (
          <div className="mb-6 p-4 bg-destructive/10 text-destructive rounded-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <span>Warning: You are accessing the admin panel without proper authorization!</span>
          </div>
        )}

        {isEnabled && (
          <div className="mb-6 p-4 bg-yellow-50 text-yellow-800 rounded-lg">
            <p className="font-semibold mb-2">💡 Try this vulnerability:</p>
            <ol className="text-sm space-y-1 list-decimal list-inside">
              <li>Open browser DevTools (F12) → Application → Local Storage</li>
              <li>Find the 'user' key and change "role": "user" to "role": "admin"</li>
              <li>Refresh the page - you now have admin access!</li>
            </ol>
          </div>
        )}

        <div className="relative">
          {isEnabled && (
            <>
              <VulnerabilityHint
                type="misconfiguration"
                title="Security Misconfiguration"
                description="Client-side only authentication. Admin role stored in localStorage can be modified by anyone."
                className="absolute -top-3 -right-3 z-10"
              />
              <VulnerabilityHint
                type="sensitive-data"
                title="Sensitive Data Exposure"
                description="Database credentials and API keys exposed in client-side code. Customer PII displayed without proper access control."
                className="absolute top-1/3 -left-3 z-10"
              />
            </>
          )}

          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-green-600 mt-1">{stat.change} from last month</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Orders */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest customer transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">Card: {order.card}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">${order.amount}</p>
                      <p className="text-xs text-muted-foreground">Order #{order.id}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Debug Info (Misconfiguration) */}
          {isEnabled && (
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="text-yellow-800">Debug Information (Should be disabled!)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm font-mono text-yellow-900">
                <p>DATABASE_URL: {DATABASE_URL}</p>
                <p>ADMIN_API_KEY: {ADMIN_API_KEY}</p>
                <p>Debug Endpoints: {JSON.stringify(debugEndpoints)}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
