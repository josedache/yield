import {
  Dialog,
  DialogContent,
  DialogProps,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import DialogTitleXCloseButton from "components/DialogTitleXCloseButton";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import { getFormikTextFieldProps } from "utils/formik";
import { savingsApi } from "apis/savings-api";

export default function FixedEditPlanName(
  props: DialogProps & {
    onClose: () => void;
    info: any;
  }
) {
  const { onClose, info, ...rest } = props;
  const { enqueueSnackbar } = useSnackbar();

  const [renameMutation, renameMutationResult] =
    savingsApi.useSavingsRenameMutation();

  const formik = useFormik({
    initialValues: {
      name: info?.plan_name || "",
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      name: yup.string().label("Plan Name").min(6).required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        await renameMutation({
          body: {
            savingsId: String(info?.id),
            name: values.name,
          },
        }).unwrap();
        enqueueSnackbar("Plan renamed successfully", {
          variant: "success",
        });
        onClose();
      } catch (error) {
        enqueueSnackbar(
          error?.data?.message ??
            error?.data?.message?.[0] ??
            "Failed to rename plan",
          {
            variant: "error",
          }
        );
      }
    },
  });
  return (
    <Dialog fullWidth maxWidth="xs" {...rest}>
      <DialogTitleXCloseButton onClose={onClose}>
        <Typography className="font-semibold text-center">
          Edit Yield Plan
        </Typography>
      </DialogTitleXCloseButton>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Plan Name"
            {...getFormikTextFieldProps(formik, "name")}
            className="mt-6"
          />
          <div className="mt-6">
            <LoadingButton
              fullWidth
              loading={renameMutationResult.isLoading}
              type="submit"
            >
              Save Changes
            </LoadingButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
