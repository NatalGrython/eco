import React, { FC } from "react";

interface MarkProps {
  markType:
    | ""
    | "list"
    | "eco"
    | "quality"
    | "bear"
    | "animal"
    | "vegan"
    | "fork";
}

const Mark: FC<MarkProps> = ({ markType }) => {
  return <div>Mark</div>;
};

export default Mark;
