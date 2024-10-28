import {
  Button,
  ButtonBase,
  Dialog,
  DialogContent,
  DialogProps,
  Icon,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import { Icon as Iconify } from "@iconify-icon/react";
import clsx from "clsx";
import { useEffect } from "react";

import DialogTitleXCloseButton from "components/DialogTitleXCloseButton";
import useStepper from "hooks/useStepper";
import BackIconButton from "components/BackIconButton";
import FixedCreatePlanCalculatorTab from "./FixedCreatePlanCalculatorTab";
import FixedCreatePlanTab from "./FixedCreatePlanTab";
import { FixedCreatePlanFormikType } from "../types/FixedCreatePlan";
import { savingsApi } from "apis/savings-api";
import LoadingContent from "components/LoadingContent";
import { FIXED_PRODUCT_ID } from "constants/savings";
import CdlLogo from "assets/imgs/cdl-logo.png";
import { walletApi } from "apis/wallet-api";
import { formatNumberToCurrency } from "utils/number";
import useClipboard from "hooks/useClipboard";

export default function FixedCreatePlan(
  props: DialogProps & { onClose: () => void; savingsId?: string }
) {
  const { onClose, savingsId, ...rest } = props;
  const stepper = useStepper();
  const { enqueueSnackbar } = useSnackbar();
  const { writeText } = useClipboard();

  const accountNumber = "0060048892";

  useEffect(() => {
    if (savingsId) {
      stepper.go(2);
    }
  }, [savingsId]);

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
      } else {
        stepper.go(4);
      }
      console.log(">>>>>");
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
              onClick: () => {
                handleFundYield("transfer");
              },
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
            // {
            //   icon: <img src={PaystackIconPngUrl} width={32} height={32} />,
            //   label: "Fund via Paystack",
            //   onClick: handlePaystack,
            //   disabled: savingsActivateAccountMutationResult.isLoading,
            // },
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
      title: "Bank Transfer",
      description:
        "For faster settlement please transfer to your personalized account number",
      content: (
        <div className="max-w-md mx-auto">
          <div className="flex justify-center">
            <img src={CdlLogo} width={32} height={32} />
          </div>
          <Typography className="font-semibold text-center mt-4">
            Credit Direct Limited
          </Typography>
          <Typography className="text-center text-neutral-500 mt-6">
            Account Number
          </Typography>
          <div className="rounded-lg bg-neutral-100 px-2 py-3 mt-1 flex justify-center">
            <Typography className="text-neutral-600 font-semibold">
              {accountNumber}
              <IconButton
                onClick={() => writeText(accountNumber)}
                color="primary"
              >
                <Iconify icon="akar-icons:copy" width="1rem" height="1rem" />
              </IconButton>
            </Typography>
          </div>
          <Button
            className="mt-6"
            fullWidth
            onClick={() => {
              onClose();
            }}
          >
            I have made payment
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
              {tabs[stepper.step]?.content}
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
