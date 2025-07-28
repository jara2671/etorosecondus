"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, TrendingUp, TrendingDown, Star, Activity, Zap, BarChart3 } from "lucide-react"
import { useState, useEffect } from "react"
import { LineChart, Line, ResponsiveContainer } from "recharts"

const generateMiniChart = () => {
  return Array.from({ length: 10 }, (_, i) => ({
    value: Math.random() * 100 + 50
  }))
}

const initialStocksData = [
  { symbol: "AAPL", name: "Apple Inc.", price: "$195.12", change: "+3.87%", volume: "45.2M", isPositive: true },
  { symbol: "MSFT", name: "Microsoft Corp", price: "$425.67", change: "-2.56%", volume: "32.1M", isPositive: false },
  { symbol: "GOOGL", name: "Alphabet Inc", price: "$175.34", change: "+2.98%", volume: "28.7M", isPositive: true },
  { symbol: "AMZN", name: "Amazon.com Inc", price: "$186.89", change: "+3.54%", volume: "41.3M", isPositive: true },
  { symbol: "TSLA", name: "Tesla Inc", price: "$248.50", change: "+6.23%", volume: "89.5M", isPositive: true },
  { symbol: "NVDA", name: "NVIDIA Corp", price: "$145.89", change: "+8.45%", volume: "125.8M", isPositive: true },
].map(stock => ({ ...stock, chartData: generateMiniChart() }))

const initialCryptoData = [
  { symbol: "BTC", name: "Bitcoin", price: "$118,337.31", change: "+5.67%", marketCap: "$2.3T", isPositive: true },
  { symbol: "ETH", name: "Ethereum", price: "$3,776.78", change: "+4.23%", marketCap: "$453.2B", isPositive: true },
  { symbol: "BNB", name: "Binance Coin", price: "$687.89", change: "+3.45%", marketCap: "$99.8B", isPositive: true },
  { symbol: "SOL", name: "Solana", price: "$245.67", change: "-2.11%", marketCap: "$118.3B", isPositive: false },
  { symbol: "ADA", name: "Cardano", price: "$1.23", change: "-1.56%", marketCap: "$43.2B", isPositive: false },
].map(crypto => ({ ...crypto, chartData: generateMiniChart() }))

const initialForexData = [
  { pair: "EUR/USD", price: "1.17383", change: "-0.10%", spread: "0.8", isPositive: false },
  { pair: "GBP/USD", price: "1.28745", change: "+0.25%", spread: "1.2", isPositive: true },
  { pair: "USD/JPY", price: "155.420", change: "+0.33%", spread: "0.9", isPositive: true },
  { pair: "AUD/USD", price: "0.68321", change: "-0.45%", spread: "1.1", isPositive: false },
].map(forex => ({ ...forex, chartData: generateMiniChart() }))

