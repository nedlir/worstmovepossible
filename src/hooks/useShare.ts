import { useState } from "react";
import {
  FacebookIcon,
  TwitterIcon,
  WhatsAppIcon,
  CopyIcon,
  LinkedInIcon,
  RedditIcon,
  TelegramIcon,
  DiscordIcon,
} from "../assets/Icons";
import { SharePlatform, ShareConfig } from "../types/Share";

export const useShare = (config: ShareConfig) => {
  const [isShareVisible, setIsShareVisible] = useState(false);

  const platforms = [
    { platform: "facebook" as SharePlatform, icon: FacebookIcon },
    { platform: "twitter" as SharePlatform, icon: TwitterIcon },
    { platform: "linkedin" as SharePlatform, icon: LinkedInIcon },
    { platform: "reddit" as SharePlatform, icon: RedditIcon },
    { platform: "whatsapp" as SharePlatform, icon: WhatsAppIcon },
    { platform: "telegram" as SharePlatform, icon: TelegramIcon },
    { platform: "discord" as SharePlatform, icon: DiscordIcon },
    { platform: "copy" as SharePlatform, icon: CopyIcon },
  ];

  const getShareUrl = (platform: SharePlatform): string => {
    switch (platform) {
      case "facebook":
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          config.url
        )}`;
      case "twitter":
        return `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          config.url
        )}&text=${encodeURIComponent(config.text)}`;
      case "linkedin":
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          config.url
        )}`;
      case "reddit":
        return `https://www.reddit.com/submit?url=${encodeURIComponent(
          config.url
        )}&title=${encodeURIComponent("Worst Move Possible Chess Puzzle")}`;
      case "whatsapp":
        return `https://api.whatsapp.com/send?text=${encodeURIComponent(
          config.text
        )}`;
      case "telegram":
        return `https://t.me/share/url?url=${encodeURIComponent(
          config.url
        )}&text=${encodeURIComponent("Check out this chess puzzle")}`;
      case "discord":
        return `https://discord.com/channels/@me?text=${encodeURIComponent(
          config.text
        )}`;
      default:
        return "";
    }
  };

  const handleShare = async (platform: SharePlatform) => {
    if (platform === "copy") {
      try {
        await navigator.clipboard.writeText(config.url);
        alert("URL copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    } else {
      window.open(getShareUrl(platform), "_blank");
    }
  };

  return {
    isShareVisible,
    setIsShareVisible,
    platforms,
    handleShare,
  };
};
