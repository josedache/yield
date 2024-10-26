import { FormHelperText, TextField, Typography } from "@mui/material";
import CurrencyTextField from "components/CurrencyTextField";
import DurationSlider from "./DurationSlider";
import { FixedCreatePlanContentProps } from "../types/FixedCreatePlan";
import { useMemo } from "react";
import { formatNumberToCurrency } from "utils/number";
import { getFormikTextFieldProps } from "utils/formik";

export default function FixedCreatePlanTab(props: FixedCreatePlanContentProps) {
  const { formik, savingsFixedProductInformation } = props;

  return (
    <>
      <TextField
        {...getFormikTextFieldProps(formik, "name")}
        fullWidth
        label="Plan Name"
      />

      <div className="mt-4">
        <Typography variant="body2">Duration (Months)</Typography>
        <FormHelperText className="1">
          Move the slider to select how long you’ll like to save for.
        </FormHelperText>
        <DurationSlider
          className="1"
          slotProps={{
            thumb: ({ value }) => ({ value }),
          }}
          value={formik.values.depositPeriod}
          onChange={(_, value) => {
            formik.setFieldValue("depositPeriod", value);
          }}
          getAriaValueText={(value) => `${value}`}
          valueLabelDisplay="auto"
          step={1}
          min={savingsFixedProductInformation.data.min_period}
          max={savingsFixedProductInformation.data.max_period}
          marks={useMemo(() => {
            const steps = [];
            for (
              let index = savingsFixedProductInformation.data.min_period;
              index <= savingsFixedProductInformation.data.max_period;
              index += 1
            ) {
              steps.push({
                value: index,
                label: index,
              });
            }
            return steps;
          }, [savingsFixedProductInformation.data])}
        />
      </div>

      <CurrencyTextField
        className="mt-3"
        code="NGN"
        fullWidth
        label="Amount"
        {...getFormikTextFieldProps(formik, "depositAmount")}
        maskOptions={{ thousandsSeparator: "," }}
      />
      <FormHelperText>
        Min. amount to deposit: ₦
        {formatNumberToCurrency(
          `${savingsFixedProductInformation.data.min_deposit_amt}`
        )}
      </FormHelperText>
    </>
  );
}
