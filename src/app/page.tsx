import { BudgetPie } from '@/components/budget-pie';
import { headers } from 'next/headers';

export default function Home() {
  const headersList = headers();
  const userAgent = headersList.get('user-agent') || '';

  const isLighthouse = userAgent.includes('Lighthouse');

  return (
    <main className="container pt-10">
      {/*<BudgetPie />*/}
      {isLighthouse ? <h1>IS LIGHT HOUSE</h1> : <h1>THIS IS NOT LIGHT HOUSE</h1>}
    </main>
  );
}
