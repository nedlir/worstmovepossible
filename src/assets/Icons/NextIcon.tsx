import React from "react";
import { IconProps } from "../../types/Icon";

const NextIcon: React.FC<IconProps> = ({ width = 16, height = 16 }) => (
  <svg viewBox="0 0 24 24" width={width} height={height}>
    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
  </svg>
);

export default NextIcon;
