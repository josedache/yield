import {
  Button,
  ButtonBase,
  Dialog,
  DialogContent,
  DialogProps,
  Icon,
  Paper,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import { Icon as Iconify } from "@iconify-icon/react";
import clsx from "clsx";

import DialogTitleXCloseButton from "components/DialogTitleXCloseButton";
import useStepper from "hooks/useStepper";
import BackIconButton from "components/BackIconButton";
import FixedCreatePlanCalculatorTab from "./FixedCreatePlanCalculatorTab";
import FixedCreatePlanTab from "./FixedCreatePlanTab";
import { FixedCreatePlanFormikType } from "../types/FixedCreatePlan";
import { savingsApi } from "apis/savings-api";
import LoadingContent from "components/LoadingContent";
import {
  PaymentGatewayInlineChannel,
  PaymentGatewayInlineProvider,
} from "libs/payment-gateway-inline";
import PaymentGatewayInlineInline from "libs/payment-gateway-inline/inline";
import { PAYSTACK_PUBLIC_KEY } from "constants/env";
import PaystackIconPngUrl from "assets/imgs/paystack-icon.png";
import { FIXED_PRODUCT_ID } from "constants/savings";
import CdlLogo from "assets/imgs/cdl-logo.png";
import { walletApi } from "apis/wallet-api";
import { formatNumberToCurrency } from "utils/number";

export default function FixedCreatePlan(
  props: DialogProps & { onClose: () => void }
) {
  const { onClose, ...rest } = props;
  const stepper = useStepper();
  const { enqueueSnackbar } = useSnackbar();

  const getSavingsProductInformationQuery =
    savingsApi.useGetSavingsProductInformationQuery({
      params: { productId: FIXED_PRODUCT_ID },
    });

  const walletQueryResult = walletApi.useGetWalletQuery(undefined, {
    skip: stepper.step !== 2,
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

  const [savingsActivateAccountMutation, savingsActivateAccountMutationResult] =
    savingsApi.useSavingsActivateAccountMutation();

  const formik = useFormik<FixedCreatePlanFormikType>({
    initialValues: {
      productId: FIXED_PRODUCT_ID,
      depositPeriod: 1,
      ...(getSavingsProductInformationQuery?.data?.data?.max_period_type
        ? {
            depositPeriodFrequencyId:
              getSavingsProductInformationQuery?.data?.data?.max_period_type,
          }
        : {}),
      name: "",
      depositAmount: null,
      lockinPeriodFrequency: 0,
      lockinPeriodFrequencyType: 0,
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
    onSubmit: async () => {
      try {
        switch (stepper.step) {
          case 0:
            await savingsFixedDepositCalculationMutation({
              body: {
                depositAmount: Number(formik.values.depositAmount),
                depositPeriod: String(formik.values.depositPeriod) as any,
                depositPeriodFrequencyId: String(
                  formik.values.depositPeriodFrequencyId
                ) as any,
                productId: String(formik.values.productId) as any,
              },
            }).unwrap();
            stepper.next();
            break;
          case 1:
            await savingsFixedDepositCreateMutation({
              body: {
                productId: formik.values.productId,
                lockinPeriodFrequency: formik.values.lockinPeriodFrequency,
                lockinPeriodFrequencyType:
                  formik.values.lockinPeriodFrequencyType,
                depositAmount: Number(formik.values.depositAmount),
                depositPeriod: formik.values.depositPeriod,
                depositPeriodFrequencyId:
                  formik.values.depositPeriodFrequencyId,
                name: formik.values.name,
              },
            }).unwrap();
            stepper.next();
            break;
          default:
            break;
        }
      } catch (error) {
        console.log({ error });
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
    const resp = await savingsActivateAccountMutation({
      body: {
        savingsId: String(
          savingsFixedDepositCreateMutationResult.data.data.savingsId
        ) as any,
        fund_source: "paystack",
      },
    }).unwrap();

    PaymentGatewayInlineInline({
      provider: PaymentGatewayInlineProvider.PAYSTACK,
      key: PAYSTACK_PUBLIC_KEY,
      reference: resp?.data?.reference,
      name: "Joseph Edache",
      email: "josedache@tmpbox.net",
      amount: formik.values.depositAmount,
      channels: [PaymentGatewayInlineChannel.CARD],
      currency: "NGN",
      metadata: {},
      async onSuccess() {
        formik.submitForm();
      },
      onClose() {},
    });
  }

  async function handleWallet() {
    try {
      await savingsActivateAccountMutation({
        body: {
          savingsId: String(
            savingsFixedDepositCreateMutationResult.data.data.savingsId
          ) as any,
          fund_source: "wallet",
        },
      }).unwrap();
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
      title: "Create Yield Plan",
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
              onClick: handlePayWithTransfer,
              disabled: savingsActivateAccountMutationResult.isLoading,
            },
            {
              icon: <Iconify icon="ph:wallet-light" className="text-4xl" />,
              label: `Fund via Yield Wallet`,
              more: `Wallet balance: ₦${formatNumberToCurrency(
                String(wallet?.balance || 0)
              )}`,
              onClick: handleWallet,
              disabled:
                walletQueryResult?.isLoading ||
                savingsActivateAccountMutationResult.isLoading ||
                (wallet?.balance &&
                  formik.values.depositAmount > wallet?.balance),
            },
            {
              icon: <img src={PaystackIconPngUrl} width={32} height={32} />,
              label: "Fund via Paystack",
              onClick: handlePaystack,
              disabled: savingsActivateAccountMutationResult.isLoading,
            },
          ].map(({ label, more, icon, ...restProps }) => {
            return (
              <ButtonBase
                key={label}
                component={Paper}
                className={clsx(
                  "flex items-center justify-between gap-4 p-2 rounded ",
                  restProps?.disabled ? "text-neutral-400" : ""
                )}
                {...restProps}
              >
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-8">
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
            You’ve successfully created a Yield plan.
          </Typography>
          <Button
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
            Checking test
          </Typography>
          <Typography className="text-center">
            You’ve successfully created a Yield plan.
          </Typography>
          <Button
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

  return (
    <>
      <Dialog fullWidth maxWidth="xs" onClose={onClose} {...rest}>
        <DialogTitleXCloseButton onClose={onClose} className="text-center">
          {tabs[stepper.step].title}
          <Typography variant="body2">
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
          <LoadingContent
            loading={
              getSavingsProductInformationQuery.isLoading ||
              savingsFixedDepositCalculationMutationResult.isLoading ||
              savingsFixedDepositCreateMutationResult?.isLoading ||
              savingsActivateAccountMutationResult.isLoading ||
              walletQueryResult?.isLoading
            }
            error={getSavingsProductInformationQuery.isError}
            onRetry={getSavingsProductInformationQuery.refetch}
          >
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
          </LoadingContent>
        </DialogContent>
      </Dialog>
    </>
  );
}
