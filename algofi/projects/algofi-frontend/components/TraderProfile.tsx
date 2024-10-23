"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { PlusCircleIcon, TrendingUpIcon, WalletIcon, BarChart2Icon, CandlestickChartIcon, BrainCircuitIcon, ArrowLeftIcon } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart"

const mockChartData = [
  { date: "2023-01", price: 30000, prediction: 31000 },
  { date: "2023-02", price: 33000, prediction: 34000 },
  { date: "2023-03", price: 35000, prediction: 36000 },
  { date: "2023-04", price: 32000, prediction: 33000 },
  { date: "2023-05", price: 34000, prediction: 35000 },
  { date: "2023-06", price: 36000, prediction: 37000 },
  { date: "2023-07", price: 38000, prediction: 39000 },
  { date: "2023-08", price: 40000, prediction: 41000 },
  { date: "2023-09", price: 42000, prediction: 43000 },
  { date: "2023-10", price: 45000, prediction: 46000 },
  { date: "2023-11", price: null, prediction: 48000 },
  { date: "2023-12", price: null, prediction: 50000 },
]

export default function Component() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [selectedMarket, setSelectedMarket] = useState(null)

  const markets = [
    { id: 1, title: "Bitcoin Price", description: "Will BTC exceed $50,000 by EOY?", liquidity: "5,000 ALGO", volume: "12,500 ALGO", change: "+5.2%" },
    { id: 2, title: "US Election", description: "Who will win the 2024 US Presidential Election?", liquidity: "10,000 ALGO", volume: "25,000 ALGO", change: "-2.1%" },
    { id: 3, title: "FIFA World Cup", description: "Which country will win the next FIFA World Cup?", liquidity: "7,500 ALGO", volume: "18,000 ALGO", change: "+1.8%" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      <div className="container mx-auto p-4">
        <header className="flex justify-between items-center mb-8 py-4 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <CandlestickChartIcon className="h-8 w-8 text-green-400" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">Aglogrand Predictions</h1>
          </div>
          <Button
            variant={isWalletConnected ? "secondary" : "default"}
            onClick={() => setIsWalletConnected(!isWalletConnected)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          >
            <WalletIcon className="mr-2 h-4 w-4" />
            {isWalletConnected ? "Wallet Connected" : "Connect Wallet"}
          </Button>
        </header>

        <Tabs defaultValue="markets" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="markets" className="text-lg">
              <BarChart2Icon className="mr-2 h-5 w-5" />
              Active Markets
            </TabsTrigger>
            <TabsTrigger value="create" className="text-lg">
              <PlusCircleIcon className="mr-2 h-5 w-5" />
              Create Market
            </TabsTrigger>
          </TabsList>
          <TabsContent value="markets">
            {!selectedMarket ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {markets.map((market) => (
                  <Card key={market.id} className="bg-gray-800 border-gray-700 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-700">
                      <CardTitle className="text-xl font-bold">{market.title}</CardTitle>
                      <CardDescription className="text-gray-400">{market.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex flex-col">
                          <span className="text-gray-400">Liquidity</span>
                          <span className="text-lg font-semibold">{market.liquidity}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-gray-400">Volume</span>
                          <span className="text-lg font-semibold">{market.volume}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-gray-400">24h Change</span>
                        <span className={`text-lg font-bold ${market.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                          {market.change}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-gray-800">
                      <Button 
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                        onClick={() => setSelectedMarket(market)}
                      >
                        <TrendingUpIcon className="mr-2 h-4 w-4" /> View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold">{selectedMarket.title}</CardTitle>
                    <Button variant="ghost" onClick={() => setSelectedMarket(null)}>
                      <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back to Markets
                    </Button>
                  </div>
                  <CardDescription className="text-gray-400">{selectedMarket.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <span className="text-gray-400 block mb-1">Liquidity</span>
                      <span className="text-2xl font-bold">{selectedMarket.liquidity}</span>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <span className="text-gray-400 block mb-1">Volume</span>
                      <span className="text-2xl font-bold">{selectedMarket.volume}</span>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <span className="text-gray-400 block mb-1">24h Change</span>
                      <span className={`text-2xl font-bold ${selectedMarket.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                        {selectedMarket.change}
                      </span>
                    </div>
                  </div>
                  <div className="h-[400px] w-full mb-6">
                    <ChartContainer
                      config={{
                        price: {
                          label: "Price",
                          color: "hsl(var(--chart-1))",
                        },
                        prediction: {
                          label: "AI Prediction",
                          color: "hsl(var(--chart-2))",
                        },
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={mockChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                          <XAxis dataKey="date" stroke="#888" />
                          <YAxis stroke="#888" />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                          <Line type="monotone" dataKey="price" stroke="var(--color-price)" strokeWidth={2} dot={false} />
                          <Line type="monotone" dataKey="prediction" stroke="var(--color-prediction)" strokeWidth={2} strokeDasharray="5 5" />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <BrainCircuitIcon className="h-6 w-6 text-purple-400 mr-2" />
                      <span className="text-lg font-semibold">AI Prediction</span>
                    </div>
                    <span className="text-xl font-bold text-green-400">$50,000 by EOY</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600">
                    <TrendingUpIcon className="mr-2 h-4 w-4" /> Trade Now
                  </Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>
          <TabsContent value="create">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Create New Prediction Market</CardTitle>
                <CardDescription className="text-gray-400">Set up a new market for users to trade on</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">Market Name</Label>
                    <Input id="name" placeholder="Enter market name" className="bg-gray-700 border-gray-600 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-gray-300">Description</Label>
                    <Input id="description" placeholder="Describe the prediction market" className="bg-gray-700 border-gray-600 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate" className="text-gray-300">End Date</Label>
                    <Input id="endDate" type="date" className="bg-gray-700 border-gray-600 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="initialLiquidity" className="text-gray-300">Initial Liquidity (ALGO)</Label>
                    <Input id="initialLiquidity" type="number" placeholder="Enter amount" className="bg-gray-700 border-gray-600 text-white" />
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white">
                  <PlusCircleIcon className="mr-2 h-4 w-4" /> Create Market
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}