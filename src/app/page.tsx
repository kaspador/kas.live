'use client';

import BlockDAGVisualization from '@/components/BlockDAGVisualization';

export default function Home() {
  return (
    <main style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <BlockDAGVisualization />
    </main>
  );
}
