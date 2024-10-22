import { Chip, CircularProgress, Typography } from "@mui/material";
import KycApi from "apis/KycApi";
import LookupApi from "apis/LookupApi";
import useRtkQueryStatusCallbacks, {
  RtkQueryStatusCallbacks,
} from "hooks/useRtkQueryStatusCallbacks";
import { useMemo } from "react";
import { normalizeArray } from "utils/object";

function BankAccountNameResolver(props: BankAccountNameResolverProps) {
  const { accountNumber, bankId, bankCode, onNameResolved, ...restProps } =
    props;

  const bankQueryResult = LookupApi.useGetBankListLookupQuery(undefined);

  const banks = bankQueryResult.data?.data;

  const normalizedBanks = useMemo(() => normalizeArray(banks), [banks]);

  const resolvedBankCode = bankCode || normalizedBanks?.[bankId]?.code;

  const nameEnquiryKycQueryResult = KycApi.useNameEnquiryKycQuery(
    useMemo(
      () => ({
        body: {
          bankCode: resolvedBankCode,
          accountNumber,
        },
      }),
      [accountNumber, resolvedBankCode]
    ),
    {
      skip: !(
        resolvedBankCode &&
        accountNumber &&
        accountNumber?.length === 10
      ),
    }
  );

  const nameEnquiryKyc = nameEnquiryKycQueryResult.data?.data;

  useRtkQueryStatusCallbacks(nameEnquiryKycQueryResult, {
    ...restProps,
    onSuccess(queryResult) {
      onNameResolved?.(queryResult.data?.data?.accountName);
      restProps?.onSuccess?.(queryResult);
    },
  });

  return (
    <>
      {nameEnquiryKycQueryResult.isFetching ? (
        <Typography variant="body2">
          Resolving Account <CircularProgress size={10} />
        </Typography>
      ) : nameEnquiryKycQueryResult.isSuccess ? (
        <Chip
          variant="filled"
          size="small"
          color="primary"
          label={nameEnquiryKyc?.accountName}
        />
      ) : nameEnquiryKycQueryResult.isError ? (
        <Typography variant="body2" color="error">
          {(nameEnquiryKycQueryResult.error as any)?.data?.message}
        </Typography>
      ) : null}
    </>
  );
}

export default BankAccountNameResolver;

export type BankAccountNameResolverProps = {
  bankId?: string | number;
  bankCode?: string | number;
  accountNumber?: string;
  onNameResolved: (name: string) => void;
} & RtkQueryStatusCallbacks<any>;
