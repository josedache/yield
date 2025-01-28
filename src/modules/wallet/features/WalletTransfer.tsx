import { LoadingButton } from "@mui/lab";
import {
  Button,
  ButtonBase,
  Dialog,
  DialogContent,
  DrawerProps,
  Icon,
  IconButton,
  Typography,
  Link as MuiLink,
  FormHelperText,
  Skeleton,
  CircularProgress,
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
import CurrencyTypography from "components/CurrencyTypography";
import OtpInput from "components/OtpInput";
import { walletApi } from "apis/wallet-api";
import { WalletTransferStep } from "../enums/WalletTransferStep";
import Countdown from "components/Countdown";
import NumberInput from "components/NumberInput";
import { transactionApi } from "apis/transaction-api";
import useAuthUser from "hooks/useAuthUser";
import { userApi } from "apis/user-api";

function WalletTransfer(props: WalletTransferProps) {
  const { children, onClose, ...restProps } = props;

  const { enqueueSnackbar } = useSnackbar();

  const authUser = useAuthUser();

  const [isOpen, toggleOpen, setOpen] = useToggle();

  const [countdownDate, setCountdownDate] = useState(getCountdownDate);

  const stepper = useStepper({
    initialStep: getEnumStepIndex(WalletTransferStep.AMOUNT),
  });

  const enumStep = STEPS_INDEX[stepper.step];

  const [
    transferSelfOutwardTransactionMutation,
    transferSelfOutwardTransactionMutationResult,
  ] = transactionApi.useTransferSelfOutwardTransactionMutation();

  const [requestUserVoiceOtpMutation, requestUserVoiceOtpMutationResult] =
    userApi.useLazyRequestUserVoiceOtpQuery(undefined);

  const [verifyTransferLiquidateOutwardTransactionMutation] =
    transactionApi.useVerifyTransferLiquidateOutwardTransactionMutation();

  const walletQueryResult = walletApi.useGetWalletQuery(undefined);

  const wallet = walletQueryResult.data?.data;

  const availableBalance = Number(wallet?.balance ?? 0);

  const transactionOutwardBankListQueryResult =
    transactionApi.useGetTransactionOutwardBankListQuery(undefined, {
      skip: !authUser.bank_details.bankId,
    });

  const banks = transactionOutwardBankListQueryResult.data?.data;

  const normalizedBanks = useMemo(
    () =>
      banks?.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
      }, {} as Record<string, (typeof banks)[0]>),
    [banks]
  );

  const formik = useFormik({
    initialValues: {
      amount: null,
      otp: "",
      transactionId: "",
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      ...{
        [WalletTransferStep.AMOUNT]: {
          amount: yup
            .number()
            .label("Amount")
            .min(1)
            .max(availableBalance)
            .required(),
        },
        [WalletTransferStep.VERIFICATION]: {
          otp: yup.string().label("OTP").length(6).required(),
          transactionId: yup.string().label("Transaction Id").required(),
        },
      }[enumStep],
    }),
    onSubmit: async (values, helper) => {
      try {
        switch (enumStep) {
          case WalletTransferStep.AMOUNT: {
            const data = await transferSelfOutwardTransactionMutation({
              body: {
                amount: values.amount,
              },
            }).unwrap();
            setCountdownDate(getCountdownDate());
            enqueueSnackbar(data?.message || "Otp Sent", {
              variant: "success",
            });

            helper.setFieldValue("transactionId", data.data);
            break;
          }
          case WalletTransferStep.VERIFICATION: {
            const data =
              await verifyTransferLiquidateOutwardTransactionMutation({
                body: {
                  otp: values.otp,
                  transactionId: values.transactionId,
                },
              }).unwrap();

            enqueueSnackbar(data?.message || "Transfer Successful", {
              variant: "success",
            });

            break;
          }
          default:
            break;
        }
        stepper.next();
      } catch (error) {
        enqueueSnackbar(
          (Array.isArray(error?.data?.message)
            ? error?.data?.message?.[0]
            : error?.data?.message) || "Failed to process transfer",
          {
            variant: "error",
          }
        );
      }
    },
  });

  function handleClose(e?: any, reason?: any) {
    formik.resetForm();
    stepper.reset();
    onClose?.(e, reason);
    setOpen(false);
  }

  const handleResendOtp = async (values: { amount: number }) => {
    try {
      const data = await transferSelfOutwardTransactionMutation({
        body: {
          amount: Number(values.amount),
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

  async function handleRequestVoiceOtp() {
    try {
      if (requestUserVoiceOtpMutationResult.isFetching) {
        return;
      }

      const data = await requestUserVoiceOtpMutation({
        params: {
          phone:
            authUser.preffered_notification_channel === "alternate_number"
              ? authUser.alternate_number
              : authUser.preffered_notification_channel === "bvn_number"
              ? authUser.mobileNo
              : authUser.mobileNo,
        },
      }).unwrap();
      enqueueSnackbar(data?.message || "Voice Otp successfully sent", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(error?.data?.message || "Failed to send Voice Otp", {
        variant: "success",
      });
    }
  }

  const stepConfigs = [
    {
      title: "Withdraw",
      description:
        "Please enter the exact amount you want to withdraw. The amount will be sent to your withdrawal account. ",
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
          <div className="text-center space-y-2">
            <Typography color="textSecondary">
              {transactionOutwardBankListQueryResult?.isLoading ? (
                <Skeleton />
              ) : (
                normalizedBanks?.[authUser.bank_details.bankId]?.name
              )}
            </Typography>
            <Typography variant="h4" className="font-bold">
              {authUser.bank_details.accountnumber}
            </Typography>
            <Typography>{authUser.bank_details.accountname}</Typography>
          </div>
          <div className="space-y-4">
            <LoadingButton
              size="large"
              fullWidth
              loading={formik.isSubmitting}
              disabled={!formik.isValid || !formik.dirty}
              onClick={formik.handleSubmit as any}
            >
              Continue
            </LoadingButton>
          </div>
        </div>
      ),
    },
    {
      title: "Verify Transaction",
      description: `Enter the six (6) digit code sent to phone to complete this transaction.`,
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
                            disabled={
                              transferSelfOutwardTransactionMutationResult.isLoading
                            }
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
            <FormHelperText className="text-center">
              Dial{" "}
              <MuiLink className="font-semibold cursor-pointer">
                *5120*11#
              </MuiLink>{" "}
              on your number to get your OTP, or{" "}
              <MuiLink
                className="font-semibold cursor-pointer"
                onClick={handleRequestVoiceOtp}
              >
                request a call
              </MuiLink>
              {requestUserVoiceOtpMutationResult.isFetching ? (
                <CircularProgress size={10} className="ml-1" />
              ) : null}
              .
            </FormHelperText>
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
              color="warning"
              className="material-symbols-outlined-fill"
            >
              error
            </Icon>
          </div>
          <Typography variant="h4" className="text-center mb-4 font-bold">
            Processing
          </Typography>
          <Typography className="text-center text-text-secondary">
            Your withdrawal request is being processed and will be paid out
            shortly.
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
                {stepConfig?.title || "Transfer"}
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

export default WalletTransfer;

function getCountdownDate() {
  const date = new Date();
  date.setTime(date.getTime() + 1000 * 60 * 5);
  return date;
}

function getEnumStepIndex(enumStep: WalletTransferStep) {
  const index = STEPS_INDEX.indexOf(enumStep);
  return index > -1 ? index : undefined;
}

const STEPS_INDEX = [
  WalletTransferStep.AMOUNT,
  WalletTransferStep.VERIFICATION,
  WalletTransferStep.SUCCESS,
];

export type WalletTransferProps = {
  id?: string;
  children?:
    | ReactNode
    | ((props: {
        isOpen: boolean;
        toggleOpen: () => void;
        setOpen: (p: any) => void;
      }) => any);
} & Omit<DrawerProps, "children">;
