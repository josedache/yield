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
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import { Icon as Iconify } from "@iconify-icon/react";
import clsx from "clsx";
import { useEffect } from "react";
import PaystackIconPngUrl from "assets/imgs/paystack-icon.png";
import PaymentGatewayInline from "libs/payment-gateway-inline/inline";
import {
  // PaymentGatewayInlineChannel,
  PaymentGatewayInlineProvider,
} from "libs/payment-gateway-inline";
import DialogTitleXCloseButton from "components/DialogTitleXCloseButton";
import useStepper from "hooks/useStepper";
import BackIconButton from "components/BackIconButton";
import FixedCreatePlanCalculatorTab from "./FixedCreatePlanCalculatorTab";
import FixedCreatePlanTab from "./FixedCreatePlanTab";
import { FixedCreatePlanFormikType } from "../types/FixedCreatePlan";
import { savingsApi } from "apis/savings-api";
import LoadingContent from "components/LoadingContent";
import CdlLogo from "assets/imgs/cdl-logo.png";
import { walletApi } from "apis/wallet-api";
import { formatNumberToCurrency } from "utils/number";
import useClipboard from "hooks/useClipboard";
import { LoadingButton } from "@mui/lab";
import { FIXED_PRODUCT_ID, PAYSTACK_PUBLIC_KEY } from "constants/env";
import useAuthUser from "hooks/useAuthUser";
import { transactionApi } from "apis/transaction-api";

