import {
  Button,
  ButtonBase,
  Dialog,
  DialogContent,
  DialogProps,
  Icon,
  IconButton,
  Paper,
  Skeleton,
  Typography,
  Link as MuiLink,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import { Icon as Iconify } from "@iconify-icon/react";
import clsx from "clsx";
import { LoadingButton } from "@mui/lab";

import PaystackIconPngUrl from "assets/imgs/paystack-icon.png";
import PaymentGatewayInline from "libs/payment-gateway-inline/inline";
import { PaymentGatewayInlineProvider } from "libs/payment-gateway-inline";
import DialogTitleXCloseButton from "components/DialogTitleXCloseButton";
import FixedCreatePlanCalculatorTab from "./FixedCreatePlanCalculatorTab";
import { FIXED_PRODUCT_ID, PAYSTACK_PUBLIC_KEY } from "constants/env";
import useStepper from "hooks/useStepper";
import BackIconButton from "components/BackIconButton";
import FixedCreatePlanTab from "./FixedCreatePlanTab";
import { FixedCreatePlanFormikType } from "../types/FixedCreatePlan";
import { savingsApi } from "apis/savings-api";
import LoadingContent from "components/LoadingContent";
import CdlLogo from "assets/imgs/cdl-logo.png";
import { walletApi } from "apis/wallet-api";
import { formatNumberToCurrency } from "utils/number";
import useClipboard from "hooks/useClipboard";
import { transactionApi } from "apis/transaction-api";
import useAuthUser from "hooks/useAuthUser";
import {
  trackUserClickOnCreateNewYield,
  trackUserOnSelectingRollover,
  trackUserOnSelectingTransfer,
  trackUserPaystack,
} from "configs/analytics";
import { FixedCreatePlanStep } from "../enums/FixedCreatePlanStep";
import FixedCreatePlanRecipientSelect from "./FixedCreatePlanRecipientSelect";
import FixedCreatePlanRecipientInformation from "./FixedCreatePlanRecipientInformation";
import Countdown from "components/Countdown";
import NumberInput from "components/NumberInput";
import OtpInput from "components/OtpInput";
import { useState } from "react";
// import { useMemo } from "react";

const ROLLOVER_WITH_CAPITAL = 400;
const ROLLOVER_WITH_INTEREST = 300;

export default function FixedCreatePlan(
  props: DialogProps & {
    onClose: () => void;
    savingsId?: string;
    isEdit?: boolean;
    isLoading?: boolean;
    onHandleSubmit?: (val: FixedCreatePlanFormikType) => void;
    isPayment?: boolean;
    isGifted?: boolean;
    isRollover?: boolean;
    onSuccess?: () => void;
    proceedLabel?: string;
    disabledFields?: Array<"depositAmount" | "depositPeriod" | "name">;
    accountClosureId?: number;
  }
) {
  const {
    onSuccess,
    onHandleSubmit,
    onClose,
    isLoading,
    savingsId,
    isEdit,
    isPayment,
    proceedLabel,
    disabledFields,
    accountClosureId,
    isGifted,
    isRollover,
    ...rest
  } = props;

  const stepper = useStepper({
    initialStep: getEnumStepIndex(
      isEdit || isRollover
        ? FixedCreatePlanStep.PLAN_INFORMATION
        : savingsId && isPayment
        ? FixedCreatePlanStep.SELECT_PAYMENT_METHOD
        : FixedCreatePlanStep.SELECT_RECIPIENT
    ),
  });

  const enumStep = STEPS_INDEX[stepper.step];

  const { enqueueSnackbar } = useSnackbar();
  const { writeText } = useClipboard();

  const authUser = useAuthUser();

  // useEffect(() => {
  //   if (savingsId && isPayment) {
  //     stepper.go(2);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [savingsId]);

  const getSavingsQuery = savingsApi.useGetSavingsAccountQuery(
    {
      params: { savingsId: savingsId },
    },
    { skip: (!isEdit && !savingsId) || !savingsId }
  );

  // const fixedSavings = getSavingsQuery?.data?.data;

  const [updateDraftSavingsMutation, updateDraftSavingsMutationResult] =
    savingsApi.useUpdateDraftSavingsMutation();

  const getSavingsProductInformationQuery =
    savingsApi.useGetSavingsProductInformationQuery({
      params: { productId: FIXED_PRODUCT_ID },
    });

  const walletQueryResult = walletApi.useGetWalletQuery(undefined, {
    // skip: stepper.step !== 2 && stepper.step !== 3,
  });
  const wallet = walletQueryResult.data?.data;

  const [
    savingsFixedDepositCalculationMutation,
    savingsFixedDepositCalculationMutationResult,
  ] = savingsApi.useSavingsCalculatorMutation();

  const [
    savingsFixedDepositCreateMutation,
    savingsFixedDepositCreateMutationResult,
  ] = savingsApi.useSavingsFixedDepositCreatePlanMutation();

  const [createSavingsGiftYieldMutation, createSavingsGiftYieldMutationResult] =
    savingsApi.useCreateSavingsGiftYieldMutation();

  const [savingsActivateAccountMutation, savingsActivateAccountMutationResult] =
    savingsApi.useSavingsActivateAccountMutation();

  const [renameMutation, renameMutationResult] =
    savingsApi.useSavingsRenameMutation();

  const [
    generateTransactionOutwardPaymentReferenceMutation,
    generateTransactionOutwardPaymentReferenceMutationResult,
  ] = transactionApi.useGenerateTransactionOutwardPaymentReferenceMutation();

  const [recipientUserDetailsQuery, recipientUserDetailsQueryResult] =
    savingsApi.useLazyGetSavingsYieldUserDetailsQuery();

  const [sendSavingsOtpMutation, sendSavingsOtpMutationResult] =
    savingsApi.useSendSavingsOtpMutation();

  const savingsOtp = sendSavingsOtpMutationResult.data?.data;

  const [countdownDate, setCountdownDate] = useState(getCountdownDate);

  const formik = useFormik<FixedCreatePlanFormikType>({
    initialValues: {
      type: isGifted ? "gift" : "personal",
      productId: FIXED_PRODUCT_ID,
      depositPeriod: getSavingsQuery?.data?.data?.duration || 1,
      ...(getSavingsProductInformationQuery?.data?.data?.max_period_type
        ? {
            depositPeriodFrequencyId:
              getSavingsProductInformationQuery?.data?.data?.max_period_type,
          }
        : {}),
      name: getSavingsQuery?.data?.data?.plan_name ?? "",
      depositAmount:
        accountClosureId === ROLLOVER_WITH_CAPITAL
          ? Number(getSavingsQuery?.data?.data?.principal || 0) || null
          : accountClosureId === ROLLOVER_WITH_INTEREST
          ? Number(getSavingsQuery?.data?.data?.maturity_amount || 0) || null
          : null,
      lockinPeriodFrequency: 0,
      lockinPeriodFrequencyType: 0,
      fundSource: "",
      note: "",
      phone: "",
      otp: "",
    },
    enableReinitialize: true,
    validationSchema: yup.lazy((values: FixedCreatePlanFormikType) => {
      return yup.object({
        ...{
          [FixedCreatePlanStep.SELECT_RECIPIENT]: {
            type: yup.string().label("Type").required(),
            phone: yup
              .string()
              .label("Recipient Phone Number")
              .when("type", ([type], schema) =>
                type === "gift"
                  ? schema.length(11).required()
                  : schema.optional()
              ),
          },
          [FixedCreatePlanStep.PLAN_INFORMATION]: {
            depositAmount: yup
              .number()
              .label("Amount")
              .min(
                getSavingsProductInformationQuery?.data?.data
                  ?.min_deposit_amt || 0
              )
              .max(
                getSavingsProductInformationQuery?.data?.data
                  ?.max_deposit_amt || 0
              )
              .required("Required"),
            depositPeriod: yup
              .string()
              .label("Deposit Period")
              .required("Required"),
            depositPeriodFrequencyId: yup
              .string()
              .label("Deposit Period Id")
              .required("Required"),
            name: yup
              .string()
              .label("Plan Name")
              .trim()
              .when("type", ([type], schema) =>
                type === "gift" ? schema.max(30) : schema
              )
              .required(),
            ...(values.type === "gift"
              ? {
                  note: yup.string().label("Note").trim().max(50).optional(),
                }
              : undefined),
          },
        }[enumStep],
      });
    }),
    onSubmit: async (values, helper) => {
      const isGifting = values.type === "gift";

      trackUserClickOnCreateNewYield({
        depositAmount: formik.values.depositAmount,
        depositPeriod: formik.values.depositPeriod,
      });

      try {
        switch (enumStep) {
          case FixedCreatePlanStep.SELECT_RECIPIENT: {
            await helper.setValues((values) => ({
              ...values,
              name: "",
              depositAmount: null,
              depositPeriod: 1,
            }));

            if (values.type === "personal") {
              stepper.go(
                getEnumStepIndex(FixedCreatePlanStep.PLAN_INFORMATION)
              );
              return;
            } else {
              if (
                values.phone === authUser.mobileNo ||
                values.phone === authUser?.alternate_number
              ) {
                enqueueSnackbar("You can't gift yourself", {
                  variant: "warning",
                });
                return;
              }

              await recipientUserDetailsQuery({
                params: { mobileNo: values.phone },
              }).unwrap();
            }
            break;
          }
          case FixedCreatePlanStep.RECIPIENT_INFORMATION: {
            break;
          }
          case FixedCreatePlanStep.PLAN_INFORMATION: {
            await savingsFixedDepositCalculationMutation({
              body: {
                depositAmount: Number(values.depositAmount),
                depositPeriod: String(values.depositPeriod) as any,
                depositPeriodFrequencyId: String(
                  values.depositPeriodFrequencyId
                ) as any,
                productId: String(values.productId) as any,
              },
            }).unwrap();
            // stepper.next();
            break;
          }
          case FixedCreatePlanStep.SUMMARY: {
            if (onHandleSubmit) {
              onHandleSubmit?.({ ...values });
              return;
            } else {
              if (isEdit) {
                await updateDraftSavingsMutation({
                  body: {
                    savingsId: Number(savingsId),
                    productId: values.productId,
                    depositAmount: Number(values.depositAmount),
                    depositPeriod: values.depositPeriod,
                    depositPeriodFrequencyId: values.depositPeriodFrequencyId,
                  },
                }).unwrap();
                await renameMutation({
                  body: {
                    savingsId: String(savingsId),
                    name: values.name,
                  },
                }).unwrap();
                trackUserOnSelectingRollover({
                  event: "Clicked on proceed to rollover.",
                });
              } else {
                const payload = {
                  productId: values.productId,
                  lockinPeriodFrequency: values.lockinPeriodFrequency,
                  lockinPeriodFrequencyType: values.lockinPeriodFrequencyType,
                  depositAmount: Number(values.depositAmount),
                  depositPeriod: values.depositPeriod,
                  depositPeriodFrequencyId: values.depositPeriodFrequencyId,
                  name: values.name,
                };

                if (isGifting) {
                  await createSavingsGiftYieldMutation({
                    body: {
                      ...payload,
                      note: values.note,
                      is_gifted: true,
                      firstname: recipientUserDetails?.first_name,
                      lastname: recipientUserDetails?.last_name,
                      reciever_client_id: String(
                        recipientUserDetails?.client_id
                      ),
                      reciever_wallet_id: String(
                        recipientUserDetails?.wallet_id
                      ),
                      phone: recipientUserDetails?.phone,
                    },
                  }).unwrap();

                  // const data = await sendSavingsOtpMutation({
                  //   body: {
                  //     action: "withdraw",
                  //     amount: Number(formik.values.depositAmount),
                  //     channel: "phone",
                  //   },
                  // }).unwrap();

                  // setCountdownDate(getCountdownDate());
                  // enqueueSnackbar(data?.message || "Otp Sent", {
                  //   variant: "error",
                  // });

                  stepper.go(
                    getEnumStepIndex(FixedCreatePlanStep.SELECT_PAYMENT_METHOD)
                  );
                  return;
                } else {
                  await savingsFixedDepositCreateMutation({
                    body: { ...payload },
                  }).unwrap();

                  stepper.go(
                    getEnumStepIndex(FixedCreatePlanStep.SELECT_PAYMENT_METHOD)
                  );

                  return;
                }
              }
              // stepper.next();
            }
            break;
          }
          default:
            break;
        }

        stepper.next();
      } catch (error) {
        enqueueSnackbar(
          error?.data?.message ??
            error?.data?.message?.[0] ??
            "Failed to process, Please try again.",
          {
            variant: "error",
          }
        );
      }
    },
  });

  const isGifting = formik.values.type === "gift";

  // const recipientUserDetailsQueryResult =
  //   savingsApi.useGetSavingsYieldUserDetailsQuery(
  //     useMemo(
  //       () => ({ params: { mobileNo: formik.values.phone } }),
  //       [formik.values.phone]
  //     ),
  //     { skip: !(isGifting && formik.values.phone.length === 11) }
  //   );

  const recipientUserDetails = recipientUserDetailsQueryResult.data?.data;
  const recipientUserDetailsError = (
    recipientUserDetailsQueryResult.error as any
  )?.data;

  const contentProps = {
    formik,
    disabledFields,
    savingsFixedProductInformation: getSavingsProductInformationQuery.data,
    savingsDepositCalculator: savingsFixedDepositCalculationMutationResult.data,
    recipientUserDetails,
    recipientUserDetailsError,
    isGifting,
  };

  async function handlePaystack() {
    trackUserPaystack({ amount: formik.values.depositAmount, status: 200 });
    try {
      const transactionRef =
        await generateTransactionOutwardPaymentReferenceMutation({
          body: {
            provider: PaymentGatewayInlineProvider.PAYSTACK,
            amount: String(formik.values.depositAmount),
            transactionId: String(wallet.id),
            transactionType: "wallet",
            yieldType: "fixed",
          },
        }).unwrap();

      PaymentGatewayInline({
        provider: PaymentGatewayInlineProvider.PAYSTACK,
        key: PAYSTACK_PUBLIC_KEY,
        reference: transactionRef.data?.data?.reference,
        name: authUser?.displayName,
        email: authUser?.email,
        amount: formik.values.depositAmount,
        channels: [],
        // channels: [PaymentGatewayInlineChannel.CARD],
        currency: "NGN",
        metadata: {},
        async onSuccess() {
          onSuccess?.();
          stepper.go(getEnumStepIndex(FixedCreatePlanStep.SUCCESS));
        },
        onClose() {},
      });
    } catch (error) {
      enqueueSnackbar(
        error?.data?.message ??
          error?.data?.message?.[0] ??
          "Failed to generate reference",
        {
          variant: "error",
        }
      );
    }
  }

  const handleFundYield = async (fundSource) => {
    try {
      await savingsActivateAccountMutation({
        body: {
          savingsId: String(
            savingsId ||
              (isGifting
                ? createSavingsGiftYieldMutationResult.data?.data?.savingsId
                : savingsFixedDepositCreateMutationResult.data?.data?.savingsId)
          ) as any,
          fund_source: fundSource as any,
        },
      }).unwrap();

      if (fundSource === "transfer") {
        stepper.go(getEnumStepIndex(FixedCreatePlanStep.TRANSFER_TO_ACCOUNT));
      } else if (fundSource === "paystack") {
        handlePaystack();
      } else {
        stepper.go(getEnumStepIndex(FixedCreatePlanStep.SUCCESS));
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
  };

  const handleResendOtp = async () => {
    try {
      const data = await sendSavingsOtpMutation({
        body: {
          action: "withdraw",
          amount: Number(formik.values.depositAmount),
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

  const tabs = [
    {
      title: `Create Yield Plan`,
      content: <FixedCreatePlanRecipientSelect {...contentProps} />,
    },
    {
      title: `Create Yield Plan`,
      content: <FixedCreatePlanRecipientInformation {...contentProps} />,
    },

    {
      title: `${isEdit ? "Edit" : "Create"} Yield Plan`,
      content: <FixedCreatePlanTab {...contentProps} />,
    },
    {
      title: "Summary",
      content: <FixedCreatePlanCalculatorTab {...contentProps} />,
    },
    {
      title: "Verify Transaction",
      description: `Enter the six (6) digit code sent to ${savingsOtp} to complete this transaction.`,
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
      title: "Fund Yield Plan",
      description: "Please select a source to add money to your yield.",
      content: (
        <div className="space-y-4">
          {[
            {
              icon: <img src={CdlLogo} width={32} height={32} />,
              label: "Pay with transfer (recommended)",
              onClick: () => {
                trackUserOnSelectingTransfer({
                  event: "User Clicked on pay with transfer",
                });
                handleFundYield("transfer");
              },
              loading:
                savingsActivateAccountMutationResult.isLoading &&
                savingsActivateAccountMutationResult.originalArgs?.body
                  ?.fund_source === "transfer",
              disabled: savingsActivateAccountMutationResult.isLoading,
            },
            {
              icon: <Iconify icon="ph:wallet-light" className="text-4xl" />,
              label: `Fund via Yield Wallet`,
              more: `Wallet balance: ${formatNumberToCurrency(
                String(wallet?.balance || 0)
              )}`,
              onClick: () => {
                handleFundYield("wallet");
              },
              loading:
                savingsActivateAccountMutationResult.isLoading &&
                savingsActivateAccountMutationResult.originalArgs?.body
                  ?.fund_source === "wallet",
              disabled:
                walletQueryResult?.isLoading ||
                savingsActivateAccountMutationResult.isLoading ||
                (wallet?.balance &&
                  formik.values.depositAmount > wallet?.balance),
            },
            {
              icon: <img src={PaystackIconPngUrl} width={32} height={32} />,
              label: "Fund via Paystack",
              onClick: () => {
                handleFundYield("paystack");
              },
              loading:
                savingsActivateAccountMutationResult.isLoading &&
                savingsActivateAccountMutationResult.originalArgs?.body
                  ?.fund_source === "paystack",
              disabled:
                generateTransactionOutwardPaymentReferenceMutationResult.isLoading ||
                savingsActivateAccountMutationResult.isLoading,
            },
          ].map(({ label, more, icon, loading, ...restProps }) => {
            return (
              <ButtonBase
                key={label}
                component={Paper}
                className={clsx(
                  "flex items-center justify-between gap-4 p-3 rounded ",
                  restProps?.disabled ? "text-neutral-400" : ""
                )}
                {...restProps}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 text-neutral-400 h-8">
                    {icon}
                  </div>
                  <div>
                    <Typography className="flex-1">{label}</Typography>
                    <Typography variant="caption" className="flex-1">
                      {more}
                    </Typography>
                  </div>
                </div>
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
      ),
    },

    {
      title: "Transfer to CDL Account",
      description:
        "Add money to your Fixed Yield Wallet by transferring to the bank details below.",
      content: (
        <div className="max-w-md flex flex-col items-center justify-center">
          <LoadingContent
            loading={walletQueryResult.isLoading}
            error={walletQueryResult.isError}
            onRetry={walletQueryResult.refetch}
          >
            <>
              <Typography className="text-neutral-500 text-center mt-6">
                {wallet?.bank}
              </Typography>

              <div className="rounded-lg flex justify-center">
                <Typography
                  variant="h5"
                  className="text-neutral-600 font-semibold"
                >
                  {wallet?.account_number}
                  <IconButton
                    onClick={() => writeText(wallet?.account_number)}
                    color="primary"
                  >
                    <Iconify
                      icon="akar-icons:copy"
                      width="1rem"
                      height="1rem"
                    />
                  </IconButton>
                </Typography>
              </div>
              <Typography className="text-center uppercase">
                {wallet?.name}
              </Typography>
              <LoadingButton
                className="mt-6 max-auto"
                variant="soft"
                onClick={() => {
                  trackUserOnSelectingTransfer({
                    event: "User clicked on i have sent the money",
                  });
                  enqueueSnackbar(
                    "Upon Confirmation, your plan will be activated",
                    {
                      variant: "info",
                    }
                  );
                  onClose();
                }}
              >
                I've sent the money
              </LoadingButton>
            </>
          </LoadingContent>
        </div>
      ),
    },

    {
      content: (
        <div className="space-y-8 mx-auto  flex justify-center flex-col items-center">
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
            {isGifting ? (
              <>
                You’ve successfully gifted{" "}
                <span className="font-medium">
                  {recipientUserDetails?.first_name}{" "}
                  {recipientUserDetails?.last_name}
                </span>{" "}
                a Fixed Yield plan.
              </>
            ) : (
              <>
                You’ve successfully {isEdit ? "edited" : "created"}{" "}
                {isEdit
                  ? getSavingsQuery?.data?.data?.plan_name
                  : "a Fixed Yield"}{" "}
                plan.
              </>
            )}
          </Typography>
          <Button
            className="max-w-[255px]"
            fullWidth
            onClick={() => {
              trackUserOnSelectingRollover({
                event: "Clicked on  Okay for a Successfull rollover",
              });
              onClose();
            }}
          >
            Okay
          </Button>
        </div>
      ),
    },
  ];

  const isLastStep = stepper.step === tabs.length - 1;

  const isShowSubmitButton = [
    FixedCreatePlanStep.SELECT_RECIPIENT,
    FixedCreatePlanStep.RECIPIENT_INFORMATION,
    FixedCreatePlanStep.PLAN_INFORMATION,
    FixedCreatePlanStep.SUMMARY,
  ].includes(enumStep);

  if ((window as any).smartech) { 
    (window as any).smartech(
      'CREATE_FIXED_PLAN',
      { 'depositAmount' : formik.values.depositAmount, 
        'depositPeriod' : formik.values.depositPeriod,
        'depositName' : formik.values.name,
      }
    )
  } else {
    console.error('Smartech is not available');
  }

  return (
    <>
      <Dialog
        fullWidth
        PaperProps={{
          sx: {
            maxWidth: isLastStep ? 400 : 440,
          },
        }}
        {...rest}
      >
        <DialogTitleXCloseButton
          onClose={isLastStep ? null : onClose}
          className="text-center mt-3"
        >
          {tabs[stepper.step]?.title}
          <Typography variant="body2" className="text-neutral-500">
            {tabs[stepper.step]?.description}
          </Typography>
        </DialogTitleXCloseButton>

        {[
          ...(isRollover
            ? []
            : [
                FixedCreatePlanStep.RECIPIENT_INFORMATION,
                FixedCreatePlanStep.PLAN_INFORMATION,
              ]),
          FixedCreatePlanStep.SUMMARY,
          FixedCreatePlanStep.VERIFICATION,
        ].includes(enumStep) ? (
          <BackIconButton
            onClick={() => {
              stepper.previous();
            }}
            className="absolute top-3 left-6 bg-neutral-100 text-neutral-700"
            variant="contained"
          />
        ) : null}

        <DialogContent className="px-8 pb-10">
          <form onSubmit={formik.handleSubmit}>
            <LoadingContent
              renderLoading={() =>
                [
                  <div className="w-full">
                    <div>
                      <Skeleton
                        variant="rounded"
                        className="w-[50px] text-xs"
                      />
                      <Skeleton
                        variant="rounded"
                        className="w-full mt-1 h-[45px]"
                      />
                    </div>

                    <div className="mt-4">
                      <Skeleton
                        variant="rounded"
                        className="w-[60px] text-xs"
                      />
                      <Skeleton
                        variant="rounded"
                        className="w-[200px] text-xs mt-1"
                      />
                      <div className="mt-1 flex items-center">
                        <Skeleton
                          variant="circular"
                          className="w-[20px] h-[20px]"
                        />
                        <Skeleton
                          variant="rounded"
                          className="w-full  h-[4px]"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <Skeleton
                        variant="rounded"
                        className="w-[50px] text-xs"
                      />
                      <Skeleton
                        variant="rounded"
                        className="w-full mt-1 h-[45px]"
                      />
                      <Skeleton
                        variant="rounded"
                        className="w-[200px] text-xs mt-1"
                      />
                    </div>
                  </div>,
                  <div className="px-6 mt-4 grid grid-cols-1 gap-6  mb-8 w-full">
                    {[1, 2, 3, 4, 5, 6].map((index) => (
                      <div key={index} className="flex justify-between">
                        <Skeleton variant="rounded" width={150} height={15} />
                        <Skeleton variant="rounded" width={150} height={15} />
                      </div>
                    ))}
                    <div className="flex gap-1 flex-col justify-center items-center">
                      <Skeleton variant="rounded" className="w-full h-[12px]" />
                      <Skeleton
                        variant="rounded"
                        className="w-[100px] h-[12px]"
                      />
                    </div>
                  </div>,
                  <div className="w-full">
                    <Skeleton
                      variant="rounded"
                      className="w-[200px] mx-auto h-[15px]"
                    />

                    <Skeleton
                      variant="rounded"
                      className="w-full h-[50px] mt-6"
                    />
                    <Skeleton
                      variant="rounded"
                      className="w-full h-[50px] mt-4"
                    />
                  </div>,
                ][stepper.step]
              }
              loading={
                getSavingsProductInformationQuery.isLoading ||
                walletQueryResult?.isLoading ||
                getSavingsQuery?.isLoading
              }
              error={getSavingsProductInformationQuery.isError}
              onRetry={getSavingsProductInformationQuery.refetch}
            >
              {isGifting &&
              [
                FixedCreatePlanStep.PLAN_INFORMATION,
                FixedCreatePlanStep.SUMMARY,
              ].includes(enumStep) ? (
                <>
                  <Paper
                    variant="outlined"
                    className="bg-neutral-50 p-4 space-y-4 mb-6"
                  >
                    {[
                      {
                        label: "Recipient Name",
                        value: `${recipientUserDetails?.first_name} ${recipientUserDetails?.last_name}`,
                      },
                      {
                        label: "Phone Number",
                        value: recipientUserDetails?.phone,
                      },
                    ].map(({ label, value }) => (
                      <div className="flex items-center justify-between">
                        <Typography className="text-neutral-500">
                          {label}
                        </Typography>
                        <Typography className="text-right">{value}</Typography>
                      </div>
                    ))}
                  </Paper>
                </>
              ) : null}
              {tabs[stepper.step]?.content}
            </LoadingContent>
            {isShowSubmitButton ? (
              <LoadingButton
                loading={
                  formik.isSubmitting ||
                  getSavingsProductInformationQuery.isLoading ||
                  savingsFixedDepositCalculationMutationResult.isLoading ||
                  savingsFixedDepositCreateMutationResult?.isLoading ||
                  savingsActivateAccountMutationResult.isLoading ||
                  walletQueryResult?.isLoading ||
                  updateDraftSavingsMutationResult?.isLoading ||
                  renameMutationResult?.isLoading ||
                  isLoading
                }
                type="submit"
                // className={clsx(["mt-6", "mt-3"][stepper.step])}
                className={clsx("mt-6")}
                fullWidth
              >
                {{
                  [FixedCreatePlanStep.PLAN_INFORMATION]:
                    proceedLabel ?? "Proceed to Pay",
                }[enumStep] ?? "Continue"}
                {/* {["Continue", proceedLabel ?? "Proceed to Pay"][stepper.step]} */}
              </LoadingButton>
            ) : null}
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

function getCountdownDate() {
  const date = new Date();
  date.setTime(date.getTime() + 1000 * 60 * 5);
  return date;
}

function getEnumStepIndex(enumStep: FixedCreatePlanStep) {
  const index = STEPS_INDEX.indexOf(enumStep);
  return index > -1 ? index : undefined;
}

const STEPS_INDEX = [
  FixedCreatePlanStep.SELECT_RECIPIENT,
  FixedCreatePlanStep.RECIPIENT_INFORMATION,
  FixedCreatePlanStep.PLAN_INFORMATION,
  FixedCreatePlanStep.SUMMARY,
  FixedCreatePlanStep.VERIFICATION,
  FixedCreatePlanStep.SELECT_PAYMENT_METHOD,
  FixedCreatePlanStep.TRANSFER_TO_ACCOUNT,
  FixedCreatePlanStep.SUCCESS,
];
