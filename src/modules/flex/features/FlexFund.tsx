import { LoadingButton } from "@mui/lab";
import {
  Button,
  ButtonBase,
  CircularProgress,
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
import { ReactNode, useMemo } from "react";
import { getFormikTextFieldProps } from "utils/formik";
import { useSnackbar } from "notistack";
import CurrencyTextField from "components/CurrencyTextField";
import useStepper from "hooks/useStepper";
import { Icon as Iconify } from "@iconify-icon/react";
import PaystackIconPngUrl from "assets/imgs/paystack-icon.png";
import PaymentGatewayInline from "libs/payment-gateway-inline/inline";
import {
  PaymentGatewayInlineChannel,
  PaymentGatewayInlineProvider,
} from "libs/payment-gateway-inline";
import { PAYSTACK_PUBLIC_KEY } from "constants/env";
import { savingsApi } from "apis/savings-api";
import LoadingContent from "components/LoadingContent";
import useAuthUser from "hooks/useAuthUser";
import useClipboard from "hooks/useClipboard";
import { FlexFundStep } from "../enums/FlexFundStep";
import { transactionApi } from "apis/transaction-api";

function FlexFund(props: FlexFundProps) {
  const { children, onClose, ...restProps } = props;

  const { enqueueSnackbar } = useSnackbar();

  const authUser = useAuthUser();

  const [isOpen, toggleOpen, setOpen] = useToggle();

  const clipboard = useClipboard();

  const stepper = useStepper({
    initialStep: getEnumStepIndex(FlexFundStep.AMOUNT),
  });

  const enumStep = STEPS_INDEX[stepper.step];

  const [
    generateTransactionOutwardPaymentReferenceMutation,
    generateTransactionOutwardPaymentReferenceMutationResult,
  ] = transactionApi.useGenerateTransactionOutwardPaymentReferenceMutation();

  const savingsAccountsQueryResult = savingsApi.useGetSavingsAccountsQuery(
    useMemo(
      () => ({
        params: {
          type: "recurring_deposit",
        },
      }),
      []
    )
  );

  const savingsAccounts = savingsAccountsQueryResult.data?.data;
  const savingsAccount = savingsAccounts?.savingsAccounts?.[0];
  const totalAvailableBalance = savingsAccounts?.totalAvailableBalance ?? 0;

  const isLowBalance = !(Number(totalAvailableBalance) > 0);

  const formik = useFormik({
    initialValues: {
      amount: 0,
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      ...{
        [FlexFundStep.AMOUNT]: {
          amount: yup
            .number()
            .label("Amount")
            .min(isLowBalance ? 50_000 : 1)
            .required(),
        },
      }[enumStep],
    }),
    onSubmit: async () => {
      try {
        stepper.next();
      } catch (error) {
        enqueueSnackbar(error?.data?.message || "Failed to process funding", {
          variant: "error",
        });
      }
    },
  });

  function handleClose(e?: any, reason?: any) {
    formik.resetForm();
    stepper.reset();
    onClose?.(e, reason);
    setOpen(false);
  }

  async function handlePaystack() {
    try {
      const transactionRef =
        await generateTransactionOutwardPaymentReferenceMutation({
          body: {
            provider: PaymentGatewayInlineProvider.PAYSTACK,
            amount: String(formik.values.amount),
            transactionId: String(savingsAccount?.id),
            transactionType: "wallet",
            yieldType: "flex",
          },
        }).unwrap();

      PaymentGatewayInline({
        provider: PaymentGatewayInlineProvider.PAYSTACK,
        key: PAYSTACK_PUBLIC_KEY,
        reference: transactionRef.data?.data?.reference,
        name: authUser?.displayName,
        email: authUser?.email,
        amount: formik.values.amount,
        channels: [PaymentGatewayInlineChannel.CARD],
        currency: "NGN",
        metadata: {},
        async onSuccess() {
          stepper.go(getEnumStepIndex(FlexFundStep.SUCCESS));
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

  function handleWallet() {
    formik.submitForm();
  }

  const stepConfigs = [
    {
      description: "Please enter the amount you want to save to your yield.",
      content: (
        <div className="space-y-8">
          <CurrencyTextField
            fullWidth
            label="Amount"
            margin="normal"
            {...getFormikTextFieldProps(
              formik,
              "amount",
              isLowBalance ? "Min. amount: ₦50,000.00" : null
            )}
          />
          <div className="space-y-4">
            <LoadingButton
              size="large"
              fullWidth
              disabled={!formik.isValid}
              onClick={formik.handleSubmit as any}
            >
              Continue
            </LoadingButton>
            <Typography className="text-center" color="textSecondary">
              Estimated returns at <b>14%</b> per annum.
            </Typography>
          </div>
        </div>
      ),
    },
    {
      description: "Please select a source to add money to your yield.",
      content: (
        <div className="space-y-4">
          {[
            // {
            //   icon: <Iconify icon="ph:wallet-light" className="text-4xl" />,
            //   label: "Fund via Yield Wallet",
            //   onClick: handleWallet,
            // },
            {
              icon: <Iconify icon="lsicon:send-outline" className="text-4xl" />,
              label: "Transfer to your CDL Account",
              onClick: handleWallet,
              disabled:
                generateTransactionOutwardPaymentReferenceMutationResult.isLoading,
            },
            {
              icon: <img src={PaystackIconPngUrl} width={32} height={32} />,
              label: "Fund via Paystack",
              onClick: handlePaystack,
              loading:
                generateTransactionOutwardPaymentReferenceMutationResult.isLoading,
              disabled:
                generateTransactionOutwardPaymentReferenceMutationResult.isLoading,
            },
          ].map(({ label, icon, loading, ...restProps }) => {
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
        "Add money to your Flex Yield Wallet by transferring to the bank details below.",
      content: (
        <LoadingContent
          loading={savingsAccountsQueryResult.isLoading}
          error={savingsAccountsQueryResult.isError}
          onRetry={savingsAccountsQueryResult.refetch}
        >
          {() => (
            <>
              <div className="space-y-8 flex flex-col items-center py-4">
                <div className="text-center space-y-2">
                  <Typography color="textSecondary">
                    Credit Direct Limited
                  </Typography>
                  <div className="flex items-center justify-center gap-1 text-center">
                    <Typography variant="h4" className="font-bold">
                      {savingsAccount?.account_no}
                    </Typography>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() =>
                        clipboard.writeText(String(savingsAccount?.account_no))
                      }
                    >
                      <Iconify icon="material-symbols:file-copy-outline" />
                    </IconButton>
                  </div>

                  <Typography color="textSecondary">
                    {authUser?.displayName}
                  </Typography>
                </div>
                <Button
                  onClick={(e) => {
                    enqueueSnackbar(
                      "Upon reciept of your funds. Your wallet will be credited automatically",
                      {
                        variant: "info",
                      }
                    );
                    handleClose(e);
                  }}
                  size="large"
                  color="primary"
                  variant="soft"
                >
                  I’ve sent the money
                </Button>
              </div>
            </>
          )}
        </LoadingContent>
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
            You’ve successfully created a Yield profile. You can now sign in to
            complete your onboarding.
          </Typography>
          <Button fullWidth onClick={handleClose}>
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
        <DialogContent className="space-y-4 py-4">
          {!isBlankStep ? (
            <div className="text-center">
              <Typography variant="h6">
                {stepConfig?.title ?? "Fund Flex Yield"}
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

export default FlexFund;

function getEnumStepIndex(enumStep: FlexFundStep) {
  const index = STEPS_INDEX.indexOf(enumStep);
  return index > -1 ? index : undefined;
}

const STEPS_INDEX = [
  FlexFundStep.AMOUNT,
  FlexFundStep.DESTINATION,
  FlexFundStep.TRANSFER,
  FlexFundStep.SUCCESS,
];

export type FlexFundProps = {
  id?: string;
  children?:
    | ReactNode
    | ((props: {
        isOpen: boolean;
        toggleOpen: () => void;
        setOpen: (p: any) => void;
      }) => any);
} & Omit<DrawerProps, "children">;
