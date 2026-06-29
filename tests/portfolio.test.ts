import { describe, expect, it } from "vitest";
import { calculateHoldings, portfolioMetrics } from "../src/lib/portfolio";
import { mockTransactions } from "../src/lib/mock-data";

describe("portfolio calculations", () => {
  it("builds current holdings from buy and sell transactions", () => {
    const holdings = calculateHoldings(mockTransactions);
    const apple = holdings.find((item) => item.asset.ticker === "AAPL");
    expect(apple?.quantity).toBe(4);
    expect(apple?.invested).toBe(630);
  });

  it("calculates portfolio metrics", () => {
    const metrics = portfolioMetrics(calculateHoldings(mockTransactions));
    expect(metrics.positions).toBe(5);
    expect(metrics.totalInvested).toBeGreaterThan(1000);
    expect(metrics.avgTargetDeviation).toBeGreaterThanOrEqual(0);
  });
});
