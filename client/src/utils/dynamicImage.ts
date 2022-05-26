import { CSSProperties } from "react";

export const dynamicImageStyles = (path: string): CSSProperties => ({
  backgroundImage: `url('${path}')`,
});
