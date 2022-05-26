import React, { FC } from "react";

interface TikTokProps {}

const TikTok: FC<TikTokProps> = () => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g style={{ mixBlendMode: "lighten" }}>
        <rect width="32" height="32" fill="url(#pattern0)" />
      </g>
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_55_426" transform="scale(0.00444444)" />
        </pattern>
        <image
          id="image0_55_426"
          width="225"
          height="225"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

export default TikTok;
