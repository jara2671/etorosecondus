"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet, TrendingUp, Eye, EyeOff, Plus } from "lucide-react"
import { useState } from "react"

export function PortfolioOverview() {
  const [showBalance, setShowBalance] = useState(true)

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              Portfolio
            </CardTitle>
            <CardDescription>Your trading account overview</CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowBalance(!showBalance)}
          >
            {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Account Balance */}
        <div>
          <div className="text-sm text-muted-foreground mb-1">Total Balance</div>
          <div className="text-2xl font-bold">
            {showBalance ? "$12,450.89" : "••••••"}
          </div>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3 text-green-600" />
            <span className="text-sm text-green-600">+2.34% ($285.67)</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-lg font-semibold text-green-600">
              {showBalance ? "$1,247" : "•••"}
            </div>
            <div className="text-xs text-muted-foreground">Today's P&L</div>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-lg font-semibold">
              {showBalance ? "12" : "••"}
            </div>
            <div className="text-xs text-muted-foreground">Open Positions</div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h4 className="text-sm font-medium mb-2">Recent Activity</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>BTC Purchase</span>
              <div className="text-right">
                <div className="font-medium">0.25 BTC</div>
                <div className="text-xs text-muted-foreground">2h ago</div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>AAPL Dividend</span>
              <div className="text-right">
                <div className="font-medium text-green-600">+$24.50</div>
                <div className="text-xs text-muted-foreground">1d ago</div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
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
          <Button size="sm" className="flex-1">
            <Plus className="w-4 h-4 mr-1" />
            Deposit
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            Trade
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