export default function MarketsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [stocksData, setStocksData] = useState(initialStocksData)
  const [cryptoData, setCryptoData] = useState(initialCryptoData)
  const [forexData, setForexData] = useState(initialForexData)
  const [isUpdating, setIsUpdating] = useState(false)

  // Real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setIsUpdating(true)
      
      // Update stocks data
      setStocksData(prev => prev.map(stock => {
        const changeNum = parseFloat(stock.change.replace('%', '').replace('+', ''))
        const newChange = changeNum + (Math.random() - 0.5) * 0.5
        const priceNum = parseFloat(stock.price.replace('$', ''))
        const newPrice = priceNum * (1 + newChange / 100)
        
        return {
          ...stock,
          price: `$${newPrice.toFixed(2)}`,
          change: `${newChange >= 0 ? '+' : ''}${newChange.toFixed(2)}%`,
          isPositive: newChange >= 0,
          chartData: stock.chartData.slice(1).concat([{ value: newPrice }])
        }
      }))

      // Update crypto data
      setCryptoData(prev => prev.map(crypto => {
        const changeNum = parseFloat(crypto.change.replace('%', '').replace('+', ''))
        const newChange = changeNum + (Math.random() - 0.5) * 1
        const priceStr = crypto.price.replace('$', '').replace(',', '')
        const priceNum = parseFloat(priceStr)
        const newPrice = priceNum * (1 + newChange / 100)
        
        return {
          ...crypto,
          price: `$${newPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          change: `${newChange >= 0 ? '+' : ''}${newChange.toFixed(2)}%`,
          isPositive: newChange >= 0,
          chartData: crypto.chartData.slice(1).concat([{ value: newPrice }])
        }
      }))

      setTimeout(() => setIsUpdating(false), 500)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6 animate-in fade-in-0 duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Markets</h1>
        <div className="flex items-center gap-3">
          {isUpdating && (
            <div className="flex items-center gap-2 text-blue-600">
              <Zap className="w-4 h-4 animate-bounce" />
              <span className="text-sm">Updating...</span>
            </div>
          )}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search markets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button variant="outline" className="transition-all duration-200 hover:scale-105">
            <Star className="w-4 h-4 mr-2" />
            Watchlist
          </Button>
        </div>
      </div>

      <Tabs defaultValue="stocks" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="stocks">Stocks</TabsTrigger>
          <TabsTrigger value="crypto">Cryptocurrency</TabsTrigger>
          <TabsTrigger value="forex">Forex</TabsTrigger>
          <TabsTrigger value="commodities">Commodities</TabsTrigger>
        </TabsList>

        <TabsContent value="stocks" className="space-y-4">
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                Stock Market
                <Activity className="w-3 h-3 text-green-500 animate-pulse" />
              </CardTitle>
              <CardDescription>Real-time stock prices and market data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Symbol</th>
                      <th className="text-left py-2">Name</th>
                      <th className="text-center py-2">Chart</th>
                      <th className="text-right py-2">Price</th>
                      <th className="text-right py-2">Change</th>
                      <th className="text-right py-2">Volume</th>
                      <th className="text-right py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stocksData.map((stock) => (
                      <tr key={stock.symbol} className="border-b hover:bg-muted/50 transition-all duration-200 group">
                        <td className="py-3 font-medium">{stock.symbol}</td>
                        <td className="py-3 text-muted-foreground">{stock.name}</td>
                        <td className="py-3">
                          <div className="h-8 w-16">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={stock.chartData}>
                                <Line
                                  type="monotone"
                                  dataKey="value"
                                  stroke={stock.isPositive ? "#10b981" : "#ef4444"}
                                  strokeWidth={1.5}
                                  dot={false}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </td>
                        <td className="py-3 text-right font-medium transition-all duration-300 group-hover:text-blue-600">
                          {stock.price}
                        </td>
                        <td className="py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            {stock.isPositive ? (
                              <TrendingUp className="w-3 h-3 text-green-600 animate-bounce" />
                            ) : (
                              <TrendingDown className="w-3 h-3 text-red-600 animate-bounce" />
                            )}
                            <Badge
                              variant="outline"
                              className={`animate-pulse ${stock.isPositive ? "text-green-600 border-green-200" : "text-red-600 border-red-200"}`}
                            >
                              {stock.change}
                            </Badge>
                          </div>
                        </td>
                        <td className="py-3 text-right text-muted-foreground">{stock.volume}</td>
                        <td className="py-3 text-right">
                          <Button size="sm" variant="outline" className="transition-all duration-200 hover:scale-105 hover:bg-blue-50 dark:hover:bg-blue-950/20">
                            Trade
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="crypto" className="space-y-4">
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full" />
                Cryptocurrency
                <Activity className="w-3 h-3 text-green-500 animate-pulse" />
              </CardTitle>
              <CardDescription>Digital assets and cryptocurrency prices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Symbol</th>
                      <th className="text-left py-2">Name</th>
                      <th className="text-center py-2">Chart</th>
                      <th className="text-right py-2">Price</th>
                      <th className="text-right py-2">Change</th>
                      <th className="text-right py-2">Market Cap</th>
                      <th className="text-right py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cryptoData.map((crypto) => (
                      <tr key={crypto.symbol} className="border-b hover:bg-muted/50 transition-all duration-200 group">
                        <td className="py-3 font-medium">{crypto.symbol}</td>
                        <td className="py-3 text-muted-foreground">{crypto.name}</td>
                        <td className="py-3">
                          <div className="h-8 w-16">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={crypto.chartData}>
                                <Line
                                  type="monotone"
                                  dataKey="value"
                                  stroke={crypto.isPositive ? "#10b981" : "#ef4444"}
                                  strokeWidth={1.5}
                                  dot={false}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </td>
                        <td className="py-3 text-right font-medium transition-all duration-300 group-hover:text-orange-600">
                          {crypto.price}
                        </td>
                        <td className="py-3 text-right">
                          <Badge
                            variant="outline"
                            className={`animate-pulse ${crypto.isPositive ? "text-green-600 border-green-200" : "text-red-600 border-red-200"}`}
                          >
                            {crypto.change}
                          </Badge>
                        </td>
                        <td className="py-3 text-right text-muted-foreground">{crypto.marketCap}</td>
                        <td className="py-3 text-right">
                          <Button size="sm" variant="outline" className="transition-all duration-200 hover:scale-105 hover:bg-orange-50 dark:hover:bg-orange-950/20">
                            Trade
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forex" className="space-y-4">
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gradient-to-r from-green-500 to-blue-500 rounded-full" />
                Foreign Exchange
                <Activity className="w-3 h-3 text-green-500 animate-pulse" />
              </CardTitle>
              <CardDescription>Currency pairs and exchange rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Pair</th>
                      <th className="text-right py-2">Price</th>
                      <th className="text-right py-2">Change</th>
                      <th className="text-right py-2">Spread</th>
                      <th className="text-right py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {forexData.map((forex) => (
                      <tr key={forex.pair} className="border-b hover:bg-muted/50 transition-all duration-200 group">
                        <td className="py-3 font-medium">{forex.pair}</td>
                        <td className="py-3 text-right font-medium transition-all duration-300 group-hover:text-green-600">
                          {forex.price}
                        </td>
                        <td className="py-3 text-right">
                          <Badge
                            variant="outline"
                            className={`animate-pulse ${forex.isPositive ? "text-green-600 border-green-200" : "text-red-600 border-red-200"}`}
                          >
                            {forex.change}
                          </Badge>
                        </td>
                        <td className="py-3 text-right text-muted-foreground">{forex.spread}</td>
                        <td className="py-3 text-right">
                          <Button size="sm" variant="outline" className="transition-all duration-200 hover:scale-105 hover:bg-green-50 dark:hover:bg-green-950/20">
                            Trade
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commodities" className="space-y-4">
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full" />
                Commodities
              </CardTitle>
              <CardDescription>Precious metals, energy, and agricultural products</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 animate-pulse" />
                <h3 className="text-lg font-medium mb-2">Commodities Coming Soon</h3>
                <p>We're working on adding comprehensive commodities trading data.</p>
                <div className="mt-4">
                  <div className="w-32 h-1 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full mx-auto animate-pulse" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
