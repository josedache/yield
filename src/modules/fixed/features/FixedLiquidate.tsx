import {
  Button,
  Dialog,
  DialogContent,
  DialogProps,
  Typography,
} from "@mui/material";
import CurrencyTypography from "components/CurrencyTypography";
import DialogTitleXCloseButton from "components/DialogTitleXCloseButton";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import { Icon as Iconify } from "@iconify/react";
import useStepper from "hooks/useStepper";
import clsx from "clsx";

export default function FixedLiquidate(props: DialogProps) {
  const { onClose, ...rest } = props;
  const { enqueueSnackbar } = useSnackbar();

  const stepper = useStepper();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      depositPeriod: yup.string().label("Deposit Period").required("Required"),
      depositPeriodFrequencyId: yup
        .string()
        .label("Deposit Period Id")
        .required("Required"),
      name: yup.string().label("Plan Name").required("Required"),
    }),
    onSubmit: async () => {
      try {
        switch (stepper.step) {
          case 0:
            stepper.next();
            break;
          case 1:
            stepper.next();
            break;
          default:
            break;
        }
      } catch (error) {
        enqueueSnackbar(
          error?.data?.message ??
            error?.data?.message?.[0] ??
            "Failed to process funding",
          {
            variant: "error",
          }
        );
      }
    },
  });

  const tabs = [
    {
      title: "Liquidate Yield",
      description: "You’re about to prematurely liquidate this plan",
      content: (
        <div>
          <Typography variant="body2" className="text-center mt-6">
            New Interest Value
          </Typography>
          <CurrencyTypography variant="h4" className="text-center">
            239393
          </CurrencyTypography>
          <CurrencyTypography
            variant="body1"
            color="error"
            className="text-center"
          >
            239,393.00
          </CurrencyTypography>

          <div className="flex gap-1 items-start mt-6">
            <Iconify
              icon="ep:warning-filled"
              className="text-red-300 text-2xl"
            />
            <Typography variant="body2" className="text-left block">
              Note: Early liquidation will result in a 30% fine on your accrued
              interest. Are you sure you want to liquidate this plan?
            </Typography>
          </div>
        </div>
      ),
    },
    {
      title: "Reason for Liquidation",
      description: "Please provide a reason for liquidating this plan",
      content: <div></div>,
    },
  ];

  return (
    <Dialog fullWidth maxWidth="xs" {...rest}>
      <DialogTitleXCloseButton onClose={onClose}>
        <Typography variant="h5" className="text-center font-semibold">
          {tabs[stepper.step].title}
        </Typography>
        <Typography variant="body2" className="text-center">
          {tabs[stepper.step].description}
        </Typography>
      </DialogTitleXCloseButton>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          {tabs[stepper.step].content}
          {stepper.step <= 1 ? (
            <Button
              type="submit"
              className={clsx(["mt-6", "mt-3"][stepper.step])}
              fullWidth
            >
              {["Continue", "Proceed to Pay"][stepper.step]}
            </Button>
          ) : null}
        </form>
      </DialogContent>
    </Dialog>
  );
}
