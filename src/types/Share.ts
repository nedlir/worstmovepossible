export type SharePlatform =
  | "facebook"
  | "twitter"
  | "linkedin"
  | "reddit"
  | "whatsapp"
  | "telegram"
  | "discord"
  | "copy";

export type ShareConfig = {
  url: string;
  text: string;
  platform: SharePlatform;
};
