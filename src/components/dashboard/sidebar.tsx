"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  TrendingUp,
  Home,
  BarChart3,
  Wallet,
  Settings,
  User,
  Search,
  Bell,
  X,
  ChevronLeft,
  ChevronRight,
  LineChart,
  Users,
  Copy,
  PieChart,
  MessageSquare,
  Target,
  Zap,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Portfolio", href: "/dashboard/portfolio", icon: Wallet },
  { name: "Markets", href: "/dashboard/markets", icon: BarChart3 },
  { name: "Trading", href: "/dashboard/trading", icon: TrendingUp },
  { name: "Watchlist", href: "/dashboard/watchlist", icon: Target },
  { name: "Charts", href: "/dashboard/charts", icon: LineChart },
]

const socialNavigation = [
  { name: "Social Feed", href: "/dashboard/social", icon: MessageSquare },
  { name: "Copy Trading", href: "/dashboard/copy-trading", icon: Copy },
  { name: "Leaderboard", href: "/dashboard/leaderboard", icon: Users },
]

const accountNavigation = [
  { name: "Analytics", href: "/dashboard/analytics", icon: PieChart },
  { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [demoMode, setDemoMode] = useState(true)
  const { user } = useAuth()

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between p-4">
        <div className={cn("flex items-center space-x-2", collapsed && "justify-center")}>
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-orange-500 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold">Royal Oak</h1>
              <p className="text-xs text-muted-foreground">Capital</p>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="lg:hidden"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Demo Mode Toggle */}
      {!collapsed && (
        <div className="px-4 mb-4">
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">Demo Mode</span>
            </div>
            <Switch
              checked={demoMode}
              onCheckedChange={setDemoMode}
            />
          </div>
          {demoMode && (
            <p className="text-xs text-muted-foreground mt-2 px-1">
              Trading with virtual funds
            </p>
          )}
        </div>
      )}

      <nav className="flex-1 space-y-1 p-4">
        {/* Main Navigation */}
        <div className="space-y-1">
          {!collapsed && (
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Trading
            </p>
          )}
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    collapsed && "px-2",
                    isActive && "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                  )}
                  onClick={onClose}
                >
                  <item.icon className={cn("h-4 w-4", !collapsed && "mr-2")} />
                  {!collapsed && item.name}
                </Button>
              </Link>
            )
          })}
        </div>

        <Separator />

        {/* Social Navigation */}
        <div className="space-y-1">
          {!collapsed && (
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Social
            </p>
          )}
          {socialNavigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    collapsed && "px-2",
                    isActive && "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                  )}
                  onClick={onClose}
                >
                  <item.icon className={cn("h-4 w-4", !collapsed && "mr-2")} />
                  {!collapsed && item.name}
                  {item.name === "Notifications" && !collapsed && (
                    <Badge className="ml-auto h-5 w-5 flex items-center justify-center p-0 text-xs">
                      3
                    </Badge>
                  )}
                </Button>
              </Link>
            )
          })}
        </div>

        <Separator />

        {/* Account Navigation */}
        <div className="space-y-1">
          {!collapsed && (
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Account
            </p>
          )}
          {accountNavigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    collapsed && "px-2",
                    isActive && "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                  )}
                  onClick={onClose}
                >
                  <item.icon className={cn("h-4 w-4", !collapsed && "mr-2")} />
                  {!collapsed && item.name}
                </Button>
              </Link>
            )
          })}
        </div>
      </nav>

      <div className="border-t p-4">
        <div className={cn("flex items-center space-x-3", collapsed && "justify-center")}>
          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-white">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{user?.name || "User"}</p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email || "user@example.com"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={cn(
        "hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col transition-all duration-300",
        collapsed ? "lg:w-16" : "lg:w-64"
      )}>
        <div className="flex min-h-0 flex-1 flex-col border-r bg-card">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex min-h-0 flex-1 flex-col bg-card">
            <SidebarContent />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
