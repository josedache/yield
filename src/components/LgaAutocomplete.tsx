import { Autocomplete, AutocompleteProps } from "@mui/material";
import LookupApi from "apis/LookupApi";
// import useDebouncedState from "hooks/useDebouncedState";
import { forwardRef, useState } from "react";
import { normalizeArray } from "utils/object";

const LgaAutocomplete = forwardRef(function LgaAutocomplete(
  props: LgaAutocompleteProps,
  ref: any
) {
  const { inputValueQueryParams, ...restProps } = props;

  const [q, setQ] = useState("");

  const inputValue = restProps.inputValue || q;

  // const [debouncedInputValue] = useDebouncedState(inputValue, {
  //   wait: 200,
  //   enableReInitialize: true,
  // });

  const lgasQueryResult = LookupApi.useGetLgaLookupQuery({
    params: {
      // _search: debouncedInputValue,
      ...inputValueQueryParams,
    },
  });

  const valueLgasQueryResult = LookupApi.useGetLgaLookupQuery(undefined, {
    skip: !(Array.isArray(restProps.value)
      ? restProps.value?.length
      : restProps.value),
    selectFromResult: (result) => ({
      ...result,
      data: {
        ...result?.data,
        data: result.data?.data?.filter((lga: any) =>
          (restProps.value
            ? Array.isArray(restProps.value)
              ? restProps.value.map((item) =>
                typeof item === "object" ? item.id : item
              )
              : typeof restProps.value === "object"
                ? [restProps.value?.id]
                : [restProps.value]
            : []
          ).includes(lga?.id)
        ),
      },
    }),
  });

  const allOptions = [
    ...(lgasQueryResult.data?.data || lgasQueryResult.currentData?.data || []),
    ...(valueLgasQueryResult.data?.data ||
      valueLgasQueryResult.currentData?.data ||
      []),
  ];
  const normalizedOptions = normalizeArray(allOptions);

  const options = Object.values(normalizedOptions);

  function getLgaName(id: any) {
    return id?.name || normalizedOptions?.[id?.id || id]?.name || id || "";
  }

  const onInputChange = restProps.onInputChange || ((_, value) => setQ(value));

  return (
    <Autocomplete
      key={getLgaName(restProps?.value)}
      ref={ref}
      loading={lgasQueryResult.isFetching}
      freeSolo
      // options={mapOptions(options)}
      options={options}
      getOptionLabel={(option) => {
        return getLgaName(option);
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
export default LgaAutocomplete;

export type LgaAutocompleteProps = {
  options?: AutocompleteProps<any, any, any, any>["options"];
  inputValueQueryParams?: any;
  valueQueryParams?: any;
  mapOptions?: (options: any[]) => any[];
} & Omit<AutocompleteProps<any, any, any, any>, "options">;
