"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, TrendingUp, TrendingDown, Star } from "lucide-react"
import { useState } from "react"

const stocksData = [
  { symbol: "AAPL", name: "Apple Inc.", price: "$195.12", change: "+3.87%", volume: "45.2M", isPositive: true },
  { symbol: "MSFT", name: "Microsoft Corp", price: "$425.67", change: "-2.56%", volume: "32.1M", isPositive: false },
  { symbol: "GOOGL", name: "Alphabet Inc", price: "$175.34", change: "+2.98%", volume: "28.7M", isPositive: true },
  { symbol: "AMZN", name: "Amazon.com Inc", price: "$186.89", change: "+3.54%", volume: "41.3M", isPositive: true },
  { symbol: "TSLA", name: "Tesla Inc", price: "$248.50", change: "+6.23%", volume: "89.5M", isPositive: true },
  { symbol: "NVDA", name: "NVIDIA Corp", price: "$145.89", change: "+8.45%", volume: "125.8M", isPositive: true },
]

const cryptoData = [
  { symbol: "BTC", name: "Bitcoin", price: "$118,337.31", change: "+5.67%", marketCap: "$2.3T", isPositive: true },
  { symbol: "ETH", name: "Ethereum", price: "$3,776.78", change: "+4.23%", marketCap: "$453.2B", isPositive: true },
  { symbol: "BNB", name: "Binance Coin", price: "$687.89", change: "+3.45%", marketCap: "$99.8B", isPositive: true },
  { symbol: "SOL", name: "Solana", price: "$245.67", change: "-2.11%", marketCap: "$118.3B", isPositive: false },
  { symbol: "ADA", name: "Cardano", price: "$1.23", change: "-1.56%", marketCap: "$43.2B", isPositive: false },
]

const forexData = [
  { pair: "EUR/USD", price: "1.17383", change: "-0.10%", spread: "0.8", isPositive: false },
  { pair: "GBP/USD", price: "1.28745", change: "+0.25%", spread: "1.2", isPositive: true },
  { pair: "USD/JPY", price: "155.420", change: "+0.33%", spread: "0.9", isPositive: true },
  { pair: "AUD/USD", price: "0.68321", change: "-0.45%", spread: "1.1", isPositive: false },
]

export default function MarketsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Markets</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search markets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline">
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
          <Card>
            <CardHeader>
              <CardTitle>Stock Market</CardTitle>
              <CardDescription>Real-time stock prices and market data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Symbol</th>
                      <th className="text-left py-2">Name</th>
                      <th className="text-right py-2">Price</th>
                      <th className="text-right py-2">Change</th>
                      <th className="text-right py-2">Volume</th>
                      <th className="text-right py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stocksData.map((stock) => (
                      <tr key={stock.symbol} className="border-b hover:bg-muted/50">
                        <td className="py-3 font-medium">{stock.symbol}</td>
                        <td className="py-3 text-muted-foreground">{stock.name}</td>
                        <td className="py-3 text-right font-medium">{stock.price}</td>
                        <td className="py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            {stock.isPositive ? (
                              <TrendingUp className="w-3 h-3 text-green-600" />
                            ) : (
                              <TrendingDown className="w-3 h-3 text-red-600" />
                            )}
                            <Badge
                              variant="outline"
                              className={stock.isPositive ? "text-green-600 border-green-200" : "text-red-600 border-red-200"}
                            >
                              {stock.change}
                            </Badge>
                          </div>
                        </td>
                        <td className="py-3 text-right text-muted-foreground">{stock.volume}</td>
                        <td className="py-3 text-right">
                          <Button size="sm" variant="outline">Trade</Button>
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
          <Card>
            <CardHeader>
              <CardTitle>Cryptocurrency</CardTitle>
              <CardDescription>Digital assets and cryptocurrency prices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Symbol</th>
                      <th className="text-left py-2">Name</th>
                      <th className="text-right py-2">Price</th>
                      <th className="text-right py-2">Change</th>
                      <th className="text-right py-2">Market Cap</th>
                      <th className="text-right py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cryptoData.map((crypto) => (
                      <tr key={crypto.symbol} className="border-b hover:bg-muted/50">
                        <td className="py-3 font-medium">{crypto.symbol}</td>
                        <td className="py-3 text-muted-foreground">{crypto.name}</td>
                        <td className="py-3 text-right font-medium">{crypto.price}</td>
                        <td className="py-3 text-right">
                          <Badge
                            variant="outline"
                            className={crypto.isPositive ? "text-green-600 border-green-200" : "text-red-600 border-red-200"}
                          >
                            {crypto.change}
                          </Badge>
                        </td>
                        <td className="py-3 text-right text-muted-foreground">{crypto.marketCap}</td>
                        <td className="py-3 text-right">
                          <Button size="sm" variant="outline">Trade</Button>
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
          <Card>
            <CardHeader>
              <CardTitle>Foreign Exchange</CardTitle>
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
                      <tr key={forex.pair} className="border-b hover:bg-muted/50">
                        <td className="py-3 font-medium">{forex.pair}</td>
                        <td className="py-3 text-right font-medium">{forex.price}</td>
                        <td className="py-3 text-right">
                          <Badge
                            variant="outline"
                            className={forex.isPositive ? "text-green-600 border-green-200" : "text-red-600 border-red-200"}
                          >
                            {forex.change}
                          </Badge>
                        </td>
                        <td className="py-3 text-right text-muted-foreground">{forex.spread}</td>
                        <td className="py-3 text-right">
                          <Button size="sm" variant="outline">Trade</Button>
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
          <Card>
            <CardHeader>
              <CardTitle>Commodities</CardTitle>
              <CardDescription>Precious metals, energy, and agricultural products</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <TrendingUp className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Commodities Coming Soon</h3>
                <p>We're working on adding comprehensive commodities trading data.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
