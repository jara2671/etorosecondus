"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, BarChart, Info, Zap, Activity } from "lucide-react"
import { useState, useEffect } from "react"

const initialGainers = [
  { symbol: "NVDA", name: "NVIDIA Corp", change: "+8.45%", price: "$145.89" },
  { symbol: "TSLA", name: "Tesla Inc", change: "+6.23%", price: "$248.50" },
  { symbol: "AAPL", name: "Apple Inc", change: "+3.87%", price: "$195.12" },
  { symbol: "AMZN", name: "Amazon", change: "+3.54%", price: "$186.89" },
  { symbol: "GOOGL", name: "Alphabet", change: "+2.98%", price: "$175.34" },
]

const initialLosers = [
  { symbol: "META", name: "Meta Platforms", change: "-4.12%", price: "$485.32" },
  { symbol: "NFLX", name: "Netflix", change: "-3.78%", price: "$458.91" },
  { symbol: "MSFT", name: "Microsoft", change: "-2.56%", price: "$425.67" },
  { symbol: "PYPL", name: "PayPal", change: "-2.34%", price: "$78.45" },
  { symbol: "UBER", name: "Uber", change: "-1.89%", price: "$68.23" },
]

const initialCryptoMovers = [
  { symbol: "BTC", name: "Bitcoin", change: "+5.67%", price: "$118,337" },
  { symbol: "ETH", name: "Ethereum", change: "+4.23%", price: "$3,776" },
  { symbol: "BNB", name: "Binance Coin", change: "+3.45%", price: "$687.89" },
  { symbol: "SOL", name: "Solana", change: "-2.11%", price: "$245.67" },
  { symbol: "ADA", name: "Cardano", change: "-1.56%", price: "$1.23" },
]

export function BigMovers() {
  const [gainers, setGainers] = useState(initialGainers)
  const [losers, setLosers] = useState(initialLosers)
  const [cryptoMovers, setCryptoMovers] = useState(initialCryptoMovers)
  const [isUpdating, setIsUpdating] = useState(false)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setIsUpdating(true)
      
      // Update gainers
      setGainers(prev => prev.map(stock => {
        const changeNum = parseFloat(stock.change.replace('%', '').replace('+', ''))
        const newChange = changeNum + (Math.random() - 0.5) * 0.5
        const priceNum = parseFloat(stock.price.replace('$', '').replace(',', ''))
        const newPrice = priceNum * (1 + newChange / 100)
        
        return {
          ...stock,
          change: `+${Math.max(newChange, 0.1).toFixed(2)}%`,
          price: `$${newPrice.toFixed(2)}`
        }
      }))

      // Update losers
      setLosers(prev => prev.map(stock => {
        const changeNum = Math.abs(parseFloat(stock.change.replace('%', '').replace('-', '')))
        const newChange = changeNum + (Math.random() - 0.5) * 0.5
        const priceNum = parseFloat(stock.price.replace('$', '').replace(',', ''))
        const newPrice = priceNum * (1 - newChange / 100)
        
        return {
          ...stock,
          change: `-${Math.max(newChange, 0.1).toFixed(2)}%`,
          price: `$${newPrice.toFixed(2)}`
        }
      }))

      setTimeout(() => setIsUpdating(false), 500)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BarChart className={`w-5 h-5 ${isUpdating ? 'animate-pulse text-blue-500' : ''}`} />
              Big Movers
              {isUpdating && <Zap className="w-3 h-3 text-yellow-500 animate-bounce" />}
            </CardTitle>
            <CardDescription>Today's biggest gainers and losers</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-3 h-3 text-green-500 animate-pulse" />
            <Info className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="stocks" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="stocks">Stocks</TabsTrigger>
            <TabsTrigger value="crypto">Crypto</TabsTrigger>
            <TabsTrigger value="forex">Forex</TabsTrigger>
          </TabsList>

          <TabsContent value="stocks" className="space-y-4 mt-4">
            <div>
              <h4 className="text-sm font-medium text-green-600 mb-2 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1 animate-bounce" />
                Top Gainers
              </h4>
              <div className="space-y-2">
                {gainers.slice(0, 3).map((stock) => (
                  <div 
                    key={stock.symbol} 
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-950/20 transition-all duration-300 cursor-pointer group hover:scale-105"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-sm group-hover:text-green-600 transition-colors">
                        {stock.symbol}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">{stock.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium transition-all duration-300">
                        {stock.price}
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-200 text-xs animate-pulse">
                        {stock.change}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-red-600 mb-2 flex items-center">
                <TrendingDown className="w-4 h-4 mr-1 animate-bounce" />
                Top Losers
              </h4>
              <div className="space-y-2">
                {losers.slice(0, 3).map((stock) => (
                  <div 
                    key={stock.symbol} 
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-300 cursor-pointer group hover:scale-105"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-sm group-hover:text-red-600 transition-colors">
                        {stock.symbol}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">{stock.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium transition-all duration-300">
                        {stock.price}
                      </div>
                      <Badge variant="outline" className="text-red-600 border-red-200 text-xs animate-pulse">
                        {stock.change}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="crypto" className="space-y-4 mt-4">
            <div className="space-y-2">
              {cryptoMovers.map((crypto) => (
                <div 
                  key={crypto.symbol} 
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-all duration-300 cursor-pointer group hover:scale-105"
                >
                  <div className="flex-1">
                    <div className="font-medium text-sm group-hover:text-blue-600 transition-colors">
                      {crypto.symbol}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">{crypto.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium transition-all duration-300">
                      {crypto.price}
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-xs animate-pulse ${
                        crypto.change.startsWith('+')
                          ? 'text-green-600 border-green-200'
                          : 'text-red-600 border-red-200'
                      }`}
                    >
                      {crypto.change}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="forex" className="space-y-4 mt-4">
            <div className="text-center py-8 text-muted-foreground">
              <BarChart className="w-8 h-8 mx-auto mb-2 animate-pulse" />
              <p className="text-sm">Forex data coming soon</p>
              <div className="mt-2">
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto animate-pulse" />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
