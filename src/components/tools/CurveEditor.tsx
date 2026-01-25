import { useEffect, useMemo, useRef, useState } from 'react';

type Point = { x: number; y: number };

const SIZE = 400;
const POINT_RADIUS = 6;
const GRID_LINES = 10;

const Channel = ['red', 'green', 'blue'] as const;
type Channel = (typeof Channel)[number];

function drawGrid(ctx: CanvasRenderingContext2D) {
  ctx.strokeStyle = '#e5e7eb';
  ctx.lineWidth = 1;

  for (let i = 0; i <= GRID_LINES; i++) {
    const pos = (i / GRID_LINES) * SIZE;
    ctx.beginPath();
    ctx.moveTo(pos, 0);
    ctx.lineTo(pos, SIZE);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, pos);
    ctx.lineTo(SIZE, pos);
    ctx.stroke();
  }

  // Draw diagonal reference line
  ctx.strokeStyle = '#9ca3af';
  ctx.lineWidth = 1;
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(0, SIZE);
  ctx.lineTo(SIZE, 0);
  ctx.stroke();
  ctx.setLineDash([]);
}

function interpolateY(sortedCurve: Point[], x: number): number {
  let lowerPoint = sortedCurve[0];
  let upperPoint = sortedCurve[sortedCurve.length - 1];

  for (let j = 0; j < sortedCurve.length - 1; j++) {
    if (sortedCurve[j].x <= x && sortedCurve[j + 1].x >= x) {
      lowerPoint = sortedCurve[j];
      upperPoint = sortedCurve[j + 1];
      break;
    }
  }

  if (upperPoint.x === lowerPoint.x) {
    return lowerPoint.y;
  }

  const t = (x - lowerPoint.x) / (upperPoint.x - lowerPoint.x);
  return lowerPoint.y + t * (upperPoint.y - lowerPoint.y);
}

function drawCurve(
  ctx: CanvasRenderingContext2D,
  curve: Point[],
  color: string,
  isActive: boolean,
) {
  const sortedCurve = [...curve].sort((a, b) => a.x - b.x);

  ctx.strokeStyle = color;
  ctx.lineWidth = isActive ? 3 : 2;
  ctx.globalAlpha = isActive ? 1 : 0.4;
  ctx.beginPath();

  for (let i = 0; i <= SIZE; i++) {
    const x = i / SIZE;
    const y = interpolateY(sortedCurve, x);
    const canvasY = SIZE - y * SIZE;

    if (i === 0) {
      ctx.moveTo(i, canvasY);
    } else {
      ctx.lineTo(i, canvasY);
    }
  }

  ctx.stroke();
  ctx.globalAlpha = 1;
}

function drawPoints(
  ctx: CanvasRenderingContext2D,
  curve: Point[],
  color: string,
  selectedIndex: number | null,
) {
  for (let i = 0; i < curve.length; i++) {
    const point = curve[i];
    const canvasX = point.x * SIZE;
    const canvasY = SIZE - point.y * SIZE;
    const isSelected = i === selectedIndex;

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(canvasX, canvasY, isSelected ? POINT_RADIUS + 2 : POINT_RADIUS, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = isSelected ? '#fbbf24' : '#ffffff';
    ctx.lineWidth = isSelected ? 3 : 2;
    ctx.stroke();
  }
}

function getCanvasPoint(
  canvas: HTMLCanvasElement,
  evt: React.MouseEvent<HTMLCanvasElement>,
): Point {
  const rect = canvas.getBoundingClientRect();
  const x = (evt.clientX - rect.left) / SIZE;
  const y = 1 - (evt.clientY - rect.top) / SIZE;

  return {
    x: Math.max(0, Math.min(1, x)),
    y: Math.max(0, Math.min(1, y)),
  };
}

function findNearestPoint(x: number, y: number, curve: Point[]): number | null {
  const threshold = POINT_RADIUS / SIZE;

  for (let i = 0; i < curve.length; i++) {
    const dx = curve[i].x - x;
    const dy = curve[i].y - y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < threshold) {
      return i;
    }
  }

  return null;
}

type CurveEditorProps = {
  redCurve: Point[];
  greenCurve: Point[];
  blueCurve: Point[];
  onRedChange: (curve: Point[]) => void;
  onGreenChange: (curve: Point[]) => void;
  onBlueChange: (curve: Point[]) => void;
};

