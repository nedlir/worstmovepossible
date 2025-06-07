import React from "react";
import { IconProps } from "../../types/Icon";

const PlayIcon: React.FC<IconProps> = ({ width = 16, height = 16 }) => (
  <svg viewBox="0 0 24 24" width={width} height={height}>
    <path d="M8 5v14l11-7z" />
  </svg>
);

export default PlayIcon;
