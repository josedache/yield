import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  Typography,
} from "@mui/material";
import CurrencyTypography from "components/CurrencyTypography";
import DialogTitleXCloseButton from "components/DialogTitleXCloseButton";
import useToggle from "hooks/useToggle";
import { ReactNode, useMemo } from "react";
import { SavingsAccountGifted } from "src/types/savings-api";
import { savingsApi } from "apis/savings-api";
import LoadingContent from "components/LoadingContent";
import FixedCreatePlan from "./FixedCreatePlan";
import { SAVINGS_ACCOUNT_STATUS_TYPE } from "constants/savings";

function FixedPlanTransactionDetails(props: FixedPlanTransactionDetailsProps) {
  const { info, children, open, onClose, ...restProps } = props;
  const [isOpen, toggleOpen, setOpen] = useToggle();

  const [isFund, toggleFund, setFund] = useToggle();

  const giftedSavingsAccountsQueryResult =
    savingsApi.useGetGiftedSavingsAccountsQuery(
      useMemo(
        () => ({ params: { savingsId: info?.savings_id } }),
        [info?.savings_id]
      )
    );

  const giftedSavingsAccount = giftedSavingsAccountsQueryResult.data
    ?.data as SavingsAccountGifted;

  function handleClose(e?: any, reason?: any) {
    onClose?.(e, reason);
    setOpen(false);
  }

  return (
    <>
      <Dialog
        open={(open ?? isOpen) && !isFund}
        maxWidth="xs"
        fullWidth
        {...restProps}
      >
        <DialogTitleXCloseButton
          onClose={handleClose}
          className="pt-4 text-center"
        >
          Transaction
        </DialogTitleXCloseButton>
        <DialogContent className="space-y-8 px-8">
          <LoadingContent
            loading={giftedSavingsAccountsQueryResult.isLoading}
            error={giftedSavingsAccountsQueryResult.isError}
            onRetry={giftedSavingsAccountsQueryResult.refetch}
          >
            {() => (
              <>
                <div className="flex flex-col justify-center items-center gap-2">
                  <div className="rounded-full h-12 w-12 flex items-center justify-center bg-neutral-100 mb-4">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.25 5.75009H14.9613C14.9978 5.71915 15.0353 5.68915 15.0709 5.65634C15.3557 5.40338 15.5851 5.09439 15.745 4.7487C15.9049 4.40301 15.9917 4.02805 16 3.64728C16.0123 3.23072 15.9394 2.81604 15.7856 2.4287C15.6319 2.04136 15.4006 1.68953 15.106 1.39481C14.8113 1.10008 14.4596 0.868691 14.0723 0.714832C13.685 0.560974 13.2703 0.487897 12.8538 0.500088C12.4728 0.508293 12.0977 0.595043 11.7518 0.754907C11.406 0.914772 11.0968 1.14431 10.8438 1.42915C10.4936 1.83499 10.2089 2.293 10 2.78665C9.7911 2.293 9.50642 1.83499 9.15625 1.42915C8.90318 1.14431 8.59405 0.914772 8.24818 0.754907C7.90232 0.595043 7.52718 0.508293 7.14625 0.500088C6.72969 0.487897 6.31503 0.560974 5.92774 0.714832C5.54044 0.868691 5.18868 1.10008 4.89405 1.39481C4.59941 1.68953 4.36812 2.04136 4.21438 2.4287C4.06064 2.81604 3.98768 3.23072 4 3.64728C4.00833 4.02805 4.09514 4.40301 4.255 4.7487C4.41486 5.09439 4.64434 5.40338 4.92906 5.65634C4.96469 5.68728 5.00219 5.71728 5.03875 5.75009H1.75C1.35218 5.75009 0.970644 5.90812 0.68934 6.18943C0.408035 6.47073 0.25 6.85226 0.25 7.25009V10.2501C0.25 10.6479 0.408035 11.0294 0.68934 11.3107C0.970644 11.5921 1.35218 11.7501 1.75 11.7501V17.7501C1.75 18.1479 1.90804 18.5294 2.18934 18.8107C2.47064 19.0921 2.85218 19.2501 3.25 19.2501H16.75C17.1478 19.2501 17.5294 19.0921 17.8107 18.8107C18.092 18.5294 18.25 18.1479 18.25 17.7501V11.7501C18.6478 11.7501 19.0294 11.5921 19.3107 11.3107C19.592 11.0294 19.75 10.6479 19.75 10.2501V7.25009C19.75 6.85226 19.592 6.47073 19.3107 6.18943C19.0294 5.90812 18.6478 5.75009 18.25 5.75009ZM11.9688 2.4229C12.0875 2.29176 12.2321 2.18659 12.3934 2.11399C12.5547 2.04139 12.7293 2.00293 12.9062 2.00103H12.9522C13.1595 2.00232 13.3645 2.04499 13.5552 2.12653C13.7458 2.20807 13.9183 2.32684 14.0624 2.47588C14.2066 2.62493 14.3195 2.80124 14.3947 2.9945C14.4698 3.18776 14.5056 3.39407 14.5 3.60134C14.4981 3.77824 14.4596 3.95284 14.387 4.11417C14.3144 4.27551 14.2093 4.42009 14.0781 4.53884C13.1884 5.32634 11.7119 5.60384 10.7969 5.70134C10.9094 4.70853 11.2188 3.26571 11.9688 2.4229ZM5.96031 2.45665C6.25088 2.16611 6.64441 2.00203 7.05531 2.00009H7.10125C7.27815 2.002 7.45275 2.04046 7.61409 2.11306C7.77542 2.18566 7.92 2.29083 8.03875 2.42196C8.82531 3.31071 9.10281 4.78446 9.20031 5.69571C8.28906 5.60196 6.81531 5.32071 5.92656 4.53415C5.79543 4.4154 5.69026 4.27082 5.61766 4.10949C5.54506 3.94815 5.5066 3.77355 5.50469 3.59665C5.49887 3.38593 5.53593 3.17623 5.61361 2.98027C5.69128 2.7843 5.80796 2.60616 5.95656 2.45665H5.96031ZM1.75 7.25009H9.25V10.2501H1.75V7.25009ZM3.25 11.7501H9.25V17.7501H3.25V11.7501ZM16.75 17.7501H10.75V11.7501H16.75V17.7501ZM18.25 10.2501H10.75V7.25009H18.25V10.2501Z"
                        fill="#374151"
                      />
                    </svg>
                  </div>
                  <CurrencyTypography variant="h5">
                    {giftedSavingsAccount?.amount}
                  </CurrencyTypography>
                  <Typography className="text-neutral-500">
                    You gifted this plan
                  </Typography>
                </div>
                <div className="divide-y">
                  {[
                    {
                      label: "Recipient Name",
                      value: giftedSavingsAccount?.recipient_name,
                    },
                    { label: "Yield Type", value: "Fixed Yield" },
                    {
                      label: "Duration",
                      value: `${giftedSavingsAccount?.duration}`,
                    },
                    {
                      label: "Date",
                      // value: info.date
                      //   ? dfns.format(new Date(info.date), "dd MMM, yyyy")
                      //   : "",
                      value: giftedSavingsAccount?.date,
                    },
                    giftedSavingsAccount?.reference
                      ? {
                          label: "Transaction reference",
                          value: giftedSavingsAccount?.reference,
                        }
                      : null,
                    giftedSavingsAccount?.status
                      ? {
                          label: "Status",
                          value: (
                            <span className="capitalize">
                              {giftedSavingsAccount?.status}
                            </span>
                          ),
                        }
                      : null,
                  ]
                    .filter((o) => !!o)
                    .map(({ label, value }) => {
                      return (
                        <div className="grid grid-cols-2 gap-2 py-4 font-medium">
                          <Typography className="text-neutral-500">
                            {label}
                          </Typography>
                          <Typography className="text-right text-neutral-900 break-all">
                            {value}
                          </Typography>
                        </div>
                      );
                    })}
                </div>
              </>
            )}
          </LoadingContent>
        </DialogContent>
        {giftedSavingsAccount &&
        info?.status_code ===
          SAVINGS_ACCOUNT_STATUS_TYPE.SUBMITTED_AND_PENDING_APPROVAL ? (
          <DialogActions>
            <Button fullWidth onClick={toggleFund} className="max-w-sm mx-auto">
              Fund Plan
            </Button>
          </DialogActions>
        ) : null}
      </Dialog>

      {typeof children === "function"
        ? children({ isOpen, toggleOpen, setOpen })
        : children}

      {isFund && (
        <FixedCreatePlan
          savingsId={info?.savings_id}
          isPayment
          open
          onClose={() => {
            setFund(false);
            handleClose();
          }}
        />
      )}
    </>
  );
}

export default FixedPlanTransactionDetails;

export type FixedPlanTransactionDetailsProps = {
  id?: string;
  info: SavingsAccountGifted;
  children?:
    | ReactNode
    | ((props: {
        isOpen: boolean;
        toggleOpen: () => void;
        setOpen: (p: any) => void;
      }) => any);
} & Omit<DialogProps, "children">;
