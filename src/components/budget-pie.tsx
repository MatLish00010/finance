'use client';

import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';
import { useMemo, useState } from 'react';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import Income from '@/components/income';
import { IPie } from '@/types/pie';
import ExpensesHandler from '@/components/expenses-handler';

export function BudgetPie() {
  const [pies, setPies] = useState<IPie>({
    apartment: {
      value: 50,
      chartColor: 1,
    },
    rest: {
      value: 50,
      chartColor: 2,
    },
  });

  const chartData = useMemo(
    () =>
      Object.entries(pies).map(([key, val]) => ({
        ...val,
        fill: `hsl(var(--chart-${val.chartColor}))`,
        name: key,
      })),
    [pies]
  );

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="mb-5">Plan your expenses</CardTitle>
        <Income />
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={{} as ChartConfig} className="mx-auto aspect-square h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={60} strokeWidth={5}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle">
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold">
                          lol
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground">
                          Total
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <ExpensesHandler pies={pies} />
      </CardFooter>
    </Card>
  );
}
