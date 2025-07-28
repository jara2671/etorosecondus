"use client"

import { MarketDataCards } from "@/components/dashboard/market-data-cards"
import { AccountVerification } from "@/components/dashboard/account-verification"
import { BigMovers } from "@/components/dashboard/big-movers"
import { PortfolioOverview } from "@/components/dashboard/portfolio-overview"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Market Data Cards */}
      <MarketDataCards />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Account Verification */}
        <div className="lg:col-span-2">
          <AccountVerification />
        </div>

        {/* Right Column - Big Movers and other widgets */}
        <div className="space-y-6">
          <BigMovers />
          <PortfolioOverview />
        </div>
      </div>
    </div>
  )
}
