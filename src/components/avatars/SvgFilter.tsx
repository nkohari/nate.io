type SvgFilterProps = {
  id: string;
  red: string;
  green: string;
  blue: string;
};

export function SvgFilter({ id, red, green, blue }: SvgFilterProps) {
  return (
    <filter
      id={id}
      x="-10%"
      y="-10%"
      width="120%"
      height="120%"
      filterUnits="objectBoundingBox"
      primitiveUnits="userSpaceOnUse"
      colorInterpolationFilters="sRGB"
    >
      <feColorMatrix
        type="matrix"
        values="
          0.33 0.33 0.33 0
          0.33 0.33 0.33 0
          0.33 0.33 0.33 0
          0 0 0 1 0
        "
        in="SourceGraphic"
        result="colormatrix"
      />
      <feComponentTransfer in="colormatrix" result="componentTransfer">
        <feFuncR type="table" tableValues={red} />
        <feFuncG type="table" tableValues={green} />
        <feFuncB type="table" tableValues={blue} />
        <feFuncA type="table" tableValues="0 1" />
      </feComponentTransfer>
      <feBlend mode="overlay" in="componentTransfer" in2="SourceGraphic" result="blend" />
    </filter>
  );
}
