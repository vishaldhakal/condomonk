"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from "next-share";
import {
  FacebookIcon,
  TwitterIcon,
  EmailIcon,
  TelegramIcon,
  WhatsappIcon,
} from "next-share";
import { endPoints } from "@/api/endpoints";

const ShareButton = ({ title, children }) => (
  <div
    className="transition-transform hover:scale-110"
    title={`Share With ${title}`}
  >
    {children}
  </div>
);

const SocialMediaShare = ({ customTitle, customUrl }) => {
  const pathname = usePathname();
  const url = customUrl || endPoints.shareURL + pathname;
  const title = customTitle || "Check out this awesome blog!";

  const SHARE_BUTTONS = [
    {
      title: "Facebook",
      Button: FacebookShareButton,
      Icon: FacebookIcon,
      props: { quote: title },
    },
    {
      title: "Twitter",
      Button: TwitterShareButton,
      Icon: TwitterIcon,
      props: { title },
    },
    {
      title: "Email",
      Button: EmailShareButton,
      Icon: EmailIcon,
      props: { subject: title, body: "Check out this awesome content!" },
    },
    {
      title: "Telegram",
      Button: TelegramShareButton,
      Icon: TelegramIcon,
      props: { subject: title },
    },
    {
      title: "WhatsApp",
      Button: WhatsappShareButton,
      Icon: WhatsappIcon,
      props: { subject: title },
    },
  ];

  return (
    <div className="flex items-baseline">
      <div className="flex flex-wrap gap-2 md:gap-3">
        {SHARE_BUTTONS.map(({ title, Button, Icon, props }) => (
          <ShareButton key={title} title={title}>
            <Button url={url} {...props}>
              <Icon size={38} round />
            </Button>
          </ShareButton>
        ))}
      </div>
    </div>
  );
};

export default SocialMediaShare;
