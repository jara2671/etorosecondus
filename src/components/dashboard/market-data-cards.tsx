"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"
import { LineChart, Line, ResponsiveContainer } from "recharts"
import { useState, useEffect } from "react"

// Mock market data - in a real app, this would come from an API
const initialMarketData = [
  {
    symbol: "SPX500",
    name: "S&P 500",
    price: "6389.66",
    change: "+0.33%",
    changeValue: "+21.12",
    isPositive: true,
    chartData: [
      { value: 6350 }, { value: 6360 }, { value: 6355 }, { value: 6375 },
      { value: 6380 }, { value: 6390 }, { value: 6389.66 }
    ]
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    price: "118337.31",
    change: "+0.16%",
    changeValue: "+189.42",
    isPositive: true,
    chartData: [
      { value: 118000 }, { value: 118100 }, { value: 118050 }, { value: 118200 },
      { value: 118250 }, { value: 118300 }, { value: 118337.31 }
    ]
  },
  {
    symbol: "DJ30",
    name: "Dow Jones",
    price: "44885.75",
    change: "-0.33%",
    changeValue: "-148.25",
    isPositive: false,
    chartData: [
      { value: 45050 }, { value: 45000 }, { value: 44980 }, { value: 44950 },
      { value: 44920 }, { value: 44900 }, { value: 44885.75 }
    ]
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    price: "3776.7800",
    change: "+0.43%",
    changeValue: "+16.23",
    isPositive: true,
    chartData: [
      { value: 3750 }, { value: 3760 }, { value: 3755 }, { value: 3770 },
      { value: 3775 }, { value: 3780 }, { value: 3776.78 }
    ]
  },
  {
    symbol: "EURUSD",
    name: "EUR/USD",
    price: "1.17383",
    change: "-0.10%",
    changeValue: "-0.00117",
    isPositive: false,
    chartData: [
      { value: 1.175 }, { value: 1.174 }, { value: 1.173 }, { value: 1.174 },
      { value: 1.173 }, { value: 1.174 }, { value: 1.17383 }
    ]
  },
]

export function MarketDataCards() {
  const [marketData, setMarketData] = useState(initialMarketData)

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev => prev.map(asset => {
        const change = (Math.random() - 0.5) * 0.02 // Small random change
        const newPrice = parseFloat(asset.price) * (1 + change)
        const priceChange = newPrice - parseFloat(asset.price)
        const percentChange = (priceChange / parseFloat(asset.price)) * 100
        
        return {
          ...asset,
          price: newPrice.toFixed(asset.symbol === "EURUSD" ? 5 : 2),
          change: `${percentChange >= 0 ? '+' : ''}${percentChange.toFixed(2)}%`,
          changeValue: `${priceChange >= 0 ? '+' : ''}${priceChange.toFixed(asset.symbol === "EURUSD" ? 5 : 2)}`,
          isPositive: percentChange >= 0,
          chartData: asset.chartData.slice(1).concat([{ 
            value: newPrice 
          }])
        }
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 animate-in fade-in-0 duration-500">
      {marketData.map((asset) => (
        <Card 
          key={asset.symbol} 
          className="transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer group"
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-lg flex items-center gap-2">
                  {asset.symbol}
                  <Activity className="w-3 h-3 text-green-500 animate-pulse" />
                </h3>
                <p className="text-xs text-muted-foreground">{asset.name}</p>
              </div>
              <Badge
                variant={asset.isPositive ? "default" : "destructive"}
                className={asset.isPositive
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                }
              >
                {asset.change}
              </Badge>
            </div>

            <div className="space-y-1 mb-3">
              <p className="font-bold text-xl transition-all duration-500 group-hover:text-blue-600">
                {asset.price}
              </p>
              <div className="flex items-center space-x-1">
                {asset.isPositive ? (
                  <TrendingUp className="w-3 h-3 text-green-600 animate-bounce" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-600 animate-bounce" />
                )}
                <span className={`text-sm ${
                  asset.isPositive ? "text-green-600" : "text-red-600"
                }`}>
                  {asset.changeValue}
                </span>
              </div>
            </div>

            {/* Mini Chart */}
            <div className="h-8 transition-all duration-300 group-hover:h-12">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={asset.chartData}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={asset.isPositive ? "#10b981" : "#ef4444"}
                    strokeWidth={2}
                    dot={false}
                    strokeDasharray={asset.isPositive ? "0" : "3 3"}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