export function CurveEditor({
  redCurve,
  greenCurve,
  blueCurve,
  onRedChange,
  onGreenChange,
  onBlueChange,
}: CurveEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [draggingChannel, setDraggingChannel] = useState<Channel | null>(null);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [activeChannel, setActiveChannel] = useState<Channel>('red');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const channels = useMemo(
    () => ({
      red: { color: '#ef4444', curve: redCurve, onChange: onRedChange },
      green: { color: '#22c55e', curve: greenCurve, onChange: onGreenChange },
      blue: { color: '#3b82f6', curve: blueCurve, onChange: onBlueChange },
    }),
    [redCurve, greenCurve, blueCurve, onRedChange, onGreenChange, onBlueChange],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, SIZE, SIZE);
    drawGrid(ctx);

    for (const channel of Channel) {
      const config = channels[channel];
      drawCurve(ctx, config.curve, config.color, channel === activeChannel);
    }

    const channel = channels[activeChannel];
    drawPoints(ctx, channel.curve, channel.color, selectedIndex);
  }, [channels, activeChannel, selectedIndex]);

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLCanvasElement>) => {
    if ((evt.key === 'Delete' || evt.key === 'Backspace') && selectedIndex !== null) {
      const channel = channels[activeChannel];
      const point = channel.curve[selectedIndex];

      // Don't delete anchor points (x=0 or x=1)
      if (point.x !== 0 && point.x !== 1) {
        const newCurve = channel.curve.filter((_, i) => i !== selectedIndex);
        channel.onChange(newCurve);
        setSelectedIndex(null);
        evt.preventDefault();
      }
    }
  };

  const findNearestCurve = (x: number, y: number): Channel | null => {
    const threshold = 0.05;
    let nearestChannel: Channel | null = null;
    let minDistance = threshold;

    for (const channel of Channel) {
      const curve = channels[channel].curve;
      const sortedCurve = [...curve].sort((a, b) => a.x - b.x);
      const curveY = interpolateY(sortedCurve, x);
      const distance = Math.abs(curveY - y);

      if (distance < minDistance) {
        minDistance = distance;
        nearestChannel = channel;
      }
    }

    return nearestChannel;
  };

  const handleMouseDown = (evt: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Ensure canvas has focus for keyboard events
    canvas.focus();

    const point = getCanvasPoint(canvas, evt);

    // First, check if we clicked on an existing point on the active channel
    const activeCurve = channels[activeChannel].curve;
    const nearestIndex = findNearestPoint(point.x, point.y, activeCurve);

    if (nearestIndex !== null) {
      // Select and start dragging the point
      setSelectedIndex(nearestIndex);
      setDraggingChannel(activeChannel);
      setDraggingIndex(nearestIndex);
    } else {
      // Check if we clicked near a different curve to switch channels
      const nearestCurve = findNearestCurve(point.x, point.y);

      if (nearestCurve && nearestCurve !== activeChannel) {
        // Switch to the clicked channel
        setActiveChannel(nearestCurve);
        setSelectedIndex(null);
      } else {
        // Add new point to the active channel
        const newCurve = [...activeCurve, point];
        channels[activeChannel].onChange(newCurve);
        setSelectedIndex(null);
      }
    }
  };

  const handleMouseMove = (evt: React.MouseEvent<HTMLCanvasElement>) => {
    if (draggingChannel === null || draggingIndex === null) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const point = getCanvasPoint(canvas, evt);
    const channel = channels[draggingChannel];
    const newCurve = [...channel.curve];
    const currentPoint = newCurve[draggingIndex];

    // Don't allow moving anchor points (x=0 or x=1) horizontally
    const isAnchor = currentPoint.x === 0 || currentPoint.x === 1;
    if (isAnchor) {
      newCurve[draggingIndex] = { x: currentPoint.x, y: point.y };
    } else {
      newCurve[draggingIndex] = point;
    }

    channel.onChange(newCurve);
  };

  const handleMouseUp = () => {
    setDraggingChannel(null);
    setDraggingIndex(null);
  };

  return (
    <canvas
      ref={canvasRef}
      width={SIZE}
      height={SIZE}
      tabIndex={0}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onKeyDown={handleKeyDown}
      className="cursor-crosshair outline-none"
    />
  );
}
