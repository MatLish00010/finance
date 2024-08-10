import { useState } from 'react';

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface IProps {
  onSubmit: (name: string) => void;
}

export function ExpenseDrawer({ onSubmit }: IProps) {
  const [name, setName] = useState('');

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Add new %</Button>
      </DrawerTrigger>
      <DrawerContent className="flex flex-col items-center gap-5 p-5">
        <DrawerHeader>
          <DrawerTitle>Name of expense</DrawerTitle>
        </DrawerHeader>
        <Input
          type="text"
          placeholder="Health"
          className="max-w-[300px]"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <DrawerFooter className="flex flex-row justify-center items-center gap-7">
          <DrawerClose asChild>
            <Button onClick={() => onSubmit(name)}>Submit</Button>
          </DrawerClose>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
