import { Button, Icon, Typography } from "@mui/material";
import { DeviceDetected } from "enums/DeviceDetected";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

function ProfileReferralLinkShare(props: ProfileReferralLinkShareProps) {
  const { link } = props;

  const shareData: ShareData = {
    title: "Credit Direct Limited",
    text: "Credit Direct Limited referral link",
    url: link,
  };

  if (
    (DeviceDetected.ANDROID ||
      DeviceDetected.IOS ||
      DeviceDetected.IPAD ||
      DeviceDetected.IPHONE) &&
    navigator.canShare &&
    navigator.share &&
    navigator?.canShare(shareData)
  ) {
    return (
      <Button
        startIcon={<Icon>share</Icon>}
        onClick={async () => {
          try {
            await navigator.share(shareData);
          } catch {}
        }}
      >
        Share Link
      </Button>
    );
  }

  return (
    <div>
      <Typography variant="caption" className="block" gutterBottom>
        Share on social
      </Typography>
      <div className="flex items-center gap-3">
        <FacebookShareButton url={link}>
          <svg
            width="52"
            height="52"
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="52" height="52" rx="8" fill="#F9FAFB" />
            <path
              d="M29.12 19.32H31V16.14C30.0897 16.0454 29.1751 15.9986 28.26 16C25.54 16 23.68 17.66 23.68 20.7V23.32H20.61V26.88H23.68V36H27.36V26.88H30.42L30.88 23.32H27.36V21.05C27.36 20 27.64 19.32 29.12 19.32Z"
              fill="#7DA851"
            />
          </svg>
        </FacebookShareButton>
        <TwitterShareButton url={link}>
          <svg
            width="52"
            height="52"
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="52" height="52" rx="8" fill="#F9FAFB" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M29.9455 37L24.396 29.0901L17.4489 37H14.5098L23.0921 27.2311L14.5098 15H22.0557L27.286 22.455L33.8393 15H36.7784L28.5943 24.3165L37.4914 37H29.9455ZM33.2185 34.77H31.2398L18.7181 17.23H20.6971L25.7121 24.2532L26.5793 25.4719L33.2185 34.77Z"
              fill="#7DA851"
            />
          </svg>
        </TwitterShareButton>
        <LinkedinShareButton url={link}>
          <svg
            width="52"
            height="52"
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="52" height="52" rx="8" fill="#F9FAFB" />
            <path
              d="M14 21.5H19.367V38H14V21.5ZM33.986 21.6935C33.929 21.6755 33.875 21.656 33.815 21.6395C33.743 21.6232 33.6704 21.6092 33.5975 21.5975C33.2806 21.5327 32.958 21.5 32.6345 21.5C29.5055 21.5 27.521 23.7755 26.867 24.6545V21.5H21.5V38H26.867V29C26.867 29 30.923 23.351 32.6345 27.5V38H38V26.8655C37.9978 25.6807 37.6025 24.5301 36.8761 23.5942C36.1496 22.6582 35.1332 21.9897 33.986 21.6935Z"
              fill="#7DA851"
            />
            <path
              d="M16.625 19.25C18.0747 19.25 19.25 18.0747 19.25 16.625C19.25 15.1753 18.0747 14 16.625 14C15.1753 14 14 15.1753 14 16.625C14 18.0747 15.1753 19.25 16.625 19.25Z"
              fill="#7DA851"
            />
          </svg>
        </LinkedinShareButton>
        <EmailShareButton url={link}>
          <svg
            width="52"
            height="52"
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="52" height="52" rx="8" fill="#F9FAFB" />
            <g clipPath="url(#clip0_3662_620)">
              <path
                d="M34 18H18C16.895 18 16.01 18.895 16.01 20L16 32C16 33.105 16.895 34 18 34H34C35.105 34 36 33.105 36 32V20C36 18.895 35.105 18 34 18ZM34 22L26 27L18 22V20L26 25L34 20V22Z"
                fill="#7DA851"
              />
            </g>
            <defs>
              <clipPath id="clip0_3662_620">
                <rect
                  width="24"
                  height="24"
                  fill="white"
                  transform="translate(14 14)"
                />
              </clipPath>
            </defs>
          </svg>
        </EmailShareButton>
        <WhatsappShareButton url={link}>
          <svg
            width="52"
            height="52"
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="52" height="52" rx="8" fill="#F9FAFB" />
            <path
              d="M30.6 28C30.4 27.9 29.1 27.3 28.9 27.2C28.7 27.1 28.5 27.1 28.3 27.3C28.1 27.5 27.7 28.1 27.5 28.3C27.4 28.5 27.2 28.5 27 28.4C26.3 28.1 25.6 27.7 25 27.2C24.5 26.7 24 26.1 23.6 25.5C23.5 25.3 23.6 25.1 23.7 25C23.8 24.9 23.9 24.7 24.1 24.6C24.2 24.5 24.3 24.3 24.3 24.2C24.4 24.1 24.4 23.9 24.3 23.8C24.2 23.7 23.7 22.5 23.5 22C23.4 21.3 23.2 21.3 23 21.3H22.5C22.3 21.3 22 21.5 21.9 21.6C21.3 22.2 21 22.9 21 23.7C21.1 24.6 21.4 25.5 22 26.3C23.1 27.9 24.5 29.2 26.2 30C26.7 30.2 27.1 30.4 27.6 30.5C28.1 30.7 28.6 30.7 29.2 30.6C29.9 30.5 30.5 30 30.9 29.4C31.1 29 31.1 28.6 31 28.2L30.6 28ZM33.1 18.9C29.2 15 22.9 15 19 18.9C15.8 22.1 15.2 27 17.4 30.9L16 36L21.3 34.6C22.8 35.4 24.4 35.8 26 35.8C31.5 35.8 35.9 31.4 35.9 25.9C36 23.3 34.9 20.8 33.1 18.9ZM30.4 32.9C29.1 33.7 27.6 34.2 26 34.2C24.5 34.2 23.1 33.8 21.8 33.1L21.5 32.9L18.4 33.7L19.2 30.7L19 30.4C16.6 26.4 17.8 21.4 21.7 18.9C25.6 16.4 30.6 17.7 33 21.5C35.4 25.4 34.3 30.5 30.4 32.9Z"
              fill="#7DA851"
            />
          </svg>
        </WhatsappShareButton>
      </div>
    </div>
  );
}

export default ProfileReferralLinkShare;

export type ProfileReferralLinkShareProps = {
  link: string;
};
