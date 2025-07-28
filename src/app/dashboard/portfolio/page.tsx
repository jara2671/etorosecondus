"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  BarChart3,
  Download,
  Eye,
  EyeOff,
  Plus,
  Minus
} from "lucide-react"
import { useState } from "react"
import { PieChart as RechartsePieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, AreaChart, Area } from "recharts"

// Mock portfolio data
const portfolioData = {
  totalValue: 124580.89,
  totalReturn: 8247.35,
  totalReturnPercent: 7.12,
  todayChange: 2345.67,
  todayChangePercent: 1.92,
  availableCash: 15420.50,
  investedAmount: 109160.39,
}

const holdings = [
  { symbol: "AAPL", name: "Apple Inc.", shares: 50, avgPrice: 180.25, currentPrice: 195.12, marketValue: 9756.00, unrealizedPL: 743.50, unrealizedPLPercent: 8.24, allocation: 7.8 },
  { symbol: "MSFT", name: "Microsoft Corp", shares: 25, avgPrice: 415.30, currentPrice: 425.67, marketValue: 10641.75, unrealizedPL: 259.25, unrealizedPLPercent: 2.49, allocation: 8.5 },
  { symbol: "GOOGL", name: "Alphabet Inc", shares: 30, avgPrice: 165.80, currentPrice: 175.34, marketValue: 5260.20, unrealizedPL: 286.20, unrealizedPLPercent: 5.76, allocation: 4.2 },
  { symbol: "TSLA", name: "Tesla Inc", shares: 40, avgPrice: 235.60, currentPrice: 248.50, marketValue: 9940.00, unrealizedPL: 516.00, unrealizedPLPercent: 5.47, allocation: 8.0 },
  { symbol: "BTC", name: "Bitcoin", shares: 0.25, avgPrice: 45000, currentPrice: 118337.31, marketValue: 29584.33, unrealizedPL: 18334.33, unrealizedPLPercent: 163.0, allocation: 23.7 },
  { symbol: "ETH", name: "Ethereum", shares: 5, avgPrice: 2800, currentPrice: 3776.78, marketValue: 18883.90, unrealizedPL: 4883.90, unrealizedPLPercent: 34.89, allocation: 15.1 },
]

const performanceData = [
  { date: "Jan", value: 98000 },
  { date: "Feb", value: 102000 },
  { date: "Mar", value: 99500 },
  { date: "Apr", value: 108000 },
  { date: "May", value: 115000 },
  { date: "Jun", value: 112000 },
  { date: "Jul", value: 124580 },
]

const allocationData = [
  { name: "Crypto", value: 23.7, color: "#8b5cf6" },
  { name: "Tech Stocks", value: 28.5, color: "#3b82f6" },
  { name: "Growth Stocks", value: 15.2, color: "#10b981" },
  { name: "ETFs", value: 20.1, color: "#f59e0b" },
  { name: "Cash", value: 12.5, color: "#6b7280" },
]

export default function PortfolioPage() {
  const [showValues, setShowValues] = useState(true)
  const [viewMode, setViewMode] = useState<"list" | "cards">("list")

  const formatCurrency = (value: number) => {
    return showValues ? `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "••••••"
  }

  const formatPercent = (value: number) => {
    const sign = value >= 0 ? "+" : ""
    return `${sign}${value.toFixed(2)}%`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Portfolio</h1>
          <p className="text-muted-foreground">Track your investments and performance</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <Switch checked={showValues} onCheckedChange={setShowValues} />
            <EyeOff className="w-4 h-4" />
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Portfolio Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(portfolioData.totalValue)}</div>
            <div className="flex items-center text-sm">
              <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
              <span className="text-green-600">
                {formatPercent(portfolioData.totalReturnPercent)} ({formatCurrency(portfolioData.totalReturn)})
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Change</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(portfolioData.todayChange)}
            </div>
            <div className="flex items-center text-sm">
              <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
              <span className="text-green-600">
                {formatPercent(portfolioData.todayChangePercent)}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Cash</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(portfolioData.availableCash)}</div>
            <p className="text-xs text-muted-foreground">Ready to invest</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Invested Amount</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(portfolioData.investedAmount)}</div>
            <p className="text-xs text-muted-foreground">87.6% of portfolio</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Portfolio Performance</CardTitle>
            <CardDescription>Your portfolio value over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Asset Allocation */}
        <Card>
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
            <CardDescription>Portfolio breakdown by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsePieChart>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </RechartsePieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {allocationData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Holdings Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Holdings</CardTitle>
              <CardDescription>Your current positions and performance</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Add Position
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Shares</TableHead>
                <TableHead className="text-right">Avg. Price</TableHead>
                <TableHead className="text-right">Current Price</TableHead>
                <TableHead className="text-right">Market Value</TableHead>
                <TableHead className="text-right">Unrealized P/L</TableHead>
                <TableHead className="text-right">Allocation</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {holdings.map((holding) => (
                <TableRow key={holding.symbol} className="hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{holding.symbol}</div>
                      <div className="text-sm text-muted-foreground">{holding.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>{holding.shares}</TableCell>
                  <TableCell className="text-right">{formatCurrency(holding.avgPrice)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(holding.currentPrice)}</TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(holding.marketValue)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className={holding.unrealizedPL >= 0 ? "text-green-600" : "text-red-600"}>
                      <div className="font-medium">{formatCurrency(holding.unrealizedPL)}</div>
                      <div className="text-sm">
                        {formatPercent(holding.unrealizedPLPercent)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline">{holding.allocation}%</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="outline" size="sm">
                        <Plus className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Minus className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
