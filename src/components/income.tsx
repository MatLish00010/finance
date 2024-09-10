import { ChangeEvent, useCallback, useState } from 'react';
import * as React from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Income() {
  const [incum, setIncum] = useState(0);
  const onChangeIncum = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setIncum(Number(e.target.value || 0)),
    [setIncum]
  );

  return (
    <div className="flex items-center gap-3">
      <Input placeholder="Incum" className="max-w-[350px]" type="number" onChange={onChangeIncum} />
      <Button>Calculate</Button>
    </div>
  );
}
