'use client';

interface ConnectionLineProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  opacity: number;
}

export default function ConnectionLine({ from, to, opacity }: ConnectionLineProps) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  
  // Don't draw very short connections
  if (length < 20) return null;
  
  // Calculate angle for arrow positioning
  const angle = Math.atan2(dy, dx);
  
  // Arrow head size
  const arrowSize = 8;
  const arrowX = to.x - Math.cos(angle) * arrowSize;
  const arrowY = to.y - Math.sin(angle) * arrowSize;
  
  return (
    <svg
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}
    >
      {/* Main line */}
      <line
        x1={from.x}
        y1={from.y}
        x2={arrowX}
        y2={arrowY}
        stroke={`rgba(139, 149, 183, ${opacity * 0.6})`}
        strokeWidth="1.5"
        strokeDasharray="none"
      />
      
      {/* Arrow head - simple triangle */}
      <polygon
        points={`${to.x},${to.y} ${arrowX - Math.cos(angle + Math.PI/6) * arrowSize},${arrowY - Math.sin(angle + Math.PI/6) * arrowSize} ${arrowX - Math.cos(angle - Math.PI/6) * arrowSize},${arrowY - Math.sin(angle - Math.PI/6) * arrowSize}`}
        fill={`rgba(139, 149, 183, ${opacity * 0.8})`}
        stroke="none"
      />
    </svg>
  );
} 