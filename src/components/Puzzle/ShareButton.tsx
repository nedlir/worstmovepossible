import React from "react";
import { SharePlatform } from "../../types/Share";
import { IconProps } from "../../types/Icon";
import "./share-button.css";

interface ShareButtonProps {
  platform: SharePlatform;
  icon: React.ComponentType<IconProps>;
  onShare: () => void;
}

const ShareButton: React.FC<ShareButtonProps> = ({
  platform,
  icon: Icon,
  onShare,
}) => {
  return (
    <button className={`share-button ${platform}`} onClick={onShare}>
      <Icon width={16} height={16} />
      <span>{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
    </button>
  );
};

export default ShareButton;
