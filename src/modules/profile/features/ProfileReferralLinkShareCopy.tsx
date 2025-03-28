import { Button, Paper, Typography } from "@mui/material";
import useClipboard from "hooks/useClipboard";
import { useSnackbar } from "notistack";

function ProfileReferralLinkShareCopy(props: ProfileReferralLinkShareCopyProps) {
  const { link } = props;

  const { enqueueSnackbar } = useSnackbar();

  const clipboard = useClipboard();

  return (
    <div>
      <Typography variant="caption" className="" gutterBottom>
        Copy and share your unique link
      </Typography>
      <div className="flex gap-2">
        <Paper variant="outlined" className="p-3 flex-1">
          <Typography
            variant="body2"
            className="text-text-secondary line-clamp-1 text-ellipsis"
          >
            {link}
          </Typography>
        </Paper>
        <Button
          onClick={() =>
            clipboard.writeText(link, () =>
              enqueueSnackbar("Copied successfully", { variant: "success" })
            )
          }
        >
          Copy
        </Button>
      </div>
    </div>
  );
}

export default ProfileReferralLinkShareCopy;

export type ProfileReferralLinkShareCopyProps = {
  link: string;
};
