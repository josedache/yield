import {
  Button,
  ButtonBase,
  CardActionArea,
  Dialog,
  DialogContent,
  DialogProps,
  FormControl,
  FormControlLabel,
  Icon,
  Paper,
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
import clsx from "clsx";

import useStepper from "hooks/useStepper";
import CdlLogo from "assets/imgs/cdl-logo.png";
import BackIconButton from "components/BackIconButton";
import OtpInput from "components/OtpInput";

export default function FixedLiquidate(props: DialogProps) {
  const { onClose, ...rest } = props;
  const { enqueueSnackbar } = useSnackbar();

  const stepper = useStepper();

  const formik = useFormik({
    initialValues: {
      name: "",
      depositAmount: null,
      token: "",
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
          case 2:
            stepper.next();
            break;
          case 3:
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

  async function handleWallet() {
    try {
      stepper.next();
    } catch (error) {
      enqueueSnackbar(
        error?.data?.message?.[0] || "Failed to process funding",
        {
          variant: "error",
        }
      );
    }
  }

  async function handlePayWithTransfer() {
    stepper.step(3);
  }

  const tabs = [
    {
      title: "Liquidate Yield",
      description: "You’re about to prematurely liquidate this plan",
      content: (
        <div>
          <CurrencyTypography
            variant="h4"
            className="text-center font-medium mt-6"
          >
            239393
          </CurrencyTypography>

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
          <CurrencyTypography
            variant="h4"
            className="mt-2 text-center font-semibold"
          >
            20000
          </CurrencyTypography>
          <div className="space-y-4">
            {[
              {
                icon: <img src={CdlLogo} width={32} height={32} />,
                label: "Pay with transfer (recommended)",
                onClick: handlePayWithTransfer,
                disabled: false,
              },
              {
                icon: <Iconify icon="ph:wallet-light" className="text-4xl" />,
                label: `Fund via Yield Wallet`,
                onClick: handleWallet,
                disabled: false,
              },
            ].map(({ label, icon, ...restProps }) => {
              return (
                <ButtonBase
                  key={label}
                  component={Paper}
                  className={clsx(
                    "rounded w-full mt-8",
                    restProps?.disabled ? "text-neutral-400" : ""
                  )}
                  {...restProps}
                >
                  <CardActionArea className="flex items-center justify-between gap-4 w-full p-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-8 h-8">
                        {icon}
                      </div>
                      <div>
                        <Typography className="flex-1">{label}</Typography>
                      </div>
                    </div>

                    <Iconify
                      icon="weui:arrow-filled"
                      className="text-lg text-text-secondary"
                    />
                  </CardActionArea>
                </ButtonBase>
              );
            })}
          </div>
        </div>
      ),
    },
    {
      title: "Verify Transaction",
      description:
        "Please, enter the six (6) digit code sent to 081******74 to complete this transaction.",
      content: (
        <div className="mt-4">
          <OtpInput
            containerStyle={{ justifyContent: "center" }}
            value={formik.values.token}
            onChange={(token) => {
              formik.setFieldValue("token", token);
            }}
            numInputs={6}
            shouldAutoFocus
            // inputType="password"
            slotProps={{
              input: {
                style: { opacity: formik.isSubmitting ? 0.5 : 1 },
                disabled: formik.isSubmitting,
              },
            }}
          />
          <Typography
            variant="body2"
            color="textSecondary"
            className="text-center mt-8"
          >
            Didn’t receive OTP code?{" "}
            <Typography
              component="span"
              color="primary"
              className="font-semibold"
            >
              Resend
            </Typography>
          </Typography>
        </div>
      ),
    },
    {
      content: (
        <div className="space-y-8 max-w-md mx-auto">
          <div className="flex justify-center text-6xl">
            <Icon
              fontSize="inherit"
              color="success"
              className="material-symbols-outlined-fill "
            >
              check_circle
            </Icon>
          </div>
          <Typography variant="h4" className="text-center mb-4 font-bold">
            Success!
          </Typography>
          <Typography className="text-center">
            You’ve successfully liquidated your fixed yield plan.
          </Typography>
          <Button size="large" fullWidth onClick={handleClose}>
            Okay
          </Button>
        </div>
      ),
    },
  ];

  function handleClose(e?: any, reason?: any) {
    formik.resetForm();
    stepper.reset();
    onClose?.(e, reason);
  }

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

      {stepper.step === 1 ? (
        <BackIconButton
          onClick={() => {
            stepper.previous();
          }}
          className="absolute top-2 left-2 bg-neutral-100 text-neutral-700"
          variant="contained"
        />
      ) : null}
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          {tabs[stepper.step].content}
          {stepper.step <= 3 ? (
            <Button
              type="submit"
              className={clsx(
                ["mt-6", "mt-3", "mt-3 hidden", "mt-4"][stepper.step]
              )}
              fullWidth
            >
              {
                ["Yes, Liquidate", "Continue", "Continue", "Verify"][
                  stepper.step
                ]
              }
            </Button>
          ) : null}
        </form>
      </DialogContent>
    </Dialog>
  );
}
