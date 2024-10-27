import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogProps,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
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
import CdlLogo from "assets/imgs/cdl-logo.png";

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
      //   depositPeriod: yup.string().label("Deposit Period").required("Required"),
      //   depositPeriodFrequencyId: yup
      //     .string()
      //     .label("Deposit Period Id")
      //     .required("Required"),
      //   name: yup.string().label("Plan Name").required("Required"),
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
          {/* <Typography variant="body2" className="text-center mt-6">
            New Interest Value
          </Typography> */}
          <CurrencyTypography
            variant="h4"
            className="text-center font-medium mt-6"
          >
            239393
          </CurrencyTypography>
          {/* <CurrencyTypography
            variant="body1"
            color="error"
            className="text-center mt-[2px] line-through"
          >
            239,393.00
          </CurrencyTypography> */}

          <div className="flex gap-1 items-start mt-6">
            <Iconify
              icon="ep:warning-filled"
              className="text-red-300 text-2xl"
            />
            <Typography
              variant="body2"
              className="text-left block text-neutral-500"
            >
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
      content: (
        <div>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              {[
                "Emergency",
                "Interest rates too low",
                "Found a better savings plan",
                "others",
              ].map((reason) => (
                <FormControlLabel
                  value={reason}
                  control={<Radio />}
                  label={reason}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
      ),
    },
    {
      title: "Liquidate Yield",
      description:
        "You’ve decided to prematurely liquidate your yied. Please select an option below to receive your funds.",
      content: (
        <div>
          <Typography className="mt-8 text-center text-neutral-500">
            Amount to Withdraw
          </Typography>
          <CurrencyTypography variant="h4" className="mt-2 text-center">
            20000
          </CurrencyTypography>

          <Card className="border-none mt-2">
            <CardContent className="px-3 py-3 flex justify-between gap-2 item-center">
              <div className="flex gap-1 items-center">
                <img src={CdlLogo} width={32} height={32} />
                <Typography className="font-semibold">CDL Wallet</Typography>
                <Typography variant="caption">(Destination Account)</Typography>
              </div>

              <Typography className="text-neutral-500">733333344</Typography>
            </CardContent>
          </Card>
        </div>
      ),
    },
  ];

  return (
    <Dialog fullWidth maxWidth="xs" {...rest}>
      <DialogTitleXCloseButton onClose={onClose}>
        <Typography variant="h6" className="text-center font-semibold">
          {tabs[stepper.step].title}
        </Typography>
        <Typography variant="body2" className="text-center text-neutral-500">
          {tabs[stepper.step].description}
        </Typography>
      </DialogTitleXCloseButton>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          {tabs[stepper.step].content}
          {stepper.step <= 2 ? (
            <Button
              type="submit"
              className={clsx(["mt-6", "mt-3", "mt-3"][stepper.step])}
              fullWidth
            >
              {["Yes, Liquidate", "Continue", "Continue"][stepper.step]}
            </Button>
          ) : null}
        </form>
      </DialogContent>
    </Dialog>
  );
}
