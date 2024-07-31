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

const SocialMediaShare = () => {
  const pathname = usePathname();

  const url = endPoints.shareURL + pathname;
  const title = "Check out this awesome blog!";

  return (
    <div className="tags-container d-flex align-items-baseline">
      <div className="d-flex gap-2 gap-md-3 flex-wrap">
        <div title="Share With Facebook">
          <FacebookShareButton url={url} quote={title}>
            <FacebookIcon size={38} round />
          </FacebookShareButton>
        </div>

        <div title="Share With Twitter">
          <TwitterShareButton url={url} title={title}>
            <TwitterIcon size={38} round />
          </TwitterShareButton>
        </div>

        <div title="Share With Email">
          <EmailShareButton
            url={url}
            subject={title}
            body="Check out this awesome content!"
          >
            <EmailIcon size={38} round />
          </EmailShareButton>
        </div>

        <div title="Share With Telegram">
          <TelegramShareButton url={url} subject={title}>
            <TelegramIcon size={38} round />
          </TelegramShareButton>
        </div>

        <div title="Share With Whatsapp">
          <WhatsappShareButton url={url} subject={title}>
            <WhatsappIcon size={38} round />
          </WhatsappShareButton>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaShare;
