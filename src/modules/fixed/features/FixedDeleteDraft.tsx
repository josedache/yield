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
    <Dialog
      PaperProps={{
        sx: {
          maxWidth: 400,
        },
      }}
      fullWidth
      {...rest}
    >
      <DialogContent>
        <div className="flex justify-center items-center flex-col gap-6 pt-5">
          <Iconify
            icon="iconamoon:trash-fill"
            className="text-error-400 text-[48px]"
          />
          <Typography variant="h5" className="font-semibold">
            Delete Draft?
          </Typography>
          <Typography className="body2 text-neutral-500">
            Are you sure you want to delete this plan?
          </Typography>
        </div>
        <div className="mt-6 flex gap-6 pb-5">
          <LoadingButton fullWidth loading={isLoading} onClick={handleDelete}>
            Yes
          </LoadingButton>
          <LoadingButton
            fullWidth
            className="bg-[#F2F6EE]"
            disabled={isLoading}
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
