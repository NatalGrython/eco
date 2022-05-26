import React, { FC } from "react";

interface CardsProps {}

const Cards: FC<CardsProps> = () => {
  return (
    <svg
      width="79"
      height="36"
      viewBox="0 0 79 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g style={{ mixBlendMode: "lighten" }}>
        <rect width="78.5455" height="36" fill="url(#pattern0)" />
      </g>
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_55_440"
            transform="scale(0.0138889 0.030303)"
          />
        </pattern>
        <image
          id="image0_55_440"
          width="72"
          height="33"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

export default Cards;
