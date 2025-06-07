import React from "react";
import { IconProps } from "../../types/Icon";

const TelegramIcon: React.FC<IconProps> = ({ width = 24, height = 24 }) => (
  <svg viewBox="0 0 24 24" width={width} height={height}>
    <path
      fill="currentColor"
      d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.14-.26.26-.538.26l.193-3.054 5.6-5.06c.22-.196-.048-.307-.347-.11l-6.87 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.57-4.458c.53-.196 1.002.128.832.941z"
    />
  </svg>
);

export default TelegramIcon;
