import { getAssetUrl } from '@apocrypha/core/assets';
import { useState } from 'react';
import { SvgFilter } from '../avatars/SvgFilter';
import { CurveEditor } from './CurveEditor';

const AVATAR_IMAGE = getAssetUrl('images/avatar.webp');
const FILTER_ID = 'filter-builder-preview';

type CurvePoint = { x: number; y: number };

export function FilterBuilder() {
  const [showFilter, setShowFilter] = useState(true);

  const [redCurve, setRedCurve] = useState<CurvePoint[]>([
    { x: 0, y: 0 },
    { x: 1, y: 1 },
  ]);
  const [greenCurve, setGreenCurve] = useState<CurvePoint[]>([
    { x: 0, y: 0 },
    { x: 1, y: 1 },
  ]);
  const [blueCurve, setBlueCurve] = useState<CurvePoint[]>([
    { x: 0, y: 0 },
    { x: 1, y: 1 },
  ]);

  const curveToTableValues = (curve: CurvePoint[]): string => {
    const sortedCurve = [...curve].sort((a, b) => a.x - b.x);
    const numSamples = 10;
    const samples: number[] = [];

    for (let i = 0; i <= numSamples; i++) {
      const x = i / numSamples;
      let y = 0;

      // Find the two points that bracket this x value
      let lowerPoint = sortedCurve[0];
      let upperPoint = sortedCurve[sortedCurve.length - 1];

      for (let j = 0; j < sortedCurve.length - 1; j++) {
        if (sortedCurve[j].x <= x && sortedCurve[j + 1].x >= x) {
          lowerPoint = sortedCurve[j];
          upperPoint = sortedCurve[j + 1];
          break;
        }
      }

      // Linear interpolation
      if (upperPoint.x === lowerPoint.x) {
        y = lowerPoint.y;
      } else {
        const t = (x - lowerPoint.x) / (upperPoint.x - lowerPoint.x);
        y = lowerPoint.y + t * (upperPoint.y - lowerPoint.y);
      }

      samples.push(Math.max(0, Math.min(1, y)));
    }

    return samples.map((s) => s.toFixed(2)).join(' ');
  };

  const redValues = curveToTableValues(redCurve);
  const greenValues = curveToTableValues(greenCurve);
  const blueValues = curveToTableValues(blueCurve);

  const code = JSON.stringify({ red: redValues, green: greenValues, blue: blueValues }, null, 2);

  return (
    <div className="py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="relative aspect-square w-full max-w-[400px]">
          <svg aria-hidden="true" className="hidden">
            <SvgFilter id={FILTER_ID} red={redValues} green={greenValues} blue={blueValues} />
          </svg>
          <img
            src={AVATAR_IMAGE}
            style={{ filter: showFilter ? `url(#${FILTER_ID})` : undefined }}
            className="rounded-lg shadow-md w-full"
            alt="Avatar preview"
            onMouseDown={() => setShowFilter(false)}
            onMouseUp={() => setShowFilter(true)}
          />
        </div>

        <CurveEditor
          redCurve={redCurve}
          greenCurve={greenCurve}
          blueCurve={blueCurve}
          onRedChange={setRedCurve}
          onGreenChange={setGreenCurve}
          onBlueChange={setBlueCurve}
        />
      </div>

      <textarea
        className="font-mono text-sm w-full p-3 bg-background rounded border border-border field-sizing-content"
        onFocus={(e) => e.target.select()}
        value={code}
        readOnly
      />
    </div>
  );
}
