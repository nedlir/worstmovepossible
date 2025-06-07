import React from "react";
import { IconProps } from "../../types/Icon";

const PreviousIcon: React.FC<IconProps> = ({ width = 16, height = 16 }) => (
  <svg viewBox="0 0 24 24" width={width} height={height}>
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
  </svg>
);

export default PreviousIcon;