export default function FixedCreatePlan(
  props: DialogProps & {
    onClose: () => void;
    savingsId?: string;
    isEdit?: boolean;
    isPayment?: boolean;
    onSuccess?: () => void;
  }
) {
  const { onSuccess, onClose, savingsId, isEdit, isPayment, ...rest } = props;

  const stepper = useStepper();
  const { enqueueSnackbar } = useSnackbar();
  const { writeText } = useClipboard();

  const authUser = useAuthUser();

  useEffect(() => {
    if (savingsId && isPayment) {
      stepper.go(2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savingsId]);

  const getSavingsQuery = savingsApi.useGetSavingsAccountQuery(
    {
      params: { savingsId: savingsId },
    },
    { skip: !isEdit && !savingsId }
  );

  const [updateDraftSavingsMutation, updateDraftSavingsMutationResult] =
    savingsApi.useUpdateDraftSavingsMutation();

  const getSavingsProductInformationQuery =
    savingsApi.useGetSavingsProductInformationQuery({
      params: { productId: FIXED_PRODUCT_ID },
    });

  const walletQueryResult = walletApi.useGetWalletQuery(undefined, {
    skip: stepper.step !== 2 && stepper.step !== 3,
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

  // const resolvedSavingsId =
  //   savingsId || savingsFixedDepositCreateMutationResult?.data?.data?.savingsId;

  const [savingsActivateAccountMutation, savingsActivateAccountMutationResult] =
    savingsApi.useSavingsActivateAccountMutation();

  const [renameMutation, renameMutationResult] =
    savingsApi.useSavingsRenameMutation();

  const [
    generateTransactionOutwardPaymentReferenceMutation,
    generateTransactionOutwardPaymentReferenceMutationResult,
  ] = transactionApi.useGenerateTransactionOutwardPaymentReferenceMutation();

  const formik = useFormik<FixedCreatePlanFormikType>({
    initialValues: {
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
        Number(getSavingsQuery?.data?.data?.principal || 0) || null,
      lockinPeriodFrequency: 0,
      lockinPeriodFrequencyType: 0,
      fundSource: "",
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      depositAmount: yup
        .number()
        .label("Amount")
        .min(
          getSavingsProductInformationQuery?.data?.data?.min_deposit_amt || 0
        )
        .max(
          getSavingsProductInformationQuery?.data?.data?.max_deposit_amt || 0
        )
        .required("Required"),
      depositPeriod: yup.string().label("Deposit Period").required("Required"),
      depositPeriodFrequencyId: yup
        .string()
        .label("Deposit Period Id")
        .required("Required"),
      name: yup.string().label("Plan Name").required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        switch (stepper.step) {
          case 0:
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
            stepper.next();
            break;
          case 1:
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
            } else {
              await savingsFixedDepositCreateMutation({
                body: {
                  productId: values.productId,
                  lockinPeriodFrequency: values.lockinPeriodFrequency,
                  lockinPeriodFrequencyType: values.lockinPeriodFrequencyType,
                  depositAmount: Number(values.depositAmount),
                  depositPeriod: values.depositPeriod,
                  depositPeriodFrequencyId: values.depositPeriodFrequencyId,
                  name: values.name,
                },
              }).unwrap();
            }

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

  const contentProps = {
    formik,
    savingsFixedProductInformation: getSavingsProductInformationQuery.data,
    savingsDepositCalculator: savingsFixedDepositCalculationMutationResult.data,
  };

  async function handlePaystack() {
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
        // channels: [PaymentGatewayInlineChannel.CARD],
        currency: "NGN",
        metadata: {},
        async onSuccess() {
          onSuccess?.();
          stepper.go(4);
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
              savingsFixedDepositCreateMutationResult.data.data.savingsId
          ) as any,
          fund_source: fundSource as any,
        },
      }).unwrap();

      if (fundSource === "transfer") {
        stepper.go(3);
      } else if (fundSource === "paystack") {
        handlePaystack();
      } else {
        stepper.go(4);
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

  const tabs = [
    {
      title: `${isEdit ? "Edit" : "Create"} Yield Plan`,
      content: <FixedCreatePlanTab {...contentProps} />,
    },
    {
      title: "Summary",
      content: <FixedCreatePlanCalculatorTab {...contentProps} />,
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
                handleFundYield("transfer");
              },
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
              disabled:
                generateTransactionOutwardPaymentReferenceMutationResult.isLoading ||
                savingsActivateAccountMutationResult.isLoading,
            },
          ].map(({ label, more, icon, ...restProps }) => {
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

                <Iconify
                  icon="weui:arrow-filled"
                  className="text-lg text-text-secondary"
                />
              </ButtonBase>
            );
          })}
        </div>
      ),
    },

    {
      title: "Transfer to CDL Account",
      description:
        "Add money to your Flex Yield Wallet by transferring to the bank details below.",
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
            You’ve successfully {isEdit ? "edited" : "created"}{" "}
            {isEdit ? getSavingsQuery?.data?.data?.plan_name : "a Fixed Yield"}{" "}
            plan.
          </Typography>
          <Button
            className="max-w-[255px]"
            fullWidth
            onClick={() => {
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

  return (
    <>
      <Dialog
        fullWidth
        PaperProps={{
          sx: {
            maxWidth: isLastStep ? 400 : 440,
          },
        }}
        onClose={onClose}
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

        {stepper.step === 1 ? (
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
                walletQueryResult?.isLoading
              }
              error={getSavingsProductInformationQuery.isError}
              onRetry={getSavingsProductInformationQuery.refetch}
            >
              {tabs[stepper.step]?.content}
            </LoadingContent>
            {stepper.step <= 1 ? (
              <LoadingButton
                loading={
                  getSavingsProductInformationQuery.isLoading ||
                  savingsFixedDepositCalculationMutationResult.isLoading ||
                  savingsFixedDepositCreateMutationResult?.isLoading ||
                  savingsActivateAccountMutationResult.isLoading ||
                  walletQueryResult?.isLoading ||
                  updateDraftSavingsMutationResult?.isLoading ||
                  renameMutationResult?.isLoading
                }
                type="submit"
                className={clsx(["mt-6", "mt-3"][stepper.step])}
                fullWidth
              >
                {["Continue", "Proceed to Pay"][stepper.step]}
              </LoadingButton>
            ) : null}
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
