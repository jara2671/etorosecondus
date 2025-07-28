"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet, TrendingUp, Eye, EyeOff, Plus, Activity, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { useState, useEffect } from "react"

export function PortfolioOverview() {
  const [showBalance, setShowBalance] = useState(true)
  const [balance, setBalance] = useState(12450.89)
  const [todaysPL, setTodaysPL] = useState(1247)
  const [isPositive, setIsPositive] = useState(true)

  // Simulate real-time balance updates
  useEffect(() => {
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 50
      const newBalance = Math.max(balance + change, 10000)
      const newPL = todaysPL + change * 0.5
      
      setBalance(newBalance)
      setTodaysPL(newPL)
      setIsPositive(newPL >= 0)
    }, 4000)

    return () => clearInterval(interval)
  }, [balance, todaysPL])

  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-blue-600" />
              Portfolio
              <Activity className="w-3 h-3 text-green-500 animate-pulse" />
            </CardTitle>
            <CardDescription>Your trading account overview</CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="transition-all duration-200 hover:scale-110"
            onClick={() => setShowBalance(!showBalance)}
          >
            {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Account Balance */}
        <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg transition-all duration-300">
          <div className="text-sm text-muted-foreground mb-1">Total Balance</div>
          <div className="text-2xl font-bold transition-all duration-500 animate-pulse">
            {showBalance ? `$${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "••••••"}
          </div>
          <div className="flex items-center gap-1 mt-1">
            {isPositive ? (
              <ArrowUpRight className="w-3 h-3 text-green-600 animate-bounce" />
            ) : (
              <ArrowDownRight className="w-3 h-3 text-red-600 animate-bounce" />
            )}
            <span className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? '+' : ''}{((todaysPL / balance) * 100).toFixed(2)}% 
              ({showBalance ? `$${todaysPL.toFixed(2)}` : "••••"})
            </span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className={`text-lg font-semibold transition-all duration-500 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {showBalance ? `$${Math.abs(todaysPL).toFixed(0)}` : "•••"}
            </div>
            <div className="text-xs text-muted-foreground">Today's P&L</div>
          </div>
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="text-lg font-semibold text-blue-600">
              {showBalance ? "12" : "••"}
            </div>
            <div className="text-xs text-muted-foreground">Open Positions</div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h4 className="text-sm font-medium mb-2">Recent Activity</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm p-2 rounded hover:bg-muted/50 transition-all duration-200 animate-in slide-in-from-left-2">
              <span>BTC Purchase</span>
              <div className="text-right">
                <div className="font-medium">0.25 BTC</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Activity className="w-2 h-2" />
                  2h ago
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm p-2 rounded hover:bg-muted/50 transition-all duration-200 animate-in slide-in-from-left-2" style={{ animationDelay: '100ms' }}>
              <span>AAPL Dividend</span>
              <div className="text-right">
                <div className="font-medium text-green-600 animate-pulse">+$24.50</div>
                <div className="text-xs text-muted-foreground">1d ago</div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm p-2 rounded hover:bg-muted/50 transition-all duration-200 animate-in slide-in-from-left-2" style={{ animationDelay: '200ms' }}>
              <span>TSLA Sale</span>
              <div className="text-right">
                <div className="font-medium">50 shares</div>
                <div className="text-xs text-muted-foreground">3d ago</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button size="sm" className="flex-1 transition-all duration-300 hover:scale-105 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
            <Plus className="w-4 h-4 mr-1" />
            Deposit
          </Button>
          <Button size="sm" variant="outline" className="flex-1 transition-all duration-300 hover:scale-105 hover:bg-blue-50 dark:hover:bg-blue-950/20">
            Trade
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
