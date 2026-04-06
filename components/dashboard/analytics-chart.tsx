"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend,
  ArcElement
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";

import { incomeExpenseColors, spendingColors } from "@/constants";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { IncomeExpensePoint, SpendingCategory } from "@/types";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler, Legend, ArcElement);

export function AnalyticsChart({
  incomeVsExpenses,
  spending
}: {
  incomeVsExpenses: IncomeExpensePoint[];
  spending: SpendingCategory[];
}) {
  return (
    <div className="grid gap-4 xl:grid-cols-[1.4fr_0.9fr]">
      <Card className="animate-fade-up">
        <CardHeader>
          <div>
            <CardTitle>Income vs expenses</CardTitle>
            <CardDescription>Monthly movement across your primary accounts.</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Line
            data={{
              labels: incomeVsExpenses.map((item) => item.month),
              datasets: [
                {
                  label: "Income",
                  data: incomeVsExpenses.map((item) => item.income),
                  borderColor: incomeExpenseColors.income,
                  backgroundColor: "rgba(8,145,178,0.16)",
                  fill: true,
                  tension: 0.35
                },
                {
                  label: "Expenses",
                  data: incomeVsExpenses.map((item) => item.expenses),
                  borderColor: incomeExpenseColors.expenses,
                  backgroundColor: "rgba(15,23,42,0.05)",
                  fill: true,
                  tension: 0.35
                }
              ]
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "bottom"
                }
              }
            }}
          />
        </CardContent>
      </Card>

      <Card className="animate-fade-up">
        <CardHeader>
          <div>
            <CardTitle>Spending categories</CardTitle>
            <CardDescription>High-signal category breakdown for this month.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6 lg:flex-row xl:flex-col">
          <div className="h-[220px] w-[220px]">
            <Doughnut
              data={{
                labels: spending.map((item) => item.category),
                datasets: [
                  {
                    data: spending.map((item) => item.amount),
                    backgroundColor: spendingColors,
                    borderWidth: 0
                  }
                ]
              }}
              options={{
                cutout: "72%",
                plugins: {
                  legend: {
                    display: false
                  }
                }
              }}
            />
          </div>
          <div className="w-full space-y-3">
            {spending.map((item, index) => (
              <div key={item.category} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: spendingColors[index % spendingColors.length] }}
                  />
                  <p className="text-sm">{item.category}</p>
                </div>
                <p className="text-sm font-medium">${item.amount.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
