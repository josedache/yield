import { LoadingButton } from "@mui/lab";
import {
  Button,
  ButtonBase,
  Dialog,
  DialogContent,
  DrawerProps,
  Icon,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import DialogTitleXCloseButton from "components/DialogTitleXCloseButton";
import { useFormik } from "formik";
import * as yup from "yup";
import useToggle from "hooks/useToggle";
import { ReactNode } from "react";
import { getFormikTextFieldProps } from "utils/formik";
import { useSnackbar } from "notistack";
import CurrencyTextField from "components/CurrencyTextField";
import useStepper from "hooks/useStepper";
import { Icon as Iconify } from "@iconify-icon/react";
import PaystackIconPngUrl from "assets/imgs/paystack-icon.png";
import CurrencyTypography from "components/CurrencyTypography";
import OtpInput from "components/OtpInput";

function FixedWithdraw(props: FixedWithdrawProps) {
  const { children, onClose, ...restProps } = props;

  const { enqueueSnackbar } = useSnackbar();

  const [isOpen, toggleOpen, setOpen] = useToggle();

  const stepper = useStepper();

  const availableBalance = 70000;
  const minimumBalance = 50000;

  const formik = useFormik({
    initialValues: {
      amount: 0,
      token: "",
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      amount: yup.number().label("Amount").min(1).required(),
    }),
    onSubmit: async () => {
      try {
        if (stepper.step == 1) {
        }

        stepper.next();
      } catch (error) {
        enqueueSnackbar(error?.data?.message || "Failed to process funding", {
          variant: "error",
        });
      }
    },
  });

  const minimumBalanceCheck =
    availableBalance - Number(formik.values.amount) < minimumBalance;

  function handleClose(e?: any, reason?: any) {
    formik.resetForm();
    stepper.reset();
    onClose?.(e, reason);
    setOpen(false);
  }

  function handlePaystack() {
    formik.submitForm();
  }

  function handleWallet() {
    formik.submitForm();
  }

  const stepConfigs = [
    {
      title: "",
      description: "Please, enter how much you want to withdraw.",
      content: (
        <div className="space-y-8">
          <CurrencyTextField
            fullWidth
            label="Amount"
            margin="normal"
            {...getFormikTextFieldProps(
              formik,
              "amount",
              <>
                Available amount:{" "}
                <CurrencyTypography component="span">
                  {availableBalance}
                </CurrencyTypography>
              </>
            )}
          />
          <Paper
            variant="outlined"
            className="border-[#5EB1BF] bg-[#5EB1BF1A] max-w-md mx-auto"
          >
            <Typography className="text-center" color="">
              You have 3 free withdrawals left this month
            </Typography>
          </Paper>
          {minimumBalanceCheck ? (
            <div className="flex items-start gap-2 text-text-secondary font-medium">
              <Iconify
                icon="si:warning-fill"
                className="mt-1 text-error-main text-lg"
              />

              <Typography>
                You can only withdraw an amount that maintains a minimum balance
                of{" "}
                <CurrencyTypography component="strong">
                  {minimumBalance}
                </CurrencyTypography>{" "}
                in your wallet. Will you like to proceed with a full withdrawal
                instead?
              </Typography>
            </div>
          ) : null}
          <div className="space-y-4">
            <LoadingButton
              size="large"
              fullWidth
              onClick={async (e) => {
                if (minimumBalanceCheck) {
                  await formik.setFieldValue("amount", availableBalance);
                }
                formik.handleSubmit(e as any);
              }}
            >
              {minimumBalanceCheck ? "Yes, Withdraw" : "Continue"}
            </LoadingButton>
          </div>
        </div>
      ),
    },
    {
      description:
        Number(formik.values.amount) >= availableBalance
          ? "You’ve decided to empty your flex yield balance. Please select an option below to receive your funds."
          : "Please select a source to add money to your yield.",
      content: (
        <div className="space-y-8">
          <div className="space-y-2 text-center">
            <Typography color="textSecondary">Amount to Withdraw</Typography>
            <CurrencyTypography variant="h4">
              {Number(formik.values.amount)}
            </CurrencyTypography>
          </div>
          <div className="space-y-4">
            {[
              {
                icon: <img src={PaystackIconPngUrl} width={32} height={32} />,
                label: "FCMB",
                value: "2893015264",
                onClick: handlePaystack,
              },
              {
                icon: <Iconify icon="ph:wallet-light" className="text-4xl" />,
                label: "Fund via Yield Wallet",
                onClick: handleWallet,
              },
            ].map(({ label, value, icon, ...restProps }) => {
              return (
                <ButtonBase
                  key={label}
                  component={Paper}
                  className="flex items-center text-left gap-4 p-2 rounded"
                  {...restProps}
                >
                  <div className="flex items-center justify-center w-8 h-8">
                    {icon}
                  </div>
                  <Typography className="flex-1">{label}</Typography>
                  <Typography className="font-semibold">{value}</Typography>
                  <Iconify
                    icon="weui:arrow-filled"
                    className="text-lg text-text-secondary"
                  />
                </ButtonBase>
              );
            })}
          </div>
        </div>
      ),
    },
    {
      title: "Verify OTP",
      description:
        "Please, enter the six (6) digit code sent to 081******74 to complete this transaction.",
      content: (
        <div className="space-y-8">
          <div className="space-y-4">
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
              className="text-center"
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
          <LoadingButton
            fullWidth
            size="large"
            loading={formik.isSubmitting}
            loadingPosition="end"
            endIcon={<></>}
            onClick={formik.handleSubmit as any}
          >
            Verify
          </LoadingButton>
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
            You’ve successfully withdrawn{" "}
            <CurrencyTypography component="b">
              {Number(formik.values.amount)}
            </CurrencyTypography>{" "}
            to your account.
          </Typography>
          <Button size="large" fullWidth onClick={handleClose}>
            Okay
          </Button>
        </div>
      ),
    },
  ];

  const stepConfig = stepConfigs[stepper.step];

  const isLastStep = stepper.step === stepConfigs.length - 1;

  const isBlankStep = isLastStep;

  return (
    <>
      <Dialog open={isOpen} fullWidth {...restProps}>
        {!isBlankStep ? (
          <DialogTitleXCloseButton onClose={handleClose}>
            {stepper.step ? (
              <IconButton
                variant="soft"
                className="absolute left-4 top-3"
                aria-label="back"
                onClick={() => stepper.previous()}
              >
                <Iconify icon="ic:twotone-arrow-back" />
              </IconButton>
            ) : null}
          </DialogTitleXCloseButton>
        ) : null}
        <DialogContent className="space-y-4">
          {!isBlankStep ? (
            <div className="text-center">
              <Typography variant="h6">
                {stepConfig?.title || "Withdrawal"}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {stepConfig?.description}
              </Typography>
            </div>
          ) : null}
          <div className="p-4">{stepConfig?.content}</div>
        </DialogContent>
      </Dialog>

      {typeof children === "function"
        ? children({ isOpen, toggleOpen, setOpen })
        : children}
    </>
  );
}

export default FixedWithdraw;

export type FixedWithdrawProps = {
  id?: string;
  children?:
    | ReactNode
    | ((props: {
        isOpen: boolean;
        toggleOpen: () => void;
        setOpen: (p: any) => void;
      }) => any);
} & Omit<DrawerProps, "children">;
