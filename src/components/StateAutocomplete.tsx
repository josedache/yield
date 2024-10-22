import { Autocomplete, AutocompleteProps } from "@mui/material";
import LookupApi from "apis/LookupApi";
// import useDebouncedState from "hooks/useDebouncedState";
import { forwardRef, useState } from "react";
import { normalizeArray } from "utils/object";

const StateAutocomplete = forwardRef(function StateAutocomplete(
  props: StateAutocompleteProps,
  ref: any
) {
  const { ...restProps } = props;

  const [q, setQ] = useState("");

  const inputValue = restProps.inputValue || q;

  // const [debouncedInputValue] = useDebouncedState(inputValue, {
  //   wait: 200,
  //   enableReInitialize: true,
  // });

  const statesQueryResult = LookupApi.useGetStateLookupQuery({
    // params: { _search: debouncedInputValue, ...inputValueQueryParams },
  });

  const valueStatesQueryResult = LookupApi.useGetStateLookupQuery(undefined, {
    skip: !(Array.isArray(restProps.value)
      ? restProps.value?.length
      : restProps.value),
    selectFromResult: (result) => ({
      ...result,
      data: {
        ...result?.data,
        data: result?.data?.data?.filter((state: any) =>
          (restProps.value
            ? Array.isArray(restProps.value)
              ? restProps.value.map((item) =>
                typeof item === "object" ? item.id : item
              )
              : typeof restProps.value === "object"
                ? [restProps.value?.id]
                : [restProps.value]
            : []
          ).includes(state?.id)
        ),
      },
    }),
  });

  const allOptions = [
    ...(statesQueryResult.data?.data ||
      statesQueryResult.currentData?.data ||
      []),
    ...(valueStatesQueryResult.data?.data ||
      valueStatesQueryResult.currentData?.data ||
      []),
  ];
  const normalizedOptions = normalizeArray(allOptions);

  const options = Object.values(normalizedOptions);

  function getStateName(id: any) {
    return id?.name || normalizedOptions?.[id?.id || id]?.name || id || "";
  }

  const onInputChange = restProps.onInputChange || ((_, value) => setQ(value));

  return (
    <Autocomplete
      key={getStateName(restProps?.value)}
      ref={ref}
      loading={statesQueryResult.isFetching}
      freeSolo
      // options={mapOptions(options)}
      options={options}
      getOptionLabel={(option) => {
        return getStateName(option);
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
export default StateAutocomplete;

export type StateAutocompleteProps = {
  options?: AutocompleteProps<any, any, any, any>["options"];
  inputValueQueryParams?: any;
  valueQueryParams?: any;
  mapOptions?: (options: any[]) => any[];
} & Omit<AutocompleteProps<any, any, any, any>, "options">;
