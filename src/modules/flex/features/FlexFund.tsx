import {
  Button,
  Dialog,
  DialogContent,
  DrawerProps,
  IconButton,
  Typography,
} from "@mui/material";
import DialogTitleXCloseButton from "components/DialogTitleXCloseButton";
import { useFormik } from "formik";
import * as yup from "yup";
import useToggle from "hooks/useToggle";
import { ReactNode, useMemo } from "react";
import { useSnackbar } from "notistack";
import useStepper from "hooks/useStepper";
import { Icon as Iconify } from "@iconify-icon/react";
import useAuthUser from "hooks/useAuthUser";
import useClipboard from "hooks/useClipboard";
import { savingsApi } from "apis/savings-api";
import LoadingContent from "components/LoadingContent";

function FlexFund(props: FlexFundProps) {
  const { children, onClose, ...restProps } = props;

  const { enqueueSnackbar } = useSnackbar();

  const authUser = useAuthUser();

  const [isOpen, toggleOpen, setOpen] = useToggle();

  const clipboard = useClipboard();

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

  const savingsAccounts = savingsAccountsQueryResult.data?.data;

  // const totalAvailableBalance = savingsAccounts?.totalAvailableBalance ?? 0;

  const savingsAccount = savingsAccounts?.savingsAccounts?.[0];

  const formik = useFormik({
    initialValues: {},
    enableReinitialize: true,
    validationSchema: yup.object({}),
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

  return (
    <>
      <Dialog open={isOpen} fullWidth maxWidth="xs" {...restProps}>
        <DialogTitleXCloseButton className="text-center" onClose={handleClose}>
          Transfer to CDL Account <br />
          <Typography
            component="span"
            color="textSecondary"
            className="text-center"
          >
            Add money to your Flex Yield Wallet by transferring to the bank
            details below.
          </Typography>
        </DialogTitleXCloseButton>
        <DialogContent>
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
                          clipboard.writeText(
                            String(savingsAccount?.account_no)
                          )
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
