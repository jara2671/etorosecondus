"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calculator,
  Target,
  Activity,
  BarChart3,
  Zap
} from "lucide-react"
import { toast } from "sonner"
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, AreaChart, Area, CandlestickChart, ReferenceLine } from "recharts"

// Mock real-time price data
const generatePriceData = (basePrice: number, points: number = 50) => {
  const data = []
  let price = basePrice
  const now = Date.now()
  
  for (let i = points; i >= 0; i--) {
    const change = (Math.random() - 0.5) * 2
    price += change
    data.push({
      time: new Date(now - i * 60000).toLocaleTimeString(),
      price: Math.max(price, basePrice * 0.95),
      volume: Math.floor(Math.random() * 1000) + 500
    })
  }
  return data
}

// Mock candlestick data
const generateCandlestickData = (basePrice: number, points: number = 20) => {
  const data = []
  let price = basePrice
  
  for (let i = points; i >= 0; i--) {
    const open = price
    const change = (Math.random() - 0.5) * 4
    const close = Math.max(open + change, basePrice * 0.9)
    const high = Math.max(open, close) + Math.random() * 2
    const low = Math.min(open, close) - Math.random() * 2
    
    data.push({
      time: new Date(Date.now() - i * 300000).toLocaleTimeString(),
      open,
      high,
      low,
      close,
      volume: Math.floor(Math.random() * 2000) + 1000
    })
    price = close
  }
  return data
}

// Mock data with real-time updates
const selectedAsset = {
  symbol: "AAPL",
  name: "Apple Inc.",
  price: 195.12,
  change: 3.87,
  changePercent: 2.02,
  bid: 195.10,
  ask: 195.14,
  volume: "45.2M",
  marketCap: "3.01T",
  high24h: 198.45,
  low24h: 192.33
}

const orderBook = {
  bids: [
    { price: 195.10, quantity: 1500 },
    { price: 195.08, quantity: 2300 },
    { price: 195.05, quantity: 1800 },
    { price: 195.02, quantity: 3200 },
    { price: 195.00, quantity: 5000 },
  ],
  asks: [
    { price: 195.14, quantity: 1200 },
    { price: 195.16, quantity: 1900 },
    { price: 195.20, quantity: 2100 },
    { price: 195.25, quantity: 2800 },
    { price: 195.30, quantity: 3500 },
  ]
}

const recentTrades = [
  { time: "14:25:32", price: 195.12, quantity: 100, side: "buy" },
  { time: "14:25:28", price: 195.10, quantity: 250, side: "sell" },
  { time: "14:25:24", price: 195.15, quantity: 150, side: "buy" },
  { time: "14:25:20", price: 195.08, quantity: 300, side: "sell" },
  { time: "14:25:16", price: 195.20, quantity: 75, side: "buy" },
]

const openOrders = [
  { id: "1", symbol: "AAPL", type: "Limit", side: "Buy", quantity: 100, price: 190.00, status: "Open", time: "10:30 AM" },
  { id: "2", symbol: "MSFT", type: "Market", side: "Sell", quantity: 50, price: 425.67, status: "Filled", time: "09:45 AM" },
  { id: "3", symbol: "GOOGL", type: "Stop", side: "Sell", quantity: 25, price: 170.00, status: "Pending", time: "08:15 AM" },
]

