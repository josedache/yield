import {
  Button,
  ButtonBase,
  CardActionArea,
  Dialog,
  DialogContent,
  DialogProps,
  Icon,
  Paper,
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
import { savingsApi } from "apis/savings-api";
import BackIconButton from "components/BackIconButton";
import { LoadingButton } from "@mui/lab";

const ROLLOVER_WITH_CAPITAL = 400;
const ROLLOVER_WITH_INTEREST = 300;

export default function FixedRollover(
  props: DialogProps & { onClose: () => void; info: any }
) {
  const { onClose, info, ...rest } = props;
  const { enqueueSnackbar } = useSnackbar();

  const stepper = useStepper();

  const [liquidateSavingsMutation, liquidateSavingsMutationResult] =
    savingsApi.useLiquidateSavingsMutation();

  const formik = useFormik({
    initialValues: {
      savingsId: String(info?.id),
      note: "others",
      onAccountClosureId: null,
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      savingsId: yup.string().label("Savings Id").required("Required"),
      onAccountClosureId: yup
        .string()
        .label("account For closure")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        if (stepper.step === 1 || stepper.step === 2) {
          await liquidateSavingsMutation({
            body: {
              savingsId: values?.savingsId,
              note: values?.note,
              onAccountClosureId: values?.onAccountClosureId,
            },
          }).unwrap();
          enqueueSnackbar("Rollover Successfully", {
            variant: "success",
          });
          onClose();
          stepper.next();
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

  const tabs = [
    {
      title: "Rollover Yield",
      description:
        "You’ve decided to rollover your yield. Please, select a re-investment option below.",
      content: (
        <div>
          <div className="space-y-4">
            {[
              {
                icon: (
                  <Iconify icon="solar:refresh-linear" className="text-2xl" />
                ),
                label: "Rollover Capital only",
                onClick: () => {
                  formik.setFieldValue(
                    "onAccountClosureId",
                    ROLLOVER_WITH_CAPITAL
                  );
                  stepper.go(1);
                },
                disabled: false,
              },
              {
                icon: <Iconify icon="uil:percentage" className="text-2xl" />,
                label: `Rollover Capital with Interest`,
                onClick: () => {
                  formik.setFieldValue(
                    "onAccountClosureId",
                    ROLLOVER_WITH_INTEREST
                  );
                  stepper.go(2);
                },
                disabled: false,
              },
            ].map(({ label, icon, ...restProps }) => {
              return (
                <ButtonBase
                  key={label}
                  component={Paper}
                  className={clsx(
                    "rounded w-full mt-8",
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

                    <Iconify
                      icon="weui:arrow-filled"
                      className="text-lg text-text-secondary"
                    />
                  </CardActionArea>
                </ButtonBase>
              );
            })}
          </div>
        </div>
      ),
    },
    {
      title: "Rollover Capital Only",
      description:
        "To rollover only your capital, we’ll automatically reinvest your initial investment.",
      content: (
        <div>
          <Typography className="mt-6 text-center">
            Amount to Rollover
          </Typography>
          <CurrencyTypography variant="h4" className="text-center font-medium ">
            {info?.principal}
          </CurrencyTypography>

          <div className="flex gap-1 items-start mt-6">
            <Iconify
              icon="ep:warning-filled"
              className="text-red-300 text-2xl"
            />
            <Typography
              variant="body2"
              className="text-left block text-neutral-500"
            >
              Note: The interest earned previously will be added to your wallet
              within 48 hours. A 10% tax is applied to the new interest earned.
            </Typography>
          </div>
        </div>
      ),
    },

    {
      title: "Rollover Capital with Interest",
      description:
        "To rollover your capital plus interest, we’ll automatically reinvest the total amount in this yield.",
      content: (
        <div>
          <Typography className="mt-6 text-center">
            Amount to Rollover
          </Typography>
          <CurrencyTypography variant="h4" className="text-center font-medium ">
            {info?.maturity_amount}
          </CurrencyTypography>

          <div className="flex gap-1 items-start mt-6">
            <Iconify
              icon="ep:warning-filled"
              className="text-red-300 text-2xl"
            />
            <Typography
              variant="body2"
              className="text-left block text-neutral-500"
            >
              Note: The interest earned previously will be added to this
              rollover plan. A 10% tax is applied to the new interest earned.
            </Typography>
          </div>
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
          <Typography className="text-center text-neutral-500">
            Plan have been rollover.
          </Typography>
          <Button size="large" fullWidth onClick={onClose}>
            Okay
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Dialog
      PaperProps={{
        sx: {
          maxWidth: 440,
        },
      }}
      fullWidth
      {...rest}
    >
      <DialogTitleXCloseButton onClose={onClose}>
        <Typography variant="h6" className="text-center font-semibold pt-5">
          {tabs[stepper.step].title}
        </Typography>
        <Typography variant="body2" className="text-center text-neutral-500">
          {tabs[stepper.step].description}
        </Typography>
      </DialogTitleXCloseButton>

      {stepper.step === 1 || stepper.step === 2 ? (
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
          {stepper.step === 1 || stepper.step === 2 ? (
            <LoadingButton
              loading={liquidateSavingsMutationResult?.isLoading}
              type="submit"
              className="mt-6"
              fullWidth
            >
              Continue
            </LoadingButton>
          ) : null}
        </form>
      </DialogContent>
    </Dialog>
  );
}
