import * as React from 'react';
import { useCallback, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { IPie } from '@/types/pie';
import { ExpenseDrawer } from '@/components/expense-drawer';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface IProps {
  pies: IPie;
}

export default function ExpensesHandler({ pies }: IProps) {
  const [preCommitPie, setPreCommitPie] = useState<IPie>(pies);
  const [changedPie, setChangedPie] = useState<{
    [key: string]: number;
  }>({});

  console.log('changedPie:', changedPie);

  const onChange = useCallback(
    (key: string, val: number) => {
      if (pies[key].value !== val) {
        setChangedPie(prev => ({
          ...prev,
          [key]: val,
        }));
      } else {
        setChangedPie(prev => {
          delete prev[key];
          return prev;
        });
      }

      setPreCommitPie(prev => ({
        ...prev,
        [key]: {
          ...prev[key],
          value: val,
        },
      }));
    },
    [setPreCommitPie]
  );

  const onAddPie = useCallback(
    (key: string) => {
      if (pies[key] !== undefined) {
        toast.error(`'${key}' already exists!`);
      } else
        setPreCommitPie({
          ...pies,
          [key]: {
            value: 0,
            chartColor: Object.keys(pies).length + 1,
          },
        });
    },
    [setPreCommitPie, pies]
  );

  return (
    <>
      <ExpenseDrawer onSubmit={onAddPie} />
      <div className="w-full flex flex-col gap-5 max-w-[500px] mt-5">
        <ul className="flex flex-col gap-5">
          {Object.entries(preCommitPie).map(([key, { value, chartColor }]) => (
            <li key={key}>
              <div className="flex items-center gap-5 mb-5">
                <Badge
                  variant="outline"
                  className={`capitalize text-nowrap  bg-chart-${chartColor}`}>
                  {key} %
                </Badge>
                <Input
                  className="w-16"
                  value={value}
                  min={0}
                  max={100}
                  onChange={e => onChange(key, Number(e.target.value))}
                />
              </div>
              <Slider
                className="flex-1"
                defaultValue={[value]}
                max={100}
                step={1}
                value={[value]}

                onValueChange={nums => onChange(key, nums[0])}
              />
            </li>
          ))}
        </ul>
        {Object.keys(changedPie).length > 0 && <Button>Save</Button>}
      </div>
    </>
  );
}
