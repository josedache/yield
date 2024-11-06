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
  Link as MuiLink,
  CircularProgress,
  FormHelperText,
} from "@mui/material";
import DialogTitleXCloseButton from "components/DialogTitleXCloseButton";
import { useFormik } from "formik";
import * as yup from "yup";
import useToggle from "hooks/useToggle";
import { ReactNode, useMemo, useState } from "react";
import { getFormikTextFieldProps } from "utils/formik";
import { useSnackbar } from "notistack";
import CurrencyTextField from "components/CurrencyTextField";
import useStepper from "hooks/useStepper";
import { Icon as Iconify } from "@iconify-icon/react";
import CdlLogoPngUrl from "assets/imgs/cdl-logo.png";
import CurrencyTypography from "components/CurrencyTypography";
import OtpInput from "components/OtpInput";
import { savingsApi } from "apis/savings-api";
import { walletApi } from "apis/wallet-api";
import { FlexWithdrawChannel } from "../enums/FlexWithdrawChannel";
import { FlexWithdrawStep } from "../enums/FlexWithdrawStep";
import Countdown from "components/Countdown";
import NumberInput from "components/NumberInput";

function FlexWithdraw(props: FlexWithdrawProps) {
  const { children, onClose, ...restProps } = props;

  const { enqueueSnackbar } = useSnackbar();

  const [isOpen, toggleOpen, setOpen] = useToggle();

  const [countdownDate, setCountdownDate] = useState(getCountdownDate);

  const stepper = useStepper({
    initialStep: getEnumStepIndex(FlexWithdrawStep.AMOUNT),
  });

  const enumStep = STEPS_INDEX[stepper.step];

  const [sendSavingsOtpMutation, sendSavingsOtpMutationResult] =
    savingsApi.useSendSavingsOtpMutation();

  const savingsOtp = sendSavingsOtpMutationResult.data?.data;

  const [transferSavingsMutation] = savingsApi.useTransferSavingsMutation();

  const walletQueryResult = walletApi.useGetWalletQuery(undefined);

  const wallet = walletQueryResult.data?.data;

  const flexSavingsAccountsQueryResult = savingsApi.useGetSavingsAccountsQuery(
    useMemo(() => ({ params: { type: "recurring_deposit" } }), [])
  );

  const flexSavingsAccounts = flexSavingsAccountsQueryResult.data?.data;

  const savingsAccount = flexSavingsAccounts?.savingsAccounts?.[0];

  const availableBalance = Number(
    flexSavingsAccounts?.totalAvailableBalance ?? 0
  );

  const minimumBalance = 50000;

  const formik = useFormik({
    initialValues: {
      amount: null,
      otp: "",
      channel: null as FlexWithdrawChannel,
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      ...{
        [FlexWithdrawStep.AMOUNT]: {
          amount: yup
            .number()
            .label("Amount")
            .min(1)
            .max(availableBalance)
            .required(),
        },
        [FlexWithdrawStep.DESTINATION]: {
          channel: yup.string().label("Channel").required(),
        },
        [FlexWithdrawStep.VERIFICATION]: {
          otp: yup.string().label("OTP").required(),
        },
      }[enumStep],
    }),
    onSubmit: async (values) => {
      try {
        switch (enumStep) {
          case FlexWithdrawStep.DESTINATION: {
            const data = await sendSavingsOtpMutation({
              body: {
                action: "withdraw",
                amount: Number(values.amount),
                channel: "phone",
              },
            }).unwrap();
            setCountdownDate(getCountdownDate());
            enqueueSnackbar(data?.message || "Otp Sent", {
              variant: "success",
            });
            break;
          }
          case FlexWithdrawStep.VERIFICATION: {
            if (values.channel === FlexWithdrawChannel.CREDIT_DIRECT) {
              const data = await transferSavingsMutation({
                body: {
                  otp: values.otp,
                  savingsId: savingsAccount?.id,
                  transferAmount: Number(values.amount),
                  type: "withdraw",
                  // transferDescription: "",
                },
              }).unwrap();

              enqueueSnackbar(data?.message || "Withdrawal Successful", {
                variant: "success",
              });
            }
            break;
          }
          default:
            break;
        }
        stepper.next();
      } catch (error) {
        enqueueSnackbar(
          error?.data?.message || "Failed to process withdrawal",
          {
            variant: "error",
          }
        );
      }
    },
  });

  const futureAvaialableBalance =
    availableBalance - Number(formik.values.amount);

  const isFutureAvailableBalanceLessThanMinimumBalance =
    futureAvaialableBalance < minimumBalance;

  const isTotalWithdrawal = Number(formik.values.amount) >= availableBalance;

  function handleClose(e?: any, reason?: any) {
    formik.resetForm();
    stepper.reset();
    onClose?.(e, reason);
    setOpen(false);
  }

  const handleResendOtp = async (values: { amount: number }) => {
    try {
      const data = await sendSavingsOtpMutation({
        body: {
          action: "withdraw",
          amount: values.amount,
          channel: "phone",
        },
      }).unwrap();
      setCountdownDate(getCountdownDate());
      enqueueSnackbar(data?.message || "Otp Sent", {
        variant: "error",
      });
    } catch (error) {
      enqueueSnackbar(
        error?.data?.errors?.[0]?.defaultUserMessage || `OTP failed to send!`,
        {
          variant: "error",
        }
      );
    }
  };

  const stepConfigs = [
    {
      title: "",
      description: "Please, enter how much you want to withdraw.",
      content: (
        <div className="space-y-8">
          <div>
            <CurrencyTextField
              fullWidth
              label="Amount"
              placeholder="0.00"
              maskOptions={{ min: 1, max: availableBalance }}
              {...getFormikTextFieldProps(formik, "amount")}
            />
            <FormHelperText className="mt-2">
              Available amount:{" "}
              <CurrencyTypography component="span" variant="caption">
                {availableBalance - formik.values.amount}
              </CurrencyTypography>
            </FormHelperText>
          </div>
          {/* <Paper
            variant="outlined"
            className="border-[#5EB1BF] bg-[#5EB1BF1A] max-w-md mx-auto"
          >
            <Typography className="text-center" color="">
              You have 3 free withdrawals left this month
            </Typography>
          </Paper> */}
          {isFutureAvailableBalanceLessThanMinimumBalance ? (
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
              disabled={!formik.isValid || !formik.dirty}
              onClick={async (e) => {
                if (isFutureAvailableBalanceLessThanMinimumBalance) {
                  await formik.setFieldValue("amount", availableBalance);
                }
                formik.handleSubmit(e as any);
              }}
            >
              {isFutureAvailableBalanceLessThanMinimumBalance
                ? "Yes, Withdraw"
                : "Continue"}
            </LoadingButton>
          </div>
        </div>
      ),
    },
    {
      description: isTotalWithdrawal
        ? "You’ve decided to empty your flex yield balance. Please select an option below to receive your funds."
        : "Please select a destination for withdrawal.",
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
                icon: <img src={CdlLogoPngUrl} width={32} height={32} />,
                label: "Credit Direct",
                value: wallet?.account_number,
                disabled: formik.isSubmitting,
                loading: formik.isSubmitting,
                onClick: async (e) => {
                  await formik.setFieldValue(
                    "channel",
                    FlexWithdrawChannel.CREDIT_DIRECT
                  );
                  await formik.handleSubmit(e);
                },
              },
              // {
              //   icon: <Iconify icon="ph:wallet-light" className="text-4xl" />,
              //   label: "Yield Wallet",
              //   onClick: handleWallet,
              // },
            ].map(({ label, value, icon, loading, ...restProps }) => {
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
                  {loading ? (
                    <CircularProgress size={12} />
                  ) : (
                    <Iconify
                      icon="weui:arrow-filled"
                      className="text-lg text-text-secondary"
                    />
                  )}
                </ButtonBase>
              );
            })}
          </div>
        </div>
      ),
    },
    {
      title: "Verify Transaction",
      description: `Please, enter the six (6) digit code sent to ${savingsOtp} to complete this transaction.`,
      content: (
        <div className="space-y-8">
          <div className="space-y-4">
            <OtpInput
              containerStyle={{ justifyContent: "center" }}
              value={formik.values.otp}
              onChange={(otp) => {
                formik.setFieldValue("otp", otp);
              }}
              numInputs={6}
              shouldAutoFocus
              // inputType="password"
              slot={{ input: NumberInput }}
              slotProps={{
                input: {
                  style: { opacity: formik.isSubmitting ? 0.5 : 1 },
                  disabled: formik.isSubmitting,
                },
              }}
            />
            <Countdown date={countdownDate}>
              {(countdown) => {
                const isCodeSent =
                  countdown.days ||
                  countdown.minutes ||
                  countdown.seconds ||
                  countdown.seconds;

                return (
                  <>
                    {isCodeSent ? (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        className="text-center"
                      >
                        Resend OTP in{" "}
                        <Typography
                          component="span"
                          color="primary"
                          className="font-semibold"
                        >
                          {countdown.minutes}:
                          {countdown.seconds < 10
                            ? `0${countdown.seconds}`
                            : countdown.seconds}
                        </Typography>
                      </Typography>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Typography className="text-center">
                          Didn’t receive code?{" "}
                          <ButtonBase
                            disableRipple
                            disabled={sendSavingsOtpMutationResult.isLoading}
                            component={MuiLink}
                            onClick={handleResendOtp as any}
                            className="underline text-text-primary font-bold"
                          >
                            Resend Code.
                          </ButtonBase>
                        </Typography>
                        {/* {requestOtpMutationResult.isLoading && (
                <CircularProgress size={12} thickness={8} className="ml-1" />
              )} */}
                      </div>
                    )}
                  </>
                );
              }}
            </Countdown>
          </div>
          <LoadingButton
            fullWidth
            size="large"
            disabled={!formik.isValid || !formik.dirty}
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
      <Dialog open={isOpen} maxWidth="xs" fullWidth {...restProps}>
        {!isBlankStep ? (
          <DialogTitleXCloseButton onClose={handleClose} className="pt-4">
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
        <DialogContent className="space-y-4 px-8 pb-10">
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
          <div>{stepConfig?.content}</div>
        </DialogContent>
      </Dialog>

      {typeof children === "function"
        ? children({ isOpen, toggleOpen, setOpen })
        : children}
    </>
  );
}

export default FlexWithdraw;

function getCountdownDate() {
  const date = new Date();
  date.setTime(date.getTime() + 1000 * 60 * 5);
  return date;
}

function getEnumStepIndex(enumStep: FlexWithdrawStep) {
  const index = STEPS_INDEX.indexOf(enumStep);
  return index > -1 ? index : undefined;
}

const STEPS_INDEX = [
  FlexWithdrawStep.AMOUNT,
  FlexWithdrawStep.DESTINATION,
  FlexWithdrawStep.VERIFICATION,
];

export type FlexWithdrawProps = {
  id?: string;
  children?:
    | ReactNode
    | ((props: {
        isOpen: boolean;
        toggleOpen: () => void;
        setOpen: (p: any) => void;
      }) => any);
} & Omit<DrawerProps, "children">;