export default function TradingPage() {
  const [orderType, setOrderType] = useState("market")
  const [orderSide, setOrderSide] = useState<"buy" | "sell">("buy")
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")
  const [stopPrice, setStopPrice] = useState("")
  const [currentPrice, setCurrentPrice] = useState(selectedAsset.price)
  const [priceData, setPriceData] = useState(() => generatePriceData(selectedAsset.price))
  const [candlestickData, setCandlestickData] = useState(() => generateCandlestickData(selectedAsset.price))
  const [chartType, setChartType] = useState<"line" | "candlestick">("line")
  const [timeframe, setTimeframe] = useState("1m")
  const [isLoading, setIsLoading] = useState(false)

  // Real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 0.5
      const newPrice = Math.max(currentPrice + change, selectedAsset.price * 0.95)
      setCurrentPrice(newPrice)
      
      // Update price data
      setPriceData(prev => {
        const newData = [...prev.slice(1), {
          time: new Date().toLocaleTimeString(),
          price: newPrice,
          volume: Math.floor(Math.random() * 1000) + 500
        }]
        return newData
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [currentPrice])

  const handlePlaceOrder = async () => {
    if (!quantity) {
      toast.error("Please enter quantity")
      return
    }

    if (orderType !== "market" && !price) {
      toast.error("Please enter price")
      return
    }

    setIsLoading(true)

    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 1500))

    const order = {
      symbol: selectedAsset.symbol,
      type: orderType,
      side: orderSide,
      quantity: parseInt(quantity),
      price: orderType === "market" ? currentPrice : parseFloat(price),
      stopPrice: orderType === "stop" ? parseFloat(stopPrice) : undefined,
    }

    toast.success(`${orderSide.toUpperCase()} order placed for ${quantity} ${selectedAsset.symbol}`, {
      description: `Order value: $${calculateOrderValue().toFixed(2)}`
    })

    // Reset form
    setQuantity("")
    setPrice("")
    setStopPrice("")
    setIsLoading(false)
  }

  const calculateOrderValue = () => {
    const qty = parseInt(quantity) || 0
    const orderPrice = orderType === "market" ? currentPrice : (parseFloat(price) || 0)
    return qty * orderPrice
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-sm text-blue-600">
            Price: ${payload[0].value.toFixed(2)}
          </p>
          {payload[1] && (
            <p className="text-sm text-gray-600">
              Volume: {payload[1].value}
            </p>
          )}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6 animate-in fade-in-0 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Trading</h1>
          <p className="text-muted-foreground">Execute trades and manage your orders</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-green-600 border-green-200 animate-pulse">
            <Activity className="w-3 h-3 mr-1" />
            Market Open
          </Badge>
          <Badge variant="outline">
            <DollarSign className="w-3 h-3 mr-1" />
            Buying Power: $15,420.50
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Asset Info & Trading Panel */}
        <Card className="lg:col-span-1 transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {selectedAsset.symbol}
                  <Badge variant="outline">{selectedAsset.name}</Badge>
                </CardTitle>
                <CardDescription>Real-time market data</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Current Price with Animation */}
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg transition-all duration-300">
              <div className="text-3xl font-bold transition-all duration-500 animate-pulse">
                ${currentPrice.toFixed(2)}
              </div>
              <div className="flex items-center justify-center gap-1 text-green-600">
                <TrendingUp className="w-4 h-4 animate-bounce" />
                <span>+${selectedAsset.change} (+{selectedAsset.changePercent}%)</span>
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                24h: ${selectedAsset.low24h} - ${selectedAsset.high24h}
              </div>
            </div>

            {/* Bid/Ask */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-red-50 dark:bg-red-950/20 rounded-lg transition-all duration-300 hover:scale-105">
                <div className="text-sm text-muted-foreground">Bid</div>
                <div className="font-bold text-red-600">${selectedAsset.bid}</div>
              </div>
              <div className="text-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg transition-all duration-300 hover:scale-105">
                <div className="text-sm text-muted-foreground">Ask</div>
                <div className="font-bold text-green-600">${selectedAsset.ask}</div>
              </div>
            </div>

            {/* Trading Form */}
            <div className="space-y-4 pt-4 border-t">
              <Tabs value={orderSide} onValueChange={(value) => setOrderSide(value as "buy" | "sell")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="buy" className="text-green-600 data-[state=active]:bg-green-100 dark:data-[state=active]:bg-green-950">
                    Buy
                  </TabsTrigger>
                  <TabsTrigger value="sell" className="text-red-600 data-[state=active]:bg-red-100 dark:data-[state=active]:bg-red-950">
                    Sell
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="orderType">Order Type</Label>
                  <Select value={orderType} onValueChange={setOrderType}>
                    <SelectTrigger className="transition-all duration-200 hover:border-blue-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="market">Market Order</SelectItem>
                      <SelectItem value="limit">Limit Order</SelectItem>
                      <SelectItem value="stop">Stop Order</SelectItem>
                      <SelectItem value="stop-limit">Stop-Limit Order</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="0"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {orderType !== "market" && (
                  <div className="animate-in slide-in-from-top-2 duration-300">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}

                {(orderType === "stop" || orderType === "stop-limit") && (
                  <div className="animate-in slide-in-from-top-2 duration-300">
                    <Label htmlFor="stopPrice">Stop Price</Label>
                    <Input
                      id="stopPrice"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={stopPrice}
                      onChange={(e) => setStopPrice(e.target.value)}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}

                {quantity && (
                  <div className="p-3 bg-muted/30 rounded-lg animate-in fade-in-0 duration-300">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Estimated Total:</span>
                      <span className="font-bold text-lg">${calculateOrderValue().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-muted-foreground mt-1">
                      <span>Commission:</span>
                      <span>$0.00</span>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handlePlaceOrder}
                  disabled={isLoading}
                  className={`w-full transition-all duration-300 transform hover:scale-105 ${
                    orderSide === "buy" 
                      ? "bg-green-600 hover:bg-green-700" 
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    <>
                      {orderSide === "buy" ? "Buy" : "Sell"} {selectedAsset.symbol}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Charts and Market Data */}
        <div className="lg:col-span-3 space-y-6">
          {/* Price Chart */}
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    {selectedAsset.symbol} Price Chart
                  </CardTitle>
                  <CardDescription>Real-time price movements</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={timeframe} onValueChange={setTimeframe}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1m">1m</SelectItem>
                      <SelectItem value="5m">5m</SelectItem>
                      <SelectItem value="15m">15m</SelectItem>
                      <SelectItem value="1h">1h</SelectItem>
                      <SelectItem value="1d">1d</SelectItem>
                    </SelectContent>
                  </Select>
                  <Tabs value={chartType} onValueChange={(value) => setChartType(value as "line" | "candlestick")}>
                    <TabsList>
                      <TabsTrigger value="line">Line</TabsTrigger>
                      <TabsTrigger value="candlestick">Candles</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === "line" ? (
                    <AreaChart data={priceData}>
                      <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis 
                        dataKey="time" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis 
                        domain={['dataMin - 1', 'dataMax + 1']}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        fill="url(#colorPrice)"
                        dot={false}
                        activeDot={{ r: 4, stroke: '#3b82f6', strokeWidth: 2 }}
                      />
                    </AreaChart>
                  ) : (
                    <LineChart data={candlestickData}>
                      <XAxis 
                        dataKey="time" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis 
                        domain={['dataMin - 2', 'dataMax + 2']}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Line
                        type="monotone"
                        dataKey="close"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="high"
                        stroke="#ef4444"
                        strokeWidth={1}
                        strokeDasharray="3 3"
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="low"
                        stroke="#f59e0b"
                        strokeWidth={1}
                        strokeDasharray="3 3"
                        dot={false}
                      />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Order Book & Recent Trades */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Order Book */}
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle>Order Book</CardTitle>
                <CardDescription>Live market depth</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Asks */}
                  <div>
                    <h4 className="text-sm font-medium text-red-600 mb-2 flex items-center">
                      <TrendingDown className="w-4 h-4 mr-1" />
                      Asks (Sell Orders)
                    </h4>
                    <div className="space-y-1">
                      {orderBook.asks.reverse().map((ask, index) => (
                        <div 
                          key={index} 
                          className="flex justify-between text-sm p-2 rounded hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-200 cursor-pointer"
                        >
                          <span className="text-red-600 font-medium">${ask.price.toFixed(2)}</span>
                          <span className="text-muted-foreground">{ask.quantity.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Spread */}
                  <div className="text-center py-2 border-y bg-muted/20 rounded">
                    <span className="text-sm font-medium">
                      Spread: ${(selectedAsset.ask - selectedAsset.bid).toFixed(2)}
                    </span>
                  </div>

                  {/* Bids */}
                  <div>
                    <h4 className="text-sm font-medium text-green-600 mb-2 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      Bids (Buy Orders)
                    </h4>
                    <div className="space-y-1">
                      {orderBook.bids.map((bid, index) => (
                        <div 
                          key={index} 
                          className="flex justify-between text-sm p-2 rounded hover:bg-green-50 dark:hover:bg-green-950/20 transition-all duration-200 cursor-pointer"
                        >
                          <span className="text-green-600 font-medium">${bid.price.toFixed(2)}</span>
                          <span className="text-muted-foreground">{bid.quantity.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Trades */}
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle>Recent Trades</CardTitle>
                <CardDescription>Last executed trades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {recentTrades.map((trade, index) => (
                    <div 
                      key={index} 
                      className="flex justify-between items-center text-sm p-2 rounded hover:bg-muted/50 transition-all duration-200 animate-in slide-in-from-right-2"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <span className="text-muted-foreground font-mono">{trade.time}</span>
                      <span className={`font-medium ${trade.side === "buy" ? "text-green-600" : "text-red-600"}`}>
                        ${trade.price.toFixed(2)}
                      </span>
                      <span className="text-muted-foreground">{trade.quantity}</span>
                      <Badge 
                        variant={trade.side === "buy" ? "default" : "destructive"}
                        className="text-xs"
                      >
                        {trade.side.toUpperCase()}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Open Orders */}
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle>Open Orders</CardTitle>
              <CardDescription>Your active and recent orders</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Side</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {openOrders.map((order, index) => (
                    <TableRow 
                      key={order.id} 
                      className="hover:bg-muted/50 transition-all duration-200 animate-in slide-in-from-left-2"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <TableCell className="font-medium">{order.symbol}</TableCell>
                      <TableCell>{order.type}</TableCell>
                      <TableCell>
                        <Badge variant={order.side === "Buy" ? "default" : "destructive"}>
                          {order.side}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{order.quantity}</TableCell>
                      <TableCell className="text-right">${order.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {order.status === "Open" && <Clock className="w-3 h-3 text-orange-500 animate-pulse" />}
                          {order.status === "Filled" && <CheckCircle className="w-3 h-3 text-green-500" />}
                          {order.status === "Pending" && <AlertTriangle className="w-3 h-3 text-yellow-500 animate-bounce" />}
                          <span className="text-sm">{order.status}</span>
                        </div>
                      </TableCell>
                      <TableCell>{order.time}</TableCell>
                      <TableCell className="text-right">
                        {order.status === "Open" && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="transition-all duration-200 hover:scale-105"
                          >
                            Cancel
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}