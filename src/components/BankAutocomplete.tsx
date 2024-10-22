import { Autocomplete, AutocompleteProps } from "@mui/material";
import LookupApi from "apis/LookupApi";
// import useDebouncedState from "hooks/useDebouncedState";
import { forwardRef, useState } from "react";
import { normalizeArray } from "utils/object";

const BankAutocomplete = forwardRef(function BankAutocomplete(
  props: BankAutocompleteProps,
  ref: any
) {
  const { ...restProps } = props;

  const [q, setQ] = useState("");

  const inputValue = restProps.inputValue || q;

  // const [debouncedInputValue] = useDebouncedState(inputValue, {
  //   wait: 200,
  //   enableReInitialize: true,
  // });

  const bankQueryResult = LookupApi.useGetBankListLookupQuery({
    // params: { _search: debouncedInputValue, ...inputValueQueryParams },
  });

  const valueBanksQueryResult = LookupApi.useGetBankListLookupQuery(undefined, {
    skip: !(Array.isArray(restProps.value)
      ? restProps.value?.length
      : restProps.value),
    selectFromResult: (result) => ({
      ...result,
      data: result.data?.data?.filter((bank: any) =>
        (restProps.value
          ? Array.isArray(restProps.value)
            ? restProps.value.map((item) =>
              typeof item === "object" ? item.id : item
            )
            : typeof restProps.value === "object"
              ? [restProps.value?.id]
              : [restProps.value]
          : []
        ).includes(bank?.id)
      ),
    }),
  });

  const allOptions = [
    ...(bankQueryResult.data?.data || bankQueryResult.currentData?.data || []),
    ...(valueBanksQueryResult.data?.data ||
      valueBanksQueryResult.currentData?.data ||
      []),
  ];
  const normalizedOptions = normalizeArray(allOptions);

  const options = Object.values(normalizedOptions);

  function getBankName(id: any) {
    return id?.name || normalizedOptions?.[id?.id || id]?.name || id || "";
  }

  const onInputChange = restProps.onInputChange || ((_, value) => setQ(value));

  return (
    <Autocomplete
      key={getBankName(restProps?.value)}
      ref={ref}
      loading={bankQueryResult.isFetching}
      freeSolo
      // options={mapOptions(options)}
      options={options}
      getOptionLabel={(option) => {
        return getBankName(option);
      }}
      isOptionEqualToValue={(option, value) => {
        return (
          option === value || option?.id === value?.id || option?.id === value
        );
      }}
      {...restProps}
      inputValue={inputValue}
      onInputChange={onInputChange}
    />
  );
});
export default BankAutocomplete;

export type BankAutocompleteProps = {
  options?: AutocompleteProps<any, any, any, any>["options"];
  inputValueQueryParams?: any;
  valueQueryParams?: any;
  mapOptions?: (options: any[]) => any[];
} & Omit<AutocompleteProps<any, any, any, any>, "options">;
