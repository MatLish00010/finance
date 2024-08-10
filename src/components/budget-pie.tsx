'use client';

import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { toast } from 'sonner';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { ExpenseDrawer } from '@/components/expense-drawer';

const chartData = [
  { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
  { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
  { browser: 'firefox', visitors: 287, fill: 'var(--color-firefox)' },
  { browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
  { browser: 'other', visitors: 190, fill: 'var(--color-other)' },
];

const chartConfig = {
  visitors: {
    label: 'Total',
  },
  chrome: {
    label: 'Chrome',
    color: 'hsl(var(--chart-1))',
  },
  safari: {
    label: 'Safari',
    color: 'hsl(var(--chart-2))',
  },
  firefox: {
    label: 'Firefox',
    color: 'hsl(var(--chart-3))',
  },
  edge: {
    label: 'Edge',
    color: 'hsl(var(--chart-4))',
  },
  other: {
    label: 'Other',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

interface IPie {
  [key: string]: {
    value: number;
    color: string;
  };
}

export function BudgetPie() {
  const [pies, setPies] = useState<IPie>({
    apartment: {
      value: 22,
      color: 'hsl(var(--chart-1))',
    },
  });
  const [incum, setIncum] = useState(0);

  const totalVisitors = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  const onChangeIncum = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setIncum(Number(e.target.value || 0)),
    [setIncum]
  );

  const onChangePie = useCallback(
    (key: string, val: number) => {
      setPies({
        ...pies,
        [key]: {
          ...pies[key],
          value: val,
        },
      });
    },
    [setPies, pies]
  );

  const onAddPie = useCallback(
    (key: string) => {
      if (pies[key] !== undefined) {
        toast.error(`'${key}' already exists!`);
      } else
        setPies({
          ...pies,
          [key]: {
            value: 0,
            color: `hsl(var(--chart-${Object.keys(pies).length + 1}))`,
          },
        });
    },
    [setPies, pies]
  );

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="mb-5">Plan your expenses</CardTitle>
        <div className="flex items-center gap-3">
          <Input
            placeholder="Incum"
            className="max-w-[350px]"
            type="number"
            onChange={onChangeIncum}
          />
          <Button>Calculate</Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}>
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
                          {totalVisitors.toLocaleString()}
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
        <ExpenseDrawer onSubmit={onAddPie} />
        <ul className="w-full flex flex-col gap-5 mt-5 max-w-[500px]">
          {Object.entries(pies).map(([key, { value, color }]) => (
            <li key={key}>
              <div className="flex items-center gap-5 mb-5">
                <Badge variant="outline" className={`capitalize text-nowrap  bg-[${color}]`}>
                  {key} %
                </Badge>
                <Input
                  className="w-16"
                  value={value}
                  min={0}
                  max={100}
                  onChange={e => onChangePie(key, Number(e.target.value))}
                />
              </div>
              <Slider
                className="flex-1"
                defaultValue={[value]}
                max={100}
                step={1}
                value={[value]}
                onValueChange={nums => onChangePie(key, nums[0])}
              />
            </li>
          ))}
        </ul>
      </CardFooter>
    </Card>
  );
}
