"use client"

import { useState } from "react"
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
  Target
} from "lucide-react"
import { toast } from "sonner"

// Mock data
const selectedAsset = {
  symbol: "AAPL",
  name: "Apple Inc.",
  price: 195.12,
  change: 3.87,
  changePercent: 2.02,
  bid: 195.10,
  ask: 195.14,
  volume: "45.2M",
  marketCap: "3.01T"
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

  const handlePlaceOrder = () => {
    if (!quantity) {
      toast.error("Please enter quantity")
      return
    }

    if (orderType !== "market" && !price) {
      toast.error("Please enter price")
      return
    }

    const order = {
      symbol: selectedAsset.symbol,
      type: orderType,
      side: orderSide,
      quantity: parseInt(quantity),
      price: orderType === "market" ? selectedAsset.price : parseFloat(price),
      stopPrice: orderType === "stop" ? parseFloat(stopPrice) : undefined,
    }

    toast.success(`${orderSide.toUpperCase()} order placed for ${quantity} ${selectedAsset.symbol}`)

    // Reset form
    setQuantity("")
    setPrice("")
    setStopPrice("")
  }

  const calculateOrderValue = () => {
    const qty = parseInt(quantity) || 0
    const orderPrice = orderType === "market" ? selectedAsset.price : (parseFloat(price) || 0)
    return qty * orderPrice
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Trading</h1>
          <p className="text-muted-foreground">Execute trades and manage your orders</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-green-600 border-green-200">
            Market Open
          </Badge>
          <Badge variant="outline">
            Buying Power: $15,420.50
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Asset Info & Trading Panel */}
        <Card className="lg:col-span-1">
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
            {/* Current Price */}
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-3xl font-bold">${selectedAsset.price}</div>
              <div className="flex items-center justify-center gap-1 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span>+${selectedAsset.change} (+{selectedAsset.changePercent}%)</span>
              </div>
            </div>

            {/* Bid/Ask */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                <div className="text-sm text-muted-foreground">Bid</div>
                <div className="font-bold text-red-600">${selectedAsset.bid}</div>
              </div>
              <div className="text-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <div className="text-sm text-muted-foreground">Ask</div>
                <div className="font-bold text-green-600">${selectedAsset.ask}</div>
              </div>
            </div>

            {/* Trading Form */}
            <div className="space-y-4 pt-4 border-t">
              <Tabs value={orderSide} onValueChange={(value) => setOrderSide(value as "buy" | "sell")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="buy" className="text-green-600">Buy</TabsTrigger>
                  <TabsTrigger value="sell" className="text-red-600">Sell</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="orderType">Order Type</Label>
                  <Select value={orderType} onValueChange={setOrderType}>
                    <SelectTrigger>
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
                  />
                </div>

                {orderType !== "market" && (
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                )}

                {(orderType === "stop" || orderType === "stop-limit") && (
                  <div>
                    <Label htmlFor="stopPrice">Stop Price</Label>
                    <Input
                      id="stopPrice"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={stopPrice}
                      onChange={(e) => setStopPrice(e.target.value)}
                    />
                  </div>
                )}

                {quantity && (
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Estimated Total:</span>
                      <span className="font-bold">${calculateOrderValue().toFixed(2)}</span>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handlePlaceOrder}
                  className={`w-full ${orderSide === "buy" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
                >
                  {orderSide === "buy" ? "Buy" : "Sell"} {selectedAsset.symbol}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Book & Recent Trades */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Order Book */}
            <Card>
              <CardHeader>
                <CardTitle>Order Book</CardTitle>
                <CardDescription>Live market depth</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Asks */}
                  <div>
                    <h4 className="text-sm font-medium text-red-600 mb-2">Asks (Sell Orders)</h4>
                    <div className="space-y-1">
                      {orderBook.asks.reverse().map((ask, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-red-600">${ask.price.toFixed(2)}</span>
                          <span className="text-muted-foreground">{ask.quantity.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Spread */}
                  <div className="text-center py-2 border-y">
                    <span className="text-sm text-muted-foreground">
                      Spread: ${(selectedAsset.ask - selectedAsset.bid).toFixed(2)}
                    </span>
                  </div>

                  {/* Bids */}
                  <div>
                    <h4 className="text-sm font-medium text-green-600 mb-2">Bids (Buy Orders)</h4>
                    <div className="space-y-1">
                      {orderBook.bids.map((bid, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-green-600">${bid.price.toFixed(2)}</span>
                          <span className="text-muted-foreground">{bid.quantity.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Trades */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Trades</CardTitle>
                <CardDescription>Last executed trades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {recentTrades.map((trade, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">{trade.time}</span>
                      <span className={trade.side === "buy" ? "text-green-600" : "text-red-600"}>
                        ${trade.price.toFixed(2)}
                      </span>
                      <span className="text-muted-foreground">{trade.quantity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Open Orders */}
          <Card>
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
                  {openOrders.map((order) => (
                    <TableRow key={order.id}>
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
                          {order.status === "Open" && <Clock className="w-3 h-3 text-orange-500" />}
                          {order.status === "Filled" && <CheckCircle className="w-3 h-3 text-green-500" />}
                          {order.status === "Pending" && <AlertTriangle className="w-3 h-3 text-yellow-500" />}
                          <span className="text-sm">{order.status}</span>
                        </div>
                      </TableCell>
                      <TableCell>{order.time}</TableCell>
                      <TableCell className="text-right">
                        {order.status === "Open" && (
                          <Button variant="outline" size="sm">
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
