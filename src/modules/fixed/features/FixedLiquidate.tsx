import {
  Button,
  ButtonBase,
  CardActionArea,
  Dialog,
  DialogContent,
  DialogProps,
  FormControl,
  FormControlLabel,
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
// import CdlLogo from "assets/imgs/cdl-logo.png";
import BackIconButton from "components/BackIconButton";
import OtpInput from "components/OtpInput";
import { savingsApi } from "apis/savings-api";
import { LoadingButton } from "@mui/lab";
import { getFormikTextFieldProps } from "utils/formik";
import useAuthUser from "hooks/useAuthUser";
import { transactionApi } from "apis/transaction-api";
import { useMemo, useState } from "react";
import NumberInput from "components/NumberInput";

export default function FixedLiquidate(
  props: DialogProps & { onClose: () => void; info: any }
) {
  const userAuth = useAuthUser();
  const { onClose, info, ...rest } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [otpEmail, setOptEmail] = useState();
  const [sendOtpMutation, sendOtpMutationResult] =
    savingsApi.useSendSavingsOtpMutation();

  const stepper = useStepper();
  const authUser = useAuthUser();

  const [liquidateSavingsMutation, liquidateSavingsMutationResult] =
    savingsApi.useLiquidateSavingsMutation();

  const transactionOutwardBankListQueryResult =
    transactionApi.useGetTransactionOutwardBankListQuery(undefined, {
      skip: !userAuth.bank_details.bankId,
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
      savingsId: String(info?.id),
      note: "",
      otp: "",
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      ...(stepper.step === 3
        ? {
            savingsId: yup.string().label("Savings Id").required("Required"),
            note: yup.string().label("Reason"),
            otp: yup.string().label("Otp").required("Required"),
          }
        : {}),
    }),
    onSubmit: async (values) => {
      try {
        switch (stepper.step) {
          case 0:
            stepper.next();
            break;
          case 1:
            stepper.next();
            break;
          // case 2:
          //   const resp = await sendOtpMutation({
          //     body: {
          //       channel: "phone",
          //       action: "liquidate",
          //       amount: Number(info?.available_balance),
          //     },
          //   }).unwrap();
          //   setOptEmail(resp?.data as any);
          //   enqueueSnackbar("OTP sent!", {
          //     variant: "success",
          //   });
          //   stepper.next();
          //   break;
          case 2:
          case 3:
            await liquidateSavingsMutation({
              body: {
                savingsId: values?.savingsId,
                note: values?.note,
                // otp: Number(values?.otp),
              },
            }).unwrap();
            stepper.next(4);
            break;
          case 4:
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

  async function handleResendOpt() {
    try {
      const resp = await sendOtpMutation({
        body: {
          channel: "phone",
          action: "liquidate",
          amount: 4000,
        },
      }).unwrap();
      setOptEmail(resp?.data as any);
      enqueueSnackbar("Otp resent!", {
        variant: "success",
      });
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
            {info?.available_balance}
          </CurrencyTypography>

          {info?.maturity_date &&
            new Date(info?.maturity_date) >= new Date() && (
              <div className="flex gap-1 items-start mt-6">
                <Iconify
                  icon="ep:warning-filled"
                  className="text-error-500 text-3xl h-5 p-0 leading-none"
                />

                <Typography
                  variant="body2"
                  className="text-left block text-neutral-500"
                >
                  Note: Early liquidation will result in a 30% fine on your
                  accrued interest. Are you sure you want to liquidate this
                  plan?
                </Typography>
              </div>
            )}
        </div>
      ),
    },
    {
      title: "Reason for Liquidation",
      description: "Please provide a reason for liquidating this plan",
      content: (
        <div>
          <FormControl>
            <RadioGroup {...getFormikTextFieldProps(formik, "note")}>
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
          <Typography className="mt-1 text-center text-neutral-500">
            Amount to Withdraw
          </Typography>
          <CurrencyTypography
            variant="h4"
            className="mt-2 text-center font-semibold"
          >
            {info?.available_balance}
          </CurrencyTypography>
          <div className="space-y-3 mt-8">
            {[
              {
                icon: (
                  <Iconify
                    icon="teenyicons:bank-outline"
                    className="text-2xl"
                  />
                ),
                label:
                  normalizedBanks?.[authUser.bank_details.bankId]?.name || "",
                more: userAuth?.bank_details?.accountnumber || "",
                onClick: () => {
                  formik.handleSubmit();
                },
                disabled:
                  sendOtpMutationResult?.isLoading ||
                  transactionOutwardBankListQueryResult?.isLoading,
              },
              {
                icon: <Iconify icon="ph:wallet-light" className="text-3xl" />,
                label: `CDL Wallet`,
                onClick: () => {
                  formik.handleSubmit();
                },
                disabled:
                  sendOtpMutationResult?.isLoading ||
                  transactionOutwardBankListQueryResult?.isLoading,
              },
            ].map(({ label, icon, more, ...restProps }) => {
              return (
                <ButtonBase
                  key={label}
                  component={Paper}
                  className={clsx(
                    "rounded w-full",
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

                    {more ? <Typography>{more}</Typography> : null}
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
      description: `Enter the six (6) digit code sent to ${otpEmail} to complete this transaction.`,
      content: (
        <div className="mt-4">
          <OtpInput
            containerStyle={{ justifyContent: "center" }}
            value={formik.values.otp}
            onChange={(token) => {
              formik.setFieldValue("otp", token);
            }}
            placeholder=""
            numInputs={6}
            shouldAutoFocus
            slot={{ input: NumberInput }}
            slotProps={{
              input: {
                style: {
                  opacity: formik.isSubmitting ? 0.5 : 1,
                  ...(!!formik.touched.otp && formik.errors.otp
                    ? { border: "1px solid var(--mui-palette-error-main)" }
                    : {
                        // outline: "1px solid var(--mui-palette-secondary-light)",
                      }),
                },
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
            <ButtonBase
              disableRipple
              onClick={handleResendOpt}
              className="font-semibold inline-block text-[#4920AA]"
            >
              Resend code
            </ButtonBase>
          </Typography>
        </div>
      ),
    },
    {
      content: (
        <div className="space-y-8 max-w-md mx-auto flex justify-center flex-col items-center">
          <div className="flex justify-center text-6xl">
            <Iconify
              icon="ep:warning-filled"
              className="text-6xl text-warning-main"
            />
          </div>
          <Typography variant="h4" className="text-center mb-4 font-bold">
            Processing{" "}
          </Typography>
          <Typography className="text-center text-neutral-500 max-w-[336px]">
            Your liquidation request is being processed and will be paid out
            shortly.
          </Typography>
          <Button
            className="max-w-[255px]"
            size="large"
            fullWidth
            onClick={handleClose}
          >
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
    <Dialog
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: stepper.step === 4 ? "400px" : "440px",
        },
      }}
      fullWidth
      {...rest}
    >
      <DialogTitleXCloseButton
        className="mt-4"
        onClose={stepper.step === 4 ? "" : onClose}
      >
        <Typography variant="h6" className="text-center font-semibold">
          {tabs[stepper.step].title}
        </Typography>
        <Typography variant="body2" className="text-center text-neutral-500">
          {tabs[stepper.step].description}
        </Typography>
      </DialogTitleXCloseButton>

      {stepper.step === 2 ? (
        <BackIconButton
          onClick={() => {
            stepper.previous();
          }}
          className="absolute top-2 left-2 bg-neutral-100 text-neutral-700"
          variant="contained"
        />
      ) : null}
      <DialogContent className="px-8 pb-10">
        <form onSubmit={formik.handleSubmit}>
          {tabs[stepper.step].content}
          <div
            className={clsx(
              stepper.step === 1 ? "grid grid-cols-2" : "grid grid-cols-1",
              "gap-3",
              ["mt-6", "mt-3", "mt-3 hidden", "mt-4"][stepper.step]
            )}
          >
            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                stepper.next();
              }}
              className={clsx(
                stepper.step === 1 ? "block" : "hidden",
                "bg-[#F2F6EE]"
              )}
            >
              SKip
            </Button>
            {stepper.step <= 3 ? (
              <LoadingButton
                loading={
                  sendOtpMutationResult?.isLoading ||
                  liquidateSavingsMutationResult?.isLoading
                }
                type="submit"
                fullWidth
              >
                {
                  ["Yes, Liquidate", "Continue", "Continue", "Verify"][
                    stepper.step
                  ]
                }
              </LoadingButton>
            ) : null}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
