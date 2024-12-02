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
import { ReactNode, useMemo } from "react";
import { getFormikTextFieldProps } from "utils/formik";
import { useSnackbar } from "notistack";
import CurrencyTextField from "components/CurrencyTextField";
import useStepper from "hooks/useStepper";
import { Icon as Iconify } from "@iconify-icon/react";
import PaystackIconPngUrl from "assets/imgs/paystack-icon.png";
import PaymentGatewayInline from "libs/payment-gateway-inline/inline";
import { PaymentGatewayInlineProvider } from "libs/payment-gateway-inline";
import { PAYSTACK_PUBLIC_KEY } from "constants/env";
import { savingsApi } from "apis/savings-api";

function FlexFund(props: FlexFundProps) {
  const { children, onClose, ...restProps } = props;

  const { enqueueSnackbar } = useSnackbar();

  const [isOpen, toggleOpen, setOpen] = useToggle();

  const stepper = useStepper();

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

  const totalAvailableBalance =
    savingsAccountsQueryResult.data?.data?.totalAvailableBalance ?? 0;

  const isLowBalance = !(Number(totalAvailableBalance) > 0);

  const formik = useFormik({
    initialValues: {
      amount: null,
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      amount: yup
        .number()
        .label("Amount")
        .min(isLowBalance ? 50_000 : 1)
        .required(),
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

  function handleClose(e?: any, reason?: any) {
    formik.resetForm();
    stepper.reset();
    onClose?.(e, reason);
    setOpen(false);
  }

  function handlePaystack() {
    PaymentGatewayInline({
      provider: PaymentGatewayInlineProvider.PAYSTACK,
      key: PAYSTACK_PUBLIC_KEY,
      reference: String(Math.floor(Math.random() * 10000)),
      name: "Joseph Edache",
      email: "josedache@tmpbox.net",
      amount: formik.values.amount,
      channels: [],
      // channels: [PaymentGatewayInlineChannel.CARD],
      currency: "NGN",
      metadata: {},
      async onSuccess() {
        formik.submitForm();
      },
      onClose() {},
    });
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
              disabled={!formik.isValid || formik.dirty}
              onClick={formik.handleSubmit as any}
            >
              Continue
            </LoadingButton>
            <Typography className="text-center" color="textSecondary">
              Earn <b>14%</b> per annum on your funds.
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
            {
              icon: <Iconify icon="ph:wallet-light" className="text-4xl" />,
              label: "Fund via Yield Wallet",
              onClick: handleWallet,
            },
            {
              icon: <img src={PaystackIconPngUrl} width={32} height={32} />,
              label: "Fund via Paystack",
              onClick: handlePaystack,
            },
          ].map(({ label, icon, ...restProps }) => {
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
              <Typography variant="h6">Fund Flex Yield</Typography>
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
