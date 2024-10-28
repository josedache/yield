import { Dialog, DialogContent, DialogProps, Typography } from "@mui/material";
import { Icon as Iconify } from "@iconify-icon/react";
import { LoadingButton } from "@mui/lab";

export default function FixedDeleteDraft(
  props: DialogProps & {
    onClose: () => void;
    savingsId: string;
    handleDelete: () => void;
    isLoading: boolean;
  }
) {
  const { onClose, isLoading, handleDelete, ...rest } = props;
  return (
    <Dialog fullWidth maxWidth="xs" {...rest}>
      <DialogContent>
        <div className="flex justify-center items-center flex-col gap-6">
          <Iconify
            icon="fluent:delete-32-filled"
            className="text-error-400 text-4xl"
          />
          <Typography variant="h5" className="font-semibold">
            Delete Draft?
          </Typography>
          <Typography className="body2 text-neutral-500">
            Are you sure you want to delete this plan?
          </Typography>
        </div>
        <div className="mt-6 flex gap-6">
          <LoadingButton fullWidth loading={isLoading} onClick={handleDelete}>
            Yes
          </LoadingButton>
          <LoadingButton
            fullWidth
            loading={isLoading}
            variant="outlined"
            onClick={onClose}
          >
            No
          </LoadingButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
