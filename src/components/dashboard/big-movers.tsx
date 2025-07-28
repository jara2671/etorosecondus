"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, BarChart, Info } from "lucide-react"

const gainers = [
  { symbol: "NVDA", name: "NVIDIA Corp", change: "+8.45%", price: "$145.89" },
  { symbol: "TSLA", name: "Tesla Inc", change: "+6.23%", price: "$248.50" },
  { symbol: "AAPL", name: "Apple Inc", change: "+3.87%", price: "$195.12" },
  { symbol: "AMZN", name: "Amazon", change: "+3.54%", price: "$186.89" },
  { symbol: "GOOGL", name: "Alphabet", change: "+2.98%", price: "$175.34" },
]

const losers = [
  { symbol: "META", name: "Meta Platforms", change: "-4.12%", price: "$485.32" },
  { symbol: "NFLX", name: "Netflix", change: "-3.78%", price: "$458.91" },
  { symbol: "MSFT", name: "Microsoft", change: "-2.56%", price: "$425.67" },
  { symbol: "PYPL", name: "PayPal", change: "-2.34%", price: "$78.45" },
  { symbol: "UBER", name: "Uber", change: "-1.89%", price: "$68.23" },
]

const cryptoMovers = [
  { symbol: "BTC", name: "Bitcoin", change: "+5.67%", price: "$118,337" },
  { symbol: "ETH", name: "Ethereum", change: "+4.23%", price: "$3,776" },
  { symbol: "BNB", name: "Binance Coin", change: "+3.45%", price: "$687.89" },
  { symbol: "SOL", name: "Solana", change: "-2.11%", price: "$245.67" },
  { symbol: "ADA", name: "Cardano", change: "-1.56%", price: "$1.23" },
]

export function BigMovers() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="w-5 h-5" />
              Big Movers
            </CardTitle>
            <CardDescription>Today's biggest gainers and losers</CardDescription>
          </div>
          <Info className="w-4 h-4 text-muted-foreground" />
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
                <TrendingUp className="w-4 h-4 mr-1" />
                Top Gainers
              </h4>
              <div className="space-y-2">
                {gainers.slice(0, 3).map((stock) => (
                  <div key={stock.symbol} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{stock.symbol}</div>
                      <div className="text-xs text-muted-foreground truncate">{stock.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{stock.price}</div>
                      <Badge variant="outline" className="text-green-600 border-green-200 text-xs">
                        {stock.change}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-red-600 mb-2 flex items-center">
                <TrendingDown className="w-4 h-4 mr-1" />
                Top Losers
              </h4>
              <div className="space-y-2">
                {losers.slice(0, 3).map((stock) => (
                  <div key={stock.symbol} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{stock.symbol}</div>
                      <div className="text-xs text-muted-foreground truncate">{stock.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{stock.price}</div>
                      <Badge variant="outline" className="text-red-600 border-red-200 text-xs">
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
                <div key={crypto.symbol} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{crypto.symbol}</div>
                    <div className="text-xs text-muted-foreground truncate">{crypto.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{crypto.price}</div>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
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
              <BarChart className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm">Forex data coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
