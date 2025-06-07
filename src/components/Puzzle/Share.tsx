import React, { useState } from "react";
import { SharePlatform } from "../../types/Share";
import {
  FacebookIcon,
  TwitterIcon,
  WhatsAppIcon,
  CopyIcon,
  LinkedInIcon,
  RedditIcon,
  TelegramIcon,
  DiscordIcon,
} from "../../assets/Icons";
import ShareButton from "./ShareButton";
import "./share.css";

const Share: React.FC<{ puzzleId: string }> = ({ puzzleId }) => {
  const [isShareVisible, setIsShareVisible] = useState(false);
  const shareUrl = `https://worstmovepossible.com/#/puzzles/${puzzleId}`;
  const shareText = `Check out this chess puzzle: ${shareUrl}`;

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

  const handleShare = async (platform: SharePlatform) => {
    if (platform === "copy") {
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert("URL copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy:", err);
      }
      return;
    }

    const getShareUrl = (): string => {
      switch (platform) {
        case "facebook":
          return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            shareUrl
          )}`;
        case "twitter":
          return `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            shareUrl
          )}&text=${encodeURIComponent(shareText)}`;
        case "linkedin":
          return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            shareUrl
          )}`;
        case "reddit":
          return `https://www.reddit.com/submit?url=${encodeURIComponent(
            shareUrl
          )}&title=${encodeURIComponent("Worst Move Possible Chess Puzzle")}`;
        case "whatsapp":
          return `https://api.whatsapp.com/send?text=${encodeURIComponent(
            shareText
          )}`;
        case "telegram":
          return `https://t.me/share/url?url=${encodeURIComponent(
            shareUrl
          )}&text=${encodeURIComponent("Check out this chess puzzle")}`;
        case "discord":
          return `https://discord.com/channels/@me?text=${encodeURIComponent(
            shareText
          )}`;
        default:
          return "";
      }
    };

    window.open(getShareUrl(), "_blank");
  };

  return (
    <div className="share-container">
      <button
        className="share-header"
        onClick={() => setIsShareVisible(!isShareVisible)}
        aria-expanded={isShareVisible}
      >
        <h3>Share Your "Victory" ⚔️</h3>
        <span className={`chevron ${isShareVisible ? "open" : ""}`}></span>
      </button>

      <div className={`share-buttons ${isShareVisible ? "visible" : ""}`}>
        {platforms.map(({ platform, icon }) => (
          <ShareButton
            key={platform}
            platform={platform}
            icon={icon}
            onShare={() => handleShare(platform)}
          />
        ))}
      </div>
    </div>
  );
};

export default Share;
